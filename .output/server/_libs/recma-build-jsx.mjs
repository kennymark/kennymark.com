import { b as buildJsx } from "./estree-util-build-jsx.mjs";
function recmaJsx(options) {
  return function(tree, file) {
    buildJsx(tree, { filePath: file.history[0], ...options });
  };
}
export {
  recmaJsx as r
};
