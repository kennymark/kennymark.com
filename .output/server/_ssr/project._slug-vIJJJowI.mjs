import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as Route$6 } from "./router-swvbRbiQ.mjs";
import "../_libs/axios.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sendgrid__mail.mjs";
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
function ProjectDetailRoute() {
  const project = Route$6.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projects", className: "inline-flex items-center gap-1.5 text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "←" }),
      " Back to work"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow capitalize", children: [
          project.tag ?? "Project",
          " ",
          project.showCase ? "· Showcase" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display text-5xl capitalize sm:text-7xl", children: project.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-lg text-[color:var(--muted)]", children: project.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          project.link ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: project.link, target: "_blank", rel: "noreferrer", className: "btn-accent", children: [
            "Live demo ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "↗" })
          ] }) : null,
          project.source ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: project.source, target: "_blank", rel: "noreferrer", className: "btn-ghost", children: "Source ↗" }) : null
        ] })
      ] }),
      project.stack?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "grid gap-3 rounded-3xl bg-[color:var(--surface)] p-6 ring-1 ring-[color:var(--line)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Stack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-1.5 text-sm text-[color:var(--ink)]", children: project.stack.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" }),
          item
        ] }, item)) })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { className: "overflow-hidden rounded-3xl bg-[color:var(--surface-2)] ring-1 ring-[color:var(--line)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.image, alt: project.name, className: "aspect-[16/9] w-full object-cover", loading: "lazy" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex items-center justify-between border-t border-[color:var(--line)] pt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", className: "btn-ghost", children: "← All projects" }),
      project.link ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: project.link, target: "_blank", rel: "noreferrer", className: "btn-accent", children: "Visit project ↗" }) : null
    ] })
  ] });
}
export {
  ProjectDetailRoute as component
};
