import { ago } from '@lib/date-format';
import { getArticleByPath } from '@lib/devblog';
import { calculateReadingTime } from '@lib/reading-time';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { NewsletterForm } from '@/components/site/newsletter-form';

const getPost = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const post = await getArticleByPath(slug);
    if (!post?.body_markdown) return null;
    const parsed = matter(post.body_markdown);

    const mdx = await bundleMDX({
      source: parsed.content,
    });

    return {
      slug,
      title: parsed.data?.title ?? post.title,
      description: parsed.data?.description ?? post.description,
      coverImage: parsed.data?.cover_image ?? post.cover_image,
      code: mdx.code,
      timeToRead: calculateReadingTime(post.body_markdown),
      date: post.published_at,
    };
  });

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getPost({ data: params.slug });
    if (!post) throw notFound();
    return post;
  },
  component: BlogPostRoute,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} — Kenny Coffie` },
      { name: 'description', content: loaderData.description ?? '' },
      { property: 'og:title', content: loaderData.title },
      { property: 'og:description', content: loaderData.description ?? '' },
      ...(loaderData.coverImage ? [{ property: 'og:image', content: loaderData.coverImage }] : []),
    ],
  }),
});

function BlogPostRoute() {
  const post = Route.useLoaderData();
  const Component = useMemo(() => getMDXComponent(post.code), [post.code]);

  return (
    <main className='mx-auto max-w-3xl space-y-12'>
      <Link
        to='/blog'
        className='inline-flex items-center gap-1.5 text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)]'
      >
        <span aria-hidden>←</span> All writing
      </Link>

      <header className='space-y-5 border-b border-[color:var(--line)] pb-10'>
        <p className='eyebrow'>Essay · {new Date(post.date).getFullYear()}</p>
        <h1 className='display text-4xl leading-[1.05] sm:text-6xl'>{post.title}</h1>
        <p className='text-lg text-[color:var(--muted)]'>{post.description}</p>
        <div className='flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]'>
          <span>{post.timeToRead} min read</span>
          <span className='h-1 w-1 rounded-full bg-[color:var(--line)]' />
          <span>{ago(post.date)}</span>
        </div>
      </header>

      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          className='w-full rounded-2xl border border-[color:var(--line)] object-cover'
        />
      ) : null}

      <article className='prose max-w-none'>
        <Component components={mdxComponents} />
      </article>

      <NewsletterForm />
    </main>
  );
}

const mdxComponents = {
  a: (props: any) => <a target='_blank' rel='noreferrer' {...props} />,
  // biome-ignore lint/a11y/useAltText: <explanation>
  img: (props: any) => <img loading='lazy' {...props} />,
};
