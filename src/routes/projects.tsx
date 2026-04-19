import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import slugify from '../../lib/slug'
import { titleCase } from '../../lib/title-case'
import { moreProjects, portfolioProjects } from '../lib/site-content'

const tabs = ['showcase', 'fullstack', 'frontend', 'mobile'] as const

export const Route = createFileRoute('/projects')({
  component: ProjectsRoute,
  head: () => ({
    meta: [{ title: 'Work — Kenny Coffie' }],
  }),
})

function ProjectsRoute() {
  const [active, setActive] = useState<(typeof tabs)[number]>('showcase')

  const projects = useMemo(() => {
    if (active === 'showcase') return portfolioProjects.filter((p) => p.showCase)
    return portfolioProjects.filter((p) => p.tag === active)
  }, [active])

  return (
    <main className='space-y-24'>
      <section className='flex flex-col gap-6 border-b border-[color:var(--line-strong)] pb-10'>
        <div className='flex items-center justify-between'>
          <p className='label'>Work · Index</p>
          <p className='label'>{String(projects.length).padStart(2, '0')} items</p>
        </div>
        <h1 className='display text-6xl sm:text-8xl'>
          Things I've
          <br />
          <span className='text-[color:var(--accent)]'>built</span>.
        </h1>
        <p className='max-w-xl text-[color:var(--muted)]'>
          A mix of client work, personal projects, and experiments. Filter by discipline or scroll
          the lot.
        </p>
      </section>

      <section>
        <div className='flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--line)] pb-4'>
          <div className='flex flex-wrap gap-6'>
            {tabs.map((tab, i) => (
              <button
                key={tab}
                type='button'
                onClick={() => setActive(tab)}
                aria-pressed={active === tab}
                className='group flex items-baseline gap-2 text-sm transition-colors'
              >
                <span
                  className={`num text-xs ${active === tab ? 'text-[color:var(--accent)]' : 'text-[color:var(--faint)]'
                    }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`capitalize ${active === tab
                    ? 'text-[color:var(--ink)]'
                    : 'text-[color:var(--muted)] hover:text-[color:var(--ink)]'
                    }`}
                >
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </div>

        <ul className='divide-y divide-[color:var(--line)]'>
          {projects.map((project, i) => (
            <li key={project.name}>
              <Link
                to='/project/$slug'
                params={{ slug: slugify(project.name) } as never}
                className='group grid grid-cols-12 items-start gap-4 py-8 sm:py-10 md:gap-6'
              >
                <div className='col-span-12 md:col-span-1'>
                  <span className='num text-sm text-[color:var(--faint)]'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className='col-span-12 md:col-span-4'>
                  <div className='flex items-baseline gap-3'>
                    <h2 className='font-display text-3xl tracking-tight transition-colors group-hover:text-[color:var(--accent)] sm:text-4xl'>
                      {titleCase(project.name)}
                    </h2>
                  </div>
                  <div className='mt-3 flex flex-wrap items-center gap-3'>
                    {project.status ? (
                      <span className='inline-flex items-center gap-1.5 label'>
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${project.status === 'live'
                            ? 'bg-[color:var(--accent)]'
                            : 'bg-[color:var(--faint)]'
                            }`}
                        />
                        {project.status}
                      </span>
                    ) : null}
                    {project.tag ? <span className='label'>{project.tag}</span> : null}
                    {project.company ? <span className='label'>{project.company}</span> : null}
                  </div>
                </div>

                <div className='col-span-12 md:col-span-4'>
                  <p className='text-[color:var(--muted)]'>{project.description}</p>
                  {project.stack?.length ? (
                    <div className='mt-4 flex flex-wrap gap-x-3 gap-y-1'>
                      {project.stack.slice(0, 5).map((tech: string) => (
                        <span key={tech} className='label'>
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className='col-span-12 md:col-span-3'>
                  <div
                    className={`relative overflow-hidden border border-[color:var(--line)] ${project.tag === 'mobile'
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
                          : 'h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]'
                      }
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* <section>
        <div className='flex items-end justify-between border-b border-[color:var(--line-strong)] pb-6'>
          <div>
            <p className='label'>Archive</p>
            <h2 className='display mt-5 text-4xl sm:text-5xl'>More things</h2>
          </div>
          <p className='label'>{String(moreProjects.length).padStart(2, '0')} items</p>
        </div>
        <ul className='divide-y divide-[color:var(--line)]'>
          {moreProjects.map((project: any, i: number) => (
            <li key={project.name}>
              <div className='grid grid-cols-12 items-baseline gap-4 py-6'>
                <span className='num col-span-2 text-xs text-[color:var(--faint)] md:col-span-1'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className='col-span-10 font-display text-xl tracking-tight md:col-span-3'>
                  {titleCase(project.name)}
                </h3>
                <p className='col-span-12 text-sm text-[color:var(--muted)] md:col-span-6'>
                  {project.description}
                </p>
                <div className='col-span-12 flex justify-start md:col-span-2 md:justify-end'>
                  {project.link ? (
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noreferrer'
                      className='group inline-flex items-baseline gap-1.5 label-ink hover:text-[color:var(--accent)]'
                    >
                      Visit
                      <span className='transition-transform group-hover:translate-x-0.5'>↗</span>
                    </a>
                  ) : (
                    <span className='label'>Retired</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section> */}
    </main>
  )
}
