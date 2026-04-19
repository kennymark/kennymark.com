import { m as mdxExpressionFromMarkdown, a as mdxExpressionToMarkdown } from "./mdast-util-mdx-expression.mjs";
import { m as mdxJsxFromMarkdown, a as mdxJsxToMarkdown } from "./mdast-util-mdx-jsx.mjs";
import { m as mdxjsEsmFromMarkdown, a as mdxjsEsmToMarkdown } from "./mdast-util-mdxjs-esm.mjs";
function mdxFromMarkdown() {
  return [
    mdxExpressionFromMarkdown(),
    mdxJsxFromMarkdown(),
    mdxjsEsmFromMarkdown()
  ];
}
function mdxToMarkdown(options) {
  return {
    extensions: [
      mdxExpressionToMarkdown(),
      mdxJsxToMarkdown(options),
      mdxjsEsmToMarkdown()
    ]
  };
}
export {
  mdxToMarkdown as a,
  mdxFromMarkdown as m
};
