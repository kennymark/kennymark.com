
import { ChakraProvider, CSSReset, } from '@chakra-ui/core'
import customeTheme from '../../../theme'
import Header from './header'
import Footer from './footer'

function AppLayout({ children, }) {
  return (
    <ChakraProvider theme={customeTheme} >
      <CSSReset />
      <Header />

      <main className='main'>
        {children}
      </main>
      <Footer />


    </ChakraProvider>
  )
}

export default AppLayout
