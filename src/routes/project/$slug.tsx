import { titleCase } from '@lib/title-case';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { getProjectBySlug } from '@/lib/site-content';

type Project = NonNullable<ReturnType<typeof getProjectBySlug>>;
type ProjectWithGallery = Project & { gallery?: string[] };

export const Route = createFileRoute('/project/$slug')({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData, params }) => ({
    meta: [{ title: `${titleCase(loaderData.name)} — Project` }],
    links: [{ rel: 'canonical', href: `https://kennymark.com/project/${params.slug}` }],
  }),
  component: ProjectDetailRoute,
});

function ProjectDetailRoute() {
  const project = Route.useLoaderData() as ProjectWithGallery;
  const isMobile = project.tag === 'mobile';
  const gallery = project.gallery ?? [];
  const extraShots = gallery.filter((src: string) => src !== project.image);

  return (
    <main className='space-y-20'>
      <div className='flex items-center justify-between border-b border-[color:var(--line)] pb-4'>
        <Link
          to='/projects'
          className='group inline-flex items-baseline gap-2 label-ink hover:text-[color:var(--accent)]'
        >
          <span aria-hidden>←</span> Back to work
        </Link>
        <p className='label'>{project.tag ?? 'Project'}</p>
      </div>

      <header className='grid gap-12 md:grid-cols-12'>
        <div className='md:col-span-8 space-y-6'>
          <div className='flex flex-wrap items-center gap-3'>
            {project.status ? (
              <span className='inline-flex items-center gap-1.5 label'>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    project.status === 'live'
                      ? 'bg-[color:var(--accent)]'
                      : 'bg-[color:var(--faint)]'
                  }`}
                />
                {project.status}
              </span>
            ) : null}
            {project.company ? <span className='label'>{project.company}</span> : null}
            {project.showCase ? <span className='label'>Showcase</span> : null}
          </div>
          <h1 className='display text-6xl sm:text-8xl'>{titleCase(project.name)}</h1>
          <p className='max-w-2xl text-lg text-[color:var(--muted)] sm:text-xl'>
            {project.description}
          </p>
          <div className='flex flex-wrap gap-3 pt-2'>
            {project.link ? (
              <a href={project.link} target='_blank' rel='noreferrer' className='btn-accent'>
                Live demo <span aria-hidden>↗</span>
              </a>
            ) : null}
            {project.source ? (
              <a href={project.source} target='_blank' rel='noreferrer' className='btn-ghost'>
                Source ↗
              </a>
            ) : null}
          </div>
        </div>

        {project.stack?.length ? (
          <aside className='md:col-span-4 border-t border-[color:var(--line-strong)] pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0'>
            <p className='label'>Stack</p>
            <ul className='mt-5 space-y-2.5'>
              {project.stack.map((item: string, i: number) => (
                <li key={item} className='flex items-baseline gap-3 text-sm'>
                  <span className='num text-xs text-[color:var(--faint)]'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </header>

      <section className='space-y-3'>
        <div className='flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4'>
          <p className='label'>Cover</p>
          <p className='label num'>001</p>
        </div>
        <figure
          className={`overflow-hidden border border-[color:var(--line)] ${
            isMobile
              ? 'flex aspect-[16/9] items-center justify-center bg-[color:var(--accent-soft)] px-6 py-10'
              : 'bg-[color:var(--surface-2)]'
          }`}
        >
          <img
            src={project.image}
            alt={project.name}
            loading='lazy'
            className={
              isMobile
                ? 'h-full w-auto max-w-[28%] object-contain shadow-2xl shadow-black/30 ring-1 ring-black/10'
                : 'h-auto w-full'
            }
          />
        </figure>
      </section>

      {extraShots.length ? (
        <section className='space-y-3'>
          <div className='flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4'>
            <p className='label'>Gallery</p>
            <p className='label num'>{String(extraShots.length).padStart(3, '0')}</p>
          </div>
          <div className={`grid gap-3 ${isMobile ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {extraShots.map((src: string, i: number) => (
              <figure
                key={src}
                className={`relative overflow-hidden border border-[color:var(--line)] ${
                  isMobile
                    ? 'flex aspect-[4/5] items-center justify-center bg-[color:var(--accent-soft)] p-4'
                    : 'bg-[color:var(--surface-2)]'
                }`}
              >
                <img
                  src={src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  loading='lazy'
                  className={
                    isMobile
                      ? 'h-full w-auto max-w-[70%] object-contain shadow-xl shadow-black/20 ring-1 ring-black/10'
                      : 'aspect-[16/10] w-full object-cover object-[left_top]'
                  }
                />
                <span className='absolute left-3 top-3 font-mono text-[10px] tracking-widest uppercase text-[color:var(--ink)]/70'>
                  {String(i + 2).padStart(3, '0')}
                </span>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className='flex items-center justify-between border-t border-[color:var(--line-strong)] pt-8'>
        <Link to='/projects' className='btn-ghost'>
          ← All projects
        </Link>
        {project.link ? (
          <a href={project.link} target='_blank' rel='noreferrer' className='btn-accent'>
            Visit project ↗
          </a>
        ) : null}
      </section>
    </main>
  );
}
