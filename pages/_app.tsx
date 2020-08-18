
import { ChakraProvider, CSSReset } from "@chakra-ui/core"
import '../styles/main.css'
import Footer from "../src/components/layout/footer"
import Header from "../src/components/layout/header"
import customeTheme from "../theme"



function MyApp({ Component, pageProps }) {
  const year = new Date().getFullYear() || '2020'
  const data = ''

  return (
    <ChakraProvider theme={customeTheme}>
      <CSSReset />
      <Header />
      <main className='main'>
        <Component {...pageProps} />
      </main>
      <Footer data={data} year={year} />

    </ChakraProvider>
  )
}

export default MyApp
