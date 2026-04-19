import { r as requireHasown } from "./hasown.mjs";
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
var isCoreModule;
var hasRequiredIsCoreModule;
function requireIsCoreModule() {
  if (hasRequiredIsCoreModule) return isCoreModule;
  hasRequiredIsCoreModule = 1;
  var hasOwn = /* @__PURE__ */ requireHasown();
  function specifierIncluded(current, specifier) {
    var nodeParts = current.split(".");
    var parts = specifier.split(" ");
    var op = parts.length > 1 ? parts[0] : "=";
    var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
    for (var i = 0; i < 3; ++i) {
      var cur = parseInt(nodeParts[i] || 0, 10);
      var ver = parseInt(versionParts[i] || 0, 10);
      if (cur === ver) {
        continue;
      }
      if (op === "<") {
        return cur < ver;
      }
      if (op === ">=") {
        return cur >= ver;
      }
      return false;
    }
    return op === ">=";
  }
  function matchesRange(current, range) {
    var specifiers = range.split(/ ?&& ?/);
    if (specifiers.length === 0) {
      return false;
    }
    for (var i = 0; i < specifiers.length; ++i) {
      if (!specifierIncluded(current, specifiers[i])) {
        return false;
      }
    }
    return true;
  }
  function versionIncluded(nodeVersion, specifierValue) {
    if (typeof specifierValue === "boolean") {
      return specifierValue;
    }
    var current = typeof nodeVersion === "undefined" ? process.versions && process.versions.node : nodeVersion;
    if (typeof current !== "string") {
      throw new TypeError(typeof nodeVersion === "undefined" ? "Unable to determine current node version" : "If provided, a valid node version is required");
    }
    if (specifierValue && typeof specifierValue === "object") {
      for (var i = 0; i < specifierValue.length; ++i) {
        if (matchesRange(current, specifierValue[i])) {
          return true;
        }
      }
      return false;
    }
    return matchesRange(current, specifierValue);
  }
  var data = require$$1;
  isCoreModule = function isCore(x, nodeVersion) {
    return hasOwn(data, x) && versionIncluded(nodeVersion, data[x]);
  };
  return isCoreModule;
}
export {
  requireIsCoreModule as r
};
