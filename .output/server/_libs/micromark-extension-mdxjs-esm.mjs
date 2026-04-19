import { d as asciiAlpha, a as markdownLineEnding } from "./micromark-util-character.mjs";
import { e as eventsToAcorn } from "./micromark-util-events-to-acorn.mjs";
import { V as VFileMessage } from "./vfile-message.mjs";
import { p as positionFromEstree } from "./unist-util-position-from-estree+[...].mjs";
import { b as blankLine } from "./micromark-core-commonmark.mjs";
const blankLineBefore = {
  tokenize: tokenizeNextBlank,
  partial: true
};
const trouble = "https://github.com/micromark/micromark-extension-mdxjs-esm";
const allowedAcornTypes = /* @__PURE__ */ new Set(["ExportAllDeclaration", "ExportDefaultDeclaration", "ExportNamedDeclaration", "ImportDeclaration"]);
function mdxjsEsm(options) {
  const exportImportConstruct = {
    tokenize: tokenizeExportImport,
    concrete: true
  };
  if (!options || !options.acorn || !options.acorn.parse) {
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  }
  const acorn = options.acorn;
  const acornOptions = Object.assign({
    ecmaVersion: 2024,
    sourceType: "module"
  }, options.acornOptions, {
    locations: true
  });
  return {
    flow: {
      [101]: exportImportConstruct,
      [105]: exportImportConstruct
    }
  };
  function tokenizeExportImport(effects, ok, nok) {
    const self = this;
    const definedModuleSpecifiers = self.parser.definedModuleSpecifiers || (self.parser.definedModuleSpecifiers = []);
    const eventStart = this.events.length + 1;
    let buffer = "";
    return self.interrupt ? nok : start;
    function start(code) {
      if (self.now().column > 1) return nok(code);
      effects.enter("mdxjsEsm");
      effects.enter("mdxjsEsmData");
      effects.consume(code);
      buffer += String.fromCharCode(code);
      return word;
    }
    function word(code) {
      if (asciiAlpha(code)) {
        effects.consume(code);
        buffer += String.fromCharCode(code);
        return word;
      }
      if ((buffer === "import" || buffer === "export") && code === 32) {
        effects.consume(code);
        return inside;
      }
      return nok(code);
    }
    function inside(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("mdxjsEsmData");
        return lineStart(code);
      }
      effects.consume(code);
      return inside;
    }
    function lineStart(code) {
      if (code === null) {
        return atEnd(code);
      }
      if (markdownLineEnding(code)) {
        return effects.check(blankLineBefore, atEnd, continuationStart)(code);
      }
      effects.enter("mdxjsEsmData");
      return inside(code);
    }
    function continuationStart(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return lineStart;
    }
    function atEnd(code) {
      const result = eventsToAcorn(self.events.slice(eventStart), {
        acorn,
        acornOptions,
        tokenTypes: ["mdxjsEsmData"],
        prefix: definedModuleSpecifiers.length > 0 ? "var " + definedModuleSpecifiers.join(",") + "\n" : ""
      });
      if (result.error) {
        if (code !== null && result.swallow) {
          return continuationStart(code);
        }
        const error = new VFileMessage("Could not parse import/exports with acorn", {
          cause: result.error,
          place: {
            line: result.error.loc.line,
            column: result.error.loc.column + 1,
            offset: result.error.pos
          },
          ruleId: "acorn",
          source: "micromark-extension-mdxjs-esm"
        });
        error.url = trouble + "#could-not-parse-importexports-with-acorn";
        throw error;
      }
      if (definedModuleSpecifiers.length > 0) {
        result.estree.body.shift();
      }
      let index = -1;
      while (++index < result.estree.body.length) {
        const node = result.estree.body[index];
        if (!allowedAcornTypes.has(node.type)) {
          const error = new VFileMessage("Unexpected `" + node.type + "` in code: only import/exports are supported", {
            place: positionFromEstree(node),
            ruleId: "non-esm",
            source: "micromark-extension-mdxjs-esm"
          });
          error.url = trouble + "#unexpected-type-in-code-only-importexports-are-supported";
          throw error;
        }
        if (node.type === "ImportDeclaration" && !self.interrupt) {
          let index2 = -1;
          while (++index2 < node.specifiers.length) {
            const specifier = node.specifiers[index2];
            definedModuleSpecifiers.push(specifier.local.name);
          }
        }
      }
      Object.assign(effects.exit("mdxjsEsm"), options.addResult ? {
        estree: result.estree
      } : void 0);
      return ok(code);
    }
  }
}
function tokenizeNextBlank(effects, ok, nok) {
  return start;
  function start(code) {
    effects.enter("lineEndingBlank");
    effects.consume(code);
    effects.exit("lineEndingBlank");
    return effects.attempt(blankLine, ok, nok);
  }
}
export {
  mdxjsEsm as m
};
