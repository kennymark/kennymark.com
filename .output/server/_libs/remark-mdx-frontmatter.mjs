import { v as valueToEstree } from "./estree-util-value-to-estree.mjs";
import { t as tomlExports } from "./toml.mjs";
import { d as distExports } from "./yaml.mjs";
import { n as name } from "./estree-util-is-identifier-name.mjs";
import "process";
import "buffer";
const remarkMdxFrontmatter = ({ name: name$1 = "frontmatter", parsers } = {}) => {
  if (!name(name$1)) {
    throw new Error(`Name this should be a valid identifier, got: ${JSON.stringify(name$1)}`);
  }
  const allParsers = {
    yaml: distExports.parse,
    toml: tomlExports.parse,
    ...parsers
  };
  return (ast) => {
    let data;
    const node = ast.children.find((child) => Object.hasOwn(allParsers, child.type));
    if (node) {
      const parser = allParsers[node.type];
      const { value } = node;
      data = parser(value);
    }
    ast.children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: name$1 },
                    init: valueToEstree(data)
                  }
                ]
              }
            }
          ]
        }
      }
    });
  };
};
export {
  remarkMdxFrontmatter as default
};
