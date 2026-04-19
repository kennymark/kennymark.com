var lib = {};
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  (function(exports$1) {
    var a = Object.defineProperty;
    var f = (e) => a(e, "__esModule", { value: true });
    var x = (e, o) => {
      f(e);
      for (var t in o) a(e, t, { get: o[t], enumerable: true });
    };
    x(exports$1, { default: () => M, globalExternals: () => p, globalExternalsWithRegExp: () => l });
    var i = (e) => {
      let { type: o = "esm", varName: t, namedExports: r = null, defaultExport: n = true } = typeof e == "string" ? { varName: e } : e;
      return { type: o, varName: t, namedExports: r, defaultExport: n };
    };
    var g = (e) => `module.exports = ${e};`;
    var c = (e, o, t) => {
      let r = t ? [`export default ${e};`] : [];
      if (o && o.length) {
        let n = [...new Set(o)].join(", ");
        r.push(`const { ${n} } = ${e};`), r.push(`export { ${n} };`);
      }
      return r.join(`
`);
    }, d = (e) => {
      let { type: o, varName: t, namedExports: r, defaultExport: n } = e;
      switch (o) {
        case "esm":
          return c(t, r, n);
        case "cjs":
          return g(t);
      }
    };
    var s = "global-externals", l = (e) => {
      let { modulePathFilter: o, getModuleInfo: t } = e;
      return { name: s, setup(r) {
        r.onResolve({ filter: o }, (n) => ({ path: n.path, namespace: s })), r.onLoad({ filter: /.*/, namespace: s }, (n) => {
          let m = n.path, u = i(t(m));
          return { contents: d(u) };
        });
      } };
    };
    var p = (e) => {
      let o = { modulePathFilter: new RegExp(`^(?:${Object.keys(e).join("|")})$`), getModuleInfo: (t) => e[t] };
      return l(o);
    };
    var M = p;
  })(lib);
  return lib;
}
export {
  requireLib as r
};
