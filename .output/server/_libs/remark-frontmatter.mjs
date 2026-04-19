import { f as frontmatter } from "./micromark-extension-frontmatter+[...].mjs";
import { f as frontmatterFromMarkdown, a as frontmatterToMarkdown } from "./mdast-util-frontmatter.mjs";
import "./micromark-util-character.mjs";
import "./fault.mjs";
import "./format.mjs";
import "./react.mjs";
import "./escape-string-regexp.mjs";
const emptyOptions = "yaml";
function remarkFrontmatter(options) {
  const self = (
    /** @type {Processor} */
    this
  );
  const settings = options || emptyOptions;
  const data = self.data();
  const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
  micromarkExtensions.push(frontmatter(settings));
  fromMarkdownExtensions.push(frontmatterFromMarkdown(settings));
  toMarkdownExtensions.push(frontmatterToMarkdown(settings));
}
export {
  remarkFrontmatter as default
};
