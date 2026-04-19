import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { c as Route$9 } from "./_ssr/router-swvbRbiQ.mjs";
import "./_libs/axios.mjs";
import "./_ssr/index.mjs";
import "./_libs/seroval.mjs";
import "./_libs/sendgrid__mail.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "./_libs/scheduler.mjs";
import "stream";
import "util";
import "./_libs/isbot.mjs";
import "./_ssr/devblog-B8viLmY8.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/sendgrid__client.mjs";
import "./_libs/sendgrid__helpers.mjs";
import "fs";
import "path";
import "./_libs/deepmerge.mjs";
import "zlib";
import "http";
import "https";
import "./_libs/follow-redirects.mjs";
import "url";
import "assert";
import "./_libs/debug.mjs";
import "tty";
import "./_libs/ms.mjs";
function ShortRedirectRoute() {
  const target = Route$9.useLoaderData();
  reactExports.useEffect(() => {
    window.location.replace(target.destination);
  }, [target.destination]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Redirecting" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "display text-3xl", children: "Taking you there…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm break-all text-sm text-[color:var(--muted)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
      "→ ",
      target.destination
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: target.destination, className: "btn-ghost mt-2", children: "Continue manually ↗" })
  ] });
}
export {
  ShortRedirectRoute as component
};
