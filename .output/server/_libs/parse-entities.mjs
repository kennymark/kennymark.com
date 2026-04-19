import { c as characterEntitiesLegacy } from "./character-entities-legacy.mjs";
import { c as characterReferenceInvalid } from "./character-reference-invalid.mjs";
import { i as isDecimal } from "./is-decimal.mjs";
import { i as isHexadecimal } from "./is-hexadecimal.mjs";
import { i as isAlphanumerical } from "./is-alphanumerical.mjs";
import { d as decodeNamedCharacterReference } from "./decode-named-character-reference+[...].mjs";
const messages = [
  "",
  /* 1: Non terminated (named) */
  "Named character references must be terminated by a semicolon",
  /* 2: Non terminated (numeric) */
  "Numeric character references must be terminated by a semicolon",
  /* 3: Empty (named) */
  "Named character references cannot be empty",
  /* 4: Empty (numeric) */
  "Numeric character references cannot be empty",
  /* 5: Unknown (named) */
  "Named character references must be known",
  /* 6: Disallowed (numeric) */
  "Numeric character references cannot be disallowed",
  /* 7: Prohibited (numeric) */
  "Numeric character references cannot be outside the permissible Unicode range"
];
function parseEntities(value, options) {
  const settings = options || {};
  const additional = typeof settings.additional === "string" ? settings.additional.charCodeAt(0) : settings.additional;
  const result = [];
  let index = 0;
  let lines = -1;
  let queue = "";
  let point;
  let indent;
  if (settings.position) {
    if ("start" in settings.position || "indent" in settings.position) {
      indent = settings.position.indent;
      point = settings.position.start;
    } else {
      point = settings.position;
    }
  }
  let line = (point ? point.line : 0) || 1;
  let column = (point ? point.column : 0) || 1;
  let previous = now();
  let character;
  index--;
  while (++index <= value.length) {
    if (character === 10) {
      column = (indent ? indent[lines] : 0) || 1;
    }
    character = value.charCodeAt(index);
    if (character === 38) {
      const following = value.charCodeAt(index + 1);
      if (following === 9 || following === 10 || following === 12 || following === 32 || following === 38 || following === 60 || Number.isNaN(following) || additional && following === additional) {
        queue += String.fromCharCode(character);
        column++;
        continue;
      }
      const start = index + 1;
      let begin = start;
      let end = start;
      let type;
      if (following === 35) {
        end = ++begin;
        const following2 = value.charCodeAt(end);
        if (following2 === 88 || following2 === 120) {
          type = "hexadecimal";
          end = ++begin;
        } else {
          type = "decimal";
        }
      } else {
        type = "named";
      }
      let characterReferenceCharacters = "";
      let characterReference = "";
      let characters = "";
      const test = type === "named" ? isAlphanumerical : type === "decimal" ? isDecimal : isHexadecimal;
      end--;
      while (++end <= value.length) {
        const following2 = value.charCodeAt(end);
        if (!test(following2)) {
          break;
        }
        characters += String.fromCharCode(following2);
        if (type === "named" && characterEntitiesLegacy.includes(characters)) {
          characterReferenceCharacters = characters;
          characterReference = decodeNamedCharacterReference(characters);
        }
      }
      let terminated = value.charCodeAt(end) === 59;
      if (terminated) {
        end++;
        const namedReference = type === "named" ? decodeNamedCharacterReference(characters) : false;
        if (namedReference) {
          characterReferenceCharacters = characters;
          characterReference = namedReference;
        }
      }
      let diff = 1 + end - start;
      let reference = "";
      if (!terminated && settings.nonTerminated === false) ;
      else if (!characters) {
        if (type !== "named") {
          warning(4, diff);
        }
      } else if (type === "named") {
        if (terminated && !characterReference) {
          warning(5, 1);
        } else {
          if (characterReferenceCharacters !== characters) {
            end = begin + characterReferenceCharacters.length;
            diff = 1 + end - begin;
            terminated = false;
          }
          if (!terminated) {
            const reason = characterReferenceCharacters ? 1 : 3;
            if (settings.attribute) {
              const following2 = value.charCodeAt(end);
              if (following2 === 61) {
                warning(reason, diff);
                characterReference = "";
              } else if (isAlphanumerical(following2)) {
                characterReference = "";
              } else {
                warning(reason, diff);
              }
            } else {
              warning(reason, diff);
            }
          }
        }
        reference = characterReference;
      } else {
        if (!terminated) {
          warning(2, diff);
        }
        let referenceCode = Number.parseInt(
          characters,
          type === "hexadecimal" ? 16 : 10
        );
        if (prohibited(referenceCode)) {
          warning(7, diff);
          reference = String.fromCharCode(
            65533
            /* `�` */
          );
        } else if (referenceCode in characterReferenceInvalid) {
          warning(6, diff);
          reference = characterReferenceInvalid[referenceCode];
        } else {
          let output = "";
          if (disallowed(referenceCode)) {
            warning(6, diff);
          }
          if (referenceCode > 65535) {
            referenceCode -= 65536;
            output += String.fromCharCode(
              referenceCode >>> (10 & 1023) | 55296
            );
            referenceCode = 56320 | referenceCode & 1023;
          }
          reference = output + String.fromCharCode(referenceCode);
        }
      }
      if (reference) {
        flush();
        previous = now();
        index = end - 1;
        column += end - start + 1;
        result.push(reference);
        const next = now();
        next.offset++;
        if (settings.reference) {
          settings.reference.call(
            settings.referenceContext || void 0,
            reference,
            { start: previous, end: next },
            value.slice(start - 1, end)
          );
        }
        previous = next;
      } else {
        characters = value.slice(start - 1, end);
        queue += characters;
        column += characters.length;
        index = end - 1;
      }
    } else {
      if (character === 10) {
        line++;
        lines++;
        column = 0;
      }
      if (Number.isNaN(character)) {
        flush();
      } else {
        queue += String.fromCharCode(character);
        column++;
      }
    }
  }
  return result.join("");
  function now() {
    return {
      line,
      column,
      offset: index + ((point ? point.offset : 0) || 0)
    };
  }
  function warning(code, offset) {
    let position;
    if (settings.warning) {
      position = now();
      position.column += offset;
      position.offset += offset;
      settings.warning.call(
        settings.warningContext || void 0,
        messages[code],
        position,
        code
      );
    }
  }
  function flush() {
    if (queue) {
      result.push(queue);
      if (settings.text) {
        settings.text.call(settings.textContext || void 0, queue, {
          start: previous,
          end: now()
        });
      }
      queue = "";
    }
  }
}
function prohibited(code) {
  return code >= 55296 && code <= 57343 || code > 1114111;
}
function disallowed(code) {
  return code >= 1 && code <= 8 || code === 11 || code >= 13 && code <= 31 || code >= 127 && code <= 159 || code >= 64976 && code <= 65007 || (code & 65535) === 65535 || (code & 65535) === 65534;
}
export {
  parseEntities as p
};
