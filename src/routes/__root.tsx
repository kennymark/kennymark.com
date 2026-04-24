/// <reference types="vite/client" />

import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import appCss from '@/globals.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Kenny Coffie — Software engineer & designer' },
      {
        name: 'description',
        content:
          'Kenny Coffie is a software engineer building thoughtful web products. Portfolio, writing, photography, and live metrics.',
      },
      { name: 'author', content: 'Kenny Coffie' },
      { property: 'og:site_name', content: 'Kenny Coffie' },
      {
        property: 'og:title',
        content: 'Kenny Coffie — Software engineer & designer',
      },
      {
        property: 'og:description',
        content:
          'Portfolio, writing, photography and live metrics from Kenny Coffie, a software engineer in the UK.',
      },
      { property: 'og:image', content: '/images/me2.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@mrkennymark' },
      { name: 'theme-color', content: '#fbfbf9' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/images/favicon.png' },
      { rel: 'preconnect', href: 'https://images.unsplash.com', crossOrigin: '' },
      { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
    ],
    scripts: [
      {
        children: `(function(){try{var t=localStorage.getItem('kc-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t==='dark'||(!t&&m);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
      },
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-8LTL2CML5L',
        async: true,
      },
      {
        src: 'https://analytics.togetha.co.uk/script.js',
        async: true,
        'data-website-id': '01fe604d-5649-4207-98c1-15dcf94267d7',
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8LTL2CML5L', { page_path: window.location.pathname });
        `,
      },
      {
        children: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "5y153908ax");
        `,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

const navLinks = [
  { to: '/projects', label: 'Work' },
  { to: '/blog', label: 'Writing' },
  { to: '/photography', label: 'Photos' },
  { to: '/dashboard', label: 'Stats' },
  { to: '/profile', label: 'About' },
] as const;

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('config', 'G-8LTL2CML5L', { page_path: pathname });
    }
  }, [pathname]);

  return (
    <RootDocument>
      <div className='relative z-10 flex min-h-screen flex-col'>
        <SiteHeader />
        <div key={pathname} className='fade-up flex-1 py-14 sm:py-24'>
          <div className='container-page'>
            <Outlet />
          </div>
        </div>
        <SiteFooter />
      </div>
    </RootDocument>
  );
}

function SiteHeader() {
  return (
    <header className='sticky top-0 z-30 border-b border-[color:var(--line-strong)] bg-[color:var(--bg)]/85 backdrop-blur-md'>
      <div className='container-page'>
        <nav className='flex h-14 items-center justify-between gap-6'>
          <Link to='/' aria-label='Kenny Coffie, home' className='group flex items-center gap-3'>
            <span className='flex h-7 w-7 items-center justify-center bg-[color:var(--ink)] font-mono text-[0.72rem] font-bold tracking-wider text-[color:var(--bg)]'>
              KC
            </span>
          </Link>

          <ul className='hidden items-center gap-8 md:flex'>
            {navLinks.map((link, i) => (
              <li key={link.to} className='flex items-center gap-8'>
                <Link
                  to={link.to}
                  activeProps={{ 'data-active': 'true' } as any}
                  className='group relative inline-flex items-baseline gap-1.5 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--ink)] data-[active=true]:text-[color:var(--ink)]'
                >
                  <span className='label text-[color:var(--faint)] group-hover:text-[color:var(--muted)] group-data-[active=true]:text-[color:var(--accent)]'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className='flex items-center gap-2'>
            <ThemeToggle />
          </div>
        </nav>

        <div className='flex items-center justify-start gap-4 overflow-x-auto border-t border-[color:var(--line)] pb-3 pt-3 md:hidden'>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ 'data-active': 'true' } as any}
              className='whitespace-nowrap text-xs text-[color:var(--muted)] data-[active=true]:text-[color:var(--ink)]'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className='border-t border-[color:var(--line-strong)]'>
      <div className='container-page py-20 sm:py-28'>
        <div className='grid gap-12 md:grid-cols-12'>
          <div className='md:col-span-7'>
            <p className='label'>Contact · 001</p>
            <h2 className='display mt-6 text-5xl sm:text-7xl'>
              Let's make
              <br />
              something <span className='text-[color:var(--accent)]'>good</span>.
            </h2>
            <p className='mt-6 max-w-md text-[color:var(--muted)]'>
              Advisory, a friendly hello, a wild idea — my inbox is open.
            </p>
            <a
              href='mailto:hello@kennymark.com'
              className='mt-8 inline-flex items-baseline gap-3 border-b border-[color:var(--ink)] pb-1 font-display text-2xl tracking-tight hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] sm:text-3xl'
            >
              hello@kennymark.com
              <span aria-hidden className='num text-base'>
                →
              </span>
            </a>
            <p className='mt-6 label'>
              Or{' '}
              <a
                href='https://cal.com/kennymark/30min'
                target='_blank'
                rel='noreferrer'
                className='underline decoration-[color:var(--line-strong)] underline-offset-4 hover:text-[color:var(--accent)] hover:decoration-[color:var(--accent)]'
              >
                book a 30-min call ↗
              </a>
            </p>
          </div>

          <div className='grid gap-10 md:col-span-5 md:grid-cols-2'>
            <div>
              <p className='label'>Sitemap</p>
              <ul className='mt-6 space-y-2 text-sm'>
                <li>
                  <Link to='/' className='hover:text-[color:var(--accent)]'>
                    Index
                  </Link>
                </li>
                <li>
                  <Link to='/projects' className='hover:text-[color:var(--accent)]'>
                    Work
                  </Link>
                </li>
                <li>
                  <Link to='/blog' className='hover:text-[color:var(--accent)]'>
                    Writing
                  </Link>
                </li>
                <li>
                  <Link to='/photography' className='hover:text-[color:var(--accent)]'>
                    Photography
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard' className='hover:text-[color:var(--accent)]'>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to='/profile' className='hover:text-[color:var(--accent)]'>
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className='label'>Elsewhere</p>
              <ul className='mt-6 space-y-2 text-sm'>
                <li>
                  <a
                    className='hover:text-[color:var(--accent)]'
                    href='https://cal.com/kennymark/30min'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Book a call ↗
                  </a>
                </li>
                <li>
                  <a
                    className='hover:text-[color:var(--accent)]'
                    href='https://www.linkedin.com/in/kennycoffie/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    className='hover:text-[color:var(--accent)]'
                    href='https://github.com/kennymark'
                    target='_blank'
                    rel='noreferrer'
                  >
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    className='hover:text-[color:var(--accent)]'
                    href='https://twitter.com/mrkennymark'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Twitter ↗
                  </a>
                </li>
                <li>
                  <a
                    className='hover:text-[color:var(--accent)]'
                    href='https://unsplash.com/@kennymark'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Unsplash ↗
                  </a>
                </li>
                <li>
                  <a
                    className='hover:text-[color:var(--accent)]'
                    href='https://dev.to/kennymark'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Dev.to ↗
                  </a>
                </li>
                <li>
                  <a
                    className='hover:text-[color:var(--accent)]'
                    href='/KennyCV.pdf'
                    target='_blank'
                    rel='noreferrer'
                  >
                    CV ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-[color:var(--line)]'>
        <div className='container-page flex flex-wrap items-center justify-between gap-3 py-6'>
          <p className='label'>© {year} Kenny Coffie · Manchester · UK</p>
        </div>
      </div>
    </footer>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('kc-theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('kc-theme', next);
  };

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--ink)] transition-colors hover:border-[color:var(--ink)]'
    >
      <span className='text-[13px]' aria-hidden>
        {theme === 'dark' ? '☾' : '☀'}
      </span>
    </button>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <section className='container-page flex min-h-[50vh] flex-col items-start justify-center gap-6 py-24'>
      <p className='label'>Error · 404</p>
      <h1 className='display text-6xl sm:text-8xl'>
        Lost in
        <br />
        <span className='text-[color:var(--accent)]'>translation</span>.
      </h1>
      <p className='max-w-md text-[color:var(--muted)]'>
        The page you're looking for drifted off the map.
      </p>
      <Link to='/' className='btn-accent mt-2'>
        Take me home <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
