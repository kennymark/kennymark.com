import assert from "node:assert";
import { Buffer } from "node:buffer";
import fs from "node:fs/promises";
import minpath from "node:path";
import { c as createFormatAwareProcessors, e as extnamesToRegex } from "./mdx-js__mdx.mjs";
import { s as sourceMapExports } from "./source-map.mjs";
import { V as VFile } from "./vfile.mjs";
import { V as VFileMessage } from "./vfile-message.mjs";
import "./devlop.mjs";
import "./estree-util-is-identifier-name.mjs";
import "./estree-walker.mjs";
import "./unist-util-stringify-position.mjs";
import "./unist-util-position-from-estree+[...].mjs";
import "./estree-util-scope.mjs";
import "./unist-util-visit.mjs";
import "./unist-util-visit-parents.mjs";
import "./unist-util-is.mjs";
import "./collapse-white-space.mjs";
import "./unified.mjs";
import "./bail.mjs";
import "./extend.mjs";
import "./react.mjs";
import "./is-plain-obj.mjs";
import "./trough.mjs";
import "./remark-parse.mjs";
import "./mdast-util-from-markdown.mjs";
import "./micromark-util-decode-numeric-character-reference+[...].mjs";
import "./micromark-util-decode-string.mjs";
import "./decode-named-character-reference+[...].mjs";
import "./character-entities.mjs";
import "./micromark-util-normalize-identifier+[...].mjs";
import "./micromark.mjs";
import "./micromark-util-combine-extensions+[...].mjs";
import "./micromark-util-chunked.mjs";
import "./micromark-factory-space.mjs";
import "./micromark-util-character.mjs";
import "./micromark-core-commonmark.mjs";
import "./micromark-util-classify-character+[...].mjs";
import "./micromark-util-resolve-all.mjs";
import "./micromark-util-subtokenize.mjs";
import "./micromark-factory-destination.mjs";
import "./micromark-factory-label.mjs";
import "./micromark-factory-title.mjs";
import "./micromark-factory-whitespace.mjs";
import "./micromark-util-html-tag-name.mjs";
import "./mdast-util-to-string.mjs";
import "./remark-mdx.mjs";
import "./micromark-extension-mdxjs.mjs";
import "./acorn.mjs";
import "./acorn-jsx.mjs";
import "./micromark-extension-mdx-md.mjs";
import "./micromark-extension-mdxjs-esm.mjs";
import "./micromark-util-events-to-acorn.mjs";
import "./estree-util-visit.mjs";
import "./micromark-extension-mdx-expression+[...].mjs";
import "./micromark-factory-mdx-expression+[...].mjs";
import "./micromark-extension-mdx-jsx.mjs";
import "./mdast-util-mdx.mjs";
import "./mdast-util-mdx-expression.mjs";
import "./mdast-util-mdx-jsx.mjs";
import "./ccount.mjs";
import "./parse-entities.mjs";
import "./character-entities-legacy.mjs";
import "./character-reference-invalid.mjs";
import "./is-decimal.mjs";
import "./is-hexadecimal.mjs";
import "./is-alphanumerical.mjs";
import "./is-alphabetical.mjs";
import "./stringify-entities.mjs";
import "./mdast-util-mdxjs-esm.mjs";
import "./remark-rehype.mjs";
import "./mdast-util-to-hast.mjs";
import "./ungap__structured-clone.mjs";
import "./micromark-util-sanitize-uri.mjs";
import "./unist-util-position.mjs";
import "./trim-lines.mjs";
import "./rehype-recma.mjs";
import "./hast-util-to-estree.mjs";
import "./property-information.mjs";
import "./zwitch.mjs";
import "./comma-separated-tokens.mjs";
import "./space-separated-tokens.mjs";
import "./style-to-js.mjs";
import "./style-to-object.mjs";
import "./inline-style-parser.mjs";
import "./estree-util-attach-comments.mjs";
import "./hast-util-whitespace.mjs";
import "./recma-build-jsx.mjs";
import "./estree-util-build-jsx.mjs";
import "./recma-jsx.mjs";
import "./estree-util-to-js.mjs";
import "./astring.mjs";
import "./recma-stringify.mjs";
import "./markdown-extensions.mjs";
import "url";
import "fs";
import "path";
import "node:process";
import "node:url";
const eol = /\r\n|\r|\n|\u2028|\u2029/g;
const name = "@mdx-js/esbuild";
function esbuild(options) {
  const settings = { ...options, SourceMapGenerator: sourceMapExports.SourceMapGenerator };
  const { extnames, process } = createFormatAwareProcessors(settings);
  return { name, setup };
  function setup(build) {
    build.onLoad({ filter: extnamesToRegex(extnames) }, onload);
    async function onload(data) {
      const document = String(
        data.pluginData && data.pluginData.contents !== null && data.pluginData.contents !== void 0 ? data.pluginData.contents : await fs.readFile(data.path)
      );
      const state = { doc: document, name, path: data.path };
      let file = new VFile({ path: data.path, value: document });
      let value;
      let messages = [];
      const errors = [];
      const warnings = [];
      try {
        file = await process(file);
        value = String(file.value) + "\n//# sourceMappingURL=data:application/json;base64," + Buffer.from(JSON.stringify(file.map)).toString("base64") + "\n";
        messages = file.messages;
      } catch (error_) {
        const cause = (
          /** @type {VFileMessage | Error} */
          error_
        );
        const message = new VFileMessage(
          "Cannot process MDX file with esbuild",
          {
            cause,
            place: "reason" in cause ? cause.place : void 0,
            ruleId: "process-error",
            source: "@mdx-js/esbuild"
          }
        );
        message.fatal = true;
        messages.push(message);
      }
      for (const message of messages) {
        const list = message.fatal ? errors : warnings;
        list.push(vfileMessageToEsbuild(state, message));
      }
      assert.ok(file.dirname, "expected `dirname` to be defined");
      return {
        contents: value || "",
        errors,
        loader: settings.jsx ? "jsx" : "js",
        resolveDir: minpath.resolve(file.cwd, file.dirname),
        warnings
      };
    }
  }
}
function vfileMessageToEsbuild(state, message) {
  const location = {
    column: 0,
    file: state.path,
    length: 0,
    line: 0,
    lineText: "",
    namespace: "file",
    suggestion: ""
  };
  const place = message.place;
  const start = place ? "start" in place ? place.start : place : void 0;
  if (start) {
    location.column = start.column - 1;
    location.line = start.line;
    location.length = 1;
    const end = place && "end" in place ? place.end : void 0;
    if (end) {
      if (start.offset !== void 0 && end.offset !== void 0) {
        location.length = end.offset - start.offset;
      } else if (end.line === start.line) {
        location.length = end.column - start.column;
      }
    }
    if (start.offset !== void 0) {
      eol.lastIndex = start.offset;
      const match = eol.exec(state.doc);
      const lineStart = start.offset - (start.column - 1);
      const lineEnd = match ? match.index : state.doc.length;
      location.lineText = state.doc.slice(lineStart, lineEnd);
      location.length = Math.min(location.length, lineEnd - (start.offset || 0));
    }
    const maxLength = state.doc.length - (start.offset || 0);
    location.length = Math.min(location.length, maxLength);
  }
  let text = message.reason;
  if (message.cause) {
    text = `${text}:
  ${message.cause}`;
  }
  return {
    detail: message,
    id: "",
    location,
    notes: [],
    pluginName: state.name,
    text
  };
}
export {
  esbuild as default
};
