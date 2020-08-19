import '../styles/main.css'
import { useRouter } from "next/router"
import BlogLayout from "../src/components/layout/blog-layout"
import AppLayout from "../src/components/layout/app-layout"



function MyApp({ Component, pageProps, cookies }) {

  const { pathname } = useRouter()

  if (pathname.includes('blog')) {
    return (
      <BlogLayout>
        <Component {...pageProps} />
      </BlogLayout>
    )

  }

  return (
    <AppLayout >
      <Component {...pageProps} />
    </AppLayout>
  )
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    cookies: ctx.req?.headers.cookie,
  }
}

export default MyApp
