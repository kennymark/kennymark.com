var stripBomString;
var hasRequiredStripBomString;
function requireStripBomString() {
  if (hasRequiredStripBomString) return stripBomString;
  hasRequiredStripBomString = 1;
  stripBomString = function(str) {
    if (typeof str === "string" && str.charAt(0) === "\uFEFF") {
      return str.slice(1);
    }
    return str;
  };
  return stripBomString;
}
export {
  requireStripBomString as r
};
