import { getAllArticles } from '@lib/devblog';
import { createFileRoute } from '@tanstack/react-router';

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
        const now = new Date().toISOString();
        const articles = await getAllArticles().catch(() => []);
        const staticUrls = staticPaths.map((path) => ({ path, lastmod: now }));
        const blogUrls = articles.map((post) => ({
          path: `/blog/${post.devToSlug}`,
          lastmod: new Date(post.publishedAt).toISOString(),
        }));
        const urls = [...staticUrls, ...blogUrls];

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((entry) => `  <url><loc>${BASE_URL}${entry.path}</loc><lastmod>${entry.lastmod}</lastmod></url>`).join('\n')}
</urlset>`;

        return new Response(body, {
          headers: { 'Content-Type': 'application/xml; charset=utf-8' },
        });
      },
    },
  },
});
