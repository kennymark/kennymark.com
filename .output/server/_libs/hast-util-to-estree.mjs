import { f as find, h as hastToReact, s as svg, a as html } from "./property-information.mjs";
import { z as zwitch } from "./zwitch.mjs";
import { s as stringify } from "./comma-separated-tokens.mjs";
import { s as stringify$1 } from "./space-separated-tokens.mjs";
import { s as styleToJs } from "./style-to-js.mjs";
import { n as name } from "./estree-util-is-identifier-name.mjs";
import { a as attachComments } from "./estree-util-attach-comments.mjs";
import { w as whitespace } from "./hast-util-whitespace.mjs";
import { p as position } from "./unist-util-position.mjs";
function comment(node, state) {
  const result = { type: "Block", value: node.value };
  state.inherit(node, result);
  state.comments.push(result);
  const expression = {
    type: "JSXEmptyExpression",
    // @ts-expect-error: `comments` is custom.
    comments: [Object.assign({}, result, { leading: false, trailing: true })]
  };
  state.patch(node, expression);
  const container = { type: "JSXExpressionContainer", expression };
  state.patch(node, container);
  return container;
}
const own$1 = {}.hasOwnProperty;
const cap = /[A-Z]/g;
const tableCellElement = /* @__PURE__ */ new Set(["td", "th"]);
function element(node, state) {
  const parentSchema = state.schema;
  let schema = parentSchema;
  const properties = node.properties || {};
  if (parentSchema.space === "html" && node.tagName.toLowerCase() === "svg") {
    schema = svg;
    state.schema = schema;
  }
  const children = state.all(node);
  const attributes = [];
  let property;
  let alignValue;
  let styleProperties;
  for (property in properties) {
    if (own$1.call(properties, property)) {
      let value = properties[property];
      const info = find(schema, property);
      let attributeValue;
      if (value === null || value === void 0 || value === false || typeof value === "number" && Number.isNaN(value) || !value && info.boolean) {
        continue;
      }
      property = state.elementAttributeNameCase === "react" && info.space ? hastToReact[info.property] || info.property : info.attribute;
      if (Array.isArray(value)) {
        value = info.commaSeparated ? stringify(value) : stringify$1(value);
      }
      if (property === "style") {
        let styleObject = typeof value === "object" ? value : parseStyle(String(value), node.tagName);
        if (state.stylePropertyNameCase === "css") {
          styleObject = transformStylesToCssCasing(styleObject);
        }
        const cssProperties = [];
        let cssProperty;
        for (cssProperty in styleObject) {
          if (own$1.call(styleObject, cssProperty)) {
            cssProperties.push({
              type: "Property",
              method: false,
              shorthand: false,
              computed: false,
              key: name(cssProperty) ? { type: "Identifier", name: cssProperty } : { type: "Literal", value: cssProperty },
              value: { type: "Literal", value: String(styleObject[cssProperty]) },
              kind: "init"
            });
          }
        }
        styleProperties = cssProperties;
        attributeValue = {
          type: "JSXExpressionContainer",
          expression: { type: "ObjectExpression", properties: cssProperties }
        };
      } else if (value === true) {
        attributeValue = null;
      } else if (state.tableCellAlignToStyle && tableCellElement.has(node.tagName) && property === "align") {
        alignValue = String(value);
        continue;
      } else {
        attributeValue = { type: "Literal", value: String(value) };
      }
      if (name(property, { jsx: true })) {
        attributes.push({
          type: "JSXAttribute",
          name: { type: "JSXIdentifier", name: property },
          value: attributeValue
        });
      } else {
        attributes.push({
          type: "JSXSpreadAttribute",
          argument: {
            type: "ObjectExpression",
            properties: [
              {
                type: "Property",
                method: false,
                shorthand: false,
                computed: false,
                key: { type: "Literal", value: String(property) },
                // @ts-expect-error No need to worry about `style` (which has a
                // `JSXExpressionContainer` value) because that’s a valid identifier.
                value: attributeValue || { type: "Literal", value: true },
                kind: "init"
              }
            ]
          }
        });
      }
    }
  }
  if (alignValue !== void 0) {
    if (!styleProperties) {
      styleProperties = [];
      attributes.push({
        type: "JSXAttribute",
        name: { type: "JSXIdentifier", name: "style" },
        value: {
          type: "JSXExpressionContainer",
          expression: { type: "ObjectExpression", properties: styleProperties }
        }
      });
    }
    const cssProperty = state.stylePropertyNameCase === "css" ? transformStyleToCssCasing("textAlign") : "textAlign";
    styleProperties.push({
      type: "Property",
      method: false,
      shorthand: false,
      computed: false,
      key: name(cssProperty) ? { type: "Identifier", name: cssProperty } : { type: "Literal", value: cssProperty },
      value: { type: "Literal", value: alignValue },
      kind: "init"
    });
  }
  state.schema = parentSchema;
  const result = {
    type: "JSXElement",
    openingElement: {
      type: "JSXOpeningElement",
      attributes,
      name: state.createJsxElementName(node.tagName),
      selfClosing: children.length === 0
    },
    closingElement: children.length > 0 ? {
      type: "JSXClosingElement",
      name: state.createJsxElementName(node.tagName)
    } : null,
    children
  };
  state.inherit(node, result);
  return result;
}
function parseStyle(value, tagName) {
  try {
    return styleToJs(value, { reactCompat: true });
  } catch (error) {
    const cause = (
      /** @type {Error} */
      error
    );
    const exception = new Error(
      "Could not parse `style` attribute on `" + tagName + "`",
      { cause }
    );
    throw exception;
  }
}
function transformStylesToCssCasing(domCasing) {
  const cssCasing = {};
  let from;
  for (from in domCasing) {
    if (own$1.call(domCasing, from)) {
      cssCasing[transformStyleToCssCasing(from)] = domCasing[from];
    }
  }
  return cssCasing;
}
function transformStyleToCssCasing(from) {
  let to = from.replace(cap, toDash);
  if (to.slice(0, 3) === "ms-") to = "-" + to;
  return to;
}
function toDash($0) {
  return "-" + $0.toLowerCase();
}
function mdxExpression(node, state) {
  const estree = node.data && node.data.estree;
  const comments = estree && estree.comments || [];
  let expression;
  if (estree) {
    state.comments.push(...comments);
    attachComments(estree, estree.comments);
    expression = estree.body[0] && estree.body[0].type === "ExpressionStatement" && estree.body[0].expression || void 0;
  }
  if (!expression) {
    expression = { type: "JSXEmptyExpression" };
    state.patch(node, expression);
  }
  const result = { type: "JSXExpressionContainer", expression };
  state.inherit(node, result);
  return result;
}
function mdxJsxElement(node, state) {
  const parentSchema = state.schema;
  let schema = parentSchema;
  const attributes = node.attributes || [];
  let index = -1;
  if (node.name && parentSchema.space === "html" && node.name.toLowerCase() === "svg") {
    schema = svg;
    state.schema = schema;
  }
  const children = state.all(node);
  const jsxAttributes = [];
  while (++index < attributes.length) {
    const attribute = attributes[index];
    const value = attribute.value;
    let attributeValue;
    if (attribute.type === "mdxJsxAttribute") {
      if (value === null || value === void 0) {
        attributeValue = null;
      } else if (typeof value === "object") {
        const estree = value.data && value.data.estree;
        const comments = estree && estree.comments || [];
        let expression;
        if (estree) {
          state.comments.push(...comments);
          attachComments(estree, estree.comments);
          expression = estree.body[0] && estree.body[0].type === "ExpressionStatement" && estree.body[0].expression || void 0;
        }
        attributeValue = {
          type: "JSXExpressionContainer",
          expression: expression || { type: "JSXEmptyExpression" }
        };
        state.inherit(value, attributeValue);
      } else {
        attributeValue = { type: "Literal", value: String(value) };
      }
      const jsxAttribute = {
        type: "JSXAttribute",
        name: state.createJsxAttributeName(attribute.name),
        value: attributeValue
      };
      state.inherit(attribute, jsxAttribute);
      jsxAttributes.push(jsxAttribute);
    } else {
      const estree = attribute.data && attribute.data.estree;
      const comments = estree && estree.comments || [];
      let argumentValue;
      if (estree) {
        state.comments.push(...comments);
        attachComments(estree, estree.comments);
        argumentValue = estree.body[0] && estree.body[0].type === "ExpressionStatement" && estree.body[0].expression && estree.body[0].expression.type === "ObjectExpression" && estree.body[0].expression.properties && estree.body[0].expression.properties[0] && estree.body[0].expression.properties[0].type === "SpreadElement" && estree.body[0].expression.properties[0].argument || void 0;
      }
      const jsxAttribute = {
        type: "JSXSpreadAttribute",
        argument: argumentValue || { type: "ObjectExpression", properties: [] }
      };
      state.inherit(attribute, jsxAttribute);
      jsxAttributes.push(jsxAttribute);
    }
  }
  state.schema = parentSchema;
  const result = node.name ? {
    type: "JSXElement",
    openingElement: {
      type: "JSXOpeningElement",
      attributes: jsxAttributes,
      name: state.createJsxElementName(node.name),
      selfClosing: children.length === 0
    },
    closingElement: children.length > 0 ? {
      type: "JSXClosingElement",
      name: state.createJsxElementName(node.name)
    } : null,
    children
  } : {
    type: "JSXFragment",
    openingFragment: { type: "JSXOpeningFragment" },
    closingFragment: { type: "JSXClosingFragment" },
    children
  };
  state.inherit(node, result);
  return result;
}
function mdxjsEsm(node, state) {
  const estree = node.data && node.data.estree;
  const comments = estree && estree.comments || [];
  if (estree) {
    state.comments.push(...comments);
    attachComments(estree, comments);
    state.esm.push(...estree.body);
  }
}
function root(node, state) {
  const children = state.all(node);
  const cleanChildren = [];
  let index = -1;
  let queue;
  while (++index < children.length) {
    const child = children[index];
    if (child.type === "JSXExpressionContainer" && child.expression.type === "Literal" && whitespace(String(child.expression.value))) {
      if (queue) queue.push(child);
    } else {
      if (queue) cleanChildren.push(...queue);
      cleanChildren.push(child);
      queue = [];
    }
  }
  const result = {
    type: "JSXFragment",
    openingFragment: { type: "JSXOpeningFragment" },
    closingFragment: { type: "JSXClosingFragment" },
    children: cleanChildren
  };
  state.inherit(node, result);
  return result;
}
function text(node, state) {
  const value = String(node.value || "");
  if (value) {
    const result = { type: "Literal", value };
    state.inherit(node, result);
    const container = { type: "JSXExpressionContainer", expression: result };
    state.patch(node, container);
    return container;
  }
}
const handlers = {
  comment,
  doctype: ignore,
  element,
  mdxFlowExpression: mdxExpression,
  mdxJsxFlowElement: mdxJsxElement,
  mdxJsxTextElement: mdxJsxElement,
  mdxTextExpression: mdxExpression,
  mdxjsEsm,
  root,
  text
};
function ignore() {
}
const own = {}.hasOwnProperty;
const tableElements = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]);
function createState(options) {
  const one = zwitch("type", {
    invalid,
    unknown,
    handlers: { ...handlers, ...options.handlers }
  });
  return {
    // Current space.
    elementAttributeNameCase: options.elementAttributeNameCase || "react",
    schema: options.space === "svg" ? svg : html,
    stylePropertyNameCase: options.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: options.tableCellAlignToStyle !== false,
    // Results.
    comments: [],
    esm: [],
    // Useful functions.
    all,
    createJsxAttributeName,
    createJsxElementName,
    handle,
    inherit,
    patch
  };
  function handle(node) {
    return one(node, this);
  }
}
function invalid(value) {
  throw new Error("Cannot handle value `" + value + "`, expected node");
}
function unknown(node) {
  throw new Error("Cannot handle unknown node `" + node.type + "`");
}
function all(parent) {
  const children = parent.children || [];
  let index = -1;
  const results = [];
  const ignoreLineBreak = this.schema.space === "html" && parent.type === "element" && tableElements.has(parent.tagName.toLowerCase());
  while (++index < children.length) {
    const child = children[index];
    if (ignoreLineBreak && child.type === "text" && child.value === "\n") {
      continue;
    }
    const result = this.handle(child);
    if (Array.isArray(result)) {
      results.push(...result);
    } else if (result) {
      results.push(result);
    }
  }
  return results;
}
function inherit(from, to) {
  const left = (
    /** @type {Record<string, unknown> | undefined} */
    from.data
  );
  let right;
  let key;
  patch(from, to);
  if (left) {
    for (key in left) {
      if (own.call(left, key) && key !== "estree") {
        if (!right) right = {};
        right[key] = left[key];
      }
    }
    if (right) {
      to.data = right;
    }
  }
}
function patch(from, to) {
  const p = position(from);
  if (p && p.start.offset !== void 0 && p.end.offset !== void 0) {
    to.start = p.start.offset;
    to.end = p.end.offset;
    to.loc = {
      start: { line: p.start.line, column: p.start.column - 1 },
      end: { line: p.end.line, column: p.end.column - 1 }
    };
    to.range = [p.start.offset, p.end.offset];
  }
}
function createJsxAttributeName(name2) {
  const node = createJsxNameFromString(name2);
  if (node.type === "JSXMemberExpression") {
    throw new Error("Member expressions in attribute names are not supported");
  }
  return node;
}
function createJsxElementName(name2) {
  return createJsxNameFromString(name2);
}
function createJsxNameFromString(name2) {
  if (name2.includes(".")) {
    const names = name2.split(".");
    let part = names.shift();
    let node = { type: "JSXIdentifier", name: part };
    while (part = names.shift()) {
      node = {
        type: "JSXMemberExpression",
        object: node,
        property: { type: "JSXIdentifier", name: part }
      };
    }
    return node;
  }
  if (name2.includes(":")) {
    const parts = name2.split(":");
    return {
      type: "JSXNamespacedName",
      namespace: { type: "JSXIdentifier", name: parts[0] },
      name: { type: "JSXIdentifier", name: parts[1] }
    };
  }
  return { type: "JSXIdentifier", name: name2 };
}
function toEstree(tree, options) {
  const state = createState(options || {});
  let result = state.handle(tree);
  const body = state.esm;
  if (result) {
    if (result.type !== "JSXFragment" && result.type !== "JSXElement") {
      result = {
        type: "JSXFragment",
        openingFragment: { type: "JSXOpeningFragment" },
        closingFragment: { type: "JSXClosingFragment" },
        children: [result]
      };
      state.patch(tree, result);
    }
    const statement = { type: "ExpressionStatement", expression: result };
    state.patch(tree, statement);
    body.push(statement);
  }
  const program = {
    type: "Program",
    body,
    sourceType: "module",
    comments: state.comments
  };
  state.patch(tree, program);
  return program;
}
export {
  toEstree as t
};
