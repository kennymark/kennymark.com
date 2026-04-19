import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Route$g } from "./router-swvbRbiQ.mjs";
import "../_libs/axios.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sendgrid__mail.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/scheduler.mjs";
import "stream";
import "util";
import "../_libs/isbot.mjs";
import "./devblog-B8viLmY8.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/sendgrid__client.mjs";
import "../_libs/sendgrid__helpers.mjs";
import "fs";
import "path";
import "../_libs/deepmerge.mjs";
import "zlib";
import "http";
import "https";
import "../_libs/follow-redirects.mjs";
import "url";
import "assert";
import "../_libs/debug.mjs";
import "tty";
import "../_libs/ms.mjs";
function SlashesRoute() {
  const redirects = Route$g.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "/slashes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display text-5xl sm:text-6xl", children: [
        "My personal ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "URL shortener" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[color:var(--muted)]", children: [
        "Each link routes through ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "kennymark.com" }),
        ". Tap to open."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-[color:var(--line)] overflow-hidden rounded-2xl bg-[color:var(--surface)] ring-1 ring-[color:var(--line)]", children: redirects.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: item.destination, target: "_blank", rel: "noreferrer", className: "group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[color:var(--surface-2)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-[color:var(--ink)]", children: [
        "/",
        item.source.replace("/", "")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden flex-1 truncate px-4 font-mono text-xs text-[color:var(--muted)] sm:inline", children: [
        "→ ",
        item.destination
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]", children: "↗" })
    ] }) }, item.source)) })
  ] });
}
export {
  SlashesRoute as component
};
