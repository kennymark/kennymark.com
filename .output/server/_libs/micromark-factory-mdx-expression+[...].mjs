import { f as factorySpace } from "./micromark-factory-space.mjs";
import { a as markdownLineEnding, m as markdownSpace } from "./micromark-util-character.mjs";
import { V as VFileMessage } from "./vfile-message.mjs";
import { e as eventsToAcorn } from "./micromark-util-events-to-acorn.mjs";
import { p as positionFromEstree } from "./unist-util-position-from-estree+[...].mjs";
const indentSize = 2;
const trouble = "https://github.com/micromark/micromark-extension-mdx-expression/tree/main/packages/micromark-extension-mdx-expression";
const unexpectedEndOfFileHash = "#unexpected-end-of-file-in-expression-expected-a-corresponding-closing-brace-for-";
const unexpectedLazyHash = "#unexpected-lazy-line-in-expression-in-container-expected-line-to-be-prefixed";
const nonSpreadHash = "#unexpected-type-in-code-expected-an-object-spread-spread";
const spreadExtraHash = "#unexpected-extra-content-in-spread-only-a-single-spread-is-supported";
const acornHash = "#could-not-parse-expression-with-acorn";
function factoryMdxExpression(effects, ok, type, markerType, chunkType, acorn, acornOptions, addResult, spread, allowEmpty, allowLazy) {
  const self = this;
  const eventStart = this.events.length + 3;
  let size = 0;
  let pointStart;
  let lastCrash;
  return start;
  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    pointStart = self.now();
    return before;
  }
  function before(code) {
    if (code === null) {
      if (lastCrash) throw lastCrash;
      const error = new VFileMessage("Unexpected end of file in expression, expected a corresponding closing brace for `{`", {
        place: self.now(),
        ruleId: "unexpected-eof",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + unexpectedEndOfFileHash;
      throw error;
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return eolAfter;
    }
    if (code === 125 && size === 0) {
      const next = acorn ? mdxExpressionParse.call(self, acorn, acornOptions, chunkType, eventStart, pointStart, allowEmpty || false, spread || false) : {
        type: "ok",
        estree: void 0
      };
      if (next.type === "ok") {
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        const token = effects.exit(type);
        if (addResult && next.estree) {
          Object.assign(token, {
            estree: next.estree
          });
        }
        return ok;
      }
      lastCrash = next.message;
      effects.enter(chunkType);
      effects.consume(code);
      return inside;
    }
    effects.enter(chunkType);
    return inside(code);
  }
  function inside(code) {
    if (code === 125 && size === 0 || code === null || markdownLineEnding(code)) {
      effects.exit(chunkType);
      return before(code);
    }
    if (code === 123 && !acorn) {
      size += 1;
    } else if (code === 125) {
      size -= 1;
    }
    effects.consume(code);
    return inside;
  }
  function eolAfter(code) {
    const now = self.now();
    if (now.line !== pointStart.line && !allowLazy && self.parser.lazy[now.line]) {
      const error = new VFileMessage("Unexpected lazy line in expression in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", {
        place: self.now(),
        ruleId: "unexpected-lazy",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + unexpectedLazyHash;
      throw error;
    }
    if (markdownSpace(code)) {
      return factorySpace(effects, before, "linePrefix", indentSize + 1)(code);
    }
    return before(code);
  }
}
function mdxExpressionParse(acorn, acornOptions, chunkType, eventStart, pointStart, allowEmpty, spread) {
  const result = eventsToAcorn(this.events.slice(eventStart), {
    acorn,
    tokenTypes: [chunkType],
    acornOptions,
    start: pointStart,
    expression: true,
    allowEmpty,
    prefix: spread ? "({" : "",
    suffix: spread ? "})" : ""
  });
  const estree = result.estree;
  if (spread && estree) {
    const head = estree.body[0];
    if (head.type !== "ExpressionStatement" || head.expression.type !== "ObjectExpression") {
      const place = positionFromEstree(head);
      const error = new VFileMessage("Unexpected `" + head.type + "` in code: expected an object spread (`{...spread}`)", {
        place: place.start,
        ruleId: "non-spread",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + nonSpreadHash;
      throw error;
    }
    if (head.expression.properties[1]) {
      const place = positionFromEstree(head.expression.properties[1]);
      const error = new VFileMessage("Unexpected extra content in spread: only a single spread is supported", {
        place: place.start,
        ruleId: "spread-extra",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + spreadExtraHash;
      throw error;
    }
    if (head.expression.properties[0] && head.expression.properties[0].type !== "SpreadElement") {
      const place = positionFromEstree(head.expression.properties[0]);
      const error = new VFileMessage("Unexpected `" + head.expression.properties[0].type + "` in code: only spread elements are supported", {
        place: place.start,
        ruleId: "non-spread",
        source: "micromark-extension-mdx-expression"
      });
      error.url = trouble + nonSpreadHash;
      throw error;
    }
  }
  if (result.error) {
    const error = new VFileMessage("Could not parse expression with acorn", {
      cause: result.error,
      place: {
        line: result.error.loc.line,
        column: result.error.loc.column + 1,
        offset: result.error.pos
      },
      ruleId: "acorn",
      source: "micromark-extension-mdx-expression"
    });
    error.url = trouble + acornHash;
    return {
      type: "nok",
      message: error
    };
  }
  return {
    type: "ok",
    estree
  };
}
export {
  factoryMdxExpression as f
};
