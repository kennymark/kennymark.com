var isExtendable;
var hasRequiredIsExtendable;
function requireIsExtendable() {
  if (hasRequiredIsExtendable) return isExtendable;
  hasRequiredIsExtendable = 1;
  isExtendable = function isExtendable2(val) {
    return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
  };
  return isExtendable;
}
export {
  requireIsExtendable as r
};
