
import { ChakraProvider, CSSReset, cookieStorageManager } from '@chakra-ui/core'
import customeTheme from '../../../theme'
import Header from './header'
import Footer from './footer'

function AppLayout({ children, cookies }) {
  return (
    <ChakraProvider theme={customeTheme} storageManager={cookieStorageManager(cookies)} >
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
