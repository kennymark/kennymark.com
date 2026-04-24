import { type FormEvent, useState } from 'react';

export function ContactForm() {
  type ApiResponse = { message?: string; error?: string };
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    kind: 'ok' | 'err';
    text: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as ApiResponse;
      if (!response.ok) throw new Error(data.error || 'Could not send');
      setStatus({
        kind: 'ok',
        text: data.message || "Thanks — I'll be in touch shortly.",
      });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error: unknown) {
      setStatus({ kind: 'err', text: error instanceof Error ? error.message : 'Could not send' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className='space-y-6'>
      <div className='flex items-center justify-between border-b border-[color:var(--line)] pb-3'>
        <p className='label'>New message</p>
        <p className='label'>→ hello@kennymark.com</p>
      </div>

      <div className='grid gap-6 sm:grid-cols-2'>
        <label className='block'>
          <span className='label'>Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder='Ada Lovelace'
            className='field mt-1.5'
          />
        </label>
        <label className='block'>
          <span className='label'>Email</span>
          <input
            type='email'
            required
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder='ada@example.com'
            className='field mt-1.5'
          />
        </label>
      </div>
      <label className='block'>
        <span className='label'>Subject</span>
        <input
          required
          value={form.subject}
          onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
          placeholder='What can I help with?'
          className='field mt-1.5'
        />
      </label>
      <label className='block'>
        <span className='label'>Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          placeholder='Tell me about your project, idea, or question.'
          className='field mt-1.5 resize-y'
        />
      </label>

      <div className='flex flex-wrap items-center justify-between gap-3 pt-2'>
        <button type='submit' disabled={submitting} className='btn-primary disabled:opacity-60'>
          {submitting ? 'Sending…' : 'Send message'}
          <span aria-hidden>→</span>
        </button>
        {status ? (
          <p
            className={`text-sm ${
              status.kind === 'ok' ? 'text-[color:var(--accent)]' : 'text-[color:var(--muted)]'
            }`}
          >
            {status.text}
          </p>
        ) : null}
      </div>
    </form>
  );
}
