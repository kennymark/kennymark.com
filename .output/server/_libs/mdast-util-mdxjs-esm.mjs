import { o as ok } from "./devlop.mjs";
function mdxjsEsmFromMarkdown() {
  return {
    enter: { mdxjsEsm: enterMdxjsEsm },
    exit: { mdxjsEsm: exitMdxjsEsm, mdxjsEsmData: exitMdxjsEsmData }
  };
}
function mdxjsEsmToMarkdown() {
  return { handlers: { mdxjsEsm: handleMdxjsEsm } };
}
function enterMdxjsEsm(token) {
  this.enter({ type: "mdxjsEsm", value: "" }, token);
  this.buffer();
}
function exitMdxjsEsm(token) {
  const value = this.resume();
  const node = this.stack[this.stack.length - 1];
  ok(node.type === "mdxjsEsm");
  this.exit(token);
  const estree = token.estree;
  node.value = value;
  if (estree) {
    node.data = { estree };
  }
}
function exitMdxjsEsmData(token) {
  this.config.enter.data.call(this, token);
  this.config.exit.data.call(this, token);
}
function handleMdxjsEsm(node) {
  return node.value || "";
}
export {
  mdxjsEsmToMarkdown as a,
  mdxjsEsmFromMarkdown as m
};
