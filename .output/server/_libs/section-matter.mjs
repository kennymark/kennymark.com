import { r as requireKindOf } from "./kind-of.mjs";
import { r as requireExtendShallow } from "./extend-shallow.mjs";
var sectionMatter;
var hasRequiredSectionMatter;
function requireSectionMatter() {
  if (hasRequiredSectionMatter) return sectionMatter;
  hasRequiredSectionMatter = 1;
  var typeOf = requireKindOf();
  var extend = requireExtendShallow();
  sectionMatter = function(input, options) {
    if (typeof options === "function") {
      options = { parse: options };
    }
    var file = toObject(input);
    var defaults = { section_delimiter: "---", parse: identity };
    var opts = extend({}, defaults, options);
    var delim = opts.section_delimiter;
    var lines = file.content.split(/\r?\n/);
    var sections = null;
    var section = createSection();
    var content = [];
    var stack = [];
    function initSections(val) {
      file.content = val;
      sections = [];
      content = [];
    }
    function closeSection(val) {
      if (stack.length) {
        section.key = getKey(stack[0], delim);
        section.content = val;
        opts.parse(section, sections);
        sections.push(section);
        section = createSection();
        content = [];
        stack = [];
      }
    }
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var len = stack.length;
      var ln = line.trim();
      if (isDelimiter(ln, delim)) {
        if (ln.length === 3 && i !== 0) {
          if (len === 0 || len === 2) {
            content.push(line);
            continue;
          }
          stack.push(ln);
          section.data = content.join("\n");
          content = [];
          continue;
        }
        if (sections === null) {
          initSections(content.join("\n"));
        }
        if (len === 2) {
          closeSection(content.join("\n"));
        }
        stack.push(ln);
        continue;
      }
      content.push(line);
    }
    if (sections === null) {
      initSections(content.join("\n"));
    } else {
      closeSection(content.join("\n"));
    }
    file.sections = sections;
    return file;
  };
  function isDelimiter(line, delim) {
    if (line.slice(0, delim.length) !== delim) {
      return false;
    }
    if (line.charAt(delim.length + 1) === delim.slice(-1)) {
      return false;
    }
    return true;
  }
  function toObject(input) {
    if (typeOf(input) !== "object") {
      input = { content: input };
    }
    if (typeof input.content !== "string" && !isBuffer(input.content)) {
      throw new TypeError("expected a buffer or string");
    }
    input.content = input.content.toString();
    input.sections = [];
    return input;
  }
  function getKey(val, delim) {
    return val ? val.slice(delim.length).trim() : "";
  }
  function createSection() {
    return { key: "", data: "", content: "" };
  }
  function identity(val) {
    return val;
  }
  function isBuffer(val) {
    if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
      return val.constructor.isBuffer(val);
    }
    return false;
  }
  return sectionMatter;
}
export {
  requireSectionMatter as r
};
