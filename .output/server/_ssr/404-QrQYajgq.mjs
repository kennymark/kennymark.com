import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/scheduler.mjs";
import "stream";
import "util";
import "../_libs/isbot.mjs";
function Error404Route() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex min-h-[60vh] flex-col items-start justify-center gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display text-[clamp(4rem,18vw,14rem)] leading-none text-[color:var(--accent)]", children: "404." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-lg text-[color:var(--muted)]", children: "The page you're looking for has wandered off. Let's find you something that exists." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-accent", children: "Take me home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", className: "btn-ghost", children: "Browse work" })
    ] })
  ] });
}
export {
  Error404Route as component
};
