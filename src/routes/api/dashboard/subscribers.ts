import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

const TTL_MS = 30 * 60 * 1000;
let cache: { at: number; body: string } | null = null;
let inflight: Promise<string> | null = null;

async function compute() {
  const apiKey = process.env.BUTTON_API;
  if (!apiKey) return JSON.stringify({ count: 0 });
  const response = await axios.get('https://api.buttondown.email/v1/subscribers', {
    headers: { Authorization: `Token ${apiKey}` },
    timeout: 5000,
  });
  return JSON.stringify({ count: response.data?.count ?? 0 });
}

export const Route = createFileRoute('/api/dashboard/subscribers')({
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
            body = cache?.body ?? JSON.stringify({ count: 0 });
          }
        }

        return new Response(body, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=900',
          },
        });
      },
    },
  },
});
