import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as ago, N as NewsletterForm } from "./newsletter-form-Ct-RF-Cv.mjs";
import { e as Route$7 } from "./router-swvbRbiQ.mjs";
import "../_libs/dayjs.mjs";
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
function BlogIndexRoute() {
  const posts = Route$7.useLoaderData();
  const [featured, ...rest] = posts;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Writing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display text-5xl sm:text-7xl", children: [
        "Notes & ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "essays" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-lg text-[color:var(--muted)]", children: "Things I've learned shipping software, cross-posted from dev.to. Occasionally opinionated, always trying to be useful." })
    ] }),
    featured ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
      slug: featured.slug
    }, className: "group grid gap-6 rounded-3xl bg-[color:var(--surface)] p-6 ring-1 ring-[color:var(--line)] transition-all hover:ring-[color:var(--ink)]/30 sm:p-10 md:grid-cols-[2fr_3fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Latest post" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl", children: featured.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[color:var(--muted)]", children: featured.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-[color:var(--muted)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            featured.timeToRead,
            " min read"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ago(featured.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto inline-flex items-center gap-1 text-[color:var(--accent)] transition-transform group-hover:translate-x-0.5", children: "Read it →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden rounded-2xl bg-[color:var(--surface-2)] md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col justify-between p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "Essay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "Engineering" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-7xl leading-none text-[color:var(--accent)]", children: "“" })
      ] }) })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-end justify-between pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-3xl", children: "More posts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[color:var(--muted)]", children: [
          rest.length,
          " post",
          rest.length === 1 ? "" : "s"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-[color:var(--line)] overflow-hidden rounded-2xl bg-[color:var(--surface)] ring-1 ring-[color:var(--line)]", children: rest.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
        slug: post.slug
      }, className: "group grid grid-cols-12 items-baseline gap-4 px-5 py-5 transition-colors hover:bg-[color:var(--surface-2)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("time", { dateTime: post.date, className: "col-span-3 text-xs text-[color:var(--muted)] sm:col-span-2", children: new Date(post.date).getFullYear() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-9 sm:col-span-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl tracking-tight sm:text-2xl", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-[color:var(--muted)]", children: post.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 flex items-center justify-end gap-3 text-xs text-[color:var(--muted)] sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            post.timeToRead,
            " min"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 transition-opacity group-hover:opacity-100", children: "↗" })
        ] })
      ] }) }, post.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterForm, {})
  ] });
}
export {
  BlogIndexRoute as component
};
