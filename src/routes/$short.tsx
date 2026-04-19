import { createFileRoute, notFound } from '@tanstack/react-router';
import { useEffect } from 'react';
import { shortlinks } from '../lib/site-content';

export const Route = createFileRoute('/$short')({
  loader: ({ params }) => {
    const lookup = shortlinks.find((item) => item.source === `/${params.short}`);
    if (!lookup) throw notFound();
    return lookup;
  },
  component: ShortRedirectRoute,
  head: ({ loaderData }) => ({
    meta: [{ title: `Redirecting to ${loaderData.destination}` }],
  }),
});

function ShortRedirectRoute() {
  const target = Route.useLoaderData();

  useEffect(() => {
    window.location.replace(target.destination);
  }, [target.destination]);

  return (
    <main className='mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 text-center'>
      <p className='eyebrow'>Redirecting</p>
      <p className='display text-3xl'>Taking you there…</p>
      <p className='max-w-sm break-all text-sm text-[color:var(--muted)]'>
        <span className='font-mono'>→ {target.destination}</span>
      </p>
      <a href={target.destination} className='btn-ghost mt-2'>
        Continue manually ↗
      </a>
    </main>
  );
}
