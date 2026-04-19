import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { p as portfolioProjects, s as slug, m as moreProjects } from "./router-swvbRbiQ.mjs";
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
const tabs = ["showcase", "fullstack", "frontend", "mobile"];
function ProjectsRoute() {
  const [active, setActive] = reactExports.useState("showcase");
  const projects = reactExports.useMemo(() => {
    if (active === "showcase") return portfolioProjects.filter((p) => p.showCase);
    return portfolioProjects.filter((p) => p.tag === active);
  }, [active]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display text-5xl sm:text-7xl", children: [
        "Things I've",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "built" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-lg text-[color:var(--muted)]", children: "A mix of client work, personal projects, and experiments. Filter by discipline or scroll the lot." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--line)] pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActive(tab), "aria-pressed": active === tab, className: `rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${active === tab ? "bg-[color:var(--ink)] text-[color:var(--bg)]" : "bg-[color:var(--surface)] text-[color:var(--muted)] ring-1 ring-[color:var(--line)] hover:text-[color:var(--ink)]"}`, children: tab }, tab)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted)]", children: [
        projects.length,
        " project",
        projects.length === 1 ? "" : "s"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid gap-6 md:grid-cols-2", children: projects.map((project, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/project/$slug", params: {
      slug: slug(project.name)
    }, className: "group relative block overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] transition-all hover:border-[color:var(--ink)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--surface-2)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.image, alt: project.name, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--ink)]/90 text-[color:var(--bg)] opacity-0 transition-opacity group-hover:opacity-100", children: "↗" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--faint)] capitalize", children: project.tag ?? "project" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-2xl tracking-tight", children: project.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-sm text-[color:var(--muted)]", children: project.description })
      ] }) })
    ] }, project.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6 pt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-3xl sm:text-4xl", children: "More things" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted)]", children: [
          moreProjects.length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-[color:var(--line)] overflow-hidden rounded-2xl bg-[color:var(--surface)] ring-1 ring-[color:var(--line)]", children: moreProjects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 items-center gap-4 px-5 py-4 sm:py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 sm:col-span-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium tracking-tight", children: project.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[color:var(--muted)]", children: project.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-12 flex justify-end sm:col-span-3", children: project.link ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: project.link, target: "_blank", rel: "noreferrer", className: "group inline-flex items-center gap-1.5 text-sm text-[color:var(--ink)] hover:text-[color:var(--accent)]", children: [
          "Visit",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform group-hover:translate-x-0.5", children: "↗" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[color:var(--faint)]", children: "Retired" }) })
      ] }) }, project.name)) })
    ] })
  ] });
}
export {
  ProjectsRoute as component
};
