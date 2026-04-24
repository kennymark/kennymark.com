import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          `User-agent: *
Allow: /

Sitemap: https://kennymark.com/sitemap.xml
`,
          {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          },
        ),
    },
  },
});
