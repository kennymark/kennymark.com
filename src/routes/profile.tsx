import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: ProfileRoute,
  head: () => ({
    meta: [{ title: 'About — Kenny Coffie' }],
  }),
});

const meta = [
  { label: 'Role', value: 'CTO, Moradia' },
  { label: 'Building', value: 'Togetha' },
  { label: 'Location', value: 'Manchester · UK' },
  { label: 'Timezone', value: 'GMT · UTC+0' },
  { label: 'Tooling', value: 'React · TypeScript · Node · Tailwind' },
  { label: 'Cameras', value: 'Fuji X-30 · Panasonic S5II' },
];

function ProfileRoute() {
  const exp = new Date().getFullYear() - 2018;

  return (
    <main className='space-y-24'>
      <section className='flex flex-col gap-6 border-b border-[color:var(--line-strong)] pb-10'>
        <div className='flex items-center justify-between'>
          <p className='label'>About · 01</p>
          <p className='label num'>{String(exp).padStart(2, '0')}+ years</p>
        </div>
        <h1 className='display text-6xl sm:text-8xl'>
          Hi, I'm
          <br />
          <span className='text-[color:var(--accent)]'>Kenny</span>.
        </h1>
      </section>

      <section className='grid gap-12 md:grid-cols-12 md:gap-16'>
        <aside className='md:col-span-4 space-y-8'>
          <div className='overflow-hidden border border-[color:var(--line)]'>
            <img
              src='/images/me2.jpg'
              alt='Kenny Coffie'
              className='aspect-[4/5] w-full object-cover'
            />
          </div>
          <dl className='divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]'>
            {meta.map((item) => (
              <div key={item.label} className='flex items-baseline justify-between gap-4 py-3'>
                <dt className='label'>{item.label}</dt>
                <dd className='text-right text-sm text-[color:var(--ink)]'>{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className='flex flex-wrap gap-2'>
            <a href='mailto:hello@kennymark.com' className='btn-accent flex-1 justify-center'>
              Email ↗
            </a>
            <a
              href='https://cal.com/kennymark/30min'
              target='_blank'
              rel='noreferrer'
              className='btn-ghost flex-1 justify-center'
            >
              Book a call ↗
            </a>
            <a
              href='/KennyCV.pdf'
              target='_blank'
              rel='noreferrer'
              className='btn-ghost flex-1 justify-center'
            >
              CV ↗
            </a>
          </div>
        </aside>

        <section className='md:col-span-8 prose max-w-none'>
          <p>
            I'm an engineer and founder with {exp}+ years of experience building for the web. My
            main work is leading engineering as CTO of{' '}
            <a href='https://moradia.app' target='_blank' rel='noreferrer'>
              Moradia
            </a>{' '}
            — owning architecture, design systems, hiring, and shipping the things that move the
            needle. Our flagship product is{' '}
            <a href='https://togetha.co.uk' target='_blank' rel='noreferrer'>
              Togetha
            </a>
            , a property management platform for letting agents and landlords.
          </p>
          <p>
            I specialise in the front-end but work across the stack, and I especially like the fuzzy
            space between design and engineering: interactions, typography, and the details that
            make products feel considered. Outside of work I ship side projects, write the
            occasional article, and take photos for fun.
          </p>
          <h2>Currently</h2>
          <ul>
            <li>Leading engineering at Moradia — product, infra, and team.</li>
            <li>Shipping Togetha, our property management platform.</li>
            <li>Exploring design engineering, React Server Components, and Tailwind v4.</li>
            <li>Getting back into photography after a quiet stretch.</li>
          </ul>
          <h2>Where to find me</h2>
          <p>
            Career story on{' '}
            <a href='https://www.linkedin.com/in/kennycoffie/' target='_blank' rel='noreferrer'>
              LinkedIn
            </a>
            , code on{' '}
            <a href='https://github.com/kennymark' target='_blank' rel='noreferrer'>
              GitHub
            </a>
            , shouts and rants on{' '}
            <a href='https://twitter.com/mrkennymark' target='_blank' rel='noreferrer'>
              Twitter
            </a>
            , photos on{' '}
            <a href='https://unsplash.com/@kennymark' target='_blank' rel='noreferrer'>
              Unsplash
            </a>
            , and longer-form writing on <Link to='/blog'>the blog</Link>.
          </p>
        </section>
      </section>
    </main>
  );
}
