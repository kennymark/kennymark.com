import { m as markdownSpace, a as markdownLineEnding } from "./micromark-util-character.mjs";
import { f as fault } from "./fault.mjs";
const own = {}.hasOwnProperty;
const markers = {
  yaml: "-",
  toml: "+"
};
function toMatters(options) {
  const result = [];
  let index = -1;
  const presetsOrMatters = Array.isArray(options) ? options : options ? [options] : ["yaml"];
  while (++index < presetsOrMatters.length) {
    result[index] = matter(presetsOrMatters[index]);
  }
  return result;
}
function matter(option) {
  let result = option;
  if (typeof result === "string") {
    if (!own.call(markers, result)) {
      throw fault("Missing matter definition for `%s`", result);
    }
    result = {
      type: result,
      marker: markers[result]
    };
  } else if (typeof result !== "object") {
    throw fault("Expected matter to be an object, not `%j`", result);
  }
  if (!own.call(result, "type")) {
    throw fault("Missing `type` in matter `%j`", result);
  }
  if (!own.call(result, "fence") && !own.call(result, "marker")) {
    throw fault("Missing `marker` or `fence` in matter `%j`", result);
  }
  return result;
}
function frontmatter(options) {
  const matters = toMatters(options);
  const flow = {};
  let index = -1;
  while (++index < matters.length) {
    const matter2 = matters[index];
    const code = fence(matter2, "open").charCodeAt(0);
    const construct = createConstruct(matter2);
    const existing = flow[code];
    if (Array.isArray(existing)) {
      existing.push(construct);
    } else {
      flow[code] = [construct];
    }
  }
  return {
    flow
  };
}
function createConstruct(matter2) {
  const anywhere = matter2.anywhere;
  const frontmatterType = (
    /** @type {TokenType} */
    matter2.type
  );
  const fenceType = (
    /** @type {TokenType} */
    frontmatterType + "Fence"
  );
  const sequenceType = (
    /** @type {TokenType} */
    fenceType + "Sequence"
  );
  const valueType = (
    /** @type {TokenType} */
    frontmatterType + "Value"
  );
  const closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  let buffer;
  let bufferIndex = 0;
  return {
    tokenize: tokenizeFrontmatter,
    concrete: true
  };
  function tokenizeFrontmatter(effects, ok, nok) {
    const self = this;
    return start;
    function start(code) {
      const position = self.now();
      if (
        // Indent not allowed.
        position.column === 1 && // Normally, only allowed in first line.
        (position.line === 1 || anywhere)
      ) {
        buffer = fence(matter2, "open");
        bufferIndex = 0;
        if (code === buffer.charCodeAt(bufferIndex)) {
          effects.enter(frontmatterType);
          effects.enter(fenceType);
          effects.enter(sequenceType);
          return openSequence(code);
        }
      }
      return nok(code);
    }
    function openSequence(code) {
      if (bufferIndex === buffer.length) {
        effects.exit(sequenceType);
        if (markdownSpace(code)) {
          effects.enter("whitespace");
          return openSequenceWhitespace(code);
        }
        return openAfter(code);
      }
      if (code === buffer.charCodeAt(bufferIndex++)) {
        effects.consume(code);
        return openSequence;
      }
      return nok(code);
    }
    function openSequenceWhitespace(code) {
      if (markdownSpace(code)) {
        effects.consume(code);
        return openSequenceWhitespace;
      }
      effects.exit("whitespace");
      return openAfter(code);
    }
    function openAfter(code) {
      if (markdownLineEnding(code)) {
        effects.exit(fenceType);
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        buffer = fence(matter2, "close");
        bufferIndex = 0;
        return effects.attempt(closingFenceConstruct, after, contentStart);
      }
      return nok(code);
    }
    function contentStart(code) {
      if (code === null || markdownLineEnding(code)) {
        return contentEnd(code);
      }
      effects.enter(valueType);
      return contentInside(code);
    }
    function contentInside(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit(valueType);
        return contentEnd(code);
      }
      effects.consume(code);
      return contentInside;
    }
    function contentEnd(code) {
      if (code === null) {
        return nok(code);
      }
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return effects.attempt(closingFenceConstruct, after, contentStart);
    }
    function after(code) {
      effects.exit(frontmatterType);
      return ok(code);
    }
  }
  function tokenizeClosingFence(effects, ok, nok) {
    let bufferIndex2 = 0;
    return closeStart;
    function closeStart(code) {
      if (code === buffer.charCodeAt(bufferIndex2)) {
        effects.enter(fenceType);
        effects.enter(sequenceType);
        return closeSequence(code);
      }
      return nok(code);
    }
    function closeSequence(code) {
      if (bufferIndex2 === buffer.length) {
        effects.exit(sequenceType);
        if (markdownSpace(code)) {
          effects.enter("whitespace");
          return closeSequenceWhitespace(code);
        }
        return closeAfter(code);
      }
      if (code === buffer.charCodeAt(bufferIndex2++)) {
        effects.consume(code);
        return closeSequence;
      }
      return nok(code);
    }
    function closeSequenceWhitespace(code) {
      if (markdownSpace(code)) {
        effects.consume(code);
        return closeSequenceWhitespace;
      }
      effects.exit("whitespace");
      return closeAfter(code);
    }
    function closeAfter(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit(fenceType);
        return ok(code);
      }
      return nok(code);
    }
  }
}
function fence(matter2, prop) {
  return matter2.marker ? pick(matter2.marker, prop).repeat(3) : (
    // @ts-expect-error: They’re mutually exclusive.
    pick(matter2.fence, prop)
  );
}
function pick(schema, prop) {
  return typeof schema === "string" ? schema : schema[prop];
}
export {
  frontmatter as f,
  toMatters as t
};
