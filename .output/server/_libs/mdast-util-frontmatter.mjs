import { a as escapeStringRegexp } from "./escape-string-regexp.mjs";
import { t as toMatters } from "./micromark-extension-frontmatter+[...].mjs";
function frontmatterFromMarkdown(options) {
  const matters = toMatters(options);
  const enter = {};
  const exit = {};
  let index = -1;
  while (++index < matters.length) {
    const matter = matters[index];
    enter[matter.type] = opener(matter);
    exit[matter.type] = close;
    exit[matter.type + "Value"] = value;
  }
  return { enter, exit };
}
function opener(matter) {
  return open;
  function open(token) {
    this.enter({ type: matter.type, value: "" }, token);
    this.buffer();
  }
}
function close(token) {
  const data = this.resume();
  const node = this.stack[this.stack.length - 1];
  this.exit(token);
  node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
}
function value(token) {
  this.config.enter.data.call(this, token);
  this.config.exit.data.call(this, token);
}
function frontmatterToMarkdown(options) {
  const unsafe = [];
  const handlers = {};
  const matters = toMatters(options);
  let index = -1;
  while (++index < matters.length) {
    const matter = matters[index];
    handlers[matter.type] = handler(matter);
    const open = fence(matter, "open");
    unsafe.push({
      atBreak: true,
      character: open.charAt(0),
      after: escapeStringRegexp(open.charAt(1))
    });
  }
  return { unsafe, handlers };
}
function handler(matter) {
  const open = fence(matter, "open");
  const close2 = fence(matter, "close");
  return handle;
  function handle(node) {
    return open + (node.value ? "\n" + node.value : "") + "\n" + close2;
  }
}
function fence(matter, prop) {
  return matter.marker ? pick(matter.marker, prop).repeat(3) : (
    // @ts-expect-error: They’re mutually exclusive.
    pick(matter.fence, prop)
  );
}
function pick(schema, prop) {
  return typeof schema === "string" ? schema : schema[prop];
}
export {
  frontmatterToMarkdown as a,
  frontmatterFromMarkdown as f
};
