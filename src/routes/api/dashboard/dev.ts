import { createFileRoute } from '@tanstack/react-router';
import { getAllArticles } from '../../../../lib/devblog';

const TTL_MS = 15 * 60 * 1000;
let cache: { at: number; body: string } | null = null;
let inflight: Promise<string> | null = null;

async function compute() {
  const articles = await getAllArticles();
  const total = articles.reduce((acc, item) => acc + (item.viewCount ?? 0), 0);
  const likes = articles.reduce((acc, item) => acc + item.positiveReactionsCount, 0);
  return JSON.stringify({ total, likes });
}

export const Route = createFileRoute('/api/dashboard/dev')({
  server: {
    handlers: {
      GET: async () => {
        const now = Date.now();
        let body: string;
        if (cache && now - cache.at < TTL_MS) {
          body = cache.body;
        } else if (inflight) {
          body = await inflight;
        } else {
          inflight = compute()
            .then((b) => {
              cache = { at: Date.now(), body: b };
              return b;
            })
            .finally(() => {
              inflight = null;
            });
          try {
            body = await inflight;
          } catch {
            body = cache?.body ?? JSON.stringify({ total: 0, likes: 0 });
          }
        }

        return new Response(body, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=600',
          },
        });
      },
    },
  },
});
