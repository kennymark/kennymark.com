
import '../styles/main.css'
import AppLayout from 'components/layout/app-layout'



const MyApp = ({ Component, pageProps }) => (
  <AppLayout >
    <Component {...pageProps} />
  </AppLayout>
)


export default MyApp
