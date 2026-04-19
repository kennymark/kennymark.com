var pathParse = { exports: {} };
var hasRequiredPathParse;
function requirePathParse() {
  if (hasRequiredPathParse) return pathParse.exports;
  hasRequiredPathParse = 1;
  var isWindows = process.platform === "win32";
  var splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/;
  var win32 = {};
  function win32SplitPath(filename) {
    return splitWindowsRe.exec(filename).slice(1);
  }
  win32.parse = function(pathString) {
    if (typeof pathString !== "string") {
      throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
      );
    }
    var allParts = win32SplitPath(pathString);
    if (!allParts || allParts.length !== 5) {
      throw new TypeError("Invalid path '" + pathString + "'");
    }
    return {
      root: allParts[1],
      dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
      base: allParts[2],
      ext: allParts[4],
      name: allParts[3]
    };
  };
  var splitPathRe = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/;
  var posix = {};
  function posixSplitPath(filename) {
    return splitPathRe.exec(filename).slice(1);
  }
  posix.parse = function(pathString) {
    if (typeof pathString !== "string") {
      throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
      );
    }
    var allParts = posixSplitPath(pathString);
    if (!allParts || allParts.length !== 5) {
      throw new TypeError("Invalid path '" + pathString + "'");
    }
    return {
      root: allParts[1],
      dir: allParts[0].slice(0, -1),
      base: allParts[2],
      ext: allParts[4],
      name: allParts[3]
    };
  };
  if (isWindows)
    pathParse.exports = win32.parse;
  else
    pathParse.exports = posix.parse;
  pathParse.exports.posix = posix.parse;
  pathParse.exports.win32 = win32.parse;
  return pathParse.exports;
}
export {
  requirePathParse as r
};
