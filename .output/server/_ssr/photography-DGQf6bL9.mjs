import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as Route$c } from "./router-swvbRbiQ.mjs";
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
function PhotographyRoute() {
  const photos = Route$c.useLoaderData();
  const [active, setActive] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Photography" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display text-5xl sm:text-7xl", children: [
        "Things I've ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "pointed" }),
        " a camera at."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-lg text-[color:var(--muted)]", children: "Architecture, city walks, and the occasional event. Click any image to open it full size." })
    ] }),
    photos.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-1 gap-4 sm:columns-2 lg:columns-3", children: photos.map((photo) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActive(photo), className: "mb-4 block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[color:var(--surface)] ring-1 ring-[color:var(--line)] break-inside-avoid transition-transform hover:-translate-y-0.5 hover:ring-[color:var(--ink)]/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photo.urls.regular, alt: photo.alt_description ?? photo.description ?? "Photo by Kenny Coffie", className: "h-auto w-full object-cover", loading: "lazy" }) }, photo.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "rounded-2xl border border-dashed border-[color:var(--line)] bg-[color:var(--surface)] p-6 text-sm text-[color:var(--muted)]", children: [
      "No photos loaded. Set ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono", children: "UNSPLASH_ID" }),
      " to enable this page."
    ] }),
    active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "dialog", "aria-modal": "true", onClick: () => setActive(null), className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActive(null), "aria-label": "Close", className: "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white", children: "✕" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: active.urls.full ?? active.urls.regular, alt: active.alt_description ?? "Photograph", className: "max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl", onClick: (event) => event.stopPropagation() })
    ] }) : null
  ] });
}
export {
  PhotographyRoute as component
};
