Im Kenny, here is the code responsible for my portfolio/blog. Partly inspired by inspired by [`leerob website`](https://leerob.io) It's built with React, Next.js, useSwr etc.




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel
One click deploy to make this your own.
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%kennymark%kennymark.com)


## Overview

- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction) powering [`/dashboard`](https://kennymark.com/dashboard), newsletter subscription, and post views.
- `pages/blog/*` - Static pre-rendered blog pages using [MDX](https://github.com/mdx-js/mdx).
- `pages/dashboard` - [Personal dashboard](https://kennymark.com/dashboard) containing metrics like sales, views, and subscribers.
- `pages/photography` - [Personal Photographs](https://kennymark.com/photography) my photos hosted on unsplashed
