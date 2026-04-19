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
const workingOn = [{
  label: "Role",
  value: "CTO, Togetha"
}, {
  label: "Also",
  value: "CTO, Moradia"
}, {
  label: "Location",
  value: "Manchester, UK"
}, {
  label: "Timezone",
  value: "GMT / UTC+0"
}, {
  label: "Tooling",
  value: "React · TypeScript · Node · Tailwind"
}, {
  label: "Cameras",
  value: "Fuji X-T30 · iPhone"
}];
function ProfileRoute() {
  const exp = (/* @__PURE__ */ new Date()).getFullYear() - 2018;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "grid gap-16 md:grid-cols-[1fr_2fr] md:gap-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl ring-1 ring-[color:var(--line)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/me2.jpg", alt: "Kenny Coffie", className: "aspect-[4/5] w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid gap-3 rounded-2xl bg-[color:var(--surface)] p-5 ring-1 ring-[color:var(--line)]", children: workingOn.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "eyebrow shrink-0", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-right text-sm text-[color:var(--ink)]", children: item.value })
      ] }, item.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:hello@kennymark.com", className: "btn-accent flex-1 justify-center", children: "Email ↗" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/KennyCV.pdf", target: "_blank", rel: "noreferrer", className: "btn-ghost flex-1 justify-center", children: "CV ↗" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "About me" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display text-5xl sm:text-6xl", children: [
          "Hi, I'm ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "Kenny" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "I'm an engineer and founder with ",
          exp,
          "+ years of experience building for the web. My main work is leading engineering as CTO of",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://togetha.co.uk", target: "_blank", rel: "noreferrer", children: "Togetha" }),
          " ",
          "— owning architecture, design systems, hiring, and shipping the things that move the needle. I also serve as CTO at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://moradia.app", target: "_blank", rel: "noreferrer", children: "Moradia" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "I specialise in the front-end but work across the stack, and I especially like the fuzzy space between design and engineering: interactions, typography, and the details that make products feel considered. Outside of work I ship side projects, write the occasional article, and take photos for fun." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Currently" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Leading engineering at Togetha — product, infra, and team." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "CTO at Moradia on the side." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Exploring design engineering, React Server Components, and Tailwind v4." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Getting back into photography after a quiet stretch." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Where to find me" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Career story on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.linkedin.com/in/kennycoffie/", target: "_blank", rel: "noreferrer", children: "LinkedIn" }),
          ", code on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/kennymark", target: "_blank", rel: "noreferrer", children: "GitHub" }),
          ", shouts and rants on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://twitter.com/kennymark_", target: "_blank", rel: "noreferrer", children: "Twitter" }),
          ", photos on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://unsplash.com/@kennymark", target: "_blank", rel: "noreferrer", children: "Unsplash" }),
          ", and longer-form writing on ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", children: "the blog" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
export {
  ProfileRoute as component
};
