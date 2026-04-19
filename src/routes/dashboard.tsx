import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import axios from 'axios'
import Tidal from '../../lib/tidal'
import cachedTracks from '../../lib/cached-tracks'
import { useEffect, useState } from 'react'

const getDashboardBase = createServerFn({ method: 'GET' }).handler(async () => {
  const id = process.env.UNSPLASH_ID
  let unsplashViews = 0
  let unsplashDownloads = 0

  if (id) {
    try {
      const req = await axios.get(
        `https://api.unsplash.com/users/kennymark/statistics?client_id=${id}`,
      )
      unsplashViews = req.data?.views?.total ?? 0
      unsplashDownloads = req.data?.downloads?.total ?? 0
    } catch {
      unsplashViews = 0
      unsplashDownloads = 0
    }
  }

  const { TIDAL_PASS: password, TIDAL_EMAIL: username } = process.env
  let tracks: any = cachedTracks
  if (password && username) {
    try {
      const tidal = new Tidal({ username, password })
      tracks = await tidal.getMyFavTracks()
    } catch {
      tracks = cachedTracks
    }
  }

  return {
    unsplashViews,
    unsplashDownloads,
    tracks: tracks?.items?.slice(0, 8) ?? [],
  }
})

export const Route = createFileRoute('/dashboard')({
  loader: async () => await getDashboardBase(),
  component: DashboardRoute,
  head: () => ({
    meta: [{ title: 'Stats — Kenny Coffie' }],
  }),
})

const format = (n?: number) => (typeof n === 'number' ? Intl.NumberFormat().format(n) : '—')

function DashboardRoute() {
  const data = Route.useLoaderData()
  const [metrics, setMetrics] = useState<{
    views?: number
    likes?: number
    stars?: number
    followers?: number
    subscribers?: number
  }>({})

  useEffect(() => {
    const load = async () => {
      const [dev, github, subs] = await Promise.all([
        fetch('/api/dashboard/dev').then((r) => r.json()).catch(() => ({})),
        fetch('/api/dashboard/github').then((r) => r.json()).catch(() => ({})),
        fetch('/api/dashboard/subscribers').then((r) => r.json()).catch(() => ({})),
      ])

      setMetrics({
        views: dev.total,
        likes: dev.likes,
        stars: github.stars,
        followers: github.followers,
        subscribers: subs.count,
      })
    }

    load()
  }, [])

  const tiles: Array<{ label: string; value: string; source: string; accent?: boolean }> = [
    { label: 'Unsplash views', value: format(data.unsplashViews), source: 'unsplash.com', accent: true },
    { label: 'Unsplash downloads', value: format(data.unsplashDownloads), source: 'unsplash.com' },
    { label: 'Article views', value: format(metrics.views), source: 'dev.to' },
    { label: 'Article likes', value: format(metrics.likes), source: 'dev.to' },
    { label: 'GitHub stars', value: format(metrics.stars), source: 'github.com' },
    { label: 'GitHub followers', value: format(metrics.followers), source: 'github.com' },
    { label: 'Newsletter subscribers', value: format(metrics.subscribers), source: 'buttondown' },
  ]

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
                  src={`https://resources.tidal.com/images/${track.item.album.cover.replace(/-/g, '/')}/320x320.jpg`}
                  alt={track.item.title}
                  className='h-12 w-12 rounded-lg object-cover'
                  loading='lazy'
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
  )
}
