import { g as getDefaultExportFromCjs } from "./react.mjs";
import require$$0 from "fs";
import require$$1$1 from "os";
import require$$2 from "path";
import { r as requireEsErrors, a as requireType } from "./es-errors.mjs";
import { r as requirePathParse } from "./path-parse.mjs";
import { r as requireIsCoreModule } from "./is-core-module.mjs";
var homedir;
var hasRequiredHomedir;
function requireHomedir() {
  if (hasRequiredHomedir) return homedir;
  hasRequiredHomedir = 1;
  var os2 = require$$1$1;
  homedir = os2.homedir || function homedir2() {
    var home = process.env.HOME;
    var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
    if (process.platform === "win32") {
      return process.env.USERPROFILE || process.env.HOMEDRIVE && process.env.HOMEPATH && process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
    }
    if (process.platform === "darwin") {
      return home || (user ? "/Users/" + user : null);
    }
    if (process.platform === "linux") {
      return home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null);
    }
    return home || null;
  };
  return homedir;
}
var caller;
var hasRequiredCaller;
function requireCaller() {
  if (hasRequiredCaller) return caller;
  hasRequiredCaller = 1;
  var $Error = /* @__PURE__ */ requireEsErrors();
  caller = function() {
    var origPrepareStackTrace = $Error.prepareStackTrace;
    $Error.prepareStackTrace = function(_, stack2) {
      return stack2;
    };
    var stack = new $Error().stack;
    $Error.prepareStackTrace = origPrepareStackTrace;
    return stack[2].getFileName();
  };
  return caller;
}
var nodeModulesPaths;
var hasRequiredNodeModulesPaths;
function requireNodeModulesPaths() {
  if (hasRequiredNodeModulesPaths) return nodeModulesPaths;
  hasRequiredNodeModulesPaths = 1;
  var path2 = require$$2;
  var parse = path2.parse || requirePathParse();
  var driveLetterRegex = /^([A-Za-z]:)/;
  var uncPathRegex = /^\\\\/;
  function getNodeModulesDirs(absoluteStart, modules) {
    var prefix = "/";
    if (driveLetterRegex.test(absoluteStart)) {
      prefix = "";
    } else if (uncPathRegex.test(absoluteStart)) {
      prefix = "\\\\";
    }
    var paths = [absoluteStart];
    var parsed = parse(absoluteStart);
    while (parsed.dir !== paths[paths.length - 1]) {
      paths.push(parsed.dir);
      parsed = parse(parsed.dir);
    }
    return paths.reduce(function(dirs, aPath) {
      return dirs.concat(modules.map(function(moduleDir) {
        return path2.resolve(prefix, aPath, moduleDir);
      }));
    }, []);
  }
  nodeModulesPaths = function nodeModulesPaths2(start, opts, request) {
    var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : ["node_modules"];
    if (opts && typeof opts.paths === "function") {
      return opts.paths(
        request,
        start,
        function() {
          return getNodeModulesDirs(start, modules);
        },
        opts
      );
    }
    var dirs = getNodeModulesDirs(start, modules);
    return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
  };
  return nodeModulesPaths;
}
var normalizeOptions;
var hasRequiredNormalizeOptions;
function requireNormalizeOptions() {
  if (hasRequiredNormalizeOptions) return normalizeOptions;
  hasRequiredNormalizeOptions = 1;
  normalizeOptions = function(x, opts) {
    return opts || {};
  };
  return normalizeOptions;
}
var async;
var hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync) return async;
  hasRequiredAsync = 1;
  var fs2 = require$$0;
  var getHomedir = requireHomedir();
  var path2 = require$$2;
  var caller2 = requireCaller();
  var nodeModulesPaths2 = requireNodeModulesPaths();
  var normalizeOptions2 = requireNormalizeOptions();
  var isCore2 = /* @__PURE__ */ requireIsCoreModule();
  var $Error = /* @__PURE__ */ requireEsErrors();
  var $TypeError = /* @__PURE__ */ requireType();
  var realpathFS = process.platform !== "win32" && fs2.realpath && typeof fs2.realpath.native === "function" ? fs2.realpath.native : fs2.realpath;
  var relativePathRegex = /^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/;
  var windowsDriveRegex = /^\w:[/\\]*$/;
  var nodeModulesRegex = /[/\\]node_modules[/\\]*$/;
  var homedir2 = getHomedir();
  function defaultPaths() {
    if (!homedir2) return [];
    return [
      path2.join(homedir2, ".node_modules"),
      path2.join(homedir2, ".node_libraries")
    ];
  }
  var defaultIsFile = function isFile(file, cb) {
    fs2.stat(file, function(err, stat) {
      if (!err) {
        return cb(null, stat.isFile() || stat.isFIFO());
      }
      if (err.code === "ENOENT" || err.code === "ENOTDIR") return cb(null, false);
      return cb(err);
    });
  };
  var defaultIsDir = function isDirectory(dir, cb) {
    fs2.stat(dir, function(err, stat) {
      if (!err) {
        return cb(null, stat.isDirectory());
      }
      if (err.code === "ENOENT" || err.code === "ENOTDIR") return cb(null, false);
      return cb(err);
    });
  };
  var defaultRealpath = function realpath(x, cb) {
    realpathFS(x, function(realpathErr, realPath) {
      if (realpathErr && realpathErr.code !== "ENOENT") cb(realpathErr);
      else cb(null, realpathErr ? x : realPath);
    });
  };
  function maybeRealpath(realpath, x, opts, cb) {
    if (opts && opts.preserveSymlinks === false) {
      realpath(x, cb);
    } else {
      cb(null, x);
    }
  }
  function defaultReadPackage(readFile, pkgfile, cb) {
    readFile(pkgfile, function(readFileErr, body) {
      if (readFileErr) cb(readFileErr);
      else {
        try {
          var pkg = JSON.parse(body);
          cb(null, pkg);
        } catch (jsonErr) {
          cb(null);
        }
      }
    });
  }
  function getPackageCandidates(x, start, opts) {
    var dirs = nodeModulesPaths2(start, opts, x);
    for (var i = 0; i < dirs.length; i++) {
      dirs[i] = path2.join(dirs[i], x);
    }
    return dirs;
  }
  async = function resolve2(x, options, callback) {
    var cb = callback;
    var opts = options;
    if (typeof options === "function") {
      cb = opts;
      opts = {};
    }
    if (typeof x !== "string") {
      var err = new $TypeError("Path must be a string.");
      return process.nextTick(function() {
        cb(err);
      });
    }
    opts = normalizeOptions2(x, opts);
    var isFile = opts.isFile || defaultIsFile;
    var isDirectory = opts.isDirectory || defaultIsDir;
    var readFile = opts.readFile || fs2.readFile;
    var realpath = opts.realpath || defaultRealpath;
    var readPackage = opts.readPackage || defaultReadPackage;
    if (opts.readFile && opts.readPackage) {
      var conflictErr = new $TypeError("`readFile` and `readPackage` are mutually exclusive.");
      return process.nextTick(function() {
        cb(conflictErr);
      });
    }
    var packageIterator = opts.packageIterator;
    var extensions = opts.extensions || [".js"];
    var includeCoreModules = opts.includeCoreModules !== false;
    var basedir = opts.basedir || path2.dirname(caller2());
    var parent = opts.filename || basedir;
    opts.paths = opts.paths || defaultPaths();
    var absoluteStart = path2.resolve(basedir);
    maybeRealpath(
      realpath,
      absoluteStart,
      opts,
      function(err2, realStart) {
        if (err2) cb(err2);
        else init(realStart);
      }
    );
    var res;
    function init(basedir2) {
      if (relativePathRegex.test(x)) {
        res = path2.resolve(basedir2, x);
        if (x === "." || x === ".." || x.slice(-1) === "/") res += "/";
        if (x.slice(-1) === "/" && res === basedir2) {
          loadAsDirectory(res, opts.package, onfile);
        } else loadAsFile(res, opts.package, onfile);
      } else if (includeCoreModules && isCore2(x)) {
        return cb(null, x);
      } else loadNodeModules(x, basedir2, function(err2, n, pkg) {
        if (err2) cb(err2);
        else if (n) {
          return maybeRealpath(realpath, n, opts, function(err3, realN) {
            if (err3) {
              cb(err3);
            } else {
              cb(null, realN, pkg);
            }
          });
        } else {
          var moduleError = new $Error("Cannot find module '" + x + "' from '" + parent + "'");
          moduleError.code = "MODULE_NOT_FOUND";
          cb(moduleError);
        }
      });
    }
    function onfile(err2, m, pkg) {
      if (err2) cb(err2);
      else if (m) cb(null, m, pkg);
      else loadAsDirectory(res, function(err3, d, pkg2) {
        if (err3) cb(err3);
        else if (d) {
          maybeRealpath(realpath, d, opts, function(err4, realD) {
            if (err4) {
              cb(err4);
            } else {
              cb(null, realD, pkg2);
            }
          });
        } else {
          var moduleError = new $Error("Cannot find module '" + x + "' from '" + parent + "'");
          moduleError.code = "MODULE_NOT_FOUND";
          cb(moduleError);
        }
      });
    }
    function loadAsFile(x2, thePackage, callback2) {
      var loadAsFilePackage = thePackage;
      var cb2 = callback2;
      if (typeof loadAsFilePackage === "function") {
        cb2 = loadAsFilePackage;
        loadAsFilePackage = void 0;
      }
      var exts = [""].concat(extensions);
      load(exts, x2, loadAsFilePackage);
      function load(exts2, x3, loadPackage) {
        if (exts2.length === 0) return cb2(null, void 0, loadPackage);
        var file = x3 + exts2[0];
        var pkg = loadPackage;
        if (pkg) onpkg(null, pkg);
        else loadpkg(path2.dirname(file), onpkg);
        function onpkg(err2, pkg_, dir) {
          pkg = pkg_;
          if (err2) return cb2(err2);
          if (dir && pkg && opts.pathFilter) {
            var rfile = path2.relative(dir, file);
            var rel = rfile.slice(0, rfile.length - exts2[0].length);
            var r = opts.pathFilter(pkg, x3, rel);
            if (r) return load(
              [""].concat(extensions),
              path2.resolve(dir, r),
              pkg
            );
          }
          isFile(file, onex);
        }
        function onex(err2, ex) {
          if (err2) return cb2(err2);
          if (ex) return cb2(null, file, pkg);
          load(exts2.slice(1), x3, pkg);
        }
      }
    }
    function loadpkg(dir, cb2) {
      if (dir === "" || dir === "/") return cb2(null);
      if (process.platform === "win32" && windowsDriveRegex.test(dir)) {
        return cb2(null);
      }
      if (nodeModulesRegex.test(dir)) return cb2(null);
      maybeRealpath(realpath, dir, opts, function(unwrapErr, pkgdir) {
        if (unwrapErr) return loadpkg(path2.dirname(dir), cb2);
        var pkgfile = path2.join(pkgdir, "package.json");
        isFile(pkgfile, function(err2, ex) {
          if (!ex) return loadpkg(path2.dirname(dir), cb2);
          readPackage(readFile, pkgfile, function(err3, pkgParam) {
            if (err3) {
              return cb2(err3);
            }
            var pkg = pkgParam;
            if (pkg && opts.packageFilter) {
              pkg = opts.packageFilter(pkg, pkgfile);
            }
            cb2(null, pkg, dir);
          });
        });
      });
    }
    function loadAsDirectory(x2, loadAsDirectoryPackage, callback2) {
      var cb2 = callback2;
      var fpkg = loadAsDirectoryPackage;
      if (typeof fpkg === "function") {
        cb2 = fpkg;
        fpkg = opts.package;
      }
      maybeRealpath(realpath, x2, opts, function(unwrapErr, pkgdir) {
        if (unwrapErr) return cb2(unwrapErr);
        var pkgfile = path2.join(pkgdir, "package.json");
        isFile(pkgfile, function(err2, ex) {
          if (err2) return cb2(err2);
          if (!ex) return loadAsFile(path2.join(x2, "index"), fpkg, cb2);
          readPackage(readFile, pkgfile, function(err3, pkgParam) {
            if (err3) return cb2(err3);
            var pkg = pkgParam;
            if (pkg && opts.packageFilter) {
              pkg = opts.packageFilter(pkg, pkgfile);
            }
            if (pkg && pkg.main) {
              if (typeof pkg.main !== "string") {
                var mainError = new $TypeError("package “" + pkg.name + "” `main` must be a string");
                mainError.code = "INVALID_PACKAGE_MAIN";
                return cb2(mainError);
              }
              if (pkg.main === "." || pkg.main === "./") {
                pkg.main = "index";
              }
              loadAsFile(path2.resolve(x2, pkg.main), pkg, function(err4, m, pkg2) {
                if (err4) return cb2(err4);
                if (m) return cb2(null, m, pkg2);
                if (!pkg2) return loadAsFile(path2.join(x2, "index"), pkg2, cb2);
                var dir = path2.resolve(x2, pkg2.main);
                loadAsDirectory(dir, pkg2, function(err5, n, pkg3) {
                  if (err5) return cb2(err5);
                  if (n) return cb2(null, n, pkg3);
                  loadAsFile(path2.join(x2, "index"), pkg3, cb2);
                });
              });
              return;
            }
            loadAsFile(path2.join(x2, "/index"), pkg, cb2);
          });
        });
      });
    }
    function processDirs(cb2, dirs) {
      if (dirs.length === 0) return cb2(null, void 0);
      var dir = dirs[0];
      isDirectory(path2.dirname(dir), isdir);
      function isdir(err2, isdir2) {
        if (err2) return cb2(err2);
        if (!isdir2) return processDirs(cb2, dirs.slice(1));
        loadAsFile(dir, opts.package, onfile2);
      }
      function onfile2(err2, m, pkg) {
        if (err2) return cb2(err2);
        if (m) return cb2(null, m, pkg);
        loadAsDirectory(dir, opts.package, ondir);
      }
      function ondir(err2, n, pkg) {
        if (err2) return cb2(err2);
        if (n) return cb2(null, n, pkg);
        processDirs(cb2, dirs.slice(1));
      }
    }
    function loadNodeModules(x2, start, cb2) {
      var thunk = function() {
        return getPackageCandidates(x2, start, opts);
      };
      processDirs(
        cb2,
        packageIterator ? packageIterator(x2, start, thunk, opts) : thunk()
      );
    }
  };
  return async;
}
const assert = true;
const async_hooks = ">= 8";
const buffer_ieee754 = ">= 0.5 && < 0.9.7";
const buffer = true;
const child_process = true;
const cluster = ">= 0.5";
const console = true;
const constants = true;
const crypto = true;
const _debug_agent = ">= 1 && < 8";
const _debugger = "< 8";
const dgram = true;
const diagnostics_channel = [">= 14.17 && < 15", ">= 15.1"];
const dns = true;
const domain = ">= 0.7.12";
const events = true;
const freelist = "< 6";
const fs = true;
const _http_agent = ">= 0.11.1";
const _http_client = ">= 0.11.1";
const _http_common = ">= 0.11.1";
const _http_incoming = ">= 0.11.1";
const _http_outgoing = ">= 0.11.1";
const _http_server = ">= 0.11.1";
const http = true;
const http2 = ">= 8.8";
const https = true;
const inspector = ">= 8";
const _linklist = "< 8";
const module$1 = true;
const net = true;
const os = true;
const path = true;
const perf_hooks = ">= 8.5";
const process$1 = ">= 1";
const punycode = ">= 0.5";
const querystring = true;
const readline = true;
const repl = true;
const smalloc = ">= 0.11.5 && < 3";
const _stream_duplex = ">= 0.9.4";
const _stream_transform = ">= 0.9.4";
const _stream_wrap = ">= 1.4.1";
const _stream_passthrough = ">= 0.9.4";
const _stream_readable = ">= 0.9.4";
const _stream_writable = ">= 0.9.4";
const stream = true;
const string_decoder = true;
const sys = [">= 0.4 && < 0.7", ">= 0.8"];
const timers = true;
const _tls_common = ">= 0.11.13";
const _tls_legacy = ">= 0.11.3 && < 10";
const _tls_wrap = ">= 0.11.3";
const tls = true;
const trace_events = ">= 10";
const tty = true;
const url = true;
const util = true;
const v8 = ">= 1";
const vm = true;
const wasi = [">= 13.4 && < 13.5", ">= 18.17 && < 19", ">= 20"];
const worker_threads = ">= 11.7";
const zlib = ">= 0.5";
const require$$1 = {
  assert,
  "node:assert": [">= 14.18 && < 15", ">= 16"],
  "assert/strict": ">= 15",
  "node:assert/strict": ">= 16",
  async_hooks,
  "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
  buffer_ieee754,
  buffer,
  "node:buffer": [">= 14.18 && < 15", ">= 16"],
  child_process,
  "node:child_process": [">= 14.18 && < 15", ">= 16"],
  cluster,
  "node:cluster": [">= 14.18 && < 15", ">= 16"],
  console,
  "node:console": [">= 14.18 && < 15", ">= 16"],
  constants,
  "node:constants": [">= 14.18 && < 15", ">= 16"],
  crypto,
  "node:crypto": [">= 14.18 && < 15", ">= 16"],
  _debug_agent,
  _debugger,
  dgram,
  "node:dgram": [">= 14.18 && < 15", ">= 16"],
  diagnostics_channel,
  "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
  dns,
  "node:dns": [">= 14.18 && < 15", ">= 16"],
  "dns/promises": ">= 15",
  "node:dns/promises": ">= 16",
  domain,
  "node:domain": [">= 14.18 && < 15", ">= 16"],
  events,
  "node:events": [">= 14.18 && < 15", ">= 16"],
  freelist,
  fs,
  "node:fs": [">= 14.18 && < 15", ">= 16"],
  "fs/promises": [">= 10 && < 10.1", ">= 14"],
  "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
  _http_agent,
  "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
  _http_client,
  "node:_http_client": [">= 14.18 && < 15", ">= 16"],
  _http_common,
  "node:_http_common": [">= 14.18 && < 15", ">= 16"],
  _http_incoming,
  "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
  _http_outgoing,
  "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
  _http_server,
  "node:_http_server": [">= 14.18 && < 15", ">= 16"],
  http,
  "node:http": [">= 14.18 && < 15", ">= 16"],
  http2,
  "node:http2": [">= 14.18 && < 15", ">= 16"],
  https,
  "node:https": [">= 14.18 && < 15", ">= 16"],
  inspector,
  "node:inspector": [">= 14.18 && < 15", ">= 16"],
  "inspector/promises": [">= 19"],
  "node:inspector/promises": [">= 19"],
  _linklist,
  module: module$1,
  "node:module": [">= 14.18 && < 15", ">= 16"],
  net,
  "node:net": [">= 14.18 && < 15", ">= 16"],
  "node-inspect/lib/_inspect": ">= 7.6 && < 12",
  "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
  "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
  os,
  "node:os": [">= 14.18 && < 15", ">= 16"],
  path,
  "node:path": [">= 14.18 && < 15", ">= 16"],
  "path/posix": ">= 15.3",
  "node:path/posix": ">= 16",
  "path/win32": ">= 15.3",
  "node:path/win32": ">= 16",
  perf_hooks,
  "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
  process: process$1,
  "node:process": [">= 14.18 && < 15", ">= 16"],
  punycode,
  "node:punycode": [">= 14.18 && < 15", ">= 16"],
  querystring,
  "node:querystring": [">= 14.18 && < 15", ">= 16"],
  readline,
  "node:readline": [">= 14.18 && < 15", ">= 16"],
  "readline/promises": ">= 17",
  "node:readline/promises": ">= 17",
  repl,
  "node:repl": [">= 14.18 && < 15", ">= 16"],
  "node:sea": [">= 20.12 && < 21", ">= 21.7"],
  smalloc,
  "node:sqlite": [">= 22.13 && < 23", ">= 23.4"],
  _stream_duplex,
  "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
  _stream_transform,
  "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
  _stream_wrap,
  "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
  _stream_passthrough,
  "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
  _stream_readable,
  "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
  _stream_writable,
  "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
  stream,
  "node:stream": [">= 14.18 && < 15", ">= 16"],
  "stream/consumers": ">= 16.7",
  "node:stream/consumers": ">= 16.7",
  "stream/promises": ">= 15",
  "node:stream/promises": ">= 16",
  "stream/web": ">= 16.5",
  "node:stream/web": ">= 16.5",
  string_decoder,
  "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
  sys,
  "node:sys": [">= 14.18 && < 15", ">= 16"],
  "test/reporters": ">= 19.9 && < 20.2",
  "node:test/reporters": [">= 18.17 && < 19", ">= 19.9", ">= 20"],
  "test/mock_loader": ">= 22.3 && < 22.7",
  "node:test/mock_loader": ">= 22.3 && < 22.7",
  "node:test": [">= 16.17 && < 17", ">= 18"],
  timers,
  "node:timers": [">= 14.18 && < 15", ">= 16"],
  "timers/promises": ">= 15",
  "node:timers/promises": ">= 16",
  _tls_common,
  "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
  _tls_legacy,
  _tls_wrap,
  "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
  tls,
  "node:tls": [">= 14.18 && < 15", ">= 16"],
  trace_events,
  "node:trace_events": [">= 14.18 && < 15", ">= 16"],
  tty,
  "node:tty": [">= 14.18 && < 15", ">= 16"],
  url,
  "node:url": [">= 14.18 && < 15", ">= 16"],
  util,
  "node:util": [">= 14.18 && < 15", ">= 16"],
  "util/types": ">= 15.3",
  "node:util/types": ">= 16",
  "v8/tools/arguments": ">= 10 && < 12",
  "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
  "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
  "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
  "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
  "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
  "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
  v8,
  "node:v8": [">= 14.18 && < 15", ">= 16"],
  vm,
  "node:vm": [">= 14.18 && < 15", ">= 16"],
  wasi,
  "node:wasi": [">= 18.17 && < 19", ">= 20"],
  worker_threads,
  "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
  zlib,
  "node:zlib": [">= 14.18 && < 15", ">= 16"]
};
var core_1;
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore) return core_1;
  hasRequiredCore = 1;
  var isCoreModule = /* @__PURE__ */ requireIsCoreModule();
  var data = require$$1;
  var core = {};
  for (var mod in data) {
    if (Object.prototype.hasOwnProperty.call(data, mod)) {
      core[mod] = isCoreModule(mod);
    }
  }
  core_1 = core;
  return core_1;
}
var isCore;
var hasRequiredIsCore;
function requireIsCore() {
  if (hasRequiredIsCore) return isCore;
  hasRequiredIsCore = 1;
  var isCoreModule = /* @__PURE__ */ requireIsCoreModule();
  isCore = function isCore2(x) {
    return isCoreModule(x);
  };
  return isCore;
}
var sync;
var hasRequiredSync;
function requireSync() {
  if (hasRequiredSync) return sync;
  hasRequiredSync = 1;
  var isCore2 = /* @__PURE__ */ requireIsCoreModule();
  var fs2 = require$$0;
  var path2 = require$$2;
  var $Error = /* @__PURE__ */ requireEsErrors();
  var $TypeError = /* @__PURE__ */ requireType();
  var getHomedir = requireHomedir();
  var caller2 = requireCaller();
  var nodeModulesPaths2 = requireNodeModulesPaths();
  var normalizeOptions2 = requireNormalizeOptions();
  var realpathFS = process.platform !== "win32" && fs2.realpathSync && typeof fs2.realpathSync.native === "function" ? fs2.realpathSync.native : fs2.realpathSync;
  var relativePathRegex = /^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/;
  var windowsDriveRegex = /^\w:[/\\]*$/;
  var nodeModulesRegex = /[/\\]node_modules[/\\]*$/;
  var homedir2 = getHomedir();
  function defaultPaths() {
    if (!homedir2) return [];
    return [
      path2.join(homedir2, ".node_modules"),
      path2.join(homedir2, ".node_libraries")
    ];
  }
  var defaultIsFile = function isFile(file) {
    try {
      var stat = fs2.statSync(file, { throwIfNoEntry: false });
    } catch (e) {
      if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) return false;
      throw e;
    }
    return !!stat && (stat.isFile() || stat.isFIFO());
  };
  var defaultIsDir = function isDirectory(dir) {
    try {
      var stat = fs2.statSync(dir, { throwIfNoEntry: false });
    } catch (e) {
      if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) return false;
      throw e;
    }
    return !!stat && stat.isDirectory();
  };
  var defaultRealpathSync = function realpathSync(x) {
    try {
      return realpathFS(x);
    } catch (realpathErr) {
      if (realpathErr.code !== "ENOENT") {
        throw realpathErr;
      }
    }
    return x;
  };
  function maybeRealpathSync(realpathSync, x, opts) {
    if (opts && opts.preserveSymlinks === false) {
      return realpathSync(x);
    }
    return x;
  }
  function defaultReadPackageSync(readFileSync, pkgfile) {
    var body = readFileSync(pkgfile);
    try {
      var pkg = JSON.parse(body);
      return pkg;
    } catch (jsonErr) {
    }
  }
  function getPackageCandidates(x, start, opts) {
    var dirs = nodeModulesPaths2(start, opts, x);
    for (var i = 0; i < dirs.length; i++) {
      dirs[i] = path2.join(dirs[i], x);
    }
    return dirs;
  }
  sync = function resolveSync(x, options) {
    if (typeof x !== "string") {
      throw new $TypeError("Path must be a string.");
    }
    var opts = normalizeOptions2(x, options);
    var isFile = opts.isFile || defaultIsFile;
    var readFileSync = opts.readFileSync || fs2.readFileSync;
    var isDirectory = opts.isDirectory || defaultIsDir;
    var realpathSync = opts.realpathSync || defaultRealpathSync;
    var readPackageSync = opts.readPackageSync || defaultReadPackageSync;
    if (opts.readFileSync && opts.readPackageSync) {
      throw new $TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
    }
    var packageIterator = opts.packageIterator;
    var extensions = opts.extensions || [".js"];
    var includeCoreModules = opts.includeCoreModules !== false;
    var basedir = opts.basedir || path2.dirname(caller2());
    var parent = opts.filename || basedir;
    opts.paths = opts.paths || defaultPaths();
    var absoluteStart = maybeRealpathSync(realpathSync, path2.resolve(basedir), opts);
    if (relativePathRegex.test(x)) {
      var res = path2.resolve(absoluteStart, x);
      if (x === "." || x === ".." || x.slice(-1) === "/") res += "/";
      var m = loadAsFileSync(res) || loadAsDirectorySync(res);
      if (m) return maybeRealpathSync(realpathSync, m, opts);
    } else if (includeCoreModules && isCore2(x)) {
      return x;
    } else {
      var n = loadNodeModulesSync(x, absoluteStart);
      if (n) return maybeRealpathSync(realpathSync, n, opts);
    }
    var err = new $Error("Cannot find module '" + x + "' from '" + parent + "'");
    err.code = "MODULE_NOT_FOUND";
    throw err;
    function loadAsFileSync(x2) {
      var pkg = loadpkg(path2.dirname(x2));
      if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
        var rfile = path2.relative(pkg.dir, x2);
        var r = opts.pathFilter(pkg.pkg, x2, rfile);
        if (r) {
          x2 = path2.resolve(pkg.dir, r);
        }
      }
      if (isFile(x2)) {
        return x2;
      }
      for (var i = 0; i < extensions.length; i++) {
        var file = x2 + extensions[i];
        if (isFile(file)) {
          return file;
        }
      }
    }
    function loadpkg(dir) {
      if (dir === "" || dir === "/") return;
      if (process.platform === "win32" && windowsDriveRegex.test(dir)) {
        return;
      }
      if (nodeModulesRegex.test(dir)) return;
      var pkgfile = path2.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
      if (!isFile(pkgfile)) {
        return loadpkg(path2.dirname(dir));
      }
      var pkg = readPackageSync(readFileSync, pkgfile);
      if (pkg && opts.packageFilter) {
        pkg = opts.packageFilter(
          pkg,
          /*pkgfile,*/
          dir
        );
      }
      return { pkg, dir };
    }
    function loadAsDirectorySync(x2) {
      var pkgfile = path2.join(maybeRealpathSync(realpathSync, x2, opts), "/package.json");
      if (isFile(pkgfile)) {
        try {
          var pkg = readPackageSync(readFileSync, pkgfile);
        } catch (e) {
        }
        if (pkg && opts.packageFilter) {
          pkg = opts.packageFilter(
            pkg,
            /*pkgfile,*/
            x2
          );
        }
        if (pkg && pkg.main) {
          if (typeof pkg.main !== "string") {
            var mainError = new $TypeError("package “" + pkg.name + "” `main` must be a string");
            mainError.code = "INVALID_PACKAGE_MAIN";
            throw mainError;
          }
          if (pkg.main === "." || pkg.main === "./") {
            pkg.main = "index";
          }
          try {
            var m2 = loadAsFileSync(path2.resolve(x2, pkg.main));
            if (m2) return m2;
            var n2 = loadAsDirectorySync(path2.resolve(x2, pkg.main));
            if (n2) return n2;
          } catch (e) {
          }
        }
      }
      return loadAsFileSync(path2.join(x2, "/index"));
    }
    function loadNodeModulesSync(x2, start) {
      var thunk = function() {
        return getPackageCandidates(x2, start, opts);
      };
      var dirs = packageIterator ? packageIterator(x2, start, thunk, opts) : thunk();
      for (var i = 0; i < dirs.length; i++) {
        var dir = dirs[i];
        if (isDirectory(path2.dirname(dir))) {
          var m2 = loadAsFileSync(dir);
          if (m2) return m2;
          var n2 = loadAsDirectorySync(dir);
          if (n2) return n2;
        }
      }
    }
  };
  return sync;
}
var resolve$1;
var hasRequiredResolve;
function requireResolve() {
  if (hasRequiredResolve) return resolve$1;
  hasRequiredResolve = 1;
  var async2 = requireAsync();
  async2.core = requireCore();
  async2.isCore = requireIsCore();
  async2.sync = requireSync();
  resolve$1 = async2;
  return resolve$1;
}
var resolveExports = requireResolve();
const resolve = /* @__PURE__ */ getDefaultExportFromCjs(resolveExports);
export {
  resolve as r
};
