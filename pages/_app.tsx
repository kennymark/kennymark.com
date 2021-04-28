import AppLayout from '@components/layout/app-layout'
import { Router } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../lib/gtag'
import '../styles/main.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
