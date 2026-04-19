function positionFromEstree(node) {
  const nodeLike = node || {};
  const loc = nodeLike.loc || {};
  const range = nodeLike.range || [void 0, void 0];
  const start = pointOrUndefined(loc.start, range[0] || nodeLike.start);
  const end = pointOrUndefined(loc.end, range[1] || nodeLike.end);
  if (start && end) {
    return { start, end };
  }
}
function pointOrUndefined(estreePoint, estreeOffset) {
  if (estreePoint && typeof estreePoint === "object") {
    const line = "line" in estreePoint ? numberOrUndefined(estreePoint.line) : void 0;
    const column = "column" in estreePoint ? numberOrUndefined(estreePoint.column) : void 0;
    if (line && column !== void 0) {
      return {
        line,
        column: column + 1,
        offset: numberOrUndefined(estreeOffset)
      };
    }
  }
}
function numberOrUndefined(value) {
  return typeof value === "number" && value > -1 ? value : void 0;
}
export {
  positionFromEstree as p
};
