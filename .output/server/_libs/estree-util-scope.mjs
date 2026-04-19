import { o as ok } from "./devlop.mjs";
function createVisitors() {
  const scopes = [{ block: false, defined: [] }];
  return { enter, exit, scopes };
  function enter(node) {
    if (node.type === "ArrowFunctionExpression") {
      scopes.push({ block: false, defined: [] });
      for (const parameter of node.params) {
        definePattern(parameter, false);
      }
    } else if (node.type === "BlockStatement" || node.type === "DoWhileStatement" || node.type === "ForInStatement" || node.type === "ForOfStatement" || node.type === "ForStatement" || node.type === "WhileStatement") {
      scopes.push({ block: true, defined: [] });
    } else if (node.type === "CatchClause") {
      scopes.push({ block: true, defined: [] });
      if (node.param) definePattern(node.param, true);
    } else if (node.type === "ClassDeclaration") {
      defineIdentifier(node.id.name, false);
    } else if (node.type === "FunctionDeclaration") {
      defineIdentifier(node.id.name, false);
      scopes.push({ block: false, defined: [] });
      for (const parameter of node.params) {
        definePattern(parameter, false);
      }
    } else if (node.type === "FunctionExpression") {
      if (node.id) defineIdentifier(node.id.name, false);
      scopes.push({ block: false, defined: [] });
      for (const parameter of node.params) {
        definePattern(parameter, false);
      }
    } else if (node.type === "ImportDeclaration") {
      for (const specifier of node.specifiers) {
        defineIdentifier(specifier.local.name, false);
      }
    } else if (node.type === "VariableDeclaration") {
      for (const declaration of node.declarations) {
        definePattern(declaration.id, node.kind !== "var");
      }
    }
  }
  function exit(node) {
    if (node.type === "ArrowFunctionExpression" || node.type === "FunctionDeclaration" || node.type === "FunctionExpression") {
      const scope = scopes.pop();
      ok(!scope.block);
    } else if (node.type === "BlockStatement" || node.type === "CatchClause" || node.type === "DoWhileStatement" || node.type === "ForInStatement" || node.type === "ForOfStatement" || node.type === "ForStatement" || node.type === "WhileStatement") {
      const scope = scopes.pop();
      ok(scope.block);
    }
  }
  function defineIdentifier(id, block) {
    let index = scopes.length;
    let scope;
    while (index--) {
      scope = scopes[index];
      if (block || !scope.block) {
        break;
      }
    }
    scope.defined.push(id);
  }
  function definePattern(pattern, block) {
    if (pattern.type === "ArrayPattern") {
      for (const element of pattern.elements) {
        if (element) {
          definePattern(element, block);
        }
      }
    } else if (pattern.type === "AssignmentPattern") {
      definePattern(pattern.left, block);
    } else if (pattern.type === "Identifier") {
      defineIdentifier(pattern.name, block);
    } else if (pattern.type === "ObjectPattern") {
      for (const property of pattern.properties) {
        if (property.type === "Property") {
          definePattern(property.value, block);
        } else {
          ok(property.type === "RestElement");
          definePattern(property, block);
        }
      }
    } else {
      ok(pattern.type === "RestElement");
      definePattern(pattern.argument, block);
    }
  }
}
export {
  createVisitors as c
};
