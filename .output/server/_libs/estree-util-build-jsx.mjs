import { o as ok } from "./devlop.mjs";
import { w as walk } from "./estree-walker.mjs";
import { n as name } from "./estree-util-is-identifier-name.mjs";
const regex = /@(jsx|jsxFrag|jsxImportSource|jsxRuntime)\s+(\S+)/g;
function buildJsx(tree, options) {
  const config = options || {};
  let automatic = config.runtime === "automatic";
  const annotations = {};
  const imports = {};
  walk(tree, {
    enter(node) {
      if (node.type === "Program") {
        const comments = node.comments || [];
        let index = -1;
        while (++index < comments.length) {
          regex.lastIndex = 0;
          let match = regex.exec(comments[index].value);
          while (match) {
            annotations[match[1]] = match[2];
            match = regex.exec(comments[index].value);
          }
        }
        if (annotations.jsxRuntime) {
          if (annotations.jsxRuntime === "automatic") {
            automatic = true;
            if (annotations.jsx) {
              throw new Error("Unexpected `@jsx` pragma w/ automatic runtime");
            }
            if (annotations.jsxFrag) {
              throw new Error(
                "Unexpected `@jsxFrag` pragma w/ automatic runtime"
              );
            }
          } else if (annotations.jsxRuntime === "classic") {
            automatic = false;
            if (annotations.jsxImportSource) {
              throw new Error(
                "Unexpected `@jsxImportSource` w/ classic runtime"
              );
            }
          } else {
            throw new Error(
              "Unexpected `jsxRuntime` `" + annotations.jsxRuntime + "`, expected `automatic` or `classic`"
            );
          }
        }
      }
    },
    // eslint-disable-next-line complexity
    leave(node) {
      if (node.type === "Program") {
        const specifiers = [];
        if (imports.fragment) {
          specifiers.push({
            type: "ImportSpecifier",
            imported: { type: "Identifier", name: "Fragment" },
            local: { type: "Identifier", name: "_Fragment" }
          });
        }
        if (imports.jsx) {
          specifiers.push({
            type: "ImportSpecifier",
            imported: { type: "Identifier", name: "jsx" },
            local: { type: "Identifier", name: "_jsx" }
          });
        }
        if (imports.jsxs) {
          specifiers.push({
            type: "ImportSpecifier",
            imported: { type: "Identifier", name: "jsxs" },
            local: { type: "Identifier", name: "_jsxs" }
          });
        }
        if (imports.jsxDEV) {
          specifiers.push({
            type: "ImportSpecifier",
            imported: { type: "Identifier", name: "jsxDEV" },
            local: { type: "Identifier", name: "_jsxDEV" }
          });
        }
        if (specifiers.length > 0) {
          let injectIndex = 0;
          while (injectIndex < node.body.length) {
            const child = node.body[injectIndex];
            if ("directive" in child && child.directive) {
              injectIndex++;
            } else {
              break;
            }
          }
          node.body.splice(injectIndex, 0, {
            type: "ImportDeclaration",
            specifiers,
            source: {
              type: "Literal",
              value: (annotations.jsxImportSource || config.importSource || "react") + (config.development ? "/jsx-dev-runtime" : "/jsx-runtime")
            }
          });
        }
      }
      if (node.type !== "JSXElement" && node.type !== "JSXFragment") {
        return;
      }
      const children = [];
      let index = -1;
      while (++index < node.children.length) {
        const child = node.children[index];
        if (child.type === "JSXExpressionContainer") {
          if (child.expression.type !== "JSXEmptyExpression") {
            children.push(child.expression);
          }
        } else if (child.type === "JSXText") {
          const value = child.value.replace(/\t/g, " ").replace(/ *(\r?\n|\r) */g, "\n").replace(/\n+/g, "\n").replace(/\n+$/, "").replace(/^\n+/, "").replace(/\n/g, " ");
          if (value) {
            const text = { type: "Literal", value };
            create(child, text);
            children.push(text);
          }
        } else {
          ok(
            child.type !== "JSXElement" && child.type !== "JSXFragment" && child.type !== "JSXSpreadChild"
          );
          children.push(child);
        }
      }
      let name2;
      const fields = [];
      let parameters = [];
      let key;
      if (node.type === "JSXElement") {
        name2 = toIdentifier(node.openingElement.name);
        if (name2.type === "Identifier" && /^[a-z]/.test(name2.name)) {
          const next = { type: "Literal", value: name2.name };
          create(name2, next);
          name2 = next;
        }
        let spread;
        const attributes = node.openingElement.attributes;
        let index2 = -1;
        while (++index2 < attributes.length) {
          const attribute = attributes[index2];
          if (attribute.type === "JSXSpreadAttribute") {
            if (attribute.argument.type === "ObjectExpression") {
              fields.push(...attribute.argument.properties);
            } else {
              fields.push({ type: "SpreadElement", argument: attribute.argument });
            }
            spread = true;
          } else {
            const prop = toProperty(attribute);
            if (automatic && prop.key.type === "Identifier" && prop.key.name === "key") {
              if (spread) {
                throw new Error(
                  "Expected `key` to come before any spread expressions"
                );
              }
              const value = prop.value;
              ok(
                value.type !== "AssignmentPattern" && value.type !== "ArrayPattern" && value.type !== "ObjectPattern" && value.type !== "RestElement"
              );
              key = value;
            } else {
              fields.push(prop);
            }
          }
        }
      } else if (automatic) {
        imports.fragment = true;
        name2 = { type: "Identifier", name: "_Fragment" };
      } else {
        name2 = toMemberExpression(
          annotations.jsxFrag || config.pragmaFrag || "React.Fragment"
        );
      }
      if (automatic) {
        if (children.length > 0) {
          fields.push({
            type: "Property",
            key: { type: "Identifier", name: "children" },
            value: children.length > 1 ? { type: "ArrayExpression", elements: children } : children[0],
            kind: "init",
            method: false,
            shorthand: false,
            computed: false
          });
        }
      } else {
        parameters = children;
      }
      let callee;
      if (automatic) {
        parameters.push({ type: "ObjectExpression", properties: fields });
        if (key) {
          parameters.push(key);
        } else if (config.development) {
          parameters.push({ type: "Identifier", name: "undefined" });
        }
        const isStaticChildren = children.length > 1;
        if (config.development) {
          imports.jsxDEV = true;
          callee = {
            type: "Identifier",
            name: "_jsxDEV"
          };
          parameters.push({ type: "Literal", value: isStaticChildren });
          const source = {
            type: "ObjectExpression",
            properties: [
              {
                type: "Property",
                method: false,
                shorthand: false,
                computed: false,
                kind: "init",
                key: { type: "Identifier", name: "fileName" },
                value: {
                  type: "Literal",
                  value: config.filePath || "<source.js>"
                }
              }
            ]
          };
          if (node.loc) {
            source.properties.push(
              {
                type: "Property",
                method: false,
                shorthand: false,
                computed: false,
                kind: "init",
                key: { type: "Identifier", name: "lineNumber" },
                value: { type: "Literal", value: node.loc.start.line }
              },
              {
                type: "Property",
                method: false,
                shorthand: false,
                computed: false,
                kind: "init",
                key: { type: "Identifier", name: "columnNumber" },
                value: { type: "Literal", value: node.loc.start.column + 1 }
              }
            );
          }
          parameters.push(source, { type: "ThisExpression" });
        } else if (isStaticChildren) {
          imports.jsxs = true;
          callee = { type: "Identifier", name: "_jsxs" };
        } else {
          imports.jsx = true;
          callee = { type: "Identifier", name: "_jsx" };
        }
      } else {
        if (fields.length > 0) {
          parameters.unshift({ type: "ObjectExpression", properties: fields });
        } else if (parameters.length > 0) {
          parameters.unshift({ type: "Literal", value: null });
        }
        callee = toMemberExpression(
          annotations.jsx || config.pragma || "React.createElement"
        );
      }
      parameters.unshift(name2);
      const call = {
        type: "CallExpression",
        callee,
        arguments: parameters,
        optional: false
      };
      create(node, call);
      this.replace(call);
    }
  });
}
function toProperty(node) {
  let value;
  if (node.value) {
    if (node.value.type === "JSXExpressionContainer") {
      const valueExpression = node.value.expression;
      ok(
        valueExpression.type !== "JSXEmptyExpression"
      );
      value = valueExpression;
    } else {
      const nodeValue = node.value;
      ok(
        nodeValue.type !== "JSXElement" && nodeValue.type !== "JSXFragment"
      );
      value = nodeValue;
      delete value.raw;
    }
  } else {
    value = { type: "Literal", value: true };
  }
  const replacement = {
    type: "Property",
    key: toIdentifier(node.name),
    value,
    kind: "init",
    method: false,
    shorthand: false,
    computed: false
  };
  create(node, replacement);
  return replacement;
}
function toIdentifier(node) {
  let replace;
  if (node.type === "JSXMemberExpression") {
    const id = toIdentifier(node.property);
    replace = {
      type: "MemberExpression",
      object: toIdentifier(node.object),
      property: id,
      computed: id.type === "Literal",
      optional: false
    };
  } else if (node.type === "JSXNamespacedName") {
    replace = {
      type: "Literal",
      value: node.namespace.name + ":" + node.name.name
    };
  } else {
    replace = name(node.name) ? { type: "Identifier", name: node.name } : { type: "Literal", value: node.name };
  }
  create(node, replace);
  return replace;
}
function toMemberExpression(id) {
  const identifiers = id.split(".");
  let index = -1;
  let result;
  while (++index < identifiers.length) {
    const prop = name(identifiers[index]) ? { type: "Identifier", name: identifiers[index] } : { type: "Literal", value: identifiers[index] };
    result = result ? {
      type: "MemberExpression",
      object: result,
      property: prop,
      computed: Boolean(index && prop.type === "Literal"),
      optional: false
    } : prop;
  }
  return result;
}
function create(from, to) {
  const fields = ["start", "end", "loc", "range", "comments"];
  let index = -1;
  while (++index < fields.length) {
    const field = fields[index];
    if (field in from) {
      to[field] = from[field];
    }
  }
}
export {
  buildJsx as b
};
