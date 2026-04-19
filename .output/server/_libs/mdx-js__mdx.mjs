import { o as ok } from "./devlop.mjs";
import { n as name } from "./estree-util-is-identifier-name.mjs";
import { w as walk } from "./estree-walker.mjs";
import { s as stringifyPosition } from "./unist-util-stringify-position.mjs";
import { p as positionFromEstree } from "./unist-util-position-from-estree+[...].mjs";
import { c as createVisitors } from "./estree-util-scope.mjs";
import { v as visit } from "./unist-util-visit.mjs";
import { c as collapseWhiteSpace } from "./collapse-white-space.mjs";
import { u as unified } from "./unified.mjs";
import { r as remarkParse } from "./remark-parse.mjs";
import { r as remarkMdx } from "./remark-mdx.mjs";
import { r as remarkRehype } from "./remark-rehype.mjs";
import { r as rehypeRecma } from "./rehype-recma.mjs";
import { r as recmaJsx } from "./recma-build-jsx.mjs";
import { r as recmaJsx$1 } from "./recma-jsx.mjs";
import { r as recmaStringify } from "./recma-stringify.mjs";
import { m as markdownExtension } from "./markdown-extensions.mjs";
import { V as VFile } from "./vfile.mjs";
function create(from, to) {
  const fields = ["start", "end", "loc", "range"];
  let index = -1;
  while (++index < fields.length) {
    const field = fields[index];
    if (field in from) {
      to[field] = from[field];
    }
  }
}
function specifiersToDeclarations(specifiers, init) {
  let index = -1;
  const declarations = [];
  const otherSpecifiers = [];
  let importNamespaceSpecifier;
  while (++index < specifiers.length) {
    const specifier = specifiers[index];
    if (specifier.type === "ImportNamespaceSpecifier") {
      importNamespaceSpecifier = specifier;
    } else {
      otherSpecifiers.push(specifier);
    }
  }
  if (importNamespaceSpecifier) {
    const declarator = {
      type: "VariableDeclarator",
      id: importNamespaceSpecifier.local,
      init
    };
    create(importNamespaceSpecifier, declarator);
    declarations.push(declarator);
  }
  declarations.push({
    type: "VariableDeclarator",
    id: {
      type: "ObjectPattern",
      properties: otherSpecifiers.map(function(specifier) {
        let key = specifier.type === "ImportSpecifier" ? specifier.imported : specifier.type === "ExportSpecifier" ? specifier.exported : { type: "Identifier", name: "default" };
        let value = specifier.local;
        if (specifier.type === "ExportSpecifier") {
          value = key;
          key = specifier.local;
        }
        ok(value.type === "Identifier");
        const property = {
          type: "Property",
          kind: "init",
          shorthand: key.type === "Identifier" && value.type === "Identifier" && key.name === value.name,
          method: false,
          computed: false,
          key,
          value
        };
        create(specifier, property);
        return property;
      })
    },
    init: importNamespaceSpecifier ? { type: "Identifier", name: importNamespaceSpecifier.local.name } : init
  });
  return declarations;
}
function toIdOrMemberExpression(ids) {
  let index = -1;
  let object;
  while (++index < ids.length) {
    const name$1 = ids[index];
    const id = typeof name$1 === "string" && name(name$1) ? { type: "Identifier", name: name$1 } : { type: "Literal", value: name$1 };
    object = object ? {
      type: "MemberExpression",
      object,
      property: id,
      computed: id.type === "Literal",
      optional: false
    } : id;
  }
  ok(object.type !== "Literal");
  return object;
}
function toJsxIdOrMemberExpression(ids) {
  let index = -1;
  let object;
  while (++index < ids.length) {
    const name$1 = ids[index];
    ok(
      typeof name$1 === "string" && name(name$1, { jsx: true })
    );
    const id = { type: "JSXIdentifier", name: name$1 };
    object = object ? { type: "JSXMemberExpression", object, property: id } : id;
  }
  return object;
}
function recmaBuildJsxTransform(options) {
  const { outputFormat } = options || {};
  return function(tree) {
    if (tree.comments) {
      tree.comments = tree.comments.filter(function(d) {
        return !d.data?._mdxIsPragmaComment;
      });
    }
    if (outputFormat === "function-body") {
      let index = 0;
      while (index < tree.body.length) {
        const child = tree.body[index];
        if ("directive" in child && child.directive) {
          index++;
        } else {
          break;
        }
      }
      const declaration = tree.body[index];
      if (declaration && declaration.type === "ImportDeclaration" && typeof declaration.source.value === "string" && /\/jsx-(dev-)?runtime$/.test(declaration.source.value)) {
        tree.body[index] = {
          type: "VariableDeclaration",
          kind: "const",
          declarations: specifiersToDeclarations(
            declaration.specifiers,
            toIdOrMemberExpression(["arguments", 0])
          )
        };
      }
    }
  };
}
function declarationToExpression(declaration) {
  if (declaration.type === "FunctionDeclaration") {
    return { ...declaration, type: "FunctionExpression" };
  }
  ok(declaration.type === "ClassDeclaration");
  return { ...declaration, type: "ClassExpression" };
}
function isDeclaration(node) {
  return Boolean(
    node.type === "FunctionDeclaration" || node.type === "ClassDeclaration" || node.type === "VariableDeclaration"
  );
}
function recmaDocument(options) {
  const baseUrl = options.baseUrl || void 0;
  const baseHref = typeof baseUrl === "object" ? baseUrl.href : baseUrl;
  const outputFormat = options.outputFormat || "program";
  const pragma = options.pragma === void 0 ? "React.createElement" : options.pragma;
  const pragmaFrag = options.pragmaFrag === void 0 ? "React.Fragment" : options.pragmaFrag;
  const pragmaImportSource = options.pragmaImportSource || "react";
  const jsxImportSource = options.jsxImportSource || "react";
  const jsxRuntime = options.jsxRuntime || "automatic";
  return function(tree, file) {
    const exportedValues = [];
    const replacement = [];
    let exportAllCount = 0;
    let layout;
    let content;
    let child;
    if (jsxRuntime === "classic" && pragmaFrag) {
      injectPragma(tree, "@jsxFrag", pragmaFrag);
    }
    if (jsxRuntime === "classic" && pragma) {
      injectPragma(tree, "@jsx", pragma);
    }
    if (jsxRuntime === "automatic" && jsxImportSource) {
      injectPragma(tree, "@jsxImportSource", jsxImportSource);
    }
    {
      injectPragma(tree, "@jsxRuntime", jsxRuntime);
    }
    if (jsxRuntime === "classic" && pragmaImportSource) {
      if (!pragma) {
        throw new Error(
          "Missing `pragma` in classic runtime with `pragmaImportSource`"
        );
      }
      handleEsm({
        type: "ImportDeclaration",
        specifiers: [
          {
            type: "ImportDefaultSpecifier",
            local: { type: "Identifier", name: pragma.split(".")[0] }
          }
        ],
        attributes: [],
        source: { type: "Literal", value: pragmaImportSource }
      });
    }
    for (child of tree.body) {
      if (child.type === "ExportDefaultDeclaration") {
        if (layout) {
          file.fail(
            "Unexpected duplicate layout, expected a single layout (previous: " + stringifyPosition(positionFromEstree(layout)) + ")",
            {
              ancestors: [tree, child],
              place: positionFromEstree(child),
              ruleId: "duplicate-layout",
              source: "recma-document"
            }
          );
        }
        layout = child;
        replacement.push({
          type: "VariableDeclaration",
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              id: { type: "Identifier", name: "MDXLayout" },
              init: isDeclaration(child.declaration) ? declarationToExpression(child.declaration) : child.declaration
            }
          ]
        });
      } else if (child.type === "ExportNamedDeclaration" && child.source) {
        const source = (
          /** @type {SimpleLiteral} */
          child.source
        );
        child.specifiers = child.specifiers.filter(function(specifier) {
          if (specifier.exported.type === "Identifier" && specifier.exported.name === "default") {
            if (layout) {
              file.fail(
                "Unexpected duplicate layout, expected a single layout (previous: " + stringifyPosition(positionFromEstree(layout)) + ")",
                {
                  ancestors: [tree, child, specifier],
                  place: positionFromEstree(child),
                  ruleId: "duplicate-layout",
                  source: "recma-document"
                }
              );
            }
            layout = specifier;
            const specifiers = [];
            if (specifier.local.type === "Identifier" && specifier.local.name === "default") {
              specifiers.push({
                type: "ImportDefaultSpecifier",
                local: { type: "Identifier", name: "MDXLayout" }
              });
            } else {
              const importSpecifier = {
                type: "ImportSpecifier",
                imported: specifier.local,
                local: { type: "Identifier", name: "MDXLayout" }
              };
              create(specifier.local, importSpecifier);
              specifiers.push(importSpecifier);
            }
            const from = { type: "Literal", value: source.value };
            create(source, from);
            const declaration = {
              type: "ImportDeclaration",
              specifiers,
              attributes: [],
              source: from
            };
            create(specifier, declaration);
            handleEsm(declaration);
            return false;
          }
          return true;
        });
        if (child.specifiers.length > 0) {
          handleExport(child);
        }
      } else if (child.type === "ExportNamedDeclaration" || child.type === "ExportAllDeclaration") {
        handleExport(child);
      } else if (child.type === "ImportDeclaration") {
        handleEsm(child);
      } else if (child.type === "ExpressionStatement" && (child.expression.type === "JSXElement" || child.expression.type === "JSXFragment")) {
        content = true;
        replacement.push(
          ...createMdxContent(child.expression, outputFormat, Boolean(layout))
        );
      } else {
        replacement.push(child);
      }
    }
    if (!content) {
      replacement.push(
        ...createMdxContent(void 0, outputFormat, Boolean(layout))
      );
    }
    exportedValues.push(["MDXContent", "default"]);
    if (outputFormat === "function-body") {
      replacement.push({
        type: "ReturnStatement",
        argument: {
          type: "ObjectExpression",
          properties: [
            ...Array.from({ length: exportAllCount }).map(
              /**
               * @param {undefined} _
               *   Nothing.
               * @param {number} index
               *   Index.
               * @returns {SpreadElement}
               *   Node.
               */
              function(_, index) {
                return {
                  type: "SpreadElement",
                  argument: {
                    type: "Identifier",
                    name: "_exportAll" + (index + 1)
                  }
                };
              }
            ),
            ...exportedValues.map(function(d) {
              const property = {
                type: "Property",
                kind: "init",
                method: false,
                computed: false,
                shorthand: typeof d === "string",
                key: {
                  type: "Identifier",
                  name: typeof d === "string" ? d : d[1]
                },
                value: {
                  type: "Identifier",
                  name: typeof d === "string" ? d : d[0]
                }
              };
              return property;
            })
          ]
        }
      });
    }
    tree.body = replacement;
    let usesImportMetaUrlVariable = false;
    let usesResolveDynamicHelper = false;
    if (baseHref || outputFormat === "function-body") {
      walk(tree, {
        enter(node) {
          if ((node.type === "ExportAllDeclaration" || node.type === "ExportNamedDeclaration" || node.type === "ImportDeclaration") && node.source) {
            let value = node.source.value;
            try {
              new URL(value);
            } catch {
              if (value.startsWith("/") || value.startsWith("./") || value.startsWith("../")) {
                value = new URL(value, baseHref).href;
              }
            }
            const replacement2 = { type: "Literal", value };
            create(node.source, replacement2);
            node.source = replacement2;
            return;
          }
          if (node.type === "ImportExpression") {
            usesResolveDynamicHelper = true;
            const replacement2 = {
              type: "CallExpression",
              callee: { type: "Identifier", name: "_resolveDynamicMdxSpecifier" },
              arguments: [node.source],
              optional: false
            };
            node.source = replacement2;
            return;
          }
          if (node.type === "MemberExpression" && "object" in node && node.object.type === "MetaProperty" && node.property.type === "Identifier" && node.object.meta.name === "import" && node.object.property.name === "meta" && node.property.name === "url") {
            usesImportMetaUrlVariable = true;
            const replacement2 = { type: "Identifier", name: "_importMetaUrl" };
            create(node, replacement2);
            this.replace(replacement2);
          }
        }
      });
    }
    if (usesResolveDynamicHelper) {
      if (!baseHref) {
        usesImportMetaUrlVariable = true;
      }
      tree.body.push(
        resolveDynamicMdxSpecifier(
          baseHref ? { type: "Literal", value: baseHref } : { type: "Identifier", name: "_importMetaUrl" }
        )
      );
    }
    if (usesImportMetaUrlVariable) {
      tree.body.unshift(...createImportMetaUrlVariable());
    }
    function handleExport(node) {
      if (node.type === "ExportNamedDeclaration") {
        if (node.declaration) {
          const visitors = createVisitors();
          walk(node, {
            enter(node2) {
              visitors.enter(node2);
              if (node2.type === "ArrowFunctionExpression" || node2.type === "FunctionDeclaration" || node2.type === "FunctionExpression") {
                this.skip();
                visitors.exit(node2);
              }
            },
            leave: visitors.exit
          });
          exportedValues.push(...visitors.scopes[0].defined);
        }
        for (child of node.specifiers) {
          if (child.exported.type === "Identifier") {
            exportedValues.push(child.exported.name);
          } else {
            ok(typeof child.exported.value === "string");
            exportedValues.push(child.exported.value);
          }
        }
      }
      handleEsm(node);
    }
    function handleEsm(node) {
      let replace;
      let init;
      if (outputFormat === "function-body") {
        if (
          // Always have a source:
          node.type === "ImportDeclaration" || node.type === "ExportAllDeclaration" || // Source optional:
          node.type === "ExportNamedDeclaration" && node.source
        ) {
          ok(node.source);
          const argument = { type: "ImportExpression", source: node.source };
          create(node, argument);
          init = { type: "AwaitExpression", argument };
          if ((node.type === "ImportDeclaration" || node.type === "ExportNamedDeclaration") && node.specifiers.length === 0) {
            replace = { type: "ExpressionStatement", expression: init };
          } else {
            replace = {
              type: "VariableDeclaration",
              kind: "const",
              declarations: node.type === "ExportAllDeclaration" ? [
                {
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: "_exportAll" + ++exportAllCount
                  },
                  init
                }
              ] : specifiersToDeclarations(node.specifiers, init)
            };
          }
        } else if (node.declaration) {
          replace = node.declaration;
        } else {
          const declarators = [];
          for (const specifier of node.specifiers) {
            if (specifier.exported.type === "Identifier" && specifier.local.type === "Identifier" && specifier.local.name !== specifier.exported.name) {
              declarators.push({
                type: "VariableDeclarator",
                id: specifier.exported,
                init: specifier.local
              });
            }
          }
          if (declarators.length > 0) {
            replace = {
              type: "VariableDeclaration",
              kind: "const",
              declarations: declarators
            };
          }
        }
      } else {
        replace = node;
      }
      if (replace) {
        replacement.push(replace);
      }
    }
  };
  function createMdxContent(content, outputFormat2, hasInternalLayout) {
    const element = {
      type: "JSXElement",
      openingElement: {
        type: "JSXOpeningElement",
        name: { type: "JSXIdentifier", name: "MDXLayout" },
        attributes: [
          {
            type: "JSXSpreadAttribute",
            argument: { type: "Identifier", name: "props" }
          }
        ],
        selfClosing: false
      },
      closingElement: {
        type: "JSXClosingElement",
        name: { type: "JSXIdentifier", name: "MDXLayout" }
      },
      children: [
        {
          type: "JSXElement",
          openingElement: {
            type: "JSXOpeningElement",
            name: { type: "JSXIdentifier", name: "_createMdxContent" },
            attributes: [
              {
                type: "JSXSpreadAttribute",
                argument: { type: "Identifier", name: "props" }
              }
            ],
            selfClosing: true
          },
          closingElement: null,
          children: []
        }
      ]
    };
    let result = (
      /** @type {Expression} */
      element
    );
    if (!hasInternalLayout) {
      result = {
        type: "ConditionalExpression",
        test: { type: "Identifier", name: "MDXLayout" },
        consequent: result,
        alternate: {
          type: "CallExpression",
          callee: { type: "Identifier", name: "_createMdxContent" },
          arguments: [{ type: "Identifier", name: "props" }],
          optional: false
        }
      };
    }
    let argument = (
      // Cast because TS otherwise does not think `JSXFragment`s are expressions.
      /** @type {Readonly<Expression> | Readonly<JSXFragment>} */
      content || { type: "Identifier", name: "undefined" }
    );
    if (argument.type === "JSXFragment" && argument.children.length === 1 && argument.children[0].type === "JSXElement") {
      argument = argument.children[0];
    }
    let awaitExpression = false;
    walk(argument, {
      enter(node) {
        if (node.type === "ArrowFunctionExpression" || node.type === "FunctionDeclaration" || node.type === "FunctionExpression") {
          return this.skip();
        }
        if (node.type === "AwaitExpression" || /* c8 ignore next 2 -- can only occur in a function (which then can
         * only be async, so skipped it) */
        node.type === "ForOfStatement" && node.await) {
          awaitExpression = true;
        }
      }
    });
    const declaration = {
      type: "FunctionDeclaration",
      id: { type: "Identifier", name: "MDXContent" },
      params: [
        {
          type: "AssignmentPattern",
          left: { type: "Identifier", name: "props" },
          right: { type: "ObjectExpression", properties: [] }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [{ type: "ReturnStatement", argument: result }]
      }
    };
    return [
      {
        type: "FunctionDeclaration",
        async: awaitExpression,
        id: { type: "Identifier", name: "_createMdxContent" },
        params: [{ type: "Identifier", name: "props" }],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              // Cast because TS doesn’t think `JSXFragment` is an expression.
              // eslint-disable-next-line object-shorthand
              argument: (
                /** @type {Expression} */
                argument
              )
            }
          ]
        }
      },
      outputFormat2 === "program" ? { type: "ExportDefaultDeclaration", declaration } : declaration
    ];
  }
}
function injectPragma(tree, name2, value) {
  tree.comments?.unshift({
    type: "Block",
    value: name2 + " " + value,
    data: { _mdxIsPragmaComment: true }
  });
}
function resolveDynamicMdxSpecifier(importMetaUrl) {
  return {
    type: "FunctionDeclaration",
    id: { type: "Identifier", name: "_resolveDynamicMdxSpecifier" },
    generator: false,
    async: false,
    params: [{ type: "Identifier", name: "d" }],
    body: {
      type: "BlockStatement",
      body: [
        {
          type: "IfStatement",
          test: {
            type: "BinaryExpression",
            left: {
              type: "UnaryExpression",
              operator: "typeof",
              prefix: true,
              argument: { type: "Identifier", name: "d" }
            },
            operator: "!==",
            right: { type: "Literal", value: "string" }
          },
          consequent: {
            type: "ReturnStatement",
            argument: { type: "Identifier", name: "d" }
          },
          alternate: null
        },
        // To do: use `URL.canParse` when widely supported (see commented
        // out code below).
        {
          type: "TryStatement",
          block: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "NewExpression",
                  callee: { type: "Identifier", name: "URL" },
                  arguments: [{ type: "Identifier", name: "d" }]
                }
              },
              {
                type: "ReturnStatement",
                argument: { type: "Identifier", name: "d" }
              }
            ]
          },
          handler: {
            type: "CatchClause",
            param: null,
            body: { type: "BlockStatement", body: [] }
          },
          finalizer: null
        },
        // To do: use `URL.canParse` when widely supported.
        // {
        //   type: 'IfStatement',
        //   test: {
        //     type: 'CallExpression',
        //     callee: toIdOrMemberExpression(['URL', 'canParse']),
        //     arguments: [{type: 'Identifier', name: 'd'}],
        //     optional: false
        //   },
        //   consequent: {
        //     type: 'ReturnStatement',
        //     argument: {type: 'Identifier', name: 'd'}
        //   },
        //   alternate: null
        // },
        {
          type: "IfStatement",
          test: {
            type: "LogicalExpression",
            left: {
              type: "LogicalExpression",
              left: {
                type: "CallExpression",
                callee: toIdOrMemberExpression(["d", "startsWith"]),
                arguments: [{ type: "Literal", value: "/" }],
                optional: false
              },
              operator: "||",
              right: {
                type: "CallExpression",
                callee: toIdOrMemberExpression(["d", "startsWith"]),
                arguments: [{ type: "Literal", value: "./" }],
                optional: false
              }
            },
            operator: "||",
            right: {
              type: "CallExpression",
              callee: toIdOrMemberExpression(["d", "startsWith"]),
              arguments: [{ type: "Literal", value: "../" }],
              optional: false
            }
          },
          consequent: {
            type: "ReturnStatement",
            argument: {
              type: "MemberExpression",
              object: {
                type: "NewExpression",
                callee: { type: "Identifier", name: "URL" },
                arguments: [{ type: "Identifier", name: "d" }, importMetaUrl]
              },
              property: { type: "Identifier", name: "href" },
              computed: false,
              optional: false
            }
          },
          alternate: null
        },
        {
          type: "ReturnStatement",
          argument: { type: "Identifier", name: "d" }
        }
      ]
    }
  };
}
function createImportMetaUrlVariable() {
  return [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: { type: "Identifier", name: "_importMetaUrl" },
          init: toIdOrMemberExpression(["arguments", 0, "baseUrl"])
        }
      ],
      kind: "const"
    },
    {
      type: "IfStatement",
      test: {
        type: "UnaryExpression",
        operator: "!",
        prefix: true,
        argument: { type: "Identifier", name: "_importMetaUrl" }
      },
      consequent: {
        type: "ThrowStatement",
        argument: {
          type: "NewExpression",
          callee: { type: "Identifier", name: "Error" },
          arguments: [
            {
              type: "Literal",
              value: "Unexpected missing `options.baseUrl` needed to support `export … from`, `import`, or `import.meta.url` when generating `function-body`"
            }
          ]
        }
      },
      alternate: null
    }
  ];
}
function toBinaryAddition(expressions) {
  let index = -1;
  let left;
  while (++index < expressions.length) {
    const right = expressions[index];
    left = left ? { type: "BinaryExpression", left, operator: "+", right } : right;
  }
  return left;
}
function recmaJsxRewrite(options) {
  const { development, outputFormat, providerImportSource } = options;
  return function(tree, file) {
    const visitors = createVisitors();
    const functionStack = [];
    let importProvider = false;
    let createErrorHelper = false;
    walk(tree, {
      enter(node) {
        visitors.enter(node);
        if (node.type === "FunctionDeclaration" || node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression") {
          functionStack.push({
            components: [],
            idToInvalidComponentName: /* @__PURE__ */ new Map(),
            node,
            objects: [],
            references: {},
            tags: []
          });
          if (isNamedFunction(node, "MDXContent") && !inScope(visitors.scopes, "MDXLayout")) {
            functionStack[0].components.push("MDXLayout");
          }
        }
        const functionInfo = functionStack[0];
        if (!functionInfo || !isNamedFunction(functionInfo.node, "_createMdxContent") && !providerImportSource) {
          return;
        }
        if (node.type === "JSXElement") {
          let name$1 = node.openingElement.name;
          if (name$1.type === "JSXMemberExpression") {
            const ids = [];
            while (name$1.type === "JSXMemberExpression") {
              ids.unshift(name$1.property.name);
              name$1 = name$1.object;
            }
            ids.unshift(name$1.name);
            const fullId = ids.join(".");
            const id = name$1.name;
            const isInScope = inScope(visitors.scopes, id);
            if (!Object.hasOwn(functionInfo.references, fullId) && (!isInScope || // If the parent scope is `_createMdxContent`, then this
            // references a component we can add a check statement for.
            functionStack.length === 1 && functionStack[0].node.type === "FunctionDeclaration" && isNamedFunction(functionStack[0].node, "_createMdxContent"))) {
              functionInfo.references[fullId] = { component: true, node };
            }
            if (!functionInfo.objects.includes(id) && !isInScope) {
              functionInfo.objects.push(id);
            }
          } else if (name$1.type === "JSXNamespacedName") ;
          else if (name(name$1.name) && !/^[a-z]/.test(name$1.name)) {
            const id = name$1.name;
            if (!inScope(visitors.scopes, id)) {
              if (id !== "MDXLayout" && !Object.hasOwn(functionInfo.references, id)) {
                functionInfo.references[id] = { component: true, node };
              }
              if (!functionInfo.components.includes(id)) {
                functionInfo.components.push(id);
              }
            }
          } else if (node.data && node.data._mdxExplicitJsx) ;
          else {
            const id = name$1.name;
            if (!functionInfo.tags.includes(id)) {
              functionInfo.tags.push(id);
            }
            let jsxIdExpression = ["_components", id];
            if (name(id) === false) {
              let invalidComponentName = functionInfo.idToInvalidComponentName.get(id);
              if (invalidComponentName === void 0) {
                invalidComponentName = `_component${functionInfo.idToInvalidComponentName.size}`;
                functionInfo.idToInvalidComponentName.set(
                  id,
                  invalidComponentName
                );
              }
              jsxIdExpression = [invalidComponentName];
            }
            node.openingElement.name = toJsxIdOrMemberExpression(jsxIdExpression);
            if (node.closingElement) {
              node.closingElement.name = toJsxIdOrMemberExpression(jsxIdExpression);
            }
          }
        }
      },
      leave(node) {
        visitors.exit(node);
        const defaults = [];
        const actual = [];
        const parameters = [];
        const declarations = [];
        if (node.type === "FunctionDeclaration" || node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression") {
          const functionInfo = functionStack[functionStack.length - 1];
          let name$1;
          for (name$1 of functionInfo.tags.sort()) {
            defaults.push({
              type: "Property",
              kind: "init",
              key: name(name$1) ? { type: "Identifier", name: name$1 } : { type: "Literal", value: name$1 },
              value: { type: "Literal", value: name$1 },
              method: false,
              shorthand: false,
              computed: false
            });
          }
          actual.push(...functionInfo.components);
          for (name$1 of functionInfo.objects) {
            if (!actual.includes(name$1)) {
              actual.push(name$1);
            }
          }
          actual.sort();
          const statements = [];
          if (defaults.length > 0 || actual.length > 0 || functionInfo.idToInvalidComponentName.size > 0) {
            if (providerImportSource) {
              importProvider = true;
              parameters.push({
                type: "CallExpression",
                callee: { type: "Identifier", name: "_provideComponents" },
                arguments: [],
                optional: false
              });
            }
            if (isNamedFunction(functionInfo.node, "MDXContent") || isNamedFunction(functionInfo.node, "_createMdxContent")) {
              parameters.push(toIdOrMemberExpression(["props", "components"]));
            }
            if (defaults.length > 0 || parameters.length > 1) {
              for (const parameter of parameters) {
                defaults.push({ type: "SpreadElement", argument: parameter });
              }
            }
            let componentsInit = defaults.length > 0 ? { type: "ObjectExpression", properties: defaults } : (
              // If we’re only getting components from `props.components`,
              // make sure it’s defined.
              {
                type: "LogicalExpression",
                operator: "||",
                left: parameters[0],
                right: { type: "ObjectExpression", properties: [] }
              }
            );
            let componentsPattern;
            if (actual.length > 0) {
              componentsPattern = {
                type: "ObjectPattern",
                properties: actual.map(function(name2) {
                  return {
                    type: "Property",
                    kind: "init",
                    key: {
                      type: "Identifier",
                      name: name2 === "MDXLayout" ? "wrapper" : name2
                    },
                    value: { type: "Identifier", name: name2 },
                    method: false,
                    shorthand: name2 !== "MDXLayout",
                    computed: false
                  };
                })
              };
            }
            if (functionInfo.tags.length > 0) {
              declarations.push({
                type: "VariableDeclarator",
                id: { type: "Identifier", name: "_components" },
                init: componentsInit
              });
              componentsInit = { type: "Identifier", name: "_components" };
            }
            if (isNamedFunction(functionInfo.node, "_createMdxContent")) {
              for (const [id, componentName] of [
                ...functionInfo.idToInvalidComponentName
              ].sort(function([a], [b]) {
                return a.localeCompare(b);
              })) {
                declarations.push({
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: componentName
                  },
                  init: {
                    type: "MemberExpression",
                    object: { type: "Identifier", name: "_components" },
                    property: { type: "Literal", value: id },
                    computed: true,
                    optional: false
                  }
                });
              }
            }
            if (componentsPattern) {
              declarations.push({
                type: "VariableDeclarator",
                id: componentsPattern,
                init: componentsInit
              });
            }
            if (declarations.length > 0) {
              statements.push({
                type: "VariableDeclaration",
                kind: "const",
                declarations
              });
            }
          }
          let key;
          for (key in functionInfo.references) {
            if (Object.hasOwn(functionInfo.references, key)) {
              const parts = key.split(".");
              let index2 = 0;
              while (++index2 < parts.length) {
                const partial = parts.slice(0, index2).join(".");
                if (!Object.hasOwn(functionInfo.references, partial)) {
                  functionInfo.references[partial] = {
                    component: false,
                    node: functionInfo.references[key].node
                  };
                }
              }
            }
          }
          const references = Object.keys(functionInfo.references).sort();
          let index = -1;
          while (++index < references.length) {
            const id = references[index];
            const info = functionInfo.references[id];
            const place = stringifyPosition(positionFromEstree(info.node));
            const parameters2 = [
              { type: "Literal", value: id },
              { type: "Literal", value: info.component }
            ];
            createErrorHelper = true;
            if (development && place) {
              parameters2.push({ type: "Literal", value: place });
            }
            statements.push({
              type: "IfStatement",
              test: {
                type: "UnaryExpression",
                operator: "!",
                prefix: true,
                argument: toIdOrMemberExpression(id.split("."))
              },
              consequent: {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: { type: "Identifier", name: "_missingMdxReference" },
                  arguments: parameters2,
                  optional: false
                }
              },
              alternate: void 0
            });
          }
          if (statements.length > 0) {
            if (node.body.type !== "BlockStatement") {
              node.body = {
                type: "BlockStatement",
                body: [{ type: "ReturnStatement", argument: node.body }]
              };
            }
            node.body.body.unshift(...statements);
          }
          functionStack.pop();
        }
      }
    });
    if (importProvider && providerImportSource) {
      tree.body.unshift(
        createImportProvider(providerImportSource, outputFormat)
      );
    }
    if (createErrorHelper) {
      const message = [
        { type: "Literal", value: "Expected " },
        {
          type: "ConditionalExpression",
          test: { type: "Identifier", name: "component" },
          consequent: { type: "Literal", value: "component" },
          alternate: { type: "Literal", value: "object" }
        },
        { type: "Literal", value: " `" },
        { type: "Identifier", name: "id" },
        {
          type: "Literal",
          value: "` to be defined: you likely forgot to import, pass, or provide it."
        }
      ];
      const parameters = [
        { type: "Identifier", name: "id" },
        { type: "Identifier", name: "component" }
      ];
      if (development) {
        message.push({
          type: "ConditionalExpression",
          test: { type: "Identifier", name: "place" },
          consequent: toBinaryAddition([
            { type: "Literal", value: "\nIt’s referenced in your code at `" },
            { type: "Identifier", name: "place" },
            {
              type: "Literal",
              value: (file.path ? "` in `" + file.path : "") + "`"
            }
          ]),
          alternate: { type: "Literal", value: "" }
        });
        parameters.push({ type: "Identifier", name: "place" });
      }
      tree.body.push({
        type: "FunctionDeclaration",
        id: { type: "Identifier", name: "_missingMdxReference" },
        generator: false,
        async: false,
        params: parameters,
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ThrowStatement",
              argument: {
                type: "NewExpression",
                callee: { type: "Identifier", name: "Error" },
                arguments: [toBinaryAddition(message)]
              }
            }
          ]
        }
      });
    }
    if (outputFormat === "function-body") {
      tree.body.unshift({
        type: "ExpressionStatement",
        expression: { type: "Literal", value: "use strict" },
        directive: "use strict"
      });
    }
  };
}
function createImportProvider(providerImportSource, outputFormat) {
  const specifiers = [
    {
      type: "ImportSpecifier",
      imported: { type: "Identifier", name: "useMDXComponents" },
      local: { type: "Identifier", name: "_provideComponents" }
    }
  ];
  return outputFormat === "function-body" ? {
    type: "VariableDeclaration",
    kind: "const",
    declarations: specifiersToDeclarations(
      specifiers,
      toIdOrMemberExpression(["arguments", 0])
    )
  } : {
    type: "ImportDeclaration",
    specifiers,
    attributes: [],
    source: { type: "Literal", value: providerImportSource }
  };
}
function isNamedFunction(node, name2) {
  return Boolean(node && "id" in node && node.id && node.id.name === name2);
}
function inScope(scopes, id) {
  let index = scopes.length;
  while (index--) {
    const scope = scopes[index];
    if (scope.defined.includes(id)) {
      return true;
    }
  }
  return false;
}
function rehypeRemoveRaw() {
  return function(tree) {
    visit(tree, "raw", function(_, index, parent) {
      if (parent && typeof index === "number") {
        parent.children.splice(index, 1);
        return index;
      }
    });
  };
}
function remarkMarkAndUnravel() {
  return function(tree) {
    visit(tree, function(node, index, parent) {
      let offset = -1;
      let all = true;
      let oneOrMore = false;
      if (parent && typeof index === "number" && node.type === "paragraph") {
        const children = node.children;
        while (++offset < children.length) {
          const child = children[offset];
          if (child.type === "mdxJsxTextElement" || child.type === "mdxTextExpression") {
            oneOrMore = true;
          } else if (child.type === "text" && collapseWhiteSpace(child.value, { style: "html", trim: true }) === "") ;
          else {
            all = false;
            break;
          }
        }
        if (all && oneOrMore) {
          offset = -1;
          const newChildren = [];
          while (++offset < children.length) {
            const child = children[offset];
            if (child.type === "mdxJsxTextElement") {
              child.type = "mdxJsxFlowElement";
            }
            if (child.type === "mdxTextExpression") {
              child.type = "mdxFlowExpression";
            }
            if (child.type === "text" && /^[\t\r\n ]+$/.test(String(child.value))) ;
            else {
              newChildren.push(child);
            }
          }
          parent.children.splice(index, 1, ...newChildren);
          return index;
        }
      }
      if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
        const data = node.data || (node.data = {});
        data._mdxExplicitJsx = true;
      }
      if ((node.type === "mdxFlowExpression" || node.type === "mdxTextExpression" || node.type === "mdxjsEsm") && node.data && node.data.estree) {
        walk(node.data.estree, {
          enter(node2) {
            if (node2.type === "JSXElement") {
              const data = node2.data || (node2.data = {});
              data._mdxExplicitJsx = true;
            }
          }
        });
      }
    });
  };
}
const nodeTypes = (
  /** @type {const} */
  [
    "mdxFlowExpression",
    "mdxJsxFlowElement",
    "mdxJsxTextElement",
    "mdxTextExpression",
    "mdxjsEsm"
  ]
);
let warned = false;
function createProcessor(options) {
  const settings = options || {};
  if (settings.format === "detect") ;
  if ((settings.jsxRuntime === "classic" || settings.pragma || settings.pragmaFrag || settings.pragmaImportSource) && !warned) {
    warned = true;
    console.warn(
      "Unexpected deprecated option `jsxRuntime: 'classic'`, `pragma`, `pragmaFrag`, or `pragmaImportSource`; see <https://mdxjs.com/migrating/v3/> on how to migrate"
    );
  }
  const pipeline = unified().use(remarkParse);
  if (settings.format !== "md") {
    pipeline.use(remarkMdx);
  }
  const remarkRehypeOptions = settings.remarkRehypeOptions || {};
  pipeline.use(remarkMarkAndUnravel).use(settings.remarkPlugins || []).use(remarkRehype, {
    ...remarkRehypeOptions,
    allowDangerousHtml: true,
    passThrough: [...remarkRehypeOptions.passThrough || [], ...nodeTypes]
  }).use(settings.rehypePlugins || []);
  if (settings.format === "md") {
    pipeline.use(rehypeRemoveRaw);
  }
  pipeline.use(rehypeRecma, settings).use(recmaDocument, settings).use(recmaJsxRewrite, settings);
  if (!settings.jsx) {
    pipeline.use(recmaJsx, settings).use(recmaBuildJsxTransform, settings);
  }
  pipeline.use(recmaJsx$1).use(recmaStringify, settings).use(settings.recmaPlugins || []);
  return pipeline;
}
const md = markdownExtension.map(function(d) {
  return "." + d;
});
const mdx = [".mdx"];
function resolveFileAndOptions(vfileCompatible, options) {
  const file = looksLikeAVFile(vfileCompatible) ? vfileCompatible : new VFile(vfileCompatible);
  const { format, ...rest } = options || {};
  return {
    file,
    options: {
      format: format === "md" || format === "mdx" ? format : file.extname && (rest.mdExtensions || md).includes(file.extname) ? "md" : "mdx",
      ...rest
    }
  };
}
function looksLikeAVFile(value) {
  return Boolean(
    value && typeof value === "object" && "message" in value && "messages" in value
  );
}
function createFormatAwareProcessors(compileOptions) {
  const compileOptions_ = compileOptions || {};
  const mdExtensions = compileOptions_.mdExtensions || md;
  const mdxExtensions = compileOptions_.mdxExtensions || mdx;
  let cachedMarkdown;
  let cachedMdx;
  return {
    extnames: compileOptions_.format === "md" ? mdExtensions : compileOptions_.format === "mdx" ? mdxExtensions : [...mdExtensions, ...mdxExtensions],
    process
  };
  function process(vfileCompatible) {
    const { file, processor } = split(vfileCompatible);
    return processor.process(file);
  }
  function split(vfileCompatible) {
    const { file, options } = resolveFileAndOptions(
      vfileCompatible,
      compileOptions_
    );
    const processor = options.format === "md" ? cachedMarkdown || (cachedMarkdown = createProcessor(options)) : cachedMdx || (cachedMdx = createProcessor(options));
    return { file, processor };
  }
}
function extnamesToRegex(extnames) {
  return new RegExp(
    "\\.(" + extnames.map(function(d) {
      return d.slice(1);
    }).join("|") + ")([?#]|$)"
  );
}
export {
  createFormatAwareProcessors as c,
  extnamesToRegex as e
};
