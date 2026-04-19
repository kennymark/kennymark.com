import { m as mdxjs } from "./micromark-extension-mdxjs.mjs";
import { m as mdxFromMarkdown, a as mdxToMarkdown } from "./mdast-util-mdx.mjs";
const emptyOptions = {};
function remarkMdx(options) {
  const self = this;
  const settings = options || emptyOptions;
  const data = self.data();
  const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
  micromarkExtensions.push(mdxjs(settings));
  fromMarkdownExtensions.push(mdxFromMarkdown());
  toMarkdownExtensions.push(mdxToMarkdown(settings));
}
export {
  remarkMdx as r
};
