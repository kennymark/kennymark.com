import { t as toJs } from "./estree-util-to-js.mjs";
function recmaStringify(options) {
  const self = this;
  this.compiler = compiler;
  function compiler(tree, file) {
    const settings = { ...self.data("settings"), ...options };
    const result = toJs(tree, {
      SourceMapGenerator: settings.SourceMapGenerator,
      filePath: file.path || "unknown.js",
      handlers: settings.handlers
    });
    file.map = result.map;
    return result.value;
  }
}
export {
  recmaStringify as r
};
