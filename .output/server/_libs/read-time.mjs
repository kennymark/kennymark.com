import { g as getDefaultExportFromCjs } from "./react.mjs";
var readTime_1;
var hasRequiredReadTime$1;
function requireReadTime$1() {
  if (hasRequiredReadTime$1) return readTime_1;
  hasRequiredReadTime$1 = 1;
  var slice = Array.prototype.slice;
  var extend = function(target) {
    slice.call(arguments, 1).forEach(function(obj) {
      if (obj) {
        for (var key in obj) {
          target[key] = obj[key];
        }
      }
    });
    return target;
  };
  var pluralize = function(word, count) {
    return word + (count > 1 ? "s" : "");
  };
  var DEFAULT_OPTIONS = {
    WPM: 200,
    lessThanAMinute: "Less than a minute"
  };
  var CURRENT_OPTIONS = {};
  var readTime2 = function(input, options) {
    var runTimeOptions = {};
    extend(runTimeOptions, CURRENT_OPTIONS, options);
    var wordCount = input.replace(/[-*\s\n]+/gm, " ").split(/\s/).length;
    var minutes = Math.floor(wordCount / runTimeOptions.WPM);
    var seconds = Math.floor(wordCount % runTimeOptions.WPM / (runTimeOptions.WPM / 60));
    var text = "";
    if (minutes < 1) {
      text += runTimeOptions.lessThanAMinute;
    } else {
      text += minutes + " " + pluralize("minute", minutes);
      if (seconds > 0) {
        text += " " + seconds + " " + pluralize("second", seconds);
      }
    }
    return {
      "text": text,
      "words": wordCount,
      "m": minutes,
      "s": seconds
    };
  };
  readTime2.defaults = function(options) {
    extend(CURRENT_OPTIONS, options);
    return readTime2;
  };
  readTime2.reset = function() {
    CURRENT_OPTIONS = {};
    extend(CURRENT_OPTIONS, DEFAULT_OPTIONS);
    return readTime2;
  };
  readTime2.reset();
  readTime_1 = readTime2;
  return readTime_1;
}
var readTime;
var hasRequiredReadTime;
function requireReadTime() {
  if (hasRequiredReadTime) return readTime;
  hasRequiredReadTime = 1;
  readTime = requireReadTime$1();
  return readTime;
}
var readTimeExports = requireReadTime();
const timeRead = /* @__PURE__ */ getDefaultExportFromCjs(readTimeExports);
export {
  timeRead as t
};
