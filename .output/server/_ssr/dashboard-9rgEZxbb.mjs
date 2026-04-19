import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as Route$b } from "./router-swvbRbiQ.mjs";
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
const format = (n) => typeof n === "number" ? Intl.NumberFormat().format(n) : "—";
function DashboardRoute() {
  const data = Route$b.useLoaderData();
  const [metrics, setMetrics] = reactExports.useState({});
  reactExports.useEffect(() => {
    const load = async () => {
      const [dev, github, subs] = await Promise.all([fetch("/api/dashboard/dev").then((r) => r.json()).catch(() => ({})), fetch("/api/dashboard/github").then((r) => r.json()).catch(() => ({})), fetch("/api/dashboard/subscribers").then((r) => r.json()).catch(() => ({}))]);
      setMetrics({
        views: dev.total,
        likes: dev.likes,
        stars: github.stars,
        followers: github.followers,
        subscribers: subs.count
      });
    };
    load();
  }, []);
  const tiles = [{
    label: "Unsplash views",
    value: format(data.unsplashViews),
    source: "unsplash.com",
    accent: true
  }, {
    label: "Unsplash downloads",
    value: format(data.unsplashDownloads),
    source: "unsplash.com"
  }, {
    label: "Article views",
    value: format(metrics.views),
    source: "dev.to"
  }, {
    label: "Article likes",
    value: format(metrics.likes),
    source: "dev.to"
  }, {
    label: "GitHub stars",
    value: format(metrics.stars),
    source: "github.com"
  }, {
    label: "GitHub followers",
    value: format(metrics.followers),
    source: "github.com"
  }, {
    label: "Newsletter subscribers",
    value: format(metrics.subscribers),
    source: "buttondown"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Live dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display text-5xl sm:text-7xl", children: [
        "Numbers worth ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "sharing" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-lg text-[color:var(--muted)]", children: "A live snapshot of writing, code, photography and listening habits — pulled from the usual suspects." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", children: tiles.map((tile) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "relative min-h-[150px] rounded-2xl bg-[color:var(--surface)] p-5 ring-1 ring-[color:var(--line)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: tile.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-display text-4xl tracking-tight sm:text-5xl", children: tile.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-[11px] text-[color:var(--faint)]", children: [
        "via ",
        tile.source
      ] }),
      tile.accent ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-4 h-2 w-2 rounded-full bg-[color:var(--accent)]" }) : null
    ] }, tile.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Now playing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display mt-1 text-3xl sm:text-4xl", children: "Favourite tracks" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[color:var(--muted)]", children: "from Tidal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: data.tracks.map((track, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: track.item.url, target: "_blank", rel: "noreferrer", className: "group flex items-center gap-4 rounded-2xl bg-[color:var(--surface)] p-3 ring-1 ring-[color:var(--line)] transition-all hover:ring-[color:var(--ink)]/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[color:var(--faint)]", children: String(idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://resources.tidal.com/images/${track.item.album.cover.replace(/-/g, "/")}/320x320.jpg`, alt: track.item.title, className: "h-12 w-12 rounded-lg object-cover", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: track.item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-[color:var(--muted)]", children: track.item.artist.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100", children: "↗" })
      ] }) }, track.created ?? idx)) })
    ] })
  ] });
}
export {
  DashboardRoute as component
};
