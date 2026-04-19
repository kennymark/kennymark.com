import { d as dayjs, c as customParseFormat, y as yearAgo } from "../_libs/dayjs.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
dayjs.extend(customParseFormat);
dayjs.extend(yearAgo);
const ago = (date) => dayjs().to(date);
function NewsletterForm() {
  const [email, setEmail] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch("/api/dashboard/subscribe-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not subscribe");
      setStatus({ kind: "ok", text: data.message || "Subscribed — check your inbox." });
      setEmail("");
    } catch (error) {
      setStatus({ kind: "err", text: error.message });
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 p-6 sm:grid-cols-[1.5fr_2fr] sm:gap-10 sm:p-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Newsletter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl tracking-tight sm:text-3xl", children: "New posts, quietly delivered." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[color:var(--muted)]", children: "Roughly one email a month. No spam, unsubscribe anytime." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            required: true,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "you@company.com",
            className: "field"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: submitting, className: "btn-primary disabled:opacity-60", children: [
          submitting ? "Submitting…" : "Subscribe",
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
    ] })
  ] }) });
}
export {
  NewsletterForm as N,
  ago as a
};
