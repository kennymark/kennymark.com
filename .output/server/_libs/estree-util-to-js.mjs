import { g as generate, G as GENERATOR } from "./astring.mjs";
const emptyOptions = {};
function toJs(tree, options) {
  const { SourceMapGenerator, filePath, handlers } = options || emptyOptions;
  const sourceMap = SourceMapGenerator ? new SourceMapGenerator({ file: filePath || "<unknown>.js" }) : void 0;
  const value = generate(
    tree,
    // @ts-expect-error: `sourceMap` can be undefined, `astring` types are buggy.
    {
      comments: true,
      generator: { ...GENERATOR, ...handlers },
      sourceMap: sourceMap || void 0
    }
  );
  const map = sourceMap ? sourceMap.toJSON() : void 0;
  return { value, map };
}
const jsx = {
  JSXAttribute: jsxAttribute,
  JSXClosingElement: jsxClosingElement,
  JSXClosingFragment: jsxClosingFragment,
  JSXElement: jsxElement,
  JSXEmptyExpression: jsxEmptyExpression,
  JSXExpressionContainer: jsxExpressionContainer,
  JSXFragment: jsxFragment,
  JSXIdentifier: jsxIdentifier,
  JSXMemberExpression: jsxMemberExpression,
  JSXNamespacedName: jsxNamespacedName,
  JSXOpeningElement: jsxOpeningElement,
  JSXOpeningFragment: jsxOpeningFragment,
  JSXSpreadAttribute: jsxSpreadAttribute,
  JSXText: jsxText
};
function jsxAttribute(node, state) {
  this[node.name.type](node.name, state);
  if (node.value !== null && node.value !== void 0) {
    state.write("=");
    if (node.value.type === "Literal") {
      state.write(
        '"' + encodeJsx(String(node.value.value)).replace(/"/g, "&quot;") + '"',
        node
      );
    } else {
      this[node.value.type](node.value, state);
    }
  }
}
function jsxClosingElement(node, state) {
  state.write("</");
  this[node.name.type](node.name, state);
  state.write(">");
}
function jsxClosingFragment(node, state) {
  state.write("</>", node);
}
function jsxElement(node, state) {
  let index = -1;
  this[node.openingElement.type](node.openingElement, state);
  if (node.children) {
    while (++index < node.children.length) {
      const child = node.children[index];
      if (child.type === "JSXSpreadChild") {
        throw new Error("JSX spread children are not supported");
      }
      this[child.type](child, state);
    }
  }
  if (node.closingElement) {
    this[node.closingElement.type](node.closingElement, state);
  }
}
function jsxEmptyExpression() {
}
function jsxExpressionContainer(node, state) {
  state.write("{");
  this[node.expression.type](node.expression, state);
  state.write("}");
}
function jsxFragment(node, state) {
  let index = -1;
  this[node.openingFragment.type](node.openingFragment, state);
  if (node.children) {
    while (++index < node.children.length) {
      const child = node.children[index];
      if (child.type === "JSXSpreadChild") {
        throw new Error("JSX spread children are not supported");
      }
      this[child.type](child, state);
    }
  }
  this[node.closingFragment.type](node.closingFragment, state);
}
function jsxIdentifier(node, state) {
  state.write(node.name, node);
}
function jsxMemberExpression(node, state) {
  this[node.object.type](node.object, state);
  state.write(".");
  this[node.property.type](node.property, state);
}
function jsxNamespacedName(node, state) {
  this[node.namespace.type](node.namespace, state);
  state.write(":");
  this[node.name.type](node.name, state);
}
function jsxOpeningElement(node, state) {
  let index = -1;
  state.write("<");
  this[node.name.type](node.name, state);
  if (node.attributes) {
    while (++index < node.attributes.length) {
      state.write(" ");
      this[node.attributes[index].type](node.attributes[index], state);
    }
  }
  state.write(node.selfClosing ? " />" : ">");
}
function jsxOpeningFragment(node, state) {
  state.write("<>", node);
}
function jsxSpreadAttribute(node, state) {
  state.write("{");
  this.SpreadElement(node, state);
  state.write("}");
}
function jsxText(node, state) {
  state.write(encodeJsx(node.value).replace(/[<>{}]/g, replaceJsxChar), node);
}
function encodeJsx(value) {
  return value.replace(/&(?=[#a-z])/gi, "&amp;");
}
function replaceJsxChar($0) {
  return $0 === "<" ? "&lt;" : $0 === ">" ? "&gt;" : $0 === "{" ? "&#123;" : "&#125;";
}
export {
  jsx as j,
  toJs as t
};
