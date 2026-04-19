import { P as Parser } from "./acorn.mjs";
import { a as acornJsx } from "./acorn-jsx.mjs";
import { m as mdxMd } from "./micromark-extension-mdx-md.mjs";
import { c as combineExtensions } from "./micromark-util-combine-extensions+[...].mjs";
import { m as mdxjsEsm } from "./micromark-extension-mdxjs-esm.mjs";
import { m as mdxExpression } from "./micromark-extension-mdx-expression+[...].mjs";
import { m as mdxJsx } from "./micromark-extension-mdx-jsx.mjs";
function mdxjs(options) {
  const settings = Object.assign(
    {
      acorn: Parser.extend(acornJsx()),
      acornOptions: { ecmaVersion: 2024, sourceType: "module" },
      addResult: true
    },
    options
  );
  return combineExtensions([
    mdxjsEsm(settings),
    mdxExpression(settings),
    mdxJsx(settings),
    mdxMd()
  ]);
}
export {
  mdxjs as m
};
