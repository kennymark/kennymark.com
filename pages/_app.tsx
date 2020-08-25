
import '../styles/main.css'
import AppLayout from 'components/layout/app-layout'



function MyApp({ Component, pageProps, cookies }) {


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
