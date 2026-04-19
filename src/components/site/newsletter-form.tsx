import { FormEvent, useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/dashboard/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not subscribe');
      setStatus({ kind: 'ok', text: data.message || 'Subscribed — check your inbox.' });
      setEmail('');
    } catch (error: any) {
      setStatus({ kind: 'err', text: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside className='overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)]'>
      <div className='grid gap-6 p-6 sm:grid-cols-[1.5fr_2fr] sm:gap-10 sm:p-10'>
        <div className='space-y-2'>
          <p className='eyebrow'>Newsletter</p>
          <h3 className='font-display text-2xl tracking-tight sm:text-3xl'>
            New posts, quietly delivered.
          </h3>
          <p className='text-sm text-[color:var(--muted)]'>
            Roughly one email a month. No spam, unsubscribe anytime.
          </p>
        </div>

        <form onSubmit={submit} className='flex flex-col gap-3'>
          <label className='block space-y-1.5'>
            <span className='eyebrow'>Email</span>
            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@company.com'
              className='field'
            />
          </label>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <button type='submit' disabled={submitting} className='btn-primary disabled:opacity-60'>
              {submitting ? 'Submitting…' : 'Subscribe'}
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
      </div>
    </aside>
  );
}
