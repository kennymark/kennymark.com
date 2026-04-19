const own = {}.hasOwnProperty;
const emptyComments = [];
function attachComments(tree, comments) {
  const list = comments ? [...comments].sort(compare) : emptyComments;
  if (list.length > 0) walk(tree, { comments: list, index: 0 });
}
function walk(node, state) {
  if (state.index === state.comments.length) {
    return;
  }
  const children = [];
  const comments = [];
  let key;
  for (key in node) {
    if (own.call(node, key)) {
      const value = node[key];
      if (value && typeof value === "object" && key !== "comments") {
        if (Array.isArray(value)) {
          let index2 = -1;
          while (++index2 < value.length) {
            if (value[index2] && typeof value[index2].type === "string") {
              children.push(value[index2]);
            }
          }
        } else if (typeof value.type === "string") {
          children.push(value);
        }
      }
    }
  }
  children.sort(compare);
  comments.push(...slice(state, node, false, { leading: true, trailing: false }));
  let index = -1;
  while (++index < children.length) {
    walk(children[index], state);
  }
  comments.push(
    ...slice(state, node, true, {
      leading: false,
      trailing: children.length > 0
    })
  );
  if (comments.length > 0) {
    node.comments = comments;
  }
}
function slice(state, node, compareEnd, fields) {
  const result = [];
  while (state.comments[state.index] && compare(state.comments[state.index], node, compareEnd) < 1) {
    result.push(Object.assign({}, state.comments[state.index++], fields));
  }
  return result;
}
function compare(left, right, compareEnd) {
  const field = compareEnd ? "end" : "start";
  if (left.range && right.range) {
    return left.range[0] - right.range[compareEnd ? 1 : 0];
  }
  if (left.loc && left.loc.start && right.loc && right.loc[field]) {
    return left.loc.start.line - right.loc[field].line || left.loc.start.column - right.loc[field].column;
  }
  if ("start" in left && field in right) {
    return left.start - right[field];
  }
  return Number.NaN;
}
export {
  attachComments as a
};
