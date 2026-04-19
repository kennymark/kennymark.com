import { g as getDefaultExportFromCjs } from "./react.mjs";
var escapeStringRegexp$2;
var hasRequiredEscapeStringRegexp;
function requireEscapeStringRegexp() {
  if (hasRequiredEscapeStringRegexp) return escapeStringRegexp$2;
  hasRequiredEscapeStringRegexp = 1;
  escapeStringRegexp$2 = (string) => {
    if (typeof string !== "string") {
      throw new TypeError("Expected a string");
    }
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  };
  return escapeStringRegexp$2;
}
var escapeStringRegexpExports = requireEscapeStringRegexp();
const escapeStringRegexp$1 = /* @__PURE__ */ getDefaultExportFromCjs(escapeStringRegexpExports);
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
export {
  escapeStringRegexp as a,
  escapeStringRegexp$1 as e
};
