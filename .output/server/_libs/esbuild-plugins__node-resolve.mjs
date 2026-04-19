import { c as getAugmentedNamespace } from "./react.mjs";
import { e as escapeStringRegexp } from "./escape-string-regexp.mjs";
import require$$0 from "fs";
import { builtinModules } from "module";
import require$$2 from "path";
import { r as resolve } from "./resolve.mjs";
import { promisify } from "util";
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const NAME = "node-resolve";
const debug = require("debug")(NAME);
let pnpapi;
try {
  pnpapi = require("pnpapi");
} catch (_a) {
}
const promisifiedResolve = promisify(resolve);
const resolveAsync = (id, _b) => __awaiter(void 0, void 0, void 0, function* () {
  var { mainFields } = _b, _opts = __rest(_b, ["mainFields"]);
  function packageFilter(packageJSON) {
    if (!(mainFields === null || mainFields === void 0 ? void 0 : mainFields.length)) {
      return packageJSON;
    }
    for (let mainField of mainFields) {
      if (mainField === "main") {
        break;
      }
      const newMain = packageJSON[mainField];
      if (newMain && typeof newMain === "string") {
        debug(`set main to '${mainField}`);
        packageJSON["main"] = newMain;
        break;
      }
    }
    return packageJSON;
  }
  const opts = Object.assign({ preserveSymlinks: false, packageFilter }, _opts);
  const res = yield promisifiedResolve(id, opts);
  if (pnpapi && res && !res.includes("node_modules")) {
    try {
      const realPath = pnpapi.resolveVirtual(res);
      if (realPath) {
        return realPath;
      }
    } catch (_c) {
    }
  }
  return res;
});
function NodeResolvePlugin({ onNonResolved, namespace, extensions, onResolved, resolveOptions, mainFields, name = NAME, isExtensionRequiredInImportPath, resolveSynchronously }) {
  const builtinsSet = new Set(builtinModules);
  debug("setup");
  const filter = new RegExp("(" + extensions.map(escapeStringRegexp).join("|") + ")(\\?.*)?$");
  return {
    name,
    setup: function setup({ onLoad, onResolve }) {
      onLoad({ filter, namespace }, (args) => __awaiter(this, void 0, void 0, function* () {
        try {
          if (builtinsSet.has(args.path)) {
            return;
          }
          const contents = yield require$$0.promises.readFile(args.path);
          let resolveDir = require$$2.dirname(args.path);
          debug("onLoad");
          return {
            loader: "default",
            contents,
            resolveDir
          };
        } catch (e) {
          return null;
        }
      }));
      onResolve({ filter: isExtensionRequiredInImportPath ? filter : /.*/ }, function resolver(args) {
        return __awaiter(this, void 0, void 0, function* () {
          args.path = cleanUrl(args.path);
          if (builtinsSet.has(args.path)) {
            return null;
          }
          if (args.path.startsWith("data:")) {
            return null;
          }
          let resolved;
          try {
            const options = Object.assign({
              basedir: args.resolveDir,
              preserveSymlinks: false,
              extensions,
              mainFields
            }, resolveOptions);
            resolved = resolveSynchronously ? resolve.sync(args.path, options) : yield resolveAsync(args.path, options);
          } catch (e) {
            debug(`not resolved ${args.path}`);
            if (onNonResolved) {
              let res = yield onNonResolved(args.path, args.importer, e);
              return res || null;
            } else {
              return null;
            }
          }
          debug(`resolved '${resolved}'`);
          if (resolved && onResolved) {
            const res = yield onResolved(resolved, args.importer);
            if (typeof res === "string") {
              return {
                path: res,
                namespace
              };
            }
            if ((res === null || res === void 0 ? void 0 : res.path) != null || (res === null || res === void 0 ? void 0 : res.external) != null || (res === null || res === void 0 ? void 0 : res.namespace) != null || (res === null || res === void 0 ? void 0 : res.errors) != null) {
              return res;
            }
          }
          if (pnpapi && resolveSynchronously && resolved && !resolved.includes("node_modules")) {
            try {
              const realPath = pnpapi.resolveVirtual(resolved);
              if (realPath) {
                return { path: realPath, namespace };
              }
            } catch (_a) {
            }
          }
          if (resolved) {
            return {
              path: resolved,
              namespace
            };
          }
        });
      });
    }
  };
}
const queryRE = /\?.*$/;
const cleanUrl = (url) => url.replace(queryRE, "");
const esm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  NodeResolvePlugin,
  cleanUrl,
  default: NodeResolvePlugin,
  queryRE,
  resolveAsync
});
const require$$6 = /* @__PURE__ */ getAugmentedNamespace(esm);
export {
  require$$6 as r
};
