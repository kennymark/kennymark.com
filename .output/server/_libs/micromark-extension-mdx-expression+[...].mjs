import { f as factoryMdxExpression } from "./micromark-factory-mdx-expression+[...].mjs";
import { f as factorySpace } from "./micromark-factory-space.mjs";
import { m as markdownSpace, a as markdownLineEnding } from "./micromark-util-character.mjs";
function mdxExpression(options) {
  const options_ = options || {};
  const addResult = options_.addResult;
  const acorn = options_.acorn;
  const spread = options_.spread;
  let allowEmpty = options_.allowEmpty;
  let acornOptions;
  if (allowEmpty === null || allowEmpty === void 0) {
    allowEmpty = true;
  }
  if (acorn) {
    if (!acorn.parseExpressionAt) {
      throw new Error("Expected a proper `acorn` instance passed in as `options.acorn`");
    }
    acornOptions = Object.assign({
      ecmaVersion: 2024,
      sourceType: "module"
    }, options_.acornOptions);
  } else if (options_.acornOptions || options_.addResult) {
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  }
  return {
    flow: {
      [123]: {
        name: "mdxFlowExpression",
        tokenize: tokenizeFlowExpression,
        concrete: true
      }
    },
    text: {
      [123]: {
        name: "mdxTextExpression",
        tokenize: tokenizeTextExpression
      }
    }
  };
  function tokenizeFlowExpression(effects, ok, nok) {
    const self = this;
    return start;
    function start(code) {
      return before(code);
    }
    function before(code) {
      return factoryMdxExpression.call(self, effects, after, "mdxFlowExpression", "mdxFlowExpressionMarker", "mdxFlowExpressionChunk", acorn, acornOptions, addResult, spread, allowEmpty)(code);
    }
    function after(code) {
      return markdownSpace(code) ? factorySpace(effects, end, "whitespace")(code) : end(code);
    }
    function end(code) {
      const lessThanValue = self.parser.constructs.flow[60];
      const constructs = Array.isArray(lessThanValue) ? lessThanValue : (
        /* c8 ignore next 3 -- always a list when normalized. */
        lessThanValue ? [lessThanValue] : []
      );
      const jsxTag = constructs.find(function(d) {
        return d.name === "mdxJsxFlowTag";
      });
      if (code === 60 && jsxTag) {
        return effects.attempt(jsxTag, end, nok)(code);
      }
      return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
    }
  }
  function tokenizeTextExpression(effects, ok) {
    const self = this;
    return start;
    function start(code) {
      return factoryMdxExpression.call(self, effects, ok, "mdxTextExpression", "mdxTextExpressionMarker", "mdxTextExpressionChunk", acorn, acornOptions, addResult, spread, allowEmpty, true)(code);
    }
  }
}
export {
  mdxExpression as m
};
