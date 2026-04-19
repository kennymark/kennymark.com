function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}
const own = {}.hasOwnProperty;
const CONTINUE = /* @__PURE__ */ Symbol("continue");
const EXIT = /* @__PURE__ */ Symbol("exit");
const SKIP = /* @__PURE__ */ Symbol("skip");
function visit(tree, visitor) {
  let enter;
  let leave;
  if (typeof visitor === "function") {
    enter = visitor;
  } else if (visitor && typeof visitor === "object") {
    if (visitor.enter) enter = visitor.enter;
    if (visitor.leave) leave = visitor.leave;
  }
  build(tree, void 0, void 0, [])();
  function build(node, key, index, parents) {
    if (nodelike(node)) {
      visit2.displayName = "node (" + color(node.type) + ")";
    }
    return visit2;
    function visit2() {
      const result = enter ? toResult(enter(node, key, index, parents)) : [];
      if (result[0] === EXIT) {
        return result;
      }
      if (result[0] !== SKIP) {
        let cKey;
        for (cKey in node) {
          if (own.call(node, cKey) && node[cKey] && typeof node[cKey] === "object" && // @ts-expect-error: custom esast extension.
          cKey !== "data" && // @ts-expect-error: custom esast extension.
          cKey !== "position") {
            const grandparents = parents.concat(node);
            const value = node[cKey];
            if (Array.isArray(value)) {
              const nodes = (
                /** @type {Array<unknown>} */
                value
              );
              let cIndex = 0;
              while (cIndex > -1 && cIndex < nodes.length) {
                const subvalue = nodes[cIndex];
                if (nodelike(subvalue)) {
                  const subresult = build(
                    subvalue,
                    cKey,
                    cIndex,
                    grandparents
                  )();
                  if (subresult[0] === EXIT) return subresult;
                  cIndex = typeof subresult[1] === "number" ? subresult[1] : cIndex + 1;
                } else {
                  cIndex++;
                }
              }
            } else if (nodelike(value)) {
              const subresult = build(value, cKey, void 0, grandparents)();
              if (subresult[0] === EXIT) return subresult;
            }
          }
        }
      }
      return leave ? toResult(leave(node, key, index, parents)) : result;
    }
  }
}
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return [value];
}
function nodelike(value) {
  return Boolean(
    value && typeof value === "object" && "type" in value && typeof value.type === "string" && value.type.length > 0
  );
}
export {
  visit as v
};
