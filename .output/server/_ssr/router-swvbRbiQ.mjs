import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, u as useRouterState, O as Outlet, L as Link, H as HeadContent, S as Scripts } from "../_libs/tanstack__react-router.mjs";
import { H as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { g as getAllArticles } from "./devblog-B8viLmY8.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./index.mjs";
import { s as sgMail } from "../_libs/sendgrid__mail.mjs";
import { a as axios } from "../_libs/axios.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/scheduler.mjs";
import "stream";
import "util";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
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
const appCss = "/assets/globals-Bv9zBF6c.css";
const Route$h = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kenny Coffie — Software engineer & designer" },
      {
        name: "description",
        content: "Kenny Coffie is a software engineer building thoughtful web products. Portfolio, writing, photography, and live metrics."
      },
      { name: "author", content: "Kenny Coffie" },
      { property: "og:site_name", content: "Kenny Coffie" },
      { property: "og:title", content: "Kenny Coffie — Software engineer & designer" },
      {
        property: "og:description",
        content: "Portfolio, writing, photography and live metrics from Kenny Coffie, a software engineer in the UK."
      },
      { property: "og:image", content: "/images/me2.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: "@kennymark_" },
      { name: "theme-color", content: "#f5f2ea" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/images/favicon.png" }
    ],
    scripts: [
      {
        children: `(function(){try{var t=localStorage.getItem('kc-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t==='dark'||(!t&&m);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`
      },
      { src: "https://www.googletagmanager.com/gtag/js?id=G-8LTL2CML5L", async: true },
      {
        src: "https://analytics.togetha.co.uk/script.js",
        async: true,
        "data-website-id": "01fe604d-5649-4207-98c1-15dcf94267d7"
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8LTL2CML5L', { page_path: window.location.pathname });
        `
      },
      {
        children: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "5y153908ax");
        `
      }
    ]
  }),
  component: RootComponent,
  notFoundComponent: NotFound
});
const navLinks = [
  { to: "/projects", label: "Work" },
  { to: "/blog", label: "Writing" },
  { to: "/photography", label: "Photos" },
  { to: "/dashboard", label: "Stats" },
  { to: "/profile", label: "About" }
];
function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const gtag = window.gtag;
    if (typeof gtag === "function") {
      gtag("config", "G-8LTL2CML5L", { page_path: pathname });
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RootDocument, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fade-up flex-1 py-12 sm:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) }, pathname),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] }) });
}
function SiteHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-[color:var(--line)] bg-[color:var(--bg)]/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex h-16 items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          "aria-label": "Kenny Coffie, home",
          className: "group flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--ink)] text-[color:var(--bg)] font-display text-[0.9rem] tracking-tight", children: "kc" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden text-sm font-medium tracking-tight sm:block", children: [
              "Kenny Coffie",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-[color:var(--accent)] align-middle" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden items-center gap-1 md:flex", children: navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: link.to,
          activeProps: { "data-active": "true" },
          className: "relative rounded-full px-3 py-1.5 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--ink)] data-[active=true]:text-[color:var(--ink)] data-[active=true]:before:absolute data-[active=true]:before:-bottom-[1px] data-[active=true]:before:left-3 data-[active=true]:before:right-3 data-[active=true]:before:h-[2px] data-[active=true]:before:rounded-full data-[active=true]:before:bg-[color:var(--accent)]",
          children: link.label
        }
      ) }, link.to)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/KennyCV.pdf",
            target: "_blank",
            rel: "noreferrer",
            className: "hidden rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs font-medium tracking-wide text-[color:var(--ink)] transition-colors hover:border-[color:var(--ink)] sm:inline-flex",
            children: "CV ↗"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 overflow-x-auto pb-3 md:hidden", children: navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: link.to,
        activeProps: { "data-active": "true" },
        className: "rounded-full px-3 py-1 text-xs text-[color:var(--muted)] data-[active=true]:bg-[color:var(--surface-2)] data-[active=true]:text-[color:var(--ink)]",
        children: link.label
      },
      link.to
    )) })
  ] }) });
}
function SiteFooter() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-[color:var(--line)] bg-[color:var(--surface)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page grid gap-10 py-14 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "display text-3xl sm:text-4xl", children: [
          "Let's make",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "something ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "good" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-[color:var(--muted)]", children: "Advisory, a friendly hello, a wild idea — my inbox is open." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:hello@kennymark.com", className: "btn-primary mt-2", children: [
          "hello@kennymark.com",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "→" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Sitemap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-[color:var(--accent)]", children: "Home" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", className: "hover:text-[color:var(--accent)]", children: "Work" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "hover:text-[color:var(--accent)]", children: "Writing" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/photography", className: "hover:text-[color:var(--accent)]", children: "Photography" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "hover:text-[color:var(--accent)]", children: "Dashboard" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/slashes", className: "hover:text-[color:var(--accent)]", children: "/slashes" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Elsewhere" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-[color:var(--accent)]", href: "https://www.linkedin.com/in/kennycoffie/", target: "_blank", rel: "noreferrer", children: "LinkedIn ↗" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-[color:var(--accent)]", href: "https://github.com/kennymark", target: "_blank", rel: "noreferrer", children: "GitHub ↗" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-[color:var(--accent)]", href: "https://twitter.com/kennymark_", target: "_blank", rel: "noreferrer", children: "Twitter ↗" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-[color:var(--accent)]", href: "https://unsplash.com/@kennymark", target: "_blank", rel: "noreferrer", children: "Unsplash ↗" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-[color:var(--accent)]", href: "https://dev.to/kennymark", target: "_blank", rel: "noreferrer", children: "Dev.to ↗" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-[color:var(--accent)]", href: "/KennyCV.pdf", target: "_blank", rel: "noreferrer", children: "Download CV ↗" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[color:var(--line)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-[color:var(--muted)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        year,
        " Kenny Coffie · Manchester, UK"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Built with TanStack Start & Tailwind" })
    ] }) })
  ] });
}
function ThemeToggle() {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("kc-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("kc-theme", next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: toggle,
      "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
      className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--ink)] transition-colors hover:border-[color:var(--ink)]",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px]", "aria-hidden": true, children: theme === "dark" ? "☾" : "☀" })
    }
  );
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page flex min-h-[50vh] flex-col items-start justify-center gap-4 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display text-6xl sm:text-7xl", children: [
      "Lost in ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "translation" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-[color:var(--muted)]", children: "The page you're looking for drifted off the map. Let's get you back." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "btn-accent mt-2", children: [
      "Take me home ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "→" })
    ] })
  ] });
}
function slug(str) {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  return str;
}
const mainProjects = [
  {
    name: "E-Commerce Store",
    status: "live",
    description: "A full stack E-commerce application with built-in support for payments, auth and a dashboard ",
    image: "https://gitlab.com/kennymark/nuxt-mercado/-/raw/master/screenshots/products.png",
    gif: "../images/gif/mercado.gif",
    link: "https://nuxt-mercado.netlify.app/",
    source: "https://gitlab.com/kennymark/nuxt-mercado",
    stack: ["Vue.js", "Stripe for payments", "Fireabse", "Vue data-grid"],
    color: "red"
  },
  {
    name: "petitions dashboard",
    status: "live",
    description: "An SPA that extracts valuable insight into UK parliamentary petition data with just a simple url.",
    image: "https://raw.githubusercontent.com/kennymark/british-petitions-dashboard/master/screenshots/table-view.png",
    gif: "../images/gif/petitions.gif",
    link: "https://petitions.now.sh/",
    source: "https://github.com/kennymark/british-petitions-dashboard",
    color: "green"
  },
  {
    name: "clever advisor",
    status: "in-progress",
    description: "An application I built for an interview process. A tool for investors to view their finance ",
    image: "https://gitlab.com/kennymark/clever-advisor/-/raw/master/screenshots/home.png",
    gif: "../images/gif/clever-advisor.gif",
    link: "https://clever-advisor.netlify.com/",
    source: "https://gitlab.com/kennymark/clever-advisor",
    color: "gray"
  }
];
const topProjects = [
  {
    name: "E-Commerce Store",
    status: "live",
    description: "A full stack E-commerce application with built-in support for payments, auth and a dashboard ",
    image: "https://gitlab.com/kennymark/nuxt-mercado/-/raw/master/screenshots/products.png",
    gif: "../images/gif/mercado.gif",
    link: "https://nuxt-mercado.netlify.app/",
    source: "https://gitlab.com/kennymark/nuxt-mercado",
    showCase: true,
    stack: [
      "Vue.js",
      "Stripe for payments",
      "Fireabse Auth",
      "Firebase Store",
      "Vue data-grid",
      "Firebase serverless functions"
    ],
    color: "#FED7D7",
    tag: "fullstack"
  },
  {
    name: "petitions dashboard",
    status: "live",
    description: "An SPA that extracts valuable insight into UK parliamentary petition data with just a simple url.",
    image: "https://raw.githubusercontent.com/kennymark/british-petitions-dashboard/master/screenshots/table-view.png",
    link: "https://petitions.now.sh/",
    source: "https://github.com/kennymark/british-petitions-dashboard",
    showCase: true,
    stack: [
      "React.js",
      "ChakraUI",
      "Material Datatable Component",
      "Parliaments API"
    ],
    color: "#C6F6D5",
    tag: "frontend"
  },
  {
    name: "Easywire",
    status: "in-progress",
    description: "This is a code version of a design by the TailwindUI team",
    image: "https://github.com/kennymark/easywire/blob/master/screenshots/easywire.png?raw=true",
    link: "https://kennymark.com/easywire",
    source: "https://github.com/angular-hub/client",
    showCase: true,
    stack: ["React", "Next.js", "ChakraUI"],
    color: "teal.100"
  },
  {
    name: "stripe payment and subscriptions",
    status: "live",
    description: `Charge or subscribe to a fictional product using Stripe's API.`,
    image: "https://raw.githubusercontent.com/kennymark/stripe-subscriptions/master/screenshots/plans.png",
    link: "https://stripe-subscriptions.vercel.app/",
    source: "https://github.com/kennymark/stripe-subscriptions",
    showCase: true,
    stack: ["React.js", "ChakraUI", "Stripe api"],
    color: "#faeee7",
    tag: "fullstack"
  },
  {
    name: "clever advisor",
    status: "in-progress",
    description: "An application I built for an interview process. A tool for investors to view their finance",
    image: "https://gitlab.com/kennymark/clever-advisor/-/raw/master/screenshots/home.png",
    link: "https://clever-advisor.netlify.com/",
    source: "https://gitlab.com/kennymark/clever-advisor",
    showCase: true,
    stack: ["Angular", "Bootstrap", "Ng2 Charts", "Ngx Datatable"],
    color: "#c9e8ff",
    tag: "frontend"
  },
  {
    name: "flux weather",
    status: "in-progress",
    description: "A beautiful cross platform weather app built in React-Native expo.",
    image: "https://camo.githubusercontent.com/2545a369f71065156e739ffbdc3b7cf9238361d1/68747470733a2f2f7374617469632e6e6f74696f6e2d7374617469632e636f6d2f61643364303635642d373135392d346138302d386130362d6134353531666361663938642f53696d756c61746f725f53637265656e5f53686f745f2d5f6950686f6e655f585f2d5f323031382d30322d32375f61745f31352e32312e33352e706e67",
    link: null,
    source: "https://github.com/kennymark/Flux-Weather",
    showCase: true,
    stack: ["React native", "Darksky API", "Expo", "React Native Elements"],
    color: "#dafdff",
    tag: "mobile"
  },
  {
    name: "Sweet Bnb",
    status: "in-progress",
    description: "Another airbnb clone with a gorgeous ui inspired by my older clone",
    image: "https://github.com/kennymark/SweetBnb/blob/dev/screenshots/popover.png?raw=true",
    link: "https://kennymark.com/sweetbnb",
    source: "https://github.com/kennymark/SweetBnb",
    showCase: true,
    stack: ["React", "Next.js", "Chakra UI", "Ngx Datatable"],
    color: "pink.100",
    tag: "frontend"
  },
  {
    name: "good notes",
    status: "live",
    description: "A simple note taking application built with React and Firebase Auth and Firestore.",
    image: "https://raw.githubusercontent.com/kennymark/Good-Notes/master/screenshots/main-page.png",
    link: "https://goodnotes.netlify.com/",
    source: "https://github.com/kennymark/Good-Notes",
    stack: ["React", "Firebase Auth", "Firebase firestore"],
    color: "#cfceff",
    tag: "frontend",
    showCase: true
  },
  {
    name: "Book search",
    status: "live",
    description: "A demo app to search for books in an elastic search db via appbase.io",
    image: "https://raw.githubusercontent.com/kennymark/react-native-book-search/master/book-search.png",
    link: "",
    source: "https://github.com/kennymark/react-native-book-search",
    stack: ["React native", "Appbase.io", "Elastic search", "expo"],
    color: "orange.100",
    tag: "mobile",
    showCase: false
  }
];
const extraProjects = [
  {
    name: "Fullstack JavaScript Boilerplate",
    status: "live",
    description: "Express based app with email + social auth, password recovery, email etc.",
    image: "https://raw.githubusercontent.com/kennymark/express-starter/master/screenshots/account.png",
    link: "https://express-kenny.herokuapp.com/",
    source: "https://github.com/kennymark/express-starter",
    stack: [
      "Node.js",
      "Express",
      "Passport.js for social/local login",
      "Handlebars",
      "Mongo"
    ],
    color: "#f7e7df"
  },
  {
    name: "angular hub",
    status: "in-progress",
    description: "An idea for a database for Angular libraries and components that google failed to build.",
    image: "https://raw.githubusercontent.com/angular-hub/client/master/screenshot/home.jpg",
    link: "https://angularhub.netlify.com/",
    source: "https://github.com/angular-hub/client",
    stack: ["Angular", "Nebular UI"],
    color: "#bae8e8"
  },
  {
    name: "car info extractor",
    status: "live",
    description: "Get valuable info from a car before purchase (uk only).",
    image: "https://raw.githubusercontent.com/kennymark/uk-car-search/master/img.png",
    link: "https://car-finder.netlify.app/",
    github: "https://github.com/kennymark/uk-car-search"
  },
  {
    name: "oz studios",
    description: "Oz Studios is a fictional web design agency website built to showcase my skills as a front-end developer or web designer.",
    link: "https://oz-studios.netlify.com/"
  },
  {
    name: "fse-rec",
    description: "The FSE-REC is an asp.net web app built by me and and 3 other friends as my second year work based learning project for the University. It includes functionality ranging from a SQL database, dynamic routing, login integration.",
    link: "https://codepen.io/kennymark/full/GmeGoa"
  },
  // {
  //   name: 'simple card design',
  //   description: 'A showcase of my skills to reproduce pixel by pixel a projuct after it has been designed by a designer using normal front-end technologies.',
  //   link: 'https://codepen.io/kennymark/full/LGxpNz/'
  // },
  {
    name: "JS KeyCode Finder",
    description: "The JS key code finder is a simple tool that detect which key has been pressed and then gives you its key code number. ",
    link: "https://keycodefinder.netlify.com/."
  }
];
const skillTypes = {
  frontend: {
    skills: [
      "HTML, CSS/SASS, JS",
      "React, Angular, Vue",
      "Typescript",
      "Design with XD/Sketch"
    ],
    color: "blue"
  },
  backend: {
    skills: [
      "MVC Restful/ Graphql API's",
      "Authentication & Authorization",
      "Express, Adonis, Koa frameworks",
      "MySQL/MongoDB"
    ],
    color: "red"
  },
  extras: {
    skills: [
      "App dev with React Native",
      "Project mg.",
      "Agile (SCRUM)",
      "Testing (Unit, Integration)",
      "Basic devops knowledge"
    ],
    color: "gray"
  }
};
const redirects = [
  {
    source: "/v1",
    destination: "https://kennymark.github.io/",
    permanent: true
  },
  {
    source: "/v2",
    destination: "https://kenny-v3.netlify.app/",
    permanent: true
  },
  {
    source: "/v3",
    destination: "https://kenny-test.netlify.app/",
    permanent: true
  },
  {
    source: "/stripe",
    destination: "https://stripe-subscriptions.vercel.app/",
    permanent: true
  },
  {
    source: "/twitter",
    destination: "https://twitter.com/mrkennymark",
    permanent: true
  },
  {
    source: "/github",
    destination: "https://github.com/kennymark",
    permanent: false
  },
  {
    source: "/linkedin",
    destination: "https://www.linkedin.com/in/kenneth-mark-coffie-831596103/",
    permanent: false
  },
  {
    source: "/keycode",
    destination: "https://keycodefinder.netlify.app/",
    permanent: false
  },
  {
    source: "/next-starter",
    destination: "https://next-adonis.vercel.app/",
    permanent: true
  },
  {
    source: "/petitions",
    destination: "https://petitions.now.sh/",
    permanent: true
  },
  {
    source: "/mercado",
    destination: "https://nuxt-mercado.now.sh/",
    permanent: true
  },
  {
    source: "/next-lite",
    destination: "next-starter-lite.vercel.app",
    permanent: false
  },
  {
    source: "/deal-finder",
    destination: "https://deal-finder-knc7i20xg-kennymmark.vercel.app/",
    permanent: false
  },
  {
    source: "/sweetbnb",
    destination: "https://sweet-bnb.vercel.app/",
    permanent: false
  },
  {
    source: "/easywire",
    destination: "https://easywire.vercel.app/",
    permanent: false
  },
  {
    source: "/saleor-api",
    destination: "https://saleor-api-kenny.herokuapp.com/",
    permanent: false
  },
  {
    source: "/saleor-dashboard",
    destination: "https://saleor-dashboard-pi.vercel.app/",
    permanent: false
  }
];
const skills = skillTypes;
const homepageProjects = mainProjects;
const portfolioProjects = topProjects;
const moreProjects = extraProjects;
const shortlinks = redirects;
const allProjects = [...topProjects, ...extraProjects];
function getProjectBySlug(slug$1) {
  return allProjects.find((project) => slug(project.name) === slug$1);
}
const $$splitComponentImporter$a = () => import("./slashes-Cd9vaD4d.mjs");
const Route$g = createFileRoute("/slashes")({
  loader: () => shortlinks,
  component: lazyRouteComponent($$splitComponentImporter$a, "component"),
  head: () => ({
    meta: [{
      title: "Slashes — Kenny Coffie"
    }]
  })
});
const BASE_URL = "https://kennymark.com";
const Route$f = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/blog",
          "/projects",
          "/photography",
          "/dashboard",
          "/profile",
          "/slashes"
        ];
        const articles = await getAllArticles().catch(() => []);
        const blogPaths = articles.map((post) => `/blog/${post.devToSlug}`);
        const urls = [...staticPaths, ...blogPaths];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${BASE_URL}${path}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8" }
        });
      }
    }
  }
});
const $$splitComponentImporter$9 = () => import("./projects-Co6IvSxi.mjs");
const Route$e = createFileRoute("/projects")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  head: () => ({
    meta: [{
      title: "Work — Kenny Coffie"
    }]
  })
});
const $$splitComponentImporter$8 = () => import("./profile-B8VTBHBE.mjs");
const Route$d = createFileRoute("/profile")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  head: () => ({
    meta: [{
      title: "About — Kenny Coffie"
    }]
  })
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitComponentImporter$7 = () => import("./photography-DGQf6bL9.mjs");
const getPhotos = createServerFn({
  method: "GET"
}).handler(createSsrRpc("72d21cfa9bf36b375a6838f9e5aad8242d47ec208ce0833b3d8e6d299e4ba840"));
const Route$c = createFileRoute("/photography")({
  loader: async () => await getPhotos(),
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      title: "Photography — Kenny Coffie"
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./dashboard-9rgEZxbb.mjs");
const getDashboardBase = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b9e9efae27280d0a0baf118340b44fb789ead294fbce73e90e5d3ef1faffd11f"));
const Route$b = createFileRoute("/dashboard")({
  loader: async () => await getDashboardBase(),
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  head: () => ({
    meta: [{
      title: "Stats — Kenny Coffie"
    }]
  })
});
const $$splitComponentImporter$5 = () => import("./404-QrQYajgq.mjs");
const Route$a = createFileRoute("/404")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => ({
    meta: [{
      title: "Not found — Kenny Coffie"
    }]
  })
});
const $$splitComponentImporter$4 = () => import("../_short-nF5EhL8v.mjs");
const Route$9 = createFileRoute("/$short")({
  loader: ({
    params
  }) => {
    const lookup = shortlinks.find((item) => item.source === `/${params.short}`);
    if (!lookup) throw notFound();
    return lookup;
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `Redirecting to ${loaderData.destination}`
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./index-CrGNDnus.mjs");
const Route$8 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "Kenny Coffie — Software engineer & designer"
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./blog.index-Cwewo53N.mjs");
const getPosts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5d5a566eb1bdd1b20fbc39937cbed0aabc7d3ef0401c68d3df24d6b502dcce9c"));
const Route$7 = createFileRoute("/blog/")({
  loader: async () => await getPosts(),
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Writing — Kenny Coffie"
    }]
  })
});
const $$splitComponentImporter$1 = () => import("./project._slug-vIJJJowI.mjs");
const Route$6 = createFileRoute("/project/$slug")({
  loader: ({
    params
  }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData.name} — Project`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./blog._slug-DIlEWCnN.mjs");
const getPost = createServerFn({
  method: "GET"
}).inputValidator((slug2) => slug2).handler(createSsrRpc("c2f25d510aad2088e8bf029819d2e7a077384d741fd1e237ed1954e8c04bfe41"));
const Route$5 = createFileRoute("/blog/$slug")({
  loader: async ({
    params
  }) => {
    const post = await getPost({
      data: params.slug
    });
    if (!post) throw notFound();
    return post;
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData.title} — Kenny Coffie`
    }, {
      name: "description",
      content: loaderData.description ?? ""
    }, {
      property: "og:title",
      content: loaderData.title
    }, {
      property: "og:description",
      content: loaderData.description ?? ""
    }, ...loaderData.coverImage ? [{
      property: "og:image",
      content: loaderData.coverImage
    }] : []]
  })
});
const Route$4 = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { email, subject, message, name } = await request.json();
        const apiKey = process.env.EMAIL_API_KEY;
        if (!apiKey) {
          return Response.json({ error: "EMAIL_API_KEY is missing" }, { status: 500 });
        }
        sgMail.setApiKey(apiKey);
        try {
          await sgMail.send({
            to: "geniounico@outlook.com",
            from: email,
            subject,
            name,
            text: message
          });
          return Response.json({ message: "Email has been successfully sent" });
        } catch {
          return Response.json({ error: "Error sending email" }, { status: 500 });
        }
      }
    }
  }
});
const Route$3 = createFileRoute("/api/dashboard/subscribers")({
  server: {
    handlers: {
      GET: async () => {
        const apiKey = process.env.BUTTON_API;
        if (!apiKey) {
          return Response.json({ count: 0 });
        }
        const response = await axios.get("https://api.buttondown.email/v1/subscribers", {
          headers: { Authorization: `Token ${apiKey}` }
        });
        const { count } = response.data;
        return Response.json({ count });
      }
    }
  }
});
const URL = "https://api.buttondown.email/v1/subscribers";
const Route$2 = createFileRoute("/api/dashboard/subscribe-newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { email } = await request.json();
        const apiKey = process.env.BUTTON_API;
        if (!email) {
          return Response.json({ error: "Email is required" }, { status: 400 });
        }
        if (!apiKey) {
          return Response.json({ error: "BUTTON_API is missing" }, { status: 500 });
        }
        try {
          const response = await axios.post(
            URL,
            { email },
            {
              headers: { Authorization: `Token ${apiKey}` }
            }
          );
          if (response.status >= 400) {
            return Response.json(
              { error: "There was an error subscribing to the newsletter." },
              { status: 400 }
            );
          }
          return Response.json({ message: "Successfully subscribed to the newsletter" }, { status: 201 });
        } catch {
          return Response.json(
            { error: "There was an error subscribing to the newsletter. You're either already subscribed or please try again." },
            { status: 500 }
          );
        }
      }
    }
  }
});
const Route$1 = createFileRoute("/api/dashboard/github")({
  server: {
    handlers: {
      GET: async () => {
        const userResponse = await fetch("https://api.github.com/users/kennymark");
        const reposResponse = await fetch("https://api.github.com/users/kennymark/repos?per_page=100");
        const user = await userResponse.json();
        const repositories = await reposResponse.json();
        const mine = repositories?.filter((repo) => !repo.fork) ?? [];
        const stars = mine.reduce((acc, repository) => acc + repository.stargazers_count, 0);
        return new Response(JSON.stringify({ followers: user.followers, stars }), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600"
          },
          status: 200
        });
      }
    }
  }
});
const Route = createFileRoute("/api/dashboard/dev")({
  server: {
    handlers: {
      GET: async () => {
        const articles = await getAllArticles();
        const total = articles.reduce((acc, item) => acc + (item.viewCount ?? 0), 0);
        const likes = articles.reduce((acc, item) => acc + item.positiveReactionsCount, 0);
        return Response.json({ total, likes });
      }
    }
  }
});
const SlashesRoute = Route$g.update({
  id: "/slashes",
  path: "/slashes",
  getParentRoute: () => Route$h
});
const SitemapDotxmlRoute = Route$f.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$h
});
const ProjectsRoute = Route$e.update({
  id: "/projects",
  path: "/projects",
  getParentRoute: () => Route$h
});
const ProfileRoute = Route$d.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$h
});
const PhotographyRoute = Route$c.update({
  id: "/photography",
  path: "/photography",
  getParentRoute: () => Route$h
});
const DashboardRoute = Route$b.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$h
});
const R404Route = Route$a.update({
  id: "/404",
  path: "/404",
  getParentRoute: () => Route$h
});
const ShortRoute = Route$9.update({
  id: "/$short",
  path: "/$short",
  getParentRoute: () => Route$h
});
const IndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$h
});
const BlogIndexRoute = Route$7.update({
  id: "/blog/",
  path: "/blog/",
  getParentRoute: () => Route$h
});
const ProjectSlugRoute = Route$6.update({
  id: "/project/$slug",
  path: "/project/$slug",
  getParentRoute: () => Route$h
});
const BlogSlugRoute = Route$5.update({
  id: "/blog/$slug",
  path: "/blog/$slug",
  getParentRoute: () => Route$h
});
const ApiContactRoute = Route$4.update({
  id: "/api/contact",
  path: "/api/contact",
  getParentRoute: () => Route$h
});
const ApiDashboardSubscribersRoute = Route$3.update({
  id: "/api/dashboard/subscribers",
  path: "/api/dashboard/subscribers",
  getParentRoute: () => Route$h
});
const ApiDashboardSubscribeNewsletterRoute = Route$2.update({
  id: "/api/dashboard/subscribe-newsletter",
  path: "/api/dashboard/subscribe-newsletter",
  getParentRoute: () => Route$h
});
const ApiDashboardGithubRoute = Route$1.update({
  id: "/api/dashboard/github",
  path: "/api/dashboard/github",
  getParentRoute: () => Route$h
});
const ApiDashboardDevRoute = Route.update({
  id: "/api/dashboard/dev",
  path: "/api/dashboard/dev",
  getParentRoute: () => Route$h
});
const rootRouteChildren = {
  IndexRoute,
  ShortRoute,
  R404Route,
  DashboardRoute,
  PhotographyRoute,
  ProfileRoute,
  ProjectsRoute,
  SitemapDotxmlRoute,
  SlashesRoute,
  ApiContactRoute,
  BlogSlugRoute,
  ProjectSlugRoute,
  BlogIndexRoute,
  ApiDashboardDevRoute,
  ApiDashboardGithubRoute,
  ApiDashboardSubscribeNewsletterRoute,
  ApiDashboardSubscribersRoute
};
const routeTree = Route$h._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$g as R,
  Route$c as a,
  Route$b as b,
  Route$9 as c,
  skills as d,
  Route$7 as e,
  Route$6 as f,
  Route$5 as g,
  homepageProjects as h,
  moreProjects as m,
  portfolioProjects as p,
  router as r,
  slug as s
};
