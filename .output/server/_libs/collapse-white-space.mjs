const js = /\s+/g;
const html = /[\t\n\v\f\r ]+/g;
function collapseWhiteSpace(value, options) {
  if (!options) {
    options = {};
  } else if (typeof options === "string") {
    options = { style: options };
  }
  const replace = options.preserveLineEndings ? replaceLineEnding : replaceSpace;
  return String(value).replace(
    options.style === "html" ? html : js,
    options.trim ? trimFactory(replace) : replace
  );
}
function replaceLineEnding(value) {
  const match = /\r?\n|\r/.exec(value);
  return match ? match[0] : " ";
}
function replaceSpace() {
  return " ";
}
function trimFactory(replace) {
  return dropOrReplace;
  function dropOrReplace(value, index, all) {
    return index === 0 || index + value.length === all.length ? "" : replace(value);
  }
}
export {
  collapseWhiteSpace as c
};
