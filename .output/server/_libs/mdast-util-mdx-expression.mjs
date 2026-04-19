import { o as ok } from "./devlop.mjs";
function mdxExpressionFromMarkdown() {
  return {
    enter: {
      mdxFlowExpression: enterMdxFlowExpression,
      mdxTextExpression: enterMdxTextExpression
    },
    exit: {
      mdxFlowExpression: exitMdxExpression,
      mdxFlowExpressionChunk: exitMdxExpressionData,
      mdxTextExpression: exitMdxExpression,
      mdxTextExpressionChunk: exitMdxExpressionData
    }
  };
}
function mdxExpressionToMarkdown() {
  return {
    handlers: {
      mdxFlowExpression: handleMdxExpression,
      mdxTextExpression: handleMdxExpression
    },
    unsafe: [
      { character: "{", inConstruct: ["phrasing"] },
      { atBreak: true, character: "{" }
    ]
  };
}
function enterMdxFlowExpression(token) {
  this.enter({ type: "mdxFlowExpression", value: "" }, token);
  this.buffer();
}
function enterMdxTextExpression(token) {
  this.enter({ type: "mdxTextExpression", value: "" }, token);
  this.buffer();
}
function exitMdxExpression(token) {
  const value = this.resume();
  const estree = token.estree;
  const node = this.stack[this.stack.length - 1];
  ok(node.type === "mdxFlowExpression" || node.type === "mdxTextExpression");
  this.exit(token);
  node.value = value;
  if (estree) {
    node.data = { estree };
  }
}
function exitMdxExpressionData(token) {
  this.config.enter.data.call(this, token);
  this.config.exit.data.call(this, token);
}
function handleMdxExpression(node, parent, state) {
  const value = node.value || "";
  const result = state.indentLines(value, function(line, index, blank) {
    return (index === 0 || blank ? "" : "  ") + line;
  });
  return "{" + result + "}";
}
export {
  mdxExpressionToMarkdown as a,
  mdxExpressionFromMarkdown as m
};
