import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { h as homepageProjects, d as skills } from "./router-swvbRbiQ.mjs";
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
function ContactForm() {
  const [form, setForm] = reactExports.useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not send");
      setStatus({ kind: "ok", text: data.message || "Thanks — I'll be in touch shortly." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ kind: "err", text: error.message });
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: submit,
      className: "space-y-4 rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 sm:p-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "New message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-[color:var(--muted)]", children: "→ hello@kennymark.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                required: true,
                value: form.name,
                onChange: (e) => setForm((prev) => ({ ...prev, name: e.target.value })),
                placeholder: "Ada Lovelace",
                className: "field"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                required: true,
                value: form.email,
                onChange: (e) => setForm((prev) => ({ ...prev, email: e.target.value })),
                placeholder: "ada@example.com",
                className: "field"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.subject,
              onChange: (e) => setForm((prev) => ({ ...prev, subject: e.target.value })),
              placeholder: "What can I help with?",
              className: "field"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              required: true,
              rows: 5,
              value: form.message,
              onChange: (e) => setForm((prev) => ({ ...prev, message: e.target.value })),
              placeholder: "Tell me about your project, idea, or question.",
              className: "field resize-y"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: submitting, className: "btn-primary disabled:opacity-60", children: [
            submitting ? "Sending…" : "Send message",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "→" })
          ] }),
          status ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-sm ${status.kind === "ok" ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`,
              children: status.text
            }
          ) : null
        ] })
      ]
    }
  );
}
const stats = [{
  label: "Currently",
  value: "CTO, Togetha"
}, {
  label: "Also",
  value: "CTO, Moradia"
}, {
  label: "Years shipping",
  value: `${(/* @__PURE__ */ new Date()).getFullYear() - 2018}+`
}, {
  label: "Based in",
  value: "Manchester, UK"
}];
function HomeRoute() {
  const skillGroups = Object.entries(skills);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-24 sm:space-y-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[color:var(--surface)] px-5 py-5 ring-1 ring-[color:var(--line)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: stat.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 font-display text-xl sm:text-2xl", style: {
        letterSpacing: "-0.02em"
      }, children: stat.value })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedWork, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "What I do" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display mt-3 text-4xl sm:text-5xl", children: [
          "A generalist,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "with ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "taste" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[color:var(--muted)]", children: "I move across the stack and the design process — bringing the same care to a bit of animation as I do to an API." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: skillGroups.map(([group, data]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl bg-[color:var(--surface)] p-5 ring-1 ring-[color:var(--line)] transition-colors hover:ring-[color:var(--ink)]/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium capitalize tracking-tight", children: group }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm text-[color:var(--muted)]", children: data.skills.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "→" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
        ] }, item)) })
      ] }, group)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display mt-3 text-4xl sm:text-5xl", children: [
          "Say hi",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[color:var(--muted)]", children: "Work, a collab, or just a hello — drop a line and I'll get back within a day or two." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "UK · GMT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "Advising welcome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "Speaking / podcasts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactForm, {})
    ] })
  ] });
}
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-[color:var(--muted)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent)] opacity-75" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Available for chats · currently in Manchester" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display mt-8 text-[clamp(3rem,10vw,8rem)]", children: [
      "Hey, I'm Kenny",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--accent)]", children: "." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-8 md:grid-cols-[3fr_2fr] md:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-2xl text-xl text-[color:var(--ink)]/85 sm:text-2xl", children: [
        "CTO at",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://togetha.co.uk", target: "_blank", rel: "noreferrer", className: "underline decoration-[color:var(--accent)] decoration-2 underline-offset-4", children: "Togetha" }),
        ", building",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: "friendly, fast" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 bottom-1 -z-0 h-2.5 bg-[color:var(--accent-soft)]" })
        ] }),
        " ",
        "web products with a small, excellent team. Also CTO at",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://moradia.app", target: "_blank", rel: "noreferrer", className: "underline decoration-[color:var(--line)] decoration-2 underline-offset-4 hover:decoration-[color:var(--accent)]", children: "Moradia" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 md:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projects", className: "btn-accent", children: [
          "See the work ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "→" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", className: "btn-ghost", children: "About me" })
      ] })
    ] })
  ] });
}
function FeaturedWork() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Selected work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display mt-2 text-4xl sm:text-5xl", children: "Recent projects" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projects", className: "group inline-flex items-center gap-1 text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)]", children: [
        "Browse all",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block transition-transform group-hover:translate-x-0.5", children: "→" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-5 md:grid-cols-2", children: homepageProjects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: project.link, target: "_blank", rel: "noreferrer", className: "group block overflow-hidden rounded-3xl bg-[color:var(--surface)] ring-1 ring-[color:var(--line)] transition-all hover:-translate-y-0.5 hover:ring-[color:var(--ink)]/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.image, alt: project.name, className: "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]", loading: "lazy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl tracking-tight sm:text-2xl", children: project.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-sm text-[color:var(--muted)]", children: project.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "mt-1 text-[color:var(--muted)] transition-all group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]", children: "↗" })
      ] })
    ] }) }, project.name)) })
  ] });
}
export {
  HomeRoute as component
};
