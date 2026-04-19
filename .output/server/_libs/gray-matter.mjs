import require$$0 from "fs";
import { g as getDefaultExportFromCjs } from "./react.mjs";
import { r as requireSectionMatter } from "./section-matter.mjs";
import { r as requireJsYaml } from "./js-yaml.mjs";
import { r as requireStripBomString } from "./strip-bom-string.mjs";
import { r as requireKindOf } from "./kind-of.mjs";
var engines = { exports: {} };
var hasRequiredEngines;
function requireEngines() {
  if (hasRequiredEngines) return engines.exports;
  hasRequiredEngines = 1;
  (function(module, exports$1) {
    const yaml = requireJsYaml();
    const engines = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    };
    engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(obj, options2) {
        const opts = Object.assign({ replacer: null, space: 2 }, options2);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    };
    engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          if (wrap !== false) {
            str = "(function() {\nreturn " + str.trim() + ";\n}());";
          }
          return eval(str) || {};
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  })(engines);
  return engines.exports;
}
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  (function(exports$12) {
    const stripBom = requireStripBomString();
    const typeOf = requireKindOf();
    exports$12.define = function(obj, key, val) {
      Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
      });
    };
    exports$12.isBuffer = function(val) {
      return typeOf(val) === "buffer";
    };
    exports$12.isObject = function(val) {
      return typeOf(val) === "object";
    };
    exports$12.toBuffer = function(input) {
      return typeof input === "string" ? Buffer.from(input) : input;
    };
    exports$12.toString = function(input) {
      if (exports$12.isBuffer(input)) return stripBom(String(input));
      if (typeof input !== "string") {
        throw new TypeError("expected input to be a string or buffer");
      }
      return stripBom(input);
    };
    exports$12.arrayify = function(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports$12.startsWith = function(str2, substr, len) {
      if (typeof len !== "number") len = substr.length;
      return str2.slice(0, len) === substr;
    };
  })(utils);
  return utils;
}
var defaults;
var hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults) return defaults;
  hasRequiredDefaults = 1;
  const engines2 = requireEngines();
  const utils2 = requireUtils();
  defaults = function(options2) {
    const opts = Object.assign({}, options2);
    opts.delimiters = utils2.arrayify(opts.delims || opts.delimiters || "---");
    if (opts.delimiters.length === 1) {
      opts.delimiters.push(opts.delimiters[0]);
    }
    opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
    opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
    return opts;
  };
  return defaults;
}
var engine;
var hasRequiredEngine;
function requireEngine() {
  if (hasRequiredEngine) return engine;
  hasRequiredEngine = 1;
  engine = function(name, options2) {
    let engine2 = options2.engines[name] || options2.engines[aliase(name)];
    if (typeof engine2 === "undefined") {
      throw new Error('gray-matter engine "' + name + '" is not registered');
    }
    if (typeof engine2 === "function") {
      engine2 = { parse: engine2 };
    }
    return engine2;
  };
  function aliase(name) {
    switch (name.toLowerCase()) {
      case "js":
      case "javascript":
        return "javascript";
      case "coffee":
      case "coffeescript":
      case "cson":
        return "coffee";
      case "yaml":
      case "yml":
        return "yaml";
      default: {
        return name;
      }
    }
  }
  return engine;
}
var stringify;
var hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify;
  hasRequiredStringify = 1;
  const typeOf = requireKindOf();
  const getEngine = requireEngine();
  const defaults2 = requireDefaults();
  stringify = function(file, data, options2) {
    if (data == null && options2 == null) {
      switch (typeOf(file)) {
        case "object":
          data = file.data;
          options2 = {};
          break;
        case "string":
          return file;
        default: {
          throw new TypeError("expected file to be a string or object");
        }
      }
    }
    const str2 = file.content;
    const opts = defaults2(options2);
    if (data == null) {
      if (!opts.data) return file;
      data = opts.data;
    }
    const language = file.language || opts.language;
    const engine2 = getEngine(language, opts);
    if (typeof engine2.stringify !== "function") {
      throw new TypeError('expected "' + language + '.stringify" to be a function');
    }
    data = Object.assign({}, file.data, data);
    const open = opts.delimiters[0];
    const close = opts.delimiters[1];
    const matter2 = engine2.stringify(data, options2).trim();
    let buf = "";
    if (matter2 !== "{}") {
      buf = newline(open) + newline(matter2) + newline(close);
    }
    if (typeof file.excerpt === "string" && file.excerpt !== "") {
      if (str2.indexOf(file.excerpt.trim()) === -1) {
        buf += newline(file.excerpt) + newline(close);
      }
    }
    return buf + newline(str2);
  };
  function newline(str2) {
    return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
  }
  return stringify;
}
var excerpt;
var hasRequiredExcerpt;
function requireExcerpt() {
  if (hasRequiredExcerpt) return excerpt;
  hasRequiredExcerpt = 1;
  const defaults2 = requireDefaults();
  excerpt = function(file, options2) {
    const opts = defaults2(options2);
    if (file.data == null) {
      file.data = {};
    }
    if (typeof opts.excerpt === "function") {
      return opts.excerpt(file, opts);
    }
    const sep = file.data.excerpt_separator || opts.excerpt_separator;
    if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
      return file;
    }
    const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep || opts.delimiters[0];
    const idx = file.content.indexOf(delimiter);
    if (idx !== -1) {
      file.excerpt = file.content.slice(0, idx);
    }
    return file;
  };
  return excerpt;
}
var toFile;
var hasRequiredToFile;
function requireToFile() {
  if (hasRequiredToFile) return toFile;
  hasRequiredToFile = 1;
  const typeOf = requireKindOf();
  const stringify2 = requireStringify();
  const utils2 = requireUtils();
  toFile = function(file) {
    if (typeOf(file) !== "object") {
      file = { content: file };
    }
    if (typeOf(file.data) !== "object") {
      file.data = {};
    }
    if (file.contents && file.content == null) {
      file.content = file.contents;
    }
    utils2.define(file, "orig", utils2.toBuffer(file.content));
    utils2.define(file, "language", file.language || "");
    utils2.define(file, "matter", file.matter || "");
    utils2.define(file, "stringify", function(data, options2) {
      if (options2 && options2.language) {
        file.language = options2.language;
      }
      return stringify2(file, data, options2);
    });
    file.content = utils2.toString(file.content);
    file.isEmpty = false;
    file.excerpt = "";
    return file;
  };
  return toFile;
}
var parse;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse;
  hasRequiredParse = 1;
  const getEngine = requireEngine();
  const defaults2 = requireDefaults();
  parse = function(language, str2, options2) {
    const opts = defaults2(options2);
    const engine2 = getEngine(language, opts);
    if (typeof engine2.parse !== "function") {
      throw new TypeError('expected "' + language + '.parse" to be a function');
    }
    return engine2.parse(str2, opts);
  };
  return parse;
}
var grayMatter;
var hasRequiredGrayMatter;
function requireGrayMatter() {
  if (hasRequiredGrayMatter) return grayMatter;
  hasRequiredGrayMatter = 1;
  const fs = require$$0;
  const sections = requireSectionMatter();
  const defaults2 = requireDefaults();
  const stringify2 = requireStringify();
  const excerpt2 = requireExcerpt();
  const engines2 = requireEngines();
  const toFile2 = requireToFile();
  const parse2 = requireParse();
  const utils2 = requireUtils();
  function matter2(input, options2) {
    if (input === "") {
      return { data: {}, content: input, excerpt: "", orig: input };
    }
    let file = toFile2(input);
    const cached = matter2.cache[file.content];
    if (!options2) {
      if (cached) {
        file = Object.assign({}, cached);
        file.orig = cached.orig;
        return file;
      }
      matter2.cache[file.content] = file;
    }
    return parseMatter(file, options2);
  }
  function parseMatter(file, options2) {
    const opts = defaults2(options2);
    const open = opts.delimiters[0];
    const close = "\n" + opts.delimiters[1];
    let str2 = file.content;
    if (opts.language) {
      file.language = opts.language;
    }
    const openLen = open.length;
    if (!utils2.startsWith(str2, open, openLen)) {
      excerpt2(file, opts);
      return file;
    }
    if (str2.charAt(openLen) === open.slice(-1)) {
      return file;
    }
    str2 = str2.slice(openLen);
    const len = str2.length;
    const language = matter2.language(str2, opts);
    if (language.name) {
      file.language = language.name;
      str2 = str2.slice(language.raw.length);
    }
    let closeIndex = str2.indexOf(close);
    if (closeIndex === -1) {
      closeIndex = len;
    }
    file.matter = str2.slice(0, closeIndex);
    const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
    if (block === "") {
      file.isEmpty = true;
      file.empty = file.content;
      file.data = {};
    } else {
      file.data = parse2(file.language, file.matter, opts);
    }
    if (closeIndex === len) {
      file.content = "";
    } else {
      file.content = str2.slice(closeIndex + close.length);
      if (file.content[0] === "\r") {
        file.content = file.content.slice(1);
      }
      if (file.content[0] === "\n") {
        file.content = file.content.slice(1);
      }
    }
    excerpt2(file, opts);
    if (opts.sections === true || typeof opts.section === "function") {
      sections(file, opts.section);
    }
    return file;
  }
  matter2.engines = engines2;
  matter2.stringify = function(file, data, options2) {
    if (typeof file === "string") file = matter2(file, options2);
    return stringify2(file, data, options2);
  };
  matter2.read = function(filepath, options2) {
    const str2 = fs.readFileSync(filepath, "utf8");
    const file = matter2(str2, options2);
    file.path = filepath;
    return file;
  };
  matter2.test = function(str2, options2) {
    return utils2.startsWith(str2, defaults2(options2).delimiters[0]);
  };
  matter2.language = function(str2, options2) {
    const opts = defaults2(options2);
    const open = opts.delimiters[0];
    if (matter2.test(str2)) {
      str2 = str2.slice(open.length);
    }
    const language = str2.slice(0, str2.search(/\r?\n/));
    return {
      raw: language,
      name: language ? language.trim() : ""
    };
  };
  matter2.cache = {};
  matter2.clearCache = function() {
    matter2.cache = {};
  };
  grayMatter = matter2;
  return grayMatter;
}
var grayMatterExports = requireGrayMatter();
const matter = /* @__PURE__ */ getDefaultExportFromCjs(grayMatterExports);
export {
  matter as m,
  requireGrayMatter as r
};
