import cachedTracks from '@lib/cached-tracks';
import Tidal from '@lib/tidal';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import axios from 'axios';
import { useEffect, useState } from 'react';

type DashboardBase = {
  unsplashViews: number;
  unsplashDownloads: number;
  tracks: any[];
};

const CACHE_TTL_MS = 15 * 60 * 1000;
let baseCache: { at: number; data: DashboardBase } | null = null;
let inflight: Promise<DashboardBase> | null = null;

async function fetchUnsplashStats() {
  const id = process.env.UNSPLASH_ID;
  if (!id) return { unsplashViews: 0, unsplashDownloads: 0 };
  try {
    const req = await axios.get(
      `https://api.unsplash.com/users/kennymark/statistics?client_id=${id}`,
      { timeout: 5000 },
    );
    return {
      unsplashViews: req.data?.views?.total ?? 0,
      unsplashDownloads: req.data?.downloads?.total ?? 0,
    };
  } catch {
    return { unsplashViews: 0, unsplashDownloads: 0 };
  }
}

async function fetchTidalTracks() {
  const { TIDAL_PASS: password, TIDAL_EMAIL: username } = process.env;
  if (!password || !username) return cachedTracks;
  try {
    const tidal = new Tidal({ username, password });
    return await tidal.getMyFavTracks();
  } catch {
    return cachedTracks;
  }
}

const getDashboardBase = createServerFn({ method: 'GET' }).handler(
  async (): Promise<DashboardBase> => {
    const now = Date.now();
    if (baseCache && now - baseCache.at < CACHE_TTL_MS) return baseCache.data;
    if (inflight) return inflight;

    inflight = (async () => {
      try {
        const [{ unsplashViews, unsplashDownloads }, tracks] = await Promise.all([
          fetchUnsplashStats(),
          fetchTidalTracks(),
        ]);
        const data: DashboardBase = {
          unsplashViews,
          unsplashDownloads,
          tracks: (tracks as any)?.items?.slice(0, 8) ?? [],
        };
        baseCache = { at: Date.now(), data };
        return data;
      } catch {
        return (
          baseCache?.data ?? {
            unsplashViews: 0,
            unsplashDownloads: 0,
            tracks: (cachedTracks as any)?.items?.slice(0, 8) ?? [],
          }
        );
      } finally {
        inflight = null;
      }
    })();

    return inflight;
  },
);

export const Route = createFileRoute('/dashboard')({
  loader: async () => await getDashboardBase(),
  staleTime: CACHE_TTL_MS,
  gcTime: CACHE_TTL_MS,
  component: DashboardRoute,
  head: () => ({
    meta: [{ title: 'Stats — Kenny Coffie' }],
  }),
});

const format = (n?: number) => (typeof n === 'number' ? Intl.NumberFormat().format(n) : '—');

function DashboardRoute() {
  const data = Route.useLoaderData();
  const [metrics, setMetrics] = useState<{
    views?: number;
    likes?: number;
    stars?: number;
    followers?: number;
    subscribers?: number;
  }>({});

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchJson = (url: string) =>
      fetch(url, { signal })
        .then((r) => r.json())
        .catch(() => ({}));

    Promise.all([
      fetchJson('/api/dashboard/dev'),
      fetchJson('/api/dashboard/github'),
      fetchJson('/api/dashboard/subscribers'),
    ]).then(([dev, github, subs]) => {
      if (signal.aborted) return;
      setMetrics({
        views: dev.total,
        likes: dev.likes,
        stars: github.stars,
        followers: github.followers,
        subscribers: subs.count,
      });
    });

    return () => controller.abort();
  }, []);

  const tiles: Array<{
    label: string;
    value: string;
    source: string;
    accent?: boolean;
  }> = [
    {
      label: 'Unsplash views',
      value: format(data.unsplashViews),
      source: 'unsplash.com',
      accent: true,
    },
    {
      label: 'Unsplash downloads',
      value: format(data.unsplashDownloads),
      source: 'unsplash.com',
    },
    { label: 'Article views', value: format(metrics.views), source: 'dev.to' },
    { label: 'Article likes', value: format(metrics.likes), source: 'dev.to' },
    {
      label: 'GitHub stars',
      value: format(metrics.stars),
      source: 'github.com',
    },
    {
      label: 'GitHub followers',
      value: format(metrics.followers),
      source: 'github.com',
    },
    {
      label: 'Newsletter subscribers',
      value: format(metrics.subscribers),
      source: 'buttondown',
    },
  ];

  return (
    <main className='space-y-16'>
      <section className='space-y-4'>
        <p className='eyebrow'>Live dashboard</p>
        <h1 className='display text-5xl sm:text-7xl'>
          Numbers worth <span className='text-[color:var(--accent)]'>sharing</span>.
        </h1>
        <p className='max-w-2xl text-lg text-[color:var(--muted)]'>
          A live snapshot of writing, code, photography and listening habits — pulled from the usual
          suspects.
        </p>
      </section>

      <section className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {tiles.map((tile) => (
          <article
            key={tile.label}
            className='relative min-h-[150px] rounded-2xl bg-[color:var(--surface)] p-5 ring-1 ring-[color:var(--line)]'
          >
            <p className='eyebrow'>{tile.label}</p>
            <p className='mt-5 font-display text-4xl tracking-tight sm:text-5xl'>{tile.value}</p>
            <p className='mt-3 text-[11px] text-[color:var(--faint)]'>via {tile.source}</p>
            {tile.accent ? (
              <span className='absolute right-4 top-4 h-2 w-2 rounded-full bg-[color:var(--accent)]' />
            ) : null}
          </article>
        ))}
      </section>

      <section className='space-y-6'>
        <div className='flex items-end justify-between pb-2'>
          <div>
            <p className='eyebrow'>Now playing</p>
            <h2 className='display mt-1 text-3xl sm:text-4xl'>Favourite tracks</h2>
          </div>
          <p className='text-xs text-[color:var(--muted)]'>from Tidal</p>
        </div>
        <ul className='grid gap-2 sm:grid-cols-2'>
          {data.tracks.map((track: any, idx: number) => (
            <li key={track.created ?? idx}>
              <a
                href={track.item.url}
                target='_blank'
                rel='noreferrer'
                className='group flex items-center gap-4 rounded-2xl bg-[color:var(--surface)] p-3 ring-1 ring-[color:var(--line)] transition-all hover:ring-[color:var(--ink)]/30'
              >
                <span className='text-xs text-[color:var(--faint)]'>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <img
                  src={`https://resources.tidal.com/images/${track.item.album.cover.replace(/-/g, '/')}/160x160.jpg`}
                  alt={track.item.title}
                  width={48}
                  height={48}
                  className='h-12 w-12 rounded-lg object-cover'
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  decoding='async'
                />
                <div className='min-w-0 flex-1'>
                  <p className='truncate font-medium'>{track.item.title}</p>
                  <p className='truncate text-sm text-[color:var(--muted)]'>
                    {track.item.artist.name}
                  </p>
                </div>
                <span className='text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100'>
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
