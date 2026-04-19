import { f as factoryMdxExpression } from "./micromark-factory-mdx-expression+[...].mjs";
import { b as markdownLineEndingOrSpace, a as markdownLineEnding, m as markdownSpace, u as unicodeWhitespace } from "./micromark-util-character.mjs";
import { V as VFileMessage } from "./vfile-message.mjs";
import { s as start, c as cont } from "./estree-util-is-identifier-name.mjs";
import { f as factorySpace } from "./micromark-factory-space.mjs";
const trouble = "https://github.com/micromark/micromark-extension-mdx-jsx";
function factoryTag(effects, ok, nok, acorn, acornOptions, addResult, allowLazy, tagType, tagMarkerType, tagClosingMarkerType, tagSelfClosingMarker, tagNameType, tagNamePrimaryType, tagNameMemberMarkerType, tagNameMemberType, tagNamePrefixMarkerType, tagNameLocalType, tagExpressionAttributeType, tagExpressionAttributeMarkerType, tagExpressionAttributeValueType, tagAttributeType, tagAttributeNameType, tagAttributeNamePrimaryType, tagAttributeNamePrefixMarkerType, tagAttributeNameLocalType, tagAttributeInitializerMarkerType, tagAttributeValueLiteralType, tagAttributeValueLiteralMarkerType, tagAttributeValueLiteralValueType, tagAttributeValueExpressionType, tagAttributeValueExpressionMarkerType, tagAttributeValueExpressionValueType) {
  const self = this;
  let returnState;
  let marker;
  return start$1;
  function start$1(code) {
    effects.enter(tagType);
    effects.enter(tagMarkerType);
    effects.consume(code);
    effects.exit(tagMarkerType);
    return startAfter;
  }
  function startAfter(code) {
    if (markdownLineEndingOrSpace(code)) {
      return nok(code);
    }
    returnState = nameBefore;
    return esWhitespaceStart(code);
  }
  function nameBefore(code) {
    if (code === 47) {
      effects.enter(tagClosingMarkerType);
      effects.consume(code);
      effects.exit(tagClosingMarkerType);
      returnState = closingTagNameBefore;
      return esWhitespaceStart;
    }
    if (code === 62) {
      return tagEnd(code);
    }
    if (code !== null && code >= 0 && start(code)) {
      effects.enter(tagNameType);
      effects.enter(tagNamePrimaryType);
      effects.consume(code);
      return primaryName;
    }
    crash(code, "before name", "a character that can start a name, such as a letter, `$`, or `_`" + (code === 33 ? " (note: to create a comment in MDX, use `{/* text */}`)" : ""));
  }
  function closingTagNameBefore(code) {
    if (code === 62) {
      return tagEnd(code);
    }
    if (code !== null && code >= 0 && start(code)) {
      effects.enter(tagNameType);
      effects.enter(tagNamePrimaryType);
      effects.consume(code);
      return primaryName;
    }
    crash(code, "before name", "a character that can start a name, such as a letter, `$`, or `_`" + (code === 42 || code === 47 ? " (note: JS comments in JSX tags are not supported in MDX)" : ""));
  }
  function primaryName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: true
    })) {
      effects.consume(code);
      return primaryName;
    }
    if (code === 46 || code === 47 || code === 58 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
      effects.exit(tagNamePrimaryType);
      returnState = primaryNameAfter;
      return esWhitespaceStart(code);
    }
    crash(code, "in name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (code === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function primaryNameAfter(code) {
    if (code === 46) {
      effects.enter(tagNameMemberMarkerType);
      effects.consume(code);
      effects.exit(tagNameMemberMarkerType);
      returnState = memberNameBefore;
      return esWhitespaceStart;
    }
    if (code === 58) {
      effects.enter(tagNamePrefixMarkerType);
      effects.consume(code);
      effects.exit(tagNamePrefixMarkerType);
      returnState = localNameBefore;
      return esWhitespaceStart;
    }
    if (code === 47 || code === 62 || code === 123 || code !== null && code >= 0 && start(code)) {
      effects.exit(tagNameType);
      return attributeBefore(code);
    }
    crash(code, "after name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function memberNameBefore(code) {
    if (code !== null && code >= 0 && start(code)) {
      effects.enter(tagNameMemberType);
      effects.consume(code);
      return memberName;
    }
    crash(code, "before member name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function memberName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: true
    })) {
      effects.consume(code);
      return memberName;
    }
    if (code === 46 || code === 47 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
      effects.exit(tagNameMemberType);
      returnState = memberNameAfter;
      return esWhitespaceStart(code);
    }
    crash(code, "in member name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (code === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function memberNameAfter(code) {
    if (code === 46) {
      effects.enter(tagNameMemberMarkerType);
      effects.consume(code);
      effects.exit(tagNameMemberMarkerType);
      returnState = memberNameBefore;
      return esWhitespaceStart;
    }
    if (code === 47 || code === 62 || code === 123 || code !== null && code >= 0 && start(code)) {
      effects.exit(tagNameType);
      return attributeBefore(code);
    }
    crash(code, "after member name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function localNameBefore(code) {
    if (code !== null && code >= 0 && start(code)) {
      effects.enter(tagNameLocalType);
      effects.consume(code);
      return localName;
    }
    crash(code, "before local name", "a character that can start a name, such as a letter, `$`, or `_`" + (code === 43 || code !== null && code > 46 && code < 58 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function localName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: true
    })) {
      effects.consume(code);
      return localName;
    }
    if (code === 47 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
      effects.exit(tagNameLocalType);
      returnState = localNameAfter;
      return esWhitespaceStart(code);
    }
    crash(code, "in local name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function localNameAfter(code) {
    if (code === 47 || code === 62 || code === 123 || code !== null && code >= 0 && start(code)) {
      effects.exit(tagNameType);
      return attributeBefore(code);
    }
    crash(code, "after local name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function attributeBefore(code) {
    if (code === 47) {
      effects.enter(tagSelfClosingMarker);
      effects.consume(code);
      effects.exit(tagSelfClosingMarker);
      returnState = selfClosing;
      return esWhitespaceStart;
    }
    if (code === 62) {
      return tagEnd(code);
    }
    if (code === 123) {
      return factoryMdxExpression.call(self, effects, attributeExpressionAfter, tagExpressionAttributeType, tagExpressionAttributeMarkerType, tagExpressionAttributeValueType, acorn, acornOptions, addResult, true, false, allowLazy)(code);
    }
    if (code !== null && code >= 0 && start(code)) {
      effects.enter(tagAttributeType);
      effects.enter(tagAttributeNameType);
      effects.enter(tagAttributeNamePrimaryType);
      effects.consume(code);
      return attributePrimaryName;
    }
    crash(code, "before attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function attributeExpressionAfter(code) {
    returnState = attributeBefore;
    return esWhitespaceStart(code);
  }
  function attributePrimaryName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: true
    })) {
      effects.consume(code);
      return attributePrimaryName;
    }
    if (code === 47 || code === 58 || code === 61 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
      effects.exit(tagAttributeNamePrimaryType);
      returnState = attributePrimaryNameAfter;
      return esWhitespaceStart(code);
    }
    crash(code, "in attribute name", "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
  }
  function attributePrimaryNameAfter(code) {
    if (code === 58) {
      effects.enter(tagAttributeNamePrefixMarkerType);
      effects.consume(code);
      effects.exit(tagAttributeNamePrefixMarkerType);
      returnState = attributeLocalNameBefore;
      return esWhitespaceStart;
    }
    if (code === 61) {
      effects.exit(tagAttributeNameType);
      effects.enter(tagAttributeInitializerMarkerType);
      effects.consume(code);
      effects.exit(tagAttributeInitializerMarkerType);
      returnState = attributeValueBefore;
      return esWhitespaceStart;
    }
    if (code === 47 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code) || code !== null && code >= 0 && start(code)) {
      effects.exit(tagAttributeNameType);
      effects.exit(tagAttributeType);
      returnState = attributeBefore;
      return esWhitespaceStart(code);
    }
    crash(code, "after attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function attributeLocalNameBefore(code) {
    if (code !== null && code >= 0 && start(code)) {
      effects.enter(tagAttributeNameLocalType);
      effects.consume(code);
      return attributeLocalName;
    }
    crash(code, "before local attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function attributeLocalName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: true
    })) {
      effects.consume(code);
      return attributeLocalName;
    }
    if (code === 47 || code === 61 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
      effects.exit(tagAttributeNameLocalType);
      effects.exit(tagAttributeNameType);
      returnState = attributeLocalNameAfter;
      return esWhitespaceStart(code);
    }
    crash(code, "in local attribute name", "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
  }
  function attributeLocalNameAfter(code) {
    if (code === 61) {
      effects.enter(tagAttributeInitializerMarkerType);
      effects.consume(code);
      effects.exit(tagAttributeInitializerMarkerType);
      returnState = attributeValueBefore;
      return esWhitespaceStart;
    }
    if (code === 47 || code === 62 || code === 123 || code !== null && code >= 0 && start(code)) {
      effects.exit(tagAttributeType);
      return attributeBefore(code);
    }
    crash(code, "after local attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function attributeValueBefore(code) {
    if (code === 34 || code === 39) {
      effects.enter(tagAttributeValueLiteralType);
      effects.enter(tagAttributeValueLiteralMarkerType);
      effects.consume(code);
      effects.exit(tagAttributeValueLiteralMarkerType);
      marker = code;
      return attributeValueQuotedStart;
    }
    if (code === 123) {
      return factoryMdxExpression.call(self, effects, attributeValueExpressionAfter, tagAttributeValueExpressionType, tagAttributeValueExpressionMarkerType, tagAttributeValueExpressionValueType, acorn, acornOptions, addResult, false, false, allowLazy)(code);
    }
    crash(code, "before attribute value", "a character that can start an attribute value, such as `\"`, `'`, or `{`" + (code === 60 ? " (note: to use an element or fragment as a prop value in MDX, use `{<element />}`)" : ""));
  }
  function attributeValueExpressionAfter(code) {
    effects.exit(tagAttributeType);
    returnState = attributeBefore;
    return esWhitespaceStart(code);
  }
  function attributeValueQuotedStart(code) {
    if (code === null) {
      crash(code, "in attribute value", "a corresponding closing quote `" + String.fromCodePoint(marker) + "`");
    }
    if (code === marker) {
      effects.enter(tagAttributeValueLiteralMarkerType);
      effects.consume(code);
      effects.exit(tagAttributeValueLiteralMarkerType);
      effects.exit(tagAttributeValueLiteralType);
      effects.exit(tagAttributeType);
      marker = void 0;
      returnState = attributeBefore;
      return esWhitespaceStart;
    }
    if (markdownLineEnding(code)) {
      returnState = attributeValueQuotedStart;
      return esWhitespaceStart(code);
    }
    effects.enter(tagAttributeValueLiteralValueType);
    return attributeValueQuoted(code);
  }
  function attributeValueQuoted(code) {
    if (code === null || code === marker || markdownLineEnding(code)) {
      effects.exit(tagAttributeValueLiteralValueType);
      return attributeValueQuotedStart(code);
    }
    effects.consume(code);
    return attributeValueQuoted;
  }
  function selfClosing(code) {
    if (code === 62) {
      return tagEnd(code);
    }
    crash(code, "after self-closing slash", "`>` to end the tag" + (code === 42 || code === 47 ? " (note: JS comments in JSX tags are not supported in MDX)" : ""));
  }
  function tagEnd(code) {
    effects.enter(tagMarkerType);
    effects.consume(code);
    effects.exit(tagMarkerType);
    effects.exit(tagType);
    return ok;
  }
  function esWhitespaceStart(code) {
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return esWhitespaceEolAfter;
    }
    if (markdownSpace(code) || unicodeWhitespace(code)) {
      effects.enter("esWhitespace");
      return esWhitespaceInside(code);
    }
    return returnState(code);
  }
  function esWhitespaceInside(code) {
    if (markdownLineEnding(code)) {
      effects.exit("esWhitespace");
      return esWhitespaceStart(code);
    }
    if (markdownSpace(code) || unicodeWhitespace(code)) {
      effects.consume(code);
      return esWhitespaceInside;
    }
    effects.exit("esWhitespace");
    return returnState(code);
  }
  function esWhitespaceEolAfter(code) {
    if (!allowLazy && self.parser.lazy[self.now().line]) {
      const error = new VFileMessage("Unexpected lazy line in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", self.now(), "micromark-extension-mdx-jsx:unexpected-lazy");
      error.url = trouble + "#unexpected-lazy-line-in-container-expected-line-to-be";
      throw error;
    }
    return esWhitespaceStart(code);
  }
  function crash(code, at, expect) {
    const error = new VFileMessage("Unexpected " + (code === null ? "end of file" : "character `" + (code === 96 ? "` ` `" : String.fromCodePoint(code)) + "` (" + serializeCharCode(code) + ")") + " " + at + ", expected " + expect, self.now(), "micromark-extension-mdx-jsx:unexpected-" + (code === null ? "eof" : "character"));
    error.url = trouble + (code === null ? "#unexpected-end-of-file-at-expected-expect" : "#unexpected-character-at-expected-expect");
    throw error;
  }
}
function serializeCharCode(code) {
  return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
}
function jsxText(acorn, options) {
  return {
    name: "mdxJsxTextTag",
    tokenize: tokenizeJsxText
  };
  function tokenizeJsxText(effects, ok, nok) {
    return factoryTag.call(this, effects, ok, nok, acorn, options.acornOptions, options.addResult, true, "mdxJsxTextTag", "mdxJsxTextTagMarker", "mdxJsxTextTagClosingMarker", "mdxJsxTextTagSelfClosingMarker", "mdxJsxTextTagName", "mdxJsxTextTagNamePrimary", "mdxJsxTextTagNameMemberMarker", "mdxJsxTextTagNameMember", "mdxJsxTextTagNamePrefixMarker", "mdxJsxTextTagNameLocal", "mdxJsxTextTagExpressionAttribute", "mdxJsxTextTagExpressionAttributeMarker", "mdxJsxTextTagExpressionAttributeValue", "mdxJsxTextTagAttribute", "mdxJsxTextTagAttributeName", "mdxJsxTextTagAttributeNamePrimary", "mdxJsxTextTagAttributeNamePrefixMarker", "mdxJsxTextTagAttributeNameLocal", "mdxJsxTextTagAttributeInitializerMarker", "mdxJsxTextTagAttributeValueLiteral", "mdxJsxTextTagAttributeValueLiteralMarker", "mdxJsxTextTagAttributeValueLiteralValue", "mdxJsxTextTagAttributeValueExpression", "mdxJsxTextTagAttributeValueExpressionMarker", "mdxJsxTextTagAttributeValueExpressionValue");
  }
}
function jsxFlow(acorn, options) {
  return {
    concrete: true,
    name: "mdxJsxFlowTag",
    tokenize: tokenizeJsxFlow
  };
  function tokenizeJsxFlow(effects, ok, nok) {
    const self = this;
    return start2;
    function start2(code) {
      return before(code);
    }
    function before(code) {
      return factoryTag.call(self, effects, after, nok, acorn, options.acornOptions, options.addResult, false, "mdxJsxFlowTag", "mdxJsxFlowTagMarker", "mdxJsxFlowTagClosingMarker", "mdxJsxFlowTagSelfClosingMarker", "mdxJsxFlowTagName", "mdxJsxFlowTagNamePrimary", "mdxJsxFlowTagNameMemberMarker", "mdxJsxFlowTagNameMember", "mdxJsxFlowTagNamePrefixMarker", "mdxJsxFlowTagNameLocal", "mdxJsxFlowTagExpressionAttribute", "mdxJsxFlowTagExpressionAttributeMarker", "mdxJsxFlowTagExpressionAttributeValue", "mdxJsxFlowTagAttribute", "mdxJsxFlowTagAttributeName", "mdxJsxFlowTagAttributeNamePrimary", "mdxJsxFlowTagAttributeNamePrefixMarker", "mdxJsxFlowTagAttributeNameLocal", "mdxJsxFlowTagAttributeInitializerMarker", "mdxJsxFlowTagAttributeValueLiteral", "mdxJsxFlowTagAttributeValueLiteralMarker", "mdxJsxFlowTagAttributeValueLiteralValue", "mdxJsxFlowTagAttributeValueExpression", "mdxJsxFlowTagAttributeValueExpressionMarker", "mdxJsxFlowTagAttributeValueExpressionValue")(code);
    }
    function after(code) {
      return markdownSpace(code) ? factorySpace(effects, end, "whitespace")(code) : end(code);
    }
    function end(code) {
      const leftBraceValue = self.parser.constructs.flow[123];
      const constructs = Array.isArray(leftBraceValue) ? leftBraceValue : leftBraceValue ? [leftBraceValue] : [];
      let expression;
      for (const construct of constructs) {
        if (construct.name === "mdxFlowExpression") {
          expression = construct;
          break;
        }
      }
      return code === 60 ? (
        // We can’t just say: fine. Lines of blocks have to be parsed until an eol/eof.
        start2(code)
      ) : code === 123 && expression ? effects.attempt(expression, end, nok)(code) : code === null || markdownLineEnding(code) ? ok(code) : nok(code);
    }
  }
}
function mdxJsx(options) {
  const settings = options || {};
  const acorn = settings.acorn;
  let acornOptions;
  if (acorn) {
    if (!acorn.parse || !acorn.parseExpressionAt) {
      throw new Error("Expected a proper `acorn` instance passed in as `options.acorn`");
    }
    acornOptions = Object.assign({
      ecmaVersion: 2024,
      sourceType: "module"
    }, settings.acornOptions, {
      locations: true
    });
  } else if (settings.acornOptions || settings.addResult) {
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  }
  return {
    flow: {
      [60]: jsxFlow(acorn || void 0, {
        acornOptions,
        addResult: settings.addResult || void 0
      })
    },
    text: {
      [60]: jsxText(acorn || void 0, {
        acornOptions,
        addResult: settings.addResult || void 0
      })
    }
  };
}
export {
  mdxJsx as m
};
