import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import matter from 'gray-matter';
import timeRead from 'read-time';
import { ago } from '../../../lib/date-format';
import { getAllArticles } from '../../../lib/devblog';
import { NewsletterForm } from '../../components/site/newsletter-form';

const getPosts = createServerFn({ method: 'GET' }).handler(async () => {
  const articles = await getAllArticles();
  return articles.map((post: any) => {
    const meta = matter(post.markdown).data as {
      title?: string;
      description?: string;
    };
    return {
      title: meta.title ?? post.title,
      description: meta.description ?? post.description,
      slug: post.devToSlug,
      date: post.publishedAt,
      timeToRead: timeRead(post.markdown).m + 1,
    };
  });
});

export const Route = createFileRoute('/blog/')({
  loader: async () => await getPosts(),
  component: BlogIndexRoute,
  head: () => ({
    meta: [{ title: 'Writing — Kenny Coffie' }],
  }),
});

function BlogIndexRoute() {
  const posts = Route.useLoaderData();
  const [featured, ...rest] = posts;

  return (
    <main className='space-y-20'>
      <section className='space-y-4'>
        <p className='eyebrow'>Writing</p>
        <h1 className='display text-5xl sm:text-7xl'>
          Notes & <span className='text-[color:var(--accent)]'>essays</span>.
        </h1>
        <p className='max-w-2xl text-lg text-[color:var(--muted)]'>
          Things I've learned shipping software, cross-posted from dev.to. Occasionally opinionated,
          always trying to be useful.
        </p>
      </section>

      {featured ? (
        <Link
          to='/blog/$slug'
          params={{ slug: featured.slug }}
          className='group grid gap-6 rounded-3xl bg-[color:var(--surface)] p-6 ring-1 ring-[color:var(--line)] transition-all hover:ring-[color:var(--ink)]/30 sm:p-10 md:grid-cols-[2fr_3fr]'
        >
          <div className='flex flex-col justify-between gap-6'>
            <p className='eyebrow'>Latest post</p>
            <div>
              <h2 className='font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl'>
                {featured.title}
              </h2>
              <p className='mt-4 text-[color:var(--muted)]'>{featured.description}</p>
            </div>
            <div className='flex items-center gap-4 text-xs text-[color:var(--muted)]'>
              <span>{featured.timeToRead} min read</span>
              <span>·</span>
              <span>{ago(featured.date)}</span>
              <span className='ml-auto inline-flex items-center gap-1 text-[color:var(--accent)] transition-transform group-hover:translate-x-0.5'>
                Read it →
              </span>
            </div>
          </div>
          <div className='hidden rounded-2xl bg-[color:var(--surface-2)] md:flex'>
            <div className='flex h-full w-full flex-col justify-between p-6'>
              <div className='flex gap-2'>
                <span className='chip'>Essay</span>
                <span className='chip'>Engineering</span>
              </div>
              <p className='font-display text-7xl leading-none text-[color:var(--accent)]'>“</p>
            </div>
          </div>
        </Link>
      ) : null}

      <section>
        <div className='mb-4 flex items-end justify-between pb-2'>
          <h2 className='display text-3xl'>More posts</h2>
          <p className='text-xs text-[color:var(--muted)]'>
            {rest.length} post{rest.length === 1 ? '' : 's'}
          </p>
        </div>
        <ul className='divide-y divide-[color:var(--line)] overflow-hidden rounded-2xl bg-[color:var(--surface)] ring-1 ring-[color:var(--line)]'>
          {rest.map((post: any) => (
            <li key={post.slug}>
              <Link
                to='/blog/$slug'
                params={{ slug: post.slug }}
                className='group grid grid-cols-12 items-baseline gap-4 px-5 py-5 transition-colors hover:bg-[color:var(--surface-2)]'
              >
                <time
                  dateTime={post.date}
                  className='col-span-3 text-xs text-[color:var(--muted)] sm:col-span-2'
                >
                  {new Date(post.date).getFullYear()}
                </time>
                <div className='col-span-9 sm:col-span-8'>
                  <h3 className='font-display text-xl tracking-tight sm:text-2xl'>{post.title}</h3>
                  <p className='mt-1 line-clamp-2 text-sm text-[color:var(--muted)]'>
                    {post.description}
                  </p>
                </div>
                <div className='col-span-12 flex items-center justify-end gap-3 text-xs text-[color:var(--muted)] sm:col-span-2'>
                  <span>{post.timeToRead} min</span>
                  <span className='opacity-0 transition-opacity group-hover:opacity-100'>↗</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <NewsletterForm />
    </main>
  );
}
