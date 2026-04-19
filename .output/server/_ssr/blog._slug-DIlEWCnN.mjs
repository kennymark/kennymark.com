import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as clientExports } from "../_libs/mdx-bundler.mjs";
import { a as ago, N as NewsletterForm } from "./newsletter-form-Ct-RF-Cv.mjs";
import { g as Route$5 } from "./router-swvbRbiQ.mjs";
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
import "string_decoder";
import "../_libs/babel__runtime.mjs";
import "fs";
import "path";
import "../_libs/gray-matter.mjs";
import "../_libs/section-matter.mjs";
import "../_libs/kind-of.mjs";
import "../_libs/extend-shallow.mjs";
import "../_libs/is-extendable.mjs";
import "../_libs/js-yaml.mjs";
import "../_libs/strip-bom-string.mjs";
import "../_libs/esbuild.mjs";
import "os";
import "child_process";
import "crypto";
import "tty";
import "../_libs/esbuild-plugins__node-resolve.mjs";
import "../_libs/escape-string-regexp.mjs";
import "module";
import "../_libs/resolve.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/path-parse.mjs";
import "../_libs/is-core-module.mjs";
import "../_libs/hasown.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/@fal-works/esbuild-plugin-global-externals+[...].mjs";
import "../_libs/uuid.mjs";
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
import "../_libs/deepmerge.mjs";
import "zlib";
import "http";
import "https";
import "../_libs/follow-redirects.mjs";
import "url";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
function BlogPostRoute() {
  const post = Route$5.useLoaderData();
  const Component = reactExports.useMemo(() => clientExports.getMDXComponent(post.code), [post.code]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl space-y-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-1.5 text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "←" }),
      " All writing"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-5 border-b border-[color:var(--line)] pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
        "Essay · ",
        new Date(post.date).getFullYear()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display text-4xl leading-[1.05] sm:text-6xl", children: post.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-[color:var(--muted)]", children: post.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          post.timeToRead,
          " min read"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-[color:var(--line)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ago(post.date) })
      ] })
    ] }),
    post.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.coverImage, alt: post.title, className: "w-full rounded-2xl border border-[color:var(--line)] object-cover" }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "prose max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { components: mdxComponents }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterForm, {})
  ] });
}
const mdxComponents = {
  a: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { target: "_blank", rel: "noreferrer", ...props }),
  img: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", ...props })
};
export {
  BlogPostRoute as component
};
