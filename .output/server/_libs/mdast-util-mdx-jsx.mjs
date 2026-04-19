import { c as ccount } from "./ccount.mjs";
import { o as ok } from "./devlop.mjs";
import { V as VFileMessage } from "./vfile-message.mjs";
import { p as parseEntities } from "./parse-entities.mjs";
import { s as stringifyPosition } from "./unist-util-stringify-position.mjs";
import { s as stringifyEntitiesLight } from "./stringify-entities.mjs";
const indent = "  ";
function mdxJsxFromMarkdown() {
  return {
    canContainEols: ["mdxJsxTextElement"],
    enter: {
      mdxJsxFlowTag: enterMdxJsxTag,
      mdxJsxFlowTagClosingMarker: enterMdxJsxTagClosingMarker,
      mdxJsxFlowTagAttribute: enterMdxJsxTagAttribute,
      mdxJsxFlowTagExpressionAttribute: enterMdxJsxTagExpressionAttribute,
      mdxJsxFlowTagAttributeValueLiteral: buffer,
      mdxJsxFlowTagAttributeValueExpression: buffer,
      mdxJsxFlowTagSelfClosingMarker: enterMdxJsxTagSelfClosingMarker,
      mdxJsxTextTag: enterMdxJsxTag,
      mdxJsxTextTagClosingMarker: enterMdxJsxTagClosingMarker,
      mdxJsxTextTagAttribute: enterMdxJsxTagAttribute,
      mdxJsxTextTagExpressionAttribute: enterMdxJsxTagExpressionAttribute,
      mdxJsxTextTagAttributeValueLiteral: buffer,
      mdxJsxTextTagAttributeValueExpression: buffer,
      mdxJsxTextTagSelfClosingMarker: enterMdxJsxTagSelfClosingMarker
    },
    exit: {
      mdxJsxFlowTagClosingMarker: exitMdxJsxTagClosingMarker,
      mdxJsxFlowTagNamePrimary: exitMdxJsxTagNamePrimary,
      mdxJsxFlowTagNameMember: exitMdxJsxTagNameMember,
      mdxJsxFlowTagNameLocal: exitMdxJsxTagNameLocal,
      mdxJsxFlowTagExpressionAttribute: exitMdxJsxTagExpressionAttribute,
      mdxJsxFlowTagExpressionAttributeValue: data,
      mdxJsxFlowTagAttributeNamePrimary: exitMdxJsxTagAttributeNamePrimary,
      mdxJsxFlowTagAttributeNameLocal: exitMdxJsxTagAttributeNameLocal,
      mdxJsxFlowTagAttributeValueLiteral: exitMdxJsxTagAttributeValueLiteral,
      mdxJsxFlowTagAttributeValueLiteralValue: data,
      mdxJsxFlowTagAttributeValueExpression: exitMdxJsxTagAttributeValueExpression,
      mdxJsxFlowTagAttributeValueExpressionValue: data,
      mdxJsxFlowTagSelfClosingMarker: exitMdxJsxTagSelfClosingMarker,
      mdxJsxFlowTag: exitMdxJsxTag,
      mdxJsxTextTagClosingMarker: exitMdxJsxTagClosingMarker,
      mdxJsxTextTagNamePrimary: exitMdxJsxTagNamePrimary,
      mdxJsxTextTagNameMember: exitMdxJsxTagNameMember,
      mdxJsxTextTagNameLocal: exitMdxJsxTagNameLocal,
      mdxJsxTextTagExpressionAttribute: exitMdxJsxTagExpressionAttribute,
      mdxJsxTextTagExpressionAttributeValue: data,
      mdxJsxTextTagAttributeNamePrimary: exitMdxJsxTagAttributeNamePrimary,
      mdxJsxTextTagAttributeNameLocal: exitMdxJsxTagAttributeNameLocal,
      mdxJsxTextTagAttributeValueLiteral: exitMdxJsxTagAttributeValueLiteral,
      mdxJsxTextTagAttributeValueLiteralValue: data,
      mdxJsxTextTagAttributeValueExpression: exitMdxJsxTagAttributeValueExpression,
      mdxJsxTextTagAttributeValueExpressionValue: data,
      mdxJsxTextTagSelfClosingMarker: exitMdxJsxTagSelfClosingMarker,
      mdxJsxTextTag: exitMdxJsxTag
    }
  };
  function buffer() {
    this.buffer();
  }
  function point(d) {
    return { line: d.line, column: d.column, offset: d.offset };
  }
  function data(token) {
    this.config.enter.data.call(this, token);
    this.config.exit.data.call(this, token);
  }
  function enterMdxJsxTag(token) {
    const tag = {
      name: void 0,
      attributes: [],
      close: false,
      selfClosing: false,
      start: token.start,
      end: token.end
    };
    if (!this.data.mdxJsxTagStack) this.data.mdxJsxTagStack = [];
    this.data.mdxJsxTag = tag;
    this.buffer();
  }
  function enterMdxJsxTagClosingMarker(token) {
    const stack = this.data.mdxJsxTagStack;
    if (stack.length === 0) {
      throw new VFileMessage(
        "Unexpected closing slash `/` in tag, expected an open tag first",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:unexpected-closing-slash"
      );
    }
  }
  function enterMdxJsxTagAnyAttribute(token) {
    const tag = this.data.mdxJsxTag;
    if (tag.close) {
      throw new VFileMessage(
        "Unexpected attribute in closing tag, expected the end of the tag",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:unexpected-attribute"
      );
    }
  }
  function enterMdxJsxTagSelfClosingMarker(token) {
    const tag = this.data.mdxJsxTag;
    if (tag.close) {
      throw new VFileMessage(
        "Unexpected self-closing slash `/` in closing tag, expected the end of the tag",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:unexpected-self-closing-slash"
      );
    }
  }
  function exitMdxJsxTagClosingMarker() {
    const tag = this.data.mdxJsxTag;
    tag.close = true;
  }
  function exitMdxJsxTagNamePrimary(token) {
    const tag = this.data.mdxJsxTag;
    tag.name = this.sliceSerialize(token);
  }
  function exitMdxJsxTagNameMember(token) {
    const tag = this.data.mdxJsxTag;
    tag.name += "." + this.sliceSerialize(token);
  }
  function exitMdxJsxTagNameLocal(token) {
    const tag = this.data.mdxJsxTag;
    tag.name += ":" + this.sliceSerialize(token);
  }
  function enterMdxJsxTagAttribute(token) {
    const tag = this.data.mdxJsxTag;
    enterMdxJsxTagAnyAttribute.call(this, token);
    tag.attributes.push({
      type: "mdxJsxAttribute",
      name: "",
      value: null,
      position: {
        start: point(token.start),
        // @ts-expect-error: `end` will be patched later.
        end: void 0
      }
    });
  }
  function enterMdxJsxTagExpressionAttribute(token) {
    const tag = this.data.mdxJsxTag;
    enterMdxJsxTagAnyAttribute.call(this, token);
    tag.attributes.push({
      type: "mdxJsxExpressionAttribute",
      value: "",
      position: {
        start: point(token.start),
        // @ts-expect-error: `end` will be patched later.
        end: void 0
      }
    });
    this.buffer();
  }
  function exitMdxJsxTagExpressionAttribute(token) {
    const tag = this.data.mdxJsxTag;
    const tail = tag.attributes[tag.attributes.length - 1];
    ok(tail.type === "mdxJsxExpressionAttribute");
    const estree = token.estree;
    tail.value = this.resume();
    ok(tail.position !== void 0);
    tail.position.end = point(token.end);
    if (estree) {
      tail.data = { estree };
    }
  }
  function exitMdxJsxTagAttributeNamePrimary(token) {
    const tag = this.data.mdxJsxTag;
    const node = tag.attributes[tag.attributes.length - 1];
    ok(node.type === "mdxJsxAttribute");
    node.name = this.sliceSerialize(token);
    ok(node.position !== void 0);
    node.position.end = point(token.end);
  }
  function exitMdxJsxTagAttributeNameLocal(token) {
    const tag = this.data.mdxJsxTag;
    const node = tag.attributes[tag.attributes.length - 1];
    ok(node.type === "mdxJsxAttribute");
    node.name += ":" + this.sliceSerialize(token);
    ok(node.position !== void 0);
    node.position.end = point(token.end);
  }
  function exitMdxJsxTagAttributeValueLiteral(token) {
    const tag = this.data.mdxJsxTag;
    const node = tag.attributes[tag.attributes.length - 1];
    node.value = parseEntities(this.resume(), { nonTerminated: false });
    ok(node.position !== void 0);
    node.position.end = point(token.end);
  }
  function exitMdxJsxTagAttributeValueExpression(token) {
    const tag = this.data.mdxJsxTag;
    const tail = tag.attributes[tag.attributes.length - 1];
    ok(tail.type === "mdxJsxAttribute");
    const node = { type: "mdxJsxAttributeValueExpression", value: this.resume() };
    const estree = token.estree;
    if (estree) {
      node.data = { estree };
    }
    tail.value = node;
    ok(tail.position !== void 0);
    tail.position.end = point(token.end);
  }
  function exitMdxJsxTagSelfClosingMarker() {
    const tag = this.data.mdxJsxTag;
    tag.selfClosing = true;
  }
  function exitMdxJsxTag(token) {
    const tag = this.data.mdxJsxTag;
    const stack = this.data.mdxJsxTagStack;
    const tail = stack[stack.length - 1];
    if (tag.close && tail.name !== tag.name) {
      throw new VFileMessage(
        "Unexpected closing tag `" + serializeAbbreviatedTag(tag) + "`, expected corresponding closing tag for `" + serializeAbbreviatedTag(tail) + "` (" + stringifyPosition(tail) + ")",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:end-tag-mismatch"
      );
    }
    this.resume();
    if (tag.close) {
      stack.pop();
    } else {
      this.enter(
        {
          type: token.type === "mdxJsxTextTag" ? "mdxJsxTextElement" : "mdxJsxFlowElement",
          name: tag.name || null,
          attributes: tag.attributes,
          children: []
        },
        token,
        onErrorRightIsTag
      );
    }
    if (tag.selfClosing || tag.close) {
      this.exit(token, onErrorLeftIsTag);
    } else {
      stack.push(tag);
    }
  }
  function onErrorRightIsTag(closing, open) {
    const stack = this.data.mdxJsxTagStack;
    const tag = stack[stack.length - 1];
    const place = closing ? " before the end of `" + closing.type + "`" : "";
    const position = closing ? { start: closing.start, end: closing.end } : void 0;
    throw new VFileMessage(
      "Expected a closing tag for `" + serializeAbbreviatedTag(tag) + "` (" + stringifyPosition({ start: open.start, end: open.end }) + ")" + place,
      position,
      "mdast-util-mdx-jsx:end-tag-mismatch"
    );
  }
  function onErrorLeftIsTag(a, b) {
    const tag = this.data.mdxJsxTag;
    throw new VFileMessage(
      "Expected the closing tag `" + serializeAbbreviatedTag(tag) + "` either after the end of `" + b.type + "` (" + stringifyPosition(b.end) + ") or another opening tag after the start of `" + b.type + "` (" + stringifyPosition(b.start) + ")",
      { start: a.start, end: a.end },
      "mdast-util-mdx-jsx:end-tag-mismatch"
    );
  }
  function serializeAbbreviatedTag(tag) {
    return "<" + (tag.close ? "/" : "") + (tag.name || "") + ">";
  }
}
function mdxJsxToMarkdown(options) {
  const options_ = options || {};
  const quote = options_.quote || '"';
  const quoteSmart = options_.quoteSmart || false;
  const tightSelfClosing = options_.tightSelfClosing || false;
  const printWidth = options_.printWidth || Number.POSITIVE_INFINITY;
  const alternative = quote === '"' ? "'" : '"';
  if (quote !== '"' && quote !== "'") {
    throw new Error(
      "Cannot serialize attribute values with `" + quote + "` for `options.quote`, expected `\"`, or `'`"
    );
  }
  mdxElement.peek = peekElement;
  return {
    handlers: {
      mdxJsxFlowElement: mdxElement,
      mdxJsxTextElement: mdxElement
    },
    unsafe: [
      { character: "<", inConstruct: ["phrasing"] },
      { atBreak: true, character: "<" }
    ],
    // Always generate fenced code (never indented code).
    fences: true,
    // Always generate links with resources (never autolinks).
    resourceLink: true
  };
  function mdxElement(node, _, state, info) {
    const flow = node.type === "mdxJsxFlowElement";
    const selfClosing = node.name ? !node.children || node.children.length === 0 : false;
    const depth = inferDepth(state);
    const currentIndent = createIndent(depth);
    const trackerOneLine = state.createTracker(info);
    const trackerMultiLine = state.createTracker(info);
    const serializedAttributes = [];
    const prefix = (flow ? currentIndent : "") + "<" + (node.name || "");
    const exit = state.enter(node.type);
    trackerOneLine.move(prefix);
    trackerMultiLine.move(prefix);
    if (node.attributes && node.attributes.length > 0) {
      if (!node.name) {
        throw new Error("Cannot serialize fragment w/ attributes");
      }
      let index = -1;
      while (++index < node.attributes.length) {
        const attribute = node.attributes[index];
        let result;
        if (attribute.type === "mdxJsxExpressionAttribute") {
          result = "{" + (attribute.value || "") + "}";
        } else {
          if (!attribute.name) {
            throw new Error("Cannot serialize attribute w/o name");
          }
          const value2 = attribute.value;
          const left = attribute.name;
          let right = "";
          if (value2 === null || value2 === void 0) ;
          else if (typeof value2 === "object") {
            right = "{" + (value2.value || "") + "}";
          } else {
            const appliedQuote = quoteSmart && ccount(value2, quote) > ccount(value2, alternative) ? alternative : quote;
            right = appliedQuote + stringifyEntitiesLight(value2, { subset: [appliedQuote] }) + appliedQuote;
          }
          result = left + (right ? "=" : "") + right;
        }
        serializedAttributes.push(result);
      }
    }
    let attributesOnTheirOwnLine = false;
    const attributesOnOneLine = serializedAttributes.join(" ");
    if (
      // Block:
      flow && // Including a line ending (expressions).
      (/\r?\n|\r/.test(attributesOnOneLine) || // Current position (including `<tag`).
      trackerOneLine.current().now.column + // -1 because columns, +1 for ` ` before attributes.
      // Attributes joined by spaces.
      attributesOnOneLine.length + // ` />`.
      (selfClosing ? tightSelfClosing ? 2 : 3 : 1) > printWidth)
    ) {
      attributesOnTheirOwnLine = true;
    }
    let tracker = trackerOneLine;
    let value = prefix;
    if (attributesOnTheirOwnLine) {
      tracker = trackerMultiLine;
      let index = -1;
      while (++index < serializedAttributes.length) {
        serializedAttributes[index] = currentIndent + indent + serializedAttributes[index];
      }
      value += tracker.move(
        "\n" + serializedAttributes.join("\n") + "\n" + currentIndent
      );
    } else if (attributesOnOneLine) {
      value += tracker.move(" " + attributesOnOneLine);
    }
    if (selfClosing) {
      value += tracker.move(
        (tightSelfClosing || attributesOnTheirOwnLine ? "" : " ") + "/"
      );
    }
    value += tracker.move(">");
    if (node.children && node.children.length > 0) {
      if (node.type === "mdxJsxTextElement") {
        value += tracker.move(
          state.containerPhrasing(node, {
            ...tracker.current(),
            before: ">",
            after: "<"
          })
        );
      } else {
        tracker.shift(2);
        value += tracker.move("\n");
        value += tracker.move(containerFlow(node, state, tracker.current()));
        value += tracker.move("\n");
      }
    }
    if (!selfClosing) {
      value += tracker.move(
        (flow ? currentIndent : "") + "</" + (node.name || "") + ">"
      );
    }
    exit();
    return value;
  }
}
function containerFlow(parent, state, info) {
  const indexStack = state.indexStack;
  const children = parent.children;
  const tracker = state.createTracker(info);
  const currentIndent = createIndent(inferDepth(state));
  const results = [];
  let index = -1;
  indexStack.push(-1);
  while (++index < children.length) {
    const child = children[index];
    indexStack[indexStack.length - 1] = index;
    const childInfo = { before: "\n", after: "\n", ...tracker.current() };
    const result = state.handle(child, parent, state, childInfo);
    const serializedChild = child.type === "mdxJsxFlowElement" ? result : state.indentLines(result, function(line, _, blank) {
      return (blank ? "" : currentIndent) + line;
    });
    results.push(tracker.move(serializedChild));
    if (child.type !== "list") {
      state.bulletLastUsed = void 0;
    }
    if (index < children.length - 1) {
      results.push(tracker.move("\n\n"));
    }
  }
  indexStack.pop();
  return results.join("");
}
function inferDepth(state) {
  let depth = 0;
  let index = state.stack.length;
  while (--index > -1) {
    const name = state.stack[index];
    if (name === "blockquote" || name === "listItem") break;
    if (name === "mdxJsxFlowElement") depth++;
  }
  return depth;
}
function createIndent(depth) {
  return indent.repeat(depth);
}
function peekElement() {
  return "<";
}
export {
  mdxJsxToMarkdown as a,
  mdxJsxFromMarkdown as m
};
