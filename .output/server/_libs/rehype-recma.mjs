import { t as toEstree } from "./hast-util-to-estree.mjs";
function rehypeRecma(options) {
  return function(tree) {
    return toEstree(tree, options);
  };
}
export {
  rehypeRecma as r
};
