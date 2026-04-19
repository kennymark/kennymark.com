import { r as requireIsExtendable } from "./is-extendable.mjs";
var extendShallow;
var hasRequiredExtendShallow;
function requireExtendShallow() {
  if (hasRequiredExtendShallow) return extendShallow;
  hasRequiredExtendShallow = 1;
  var isObject = requireIsExtendable();
  extendShallow = function extend(o) {
    if (!isObject(o)) {
      o = {};
    }
    var len = arguments.length;
    for (var i = 1; i < len; i++) {
      var obj = arguments[i];
      if (isObject(obj)) {
        assign(o, obj);
      }
    }
    return o;
  };
  function assign(a, b) {
    for (var key in b) {
      if (hasOwn(b, key)) {
        a[key] = b[key];
      }
    }
  }
  function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  return extendShallow;
}
export {
  requireExtendShallow as r
};
