import require$$3 from "string_decoder";
import { r as requireInteropRequireDefault } from "./babel__runtime.mjs";
import require$$0 from "fs";
import require$$2 from "path";
import { r as requireGrayMatter } from "./gray-matter.mjs";
import { r as requireMain } from "./esbuild.mjs";
import { r as require$$6 } from "./esbuild-plugins__node-resolve.mjs";
import { r as requireLib } from "./@fal-works/esbuild-plugin-global-externals+[...].mjs";
import { r as requireDist$1 } from "./uuid.mjs";
import { a as requireReact$1, b as requireJsxRuntime } from "./react.mjs";
import { r as requireReactDom } from "./react-dom.mjs";
var dist = {};
var dirnameMessedUp;
var hasRequiredDirnameMessedUp;
function requireDirnameMessedUp() {
  if (hasRequiredDirnameMessedUp) return dirnameMessedUp;
  hasRequiredDirnameMessedUp = 1;
  dirnameMessedUp = !__dirname.includes("mdx-bundler");
  return dirnameMessedUp;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  var _interopRequireDefault = requireInteropRequireDefault();
  Object.defineProperty(dist, "__esModule", {
    value: true
  });
  dist.bundleMDX = bundleMDX;
  var _fs = _interopRequireDefault(require$$0);
  var _path = _interopRequireDefault(require$$2);
  var _string_decoder = require$$3;
  var _grayMatter = _interopRequireDefault(requireGrayMatter());
  var esbuild = _interopRequireWildcard(requireMain());
  var _nodeResolve = require$$6;
  var _esbuildPluginGlobalExternals = requireLib();
  var _uuid = /* @__PURE__ */ requireDist$1();
  var _dirnameMessedUp = _interopRequireDefault(requireDirnameMessedUp());
  function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) return null;
    var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function(e2) {
      return e2 ? t : r;
    })(e);
  }
  function _interopRequireWildcard(e, r) {
    if (e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) return t.get(e);
    var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
    }
    return n.default = e, t && t.set(e, n), n;
  }
  const {
    readFile,
    unlink
  } = _fs.default.promises;
  const defaultJSXConfig = {
    jsxLib: {
      varName: "React",
      package: "react"
    },
    jsxDom: {
      varName: "ReactDOM",
      package: "react-dom"
    },
    jsxRuntime: {
      varName: "_jsx_runtime",
      package: "react/jsx-runtime"
    }
  };
  async function bundleMDX({
    file,
    source,
    files = {},
    mdxOptions = (options) => options,
    esbuildOptions = (options) => options,
    globals = {},
    cwd = _path.default.join(process.cwd(), `__mdx_bundler_fake_dir__`),
    grayMatterOptions = (options) => options,
    bundleDirectory,
    bundlePath,
    jsxConfig = defaultJSXConfig
  }) {
    if (_dirnameMessedUp.default && !process.env.ESBUILD_BINARY_PATH) {
      console.warn(`mdx-bundler warning: esbuild maybe unable to find its binary, if your build fails you'll need to set ESBUILD_BINARY_PATH. Learn more: https://github.com/kentcdodds/mdx-bundler/blob/main/README.md#nextjs-esbuild-enoent`);
    }
    const [{
      default: mdxESBuild
    }, {
      default: remarkFrontmatter
    }, {
      default: remarkMdxFrontmatter
    }] = await Promise.all([import("./mdx-js__esbuild.mjs"), import("./remark-frontmatter.mjs"), import("./remark-mdx-frontmatter.mjs")]);
    let code, entryPath, matter;
    const absoluteFiles = {};
    const isWriting = typeof bundleDirectory === "string";
    if (typeof bundleDirectory !== typeof bundlePath) {
      throw new Error("When using `bundleDirectory` or `bundlePath` the other must be set.");
    }
    function isVFile(vfile) {
      return typeof vfile === "object" && vfile !== null && "value" in vfile;
    }
    if (typeof source === "string") {
      const gMatter = (0, _grayMatter.default)(source, grayMatterOptions({}));
      matter = gMatter;
      entryPath = _path.default.join(cwd, `./_mdx_bundler_entry_point-${(0, _uuid.v4)()}.mdx`);
      absoluteFiles[entryPath] = source;
    } else if (isVFile(source)) {
      const value = String(source.value);
      const gMatter = (0, _grayMatter.default)(value, grayMatterOptions({}));
      matter = gMatter;
      entryPath = source.path ? _path.default.isAbsolute(source.path) ? source.path : _path.default.join(source.cwd, source.path) : _path.default.join(cwd, `./_mdx_bundler_entry_point-${(0, _uuid.v4)()}.mdx`);
      absoluteFiles[entryPath] = value;
    } else if (typeof file === "string") {
      const gMatter = _grayMatter.default.read(file, grayMatterOptions({}));
      matter = gMatter;
      entryPath = file;
    } else {
      throw new Error("`source` or `file` must be defined");
    }
    for (const [filepath, fileCode] of Object.entries(files)) {
      absoluteFiles[_path.default.join(cwd, filepath)] = fileCode;
    }
    const inMemoryPlugin = {
      name: "inMemory",
      setup(build) {
        build.onResolve({
          filter: /.*/
        }, ({
          path: filePath,
          importer
        }) => {
          if (filePath === entryPath) {
            return {
              path: filePath,
              pluginData: {
                inMemory: true,
                contents: absoluteFiles[filePath]
              }
            };
          }
          const modulePath = _path.default.resolve(_path.default.dirname(importer), filePath);
          if (modulePath in absoluteFiles) {
            return {
              path: modulePath,
              pluginData: {
                inMemory: true,
                contents: absoluteFiles[modulePath]
              }
            };
          }
          for (const ext of [".js", ".ts", ".jsx", ".tsx", ".json", ".mdx"]) {
            const fullModulePath = `${modulePath}${ext}`;
            if (fullModulePath in absoluteFiles) {
              return {
                path: fullModulePath,
                pluginData: {
                  inMemory: true,
                  contents: absoluteFiles[fullModulePath]
                }
              };
            }
          }
          return {};
        });
        build.onLoad({
          filter: /.*/
        }, async ({
          path: filePath,
          pluginData
        }) => {
          if (pluginData === void 0 || !pluginData.inMemory) {
            return null;
          }
          const fileType = (_path.default.extname(filePath) || ".jsx").slice(1);
          const contents = absoluteFiles[filePath];
          if (fileType === "mdx") return null;
          let loader;
          if (build.initialOptions.loader && build.initialOptions.loader[`.${fileType}`]) {
            loader = build.initialOptions.loader[`.${fileType}`];
          } else {
            loader = /** @type import('esbuild').Loader */
            fileType;
          }
          return {
            contents,
            loader
          };
        });
      }
    };
    const buildOptions = esbuildOptions({
      entryPoints: [entryPath],
      write: isWriting,
      outdir: isWriting ? bundleDirectory : void 0,
      publicPath: isWriting ? bundlePath : void 0,
      absWorkingDir: cwd,
      define: {
        "process.env.NODE_ENV": JSON.stringify("production")
      },
      jsx: "automatic",
      jsxImportSource: jsxConfig.jsxLib.package,
      plugins: [
        (0, _esbuildPluginGlobalExternals.globalExternals)({
          ...globals,
          [jsxConfig.jsxLib.package]: {
            varName: jsxConfig.jsxLib.varName,
            type: "cjs"
          },
          [jsxConfig.jsxRuntime.package]: {
            varName: jsxConfig.jsxRuntime.varName,
            type: "cjs"
          },
          ...jsxConfig.jsxDom ? {
            [jsxConfig.jsxDom.package]: {
              varName: jsxConfig.jsxDom.varName,
              type: "cjs"
            }
          } : {}
        }),
        // eslint-disable-next-line new-cap
        (0, _nodeResolve.NodeResolvePlugin)({
          extensions: [".js", ".ts", ".jsx", ".tsx"],
          resolveOptions: {
            basedir: cwd
          }
        }),
        inMemoryPlugin,
        mdxESBuild(mdxOptions({
          remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, {
            name: "frontmatter"
          }]],
          jsxImportSource: jsxConfig.jsxLib.package
        }, matter.data))
      ],
      bundle: true,
      format: "iife",
      globalName: "Component",
      minify: true
    }, matter.data);
    const bundled = await esbuild.build(buildOptions);
    if (bundled.outputFiles) {
      const decoder = new _string_decoder.StringDecoder("utf8");
      code = decoder.write(Buffer.from(bundled.outputFiles[0].contents));
    } else if (buildOptions.outdir && buildOptions.write) {
      const entryFile = (
        /** @type {{entryPoints: string[]}} */
        buildOptions.entryPoints[0]
      );
      const fileName = _path.default.basename(entryFile).replace(/\.[^/.]+$/, ".js");
      code = (await readFile(_path.default.join(buildOptions.outdir, fileName))).toString();
      await unlink(_path.default.join(buildOptions.outdir, fileName));
    } else {
      throw new Error("You must either specify `write: false` or `write: true` and `outdir: '/path'` in your esbuild options");
    }
    return {
      code: `${code};return Component;`,
      frontmatter: matter.data,
      errors: bundled.errors,
      matter
    };
  }
  return dist;
}
var distExports = requireDist();
var client$1 = {};
var react = {};
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react;
  hasRequiredReact = 1;
  Object.defineProperty(react, "__esModule", {
    value: true
  });
  react.getMDXComponent = getMDXComponent;
  react.getMDXExport = getMDXExport;
  var React = _interopRequireWildcard(requireReact$1());
  var ReactDOM = _interopRequireWildcard(requireReactDom());
  var _jsx_runtime = _interopRequireWildcard(requireJsxRuntime());
  function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) return null;
    var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function(e2) {
      return e2 ? t : r;
    })(e);
  }
  function _interopRequireWildcard(e, r) {
    if (e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) return t.get(e);
    var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
    }
    return n.default = e, t && t.set(e, n), n;
  }
  function getMDXComponent(code, globals) {
    const mdxExport = getMDXExport(code, globals);
    return mdxExport.default;
  }
  function getMDXExport(code, globals) {
    const jsxGlobals = {
      React,
      ReactDOM,
      _jsx_runtime
    };
    const scope = {
      ...jsxGlobals,
      ...globals
    };
    const fn = new Function(...Object.keys(scope), code);
    return fn(...Object.values(scope));
  }
  return react;
}
var hasRequiredClient$1;
function requireClient$1() {
  if (hasRequiredClient$1) return client$1;
  hasRequiredClient$1 = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    var _react = requireReact();
    Object.keys(_react).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports$1 && exports$1[key] === _react[key]) return;
      Object.defineProperty(exports$1, key, {
        enumerable: true,
        get: function() {
          return _react[key];
        }
      });
    });
  })(client$1);
  return client$1;
}
var client;
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client;
  hasRequiredClient = 1;
  client = requireClient$1();
  return client;
}
var clientExports = requireClient();
export {
  clientExports as c,
  distExports as d
};
