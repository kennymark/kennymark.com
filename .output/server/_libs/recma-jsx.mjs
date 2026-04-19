import { a as acornJsx } from "./acorn-jsx.mjs";
import { j as jsx } from "./estree-util-to-js.mjs";
function recmaJsx() {
  const data = this.data();
  const settings = data.settings || (data.settings = {});
  const handlers = settings.handlers || (settings.handlers = {});
  const plugins = settings.plugins || (settings.plugins = []);
  plugins.push(acornJsx());
  Object.assign(handlers, jsx);
}
export {
  recmaJsx as r
};
