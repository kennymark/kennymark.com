import { createFileRoute } from '@tanstack/react-router';

const TTL_MS = 15 * 60 * 1000;
let cache: { at: number; body: string } | null = null;
let inflight: Promise<string> | null = null;

type GithubUser = {
  followers?: number;
};

type GithubRepo = {
  fork?: boolean;
  stargazers_count?: number;
};

async function compute() {
  const [userResponse, reposResponse] = await Promise.all([
    fetch('https://api.github.com/users/kennymark'),
    fetch('https://api.github.com/users/kennymark/repos?per_page=100'),
  ]);
  const user = (await userResponse.json()) as GithubUser;
  const repositories = (await reposResponse.json()) as GithubRepo[] | unknown;
  const mine = Array.isArray(repositories) ? repositories.filter((r) => !r.fork) : [];
  const stars = mine.reduce(
    (acc: number, repository) => acc + (repository.stargazers_count ?? 0),
    0,
  );
  return JSON.stringify({ followers: user?.followers ?? 0, stars });
}

export const Route = createFileRoute('/api/dashboard/github')({
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
            body = cache?.body ?? JSON.stringify({ followers: 0, stars: 0 });
          }
        }

        return new Response(body, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
          },
        });
      },
    },
  },
});
