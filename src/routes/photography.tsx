import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Photo = {
  id: string
  urls: { regular: string; small: string; full?: string }
  description?: string | null
  alt_description?: string | null
  width?: number
  height?: number
}

const getPhotos = createServerFn({ method: 'GET' }).handler(async () => {
  const clientID = process.env.UNSPLASH_ID
  if (!clientID) return [] as Photo[]

  try {
    const req = await axios.get(
      `https://api.unsplash.com/users/kennymark/photos?client_id=${clientID}&per_page=36`,
    )
    return req.data as Photo[]
  } catch {
    return [] as Photo[]
  }
})

export const Route = createFileRoute('/photography')({
  loader: async () => await getPhotos(),
  component: PhotographyRoute,
  head: () => ({
    meta: [{ title: 'Photography — Kenny Coffie' }],
  }),
})

function PhotographyRoute() {
  const photos = Route.useLoaderData()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  )
  const prev = useCallback(
    () =>
      setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )

  return (
    <main className='space-y-16'>
      <section className='flex flex-col gap-6 border-b border-[color:var(--line-strong)] pb-10'>
        <div className='flex items-center justify-between'>
          <p className='label'>Photography · 01</p>
          <p className='label num'>{String(photos.length).padStart(3, '0')} frames</p>
        </div>
        <h1 className='display text-6xl sm:text-8xl'>
          Through the
          <br />
          <span className='text-[color:var(--accent)]'>lens</span>.
        </h1>
        <p className='max-w-xl text-[color:var(--muted)]'>
          Architecture, city walks, and the occasional event. Click any image to open it full size —
          arrow keys to browse.
        </p>
      </section>

      {photos.length ? (
        <div className='columns-1 gap-4 sm:columns-2 lg:columns-3'>
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type='button'
              onClick={() => setActiveIndex(i)}
              className='group mb-4 block w-full cursor-zoom-in overflow-hidden border border-[color:var(--line)] bg-[color:var(--surface)] break-inside-avoid transition-colors hover:border-[color:var(--ink)]/40'
            >
              <img
                src={photo.urls.regular}
                alt={photo.alt_description ?? photo.description ?? 'Photo by Kenny Coffie'}
                className='h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]'
                loading='lazy'
              />
            </button>
          ))}
        </div>
      ) : (
        <p className='border border-dashed border-[color:var(--line-strong)] p-6 text-sm text-[color:var(--muted)]'>
          No photos loaded. Set <code className='font-mono'>UNSPLASH_ID</code> to enable this page.
        </p>
      )}

      {activeIndex !== null ? (
        <Lightbox
          photo={photos[activeIndex]}
          index={activeIndex}
          total={photos.length}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      ) : null}
    </main>
  )
}

function Lightbox({
  photo,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  photo: Photo
  index: number
  total: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onNext, onPrev])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      role='dialog'
      aria-modal='true'
      aria-label='Photograph viewer'
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClose()
      }}
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm'
    >
      <div className='pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 font-mono text-[11px] tracking-widest uppercase text-white/70'>
        <span>
          {String(index + 1).padStart(3, '0')} / {String(total).padStart(3, '0')}
        </span>
        <span className='hidden sm:inline'>Esc to close · ← → to browse</span>
      </div>

      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label='Close'
        className='absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10'
      >
        ✕
      </button>

      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label='Previous'
        className='absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10'
      >
        ←
      </button>

      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label='Next'
        className='absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10'
      >
        →
      </button>

      <img
        src={photo.urls.full ?? photo.urls.regular}
        alt={photo.alt_description ?? 'Photograph'}
        className='max-h-[88vh] max-w-[92vw] object-contain shadow-2xl'
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      />
    </div>,
    document.body,
  )
}
