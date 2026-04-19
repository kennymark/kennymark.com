import { V as VFileMessage } from "./vfile-message.mjs";
import { v as visit } from "./estree-util-visit.mjs";
function eventsToAcorn(events, options) {
  const prefix = options.prefix || "";
  const suffix = options.suffix || "";
  const acornOptions = Object.assign({}, options.acornOptions);
  const comments = [];
  const tokens = [];
  const onComment = acornOptions.onComment;
  const onToken = acornOptions.onToken;
  let swallow = false;
  let estree;
  let exception;
  const acornConfig = Object.assign({}, acornOptions, {
    onComment: comments,
    preserveParens: true
  });
  if (onToken) {
    acornConfig.onToken = tokens;
  }
  const collection = collect(events, options.tokenTypes);
  const source = collection.value;
  const value = prefix + source + suffix;
  const isEmptyExpression = options.expression && empty(source);
  if (isEmptyExpression && !options.allowEmpty) {
    throw new VFileMessage("Unexpected empty expression", {
      place: parseOffsetToUnistPoint(0),
      ruleId: "unexpected-empty-expression",
      source: "micromark-extension-mdx-expression"
    });
  }
  try {
    estree = options.expression && !isEmptyExpression ? options.acorn.parseExpressionAt(value, 0, acornConfig) : options.acorn.parse(value, acornConfig);
  } catch (error_) {
    const error = (
      /** @type {AcornError} */
      error_
    );
    const point = parseOffsetToUnistPoint(error.pos);
    error.message = String(error.message).replace(/ \(\d+:\d+\)$/, "");
    error.pos = point.offset;
    error.loc = {
      line: point.line,
      column: point.column - 1
    };
    exception = error;
    swallow = error.raisedAt >= prefix.length + source.length || // Broken comments are raised at their start, not their end.
    error.message === "Unterminated comment";
  }
  if (estree && options.expression && !isEmptyExpression) {
    if (empty(value.slice(estree.end, value.length - suffix.length))) {
      estree = {
        type: "Program",
        start: 0,
        end: prefix.length + source.length,
        // @ts-expect-error: It’s good.
        body: [{
          type: "ExpressionStatement",
          expression: estree,
          start: 0,
          end: prefix.length + source.length
        }],
        sourceType: "module",
        comments: []
      };
    } else {
      const point = parseOffsetToUnistPoint(estree.end);
      const error = (
        /** @type {AcornError} */
        new Error("Unexpected content after expression")
      );
      error.pos = point.offset;
      error.loc = {
        line: point.line,
        column: point.column - 1
      };
      exception = error;
      estree = void 0;
    }
  }
  if (estree) {
    estree.comments = comments;
    visit(estree, function(esnode, field, index, parents) {
      let context = (
        /** @type {AcornNode | Array<AcornNode>} */
        parents[parents.length - 1]
      );
      let property = field;
      if (esnode.type === "ParenthesizedExpression" && context && property) {
        if (typeof index === "number") {
          context = context[property];
          property = index;
        }
        context[property] = esnode.expression;
      }
      fixPosition(esnode);
    });
    if (Array.isArray(onComment)) {
      onComment.push(...comments);
    } else if (typeof onComment === "function") {
      for (const comment of comments) {
        onComment(comment.type === "Block", comment.value, comment.start, comment.end, comment.loc.start, comment.loc.end);
      }
    }
    for (const token of tokens) {
      if (token.end <= prefix.length || token.start - prefix.length >= source.length) {
        continue;
      }
      fixPosition(token);
      if (Array.isArray(onToken)) {
        onToken.push(token);
      } else {
        onToken(token);
      }
    }
  }
  return {
    estree,
    error: exception,
    swallow
  };
  function fixPosition(nodeOrToken) {
    const pointStart = parseOffsetToUnistPoint(nodeOrToken.start);
    const pointEnd = parseOffsetToUnistPoint(nodeOrToken.end);
    nodeOrToken.start = pointStart.offset;
    nodeOrToken.end = pointEnd.offset;
    nodeOrToken.loc = {
      start: {
        line: pointStart.line,
        column: pointStart.column - 1,
        // @ts-expect-error: not allowed by acorn types.
        offset: pointStart.offset
      },
      end: {
        line: pointEnd.line,
        column: pointEnd.column - 1,
        // @ts-expect-error: not allowed by acorn types.
        offset: pointEnd.offset
      }
    };
    nodeOrToken.range = [nodeOrToken.start, nodeOrToken.end];
  }
  function parseOffsetToUnistPoint(acornOffset) {
    let sourceOffset = acornOffset - prefix.length;
    if (sourceOffset < 0) {
      sourceOffset = 0;
    } else if (sourceOffset > source.length) {
      sourceOffset = source.length;
    }
    let point = relativeToPoint(collection.stops, sourceOffset);
    if (!point) {
      point = {
        line: options.start.line,
        column: options.start.column,
        offset: options.start.offset
      };
    }
    return point;
  }
}
function empty(value) {
  return /^\s*$/.test(value.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\r\n]*(\r\n|\n|\r)/g, ""));
}
function collect(events, tokenTypes) {
  const result = {
    value: "",
    stops: []
  };
  let index = -1;
  while (++index < events.length) {
    const event = events[index];
    if (event[0] === "enter") {
      const type = event[1].type;
      if (type === "lineEnding" || tokenTypes.includes(type)) {
        const chunks = event[2].sliceStream(event[1]);
        while (chunks.length > 0 && chunks[0] === -1) {
          chunks.shift();
        }
        const value = serializeChunks(chunks);
        result.stops.push([result.value.length, event[1].start]);
        result.value += value;
        result.stops.push([result.value.length, event[1].end]);
      }
    }
  }
  return result;
}
function relativeToPoint(stops, relative) {
  let index = 0;
  while (index < stops.length && stops[index][0] <= relative) {
    index += 1;
  }
  if (index === 0) {
    return void 0;
  }
  const [stopRelative, stopAbsolute] = stops[index - 1];
  const rest = relative - stopRelative;
  return {
    line: stopAbsolute.line,
    column: stopAbsolute.column + rest,
    offset: stopAbsolute.offset + rest
  };
}
function serializeChunks(chunks) {
  let index = -1;
  const result = [];
  let atTab;
  while (++index < chunks.length) {
    const chunk = chunks[index];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else switch (chunk) {
      case -5: {
        value = "\r";
        break;
      }
      case -4: {
        value = "\n";
        break;
      }
      case -3: {
        value = "\r\n";
        break;
      }
      case -2: {
        value = "	";
        break;
      }
      /* c8 ignore next 6 */
      case -1: {
        if (atTab) continue;
        value = " ";
        break;
      }
      default: {
        value = String.fromCharCode(chunk);
      }
    }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}
export {
  eventsToAcorn as e
};
