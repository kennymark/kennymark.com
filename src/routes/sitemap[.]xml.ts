import { createFileRoute } from '@tanstack/react-router';
import { getAllArticles } from '../../lib/devblog';

const BASE_URL = 'https://kennymark.com';

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          '/',
          '/blog',
          '/projects',
          '/photography',
          '/dashboard',
          '/profile',
          '/slashes',
        ];
        const articles = await getAllArticles().catch(() => []);
        const blogPaths = articles.map((post: any) => `/blog/${post.devToSlug}`);
        const urls = [...staticPaths, ...blogPaths];

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${BASE_URL}${path}</loc></url>`).join('\n')}
</urlset>`;

        return new Response(body, {
          headers: { 'Content-Type': 'application/xml; charset=utf-8' },
        });
      },
    },
  },
});
