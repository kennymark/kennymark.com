const startRe = /[$_\p{ID_Start}]/u;
const contRe = /[$_\u{200C}\u{200D}\p{ID_Continue}]/u;
const contReJsx = /[-$_\u{200C}\u{200D}\p{ID_Continue}]/u;
const nameRe = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
const nameReJsx = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
const emptyOptions = {};
function start(code) {
  return code ? startRe.test(String.fromCodePoint(code)) : false;
}
function cont(code, options) {
  const settings = options || emptyOptions;
  const re = settings.jsx ? contReJsx : contRe;
  return code ? re.test(String.fromCodePoint(code)) : false;
}
function name(name2, options) {
  const settings = options || emptyOptions;
  const re = settings.jsx ? nameReJsx : nameRe;
  return re.test(name2);
}
export {
  cont as c,
  name as n,
  start as s
};
