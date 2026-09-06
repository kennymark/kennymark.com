import slugify from '@lib/slug';
import { titleCase } from '@lib/title-case';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ContactForm } from '@/components/site/contact-form';
import { homepageProjects, skills } from '@/lib/site-content';

export const Route = createFileRoute('/')({
  component: HomeRoute,
  head: () => ({
    meta: [{ title: 'Kenny Coffie — Software engineer & designer' }],
    links: [{ rel: 'canonical', href: 'https://kennymark.com/' }],
  }),
});

const meta = [
  { label: 'Role', value: 'CTO, Moradia' },
  { label: 'Building', value: 'Togetha' },
  { label: 'Since', value: '2018' },
  { label: 'Location', value: 'Manchester · UK' },
];

function HomeRoute() {
  const skillGroups = Object.entries(skills);

  return (
    <main className='space-y-32 sm:space-y-40'>
      <HeroSection />

      <section className='grid grid-cols-2 border-y border-[color:var(--line-strong)] divide-x divide-[color:var(--line)] md:grid-cols-4'>
        {meta.map((item, i) => (
          <div key={item.label} className='px-5 py-7 sm:px-6 sm:py-8'>
            <p className='label'>
              <span className='num mr-2 text-[color:var(--faint)]'>
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </p>
            <p className='mt-3 font-display text-xl sm:text-2xl tracking-tight'>{item.value}</p>
          </div>
        ))}
      </section>

      <FeaturedWork />

      <SkillsSection skillGroups={skillGroups} />

      <ContactSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className='relative pt-4'>
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line)] pb-4'>
        <div className='flex items-center gap-2.5 text-[color:var(--muted)]'>
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent)] opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]' />
          </span>
          <p className='label-ink'>Available for chats</p>
        </div>
        <p className='label'>Index · 01</p>
      </div>

      <h1 className='display mt-14 sm:mt-20 text-[clamp(3.5rem,13vw,10.5rem)]'>
        Kenny
        <br />
        Coffie<span className='text-[color:var(--accent)]'>.</span>
      </h1>

      <div className='mt-12 grid gap-10 border-t border-[color:var(--line)] pt-10 md:grid-cols-12 md:gap-12'>
        <div className='md:col-span-3'>
          <p className='label'>Who</p>
          <p className='mt-3 text-sm text-[color:var(--muted)]'>
            Software engineer & designer. Builds calm, useful products with small excellent teams.
          </p>
        </div>
        <div className='md:col-span-6'>
          <p className='text-xl sm:text-2xl leading-snug text-[color:var(--ink)]'>
            CTO at{' '}
            <a href='https://moradia.app' target='_blank' rel='noreferrer' className='link-accent'>
              Moradia
            </a>
            , shipping{' '}
            <a
              href='https://togetha.co.uk'
              target='_blank'
              rel='noreferrer'
              className='underline decoration-[color:var(--line-strong)] underline-offset-4 hover:decoration-[color:var(--accent)]'
            >
              Togetha
            </a>{' '}
            — property management software for letting agents and landlords. Previously across the
            stack for startups and agencies.
          </p>
        </div>
        <div className='flex flex-wrap items-start gap-2 md:col-span-3 md:justify-end'>
          <Link to='/projects' className='btn-accent'>
            See the work <span aria-hidden>→</span>
          </Link>
          <Link to='/profile' className='btn-ghost'>
            About
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section>
      <div className='flex items-end justify-between border-b border-[color:var(--line-strong)] pb-6'>
        <div>
          <p className='label'>Work · 02</p>
          <h2 className='display mt-5 text-4xl sm:text-6xl'>Selected projects</h2>
        </div>
        <Link
          to='/projects'
          className='group hidden items-center gap-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)] sm:inline-flex'
        >
          <span className='label'>Index</span>
          <span className='inline-block transition-transform group-hover:translate-x-0.5'>→</span>
        </Link>
      </div>

      <ul className='divide-y divide-[color:var(--line)]'>
        {homepageProjects.map((project, i) => (
          <li key={project.name}>
            <Link
              to='/project/$slug'
              params={{ slug: slugify(project.name) } as never}
              className='group grid grid-cols-12 items-start gap-4 py-8 transition-colors sm:py-10 md:gap-6'
            >
              <div className='col-span-12 flex items-baseline gap-3 md:col-span-1'>
                <span className='num text-sm text-[color:var(--faint)]'>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className='col-span-12 md:col-span-4'>
                <h3 className='font-display text-3xl tracking-tight transition-colors group-hover:text-[color:var(--accent)] sm:text-4xl'>
                  {titleCase(project.name)}
                </h3>
                {project.company ? <p className='mt-2 label'>{project.company}</p> : null}
              </div>

              <div className='col-span-12 md:col-span-4'>
                <p className='text-[color:var(--muted)]'>{project.description}</p>
                {project.stack?.length ? (
                  <div className='mt-4 flex flex-wrap gap-x-3 gap-y-1'>
                    {project.stack.slice(0, 4).map((tech: string) => (
                      <span key={tech} className='label'>
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className='col-span-12 md:col-span-3'>
                <div
                  className={`relative overflow-hidden border border-[color:var(--line)] ${
                    project.tag === 'mobile'
                      ? 'flex aspect-[4/3] items-center justify-center bg-[color:var(--accent-soft)] p-4'
                      : 'aspect-[4/3] bg-[color:var(--surface-2)]'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    loading='lazy'
                    className={
                      project.tag === 'mobile'
                        ? 'h-full w-auto max-w-[55%] object-contain shadow-xl shadow-black/20 ring-1 ring-black/10 transition-transform duration-700 group-hover:scale-[1.04]'
                        : 'h-full w-full object-cover object-[left_top] transition-transform duration-700 group-hover:scale-[1.04]'
                    }
                  />
                  <span
                    aria-hidden
                    className='absolute bottom-2 right-2 bg-[color:var(--ink)] px-1.5 py-0.5 text-[10px] font-mono tracking-widest uppercase text-[color:var(--bg)] opacity-0 transition-opacity group-hover:opacity-100'
                  >
                    View →
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

type SkillGroupData = {
  title?: string;
  skills: string[];
};

function SkillsSection({ skillGroups }: { skillGroups: [string, SkillGroupData][] }) {
  return (
    <section>
      <div className='border-b border-[color:var(--line-strong)] pb-6'>
        <p className='label'>Practice · 03</p>
        <h2 className='display mt-5 text-4xl sm:text-6xl'>
          A generalist, <span className='text-[color:var(--accent)]'>with taste</span>.
        </h2>
        <p className='mt-5 max-w-xl text-[color:var(--muted)]'>
          I move across the stack and the design process — bringing the same care to a bit of
          animation as I do to an API.
        </p>
      </div>

      <div className='grid divide-y divide-[color:var(--line)] md:grid-cols-3 md:divide-x md:divide-y-0'>
        {skillGroups.map(([group, data]) => (
          <article key={group} className='py-8 md:px-8 md:py-10 first:md:pl-0 last:md:pr-0'>
            <h3 className='font-display text-2xl tracking-tight'>{data.title ?? group}</h3>
            <ul className='mt-5 space-y-2 text-sm text-[color:var(--muted)]'>
              {data.skills.map((item: string) => (
                <li key={item} className='flex gap-3'>
                  <span className='num text-[color:var(--faint)]'>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section>
      <div className='border-b border-[color:var(--line-strong)] pb-6'>
        <p className='label'>Contact · 04</p>
        <h2 className='display mt-5 text-4xl sm:text-6xl'>
          Say hi<span className='text-[color:var(--accent)]'>.</span>
        </h2>
      </div>

      <div className='grid gap-12 pt-10 md:grid-cols-12 md:gap-16'>
        <div className='md:col-span-4'>
          <p className='text-[color:var(--muted)]'>
            Work, a collab, or just a hello — drop a line and I'll get back within a day or two.
          </p>
          <div className='mt-6 flex flex-wrap gap-2'>
            <span className='chip'>UK · GMT</span>
            <span className='chip'>Advisory</span>
            <span className='chip'>Speaking</span>
          </div>
        </div>
        <div className='md:col-span-8'>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
