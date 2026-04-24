import { createFileRoute } from '@tanstack/react-router';
import { shortlinks } from '@/lib/site-content';

export const Route = createFileRoute('/slashes')({
  loader: () => shortlinks,
  component: SlashesRoute,
  head: () => ({
    meta: [{ title: 'Slashes — Kenny Coffie' }],
  }),
});

function SlashesRoute() {
  const redirects = Route.useLoaderData() as Array<{ source: string; destination: string }>;

  return (
    <main className='mx-auto max-w-3xl space-y-10'>
      <section className='space-y-4'>
        <p className='eyebrow'>/slashes</p>
        <h1 className='display text-5xl sm:text-6xl'>
          My personal <span className='text-[color:var(--accent)]'>URL shortener</span>.
        </h1>
        <p className='text-[color:var(--muted)]'>
          Each link routes through <span className='font-mono'>kennymark.com</span>. Tap to open.
        </p>
      </section>

      <ul className='divide-y divide-[color:var(--line)] overflow-hidden rounded-2xl bg-[color:var(--surface)] ring-1 ring-[color:var(--line)]'>
        {redirects.map((item) => (
          <li key={item.source}>
            <a
              href={item.destination}
              target='_blank'
              rel='noreferrer'
              className='group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[color:var(--surface-2)]'
            >
              <span className='text-sm font-medium text-[color:var(--ink)]'>
                /{item.source.replace('/', '')}
              </span>
              <span className='hidden flex-1 truncate px-4 font-mono text-xs text-[color:var(--muted)] sm:inline'>
                → {item.destination}
              </span>
              <span className='text-[color:var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]'>
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
