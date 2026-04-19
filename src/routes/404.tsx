import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/404')({
  component: Error404Route,
  head: () => ({
    meta: [{ title: 'Not found — Kenny Coffie' }],
  }),
});

function Error404Route() {
  return (
    <main className='flex min-h-[60vh] flex-col items-start justify-center gap-6'>
      <p className='eyebrow'>404</p>
      <h1 className='display text-[clamp(4rem,18vw,14rem)] leading-none text-[color:var(--accent)]'>
        404.
      </h1>
      <p className='max-w-md text-lg text-[color:var(--muted)]'>
        The page you're looking for has wandered off. Let's find you something that exists.
      </p>
      <div className='flex gap-2'>
        <Link to='/' className='btn-accent'>
          Take me home
        </Link>
        <Link to='/projects' className='btn-ghost'>
          Browse work
        </Link>
      </div>
    </main>
  );
}
