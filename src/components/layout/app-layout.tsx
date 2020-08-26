
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/core'
import customeTheme from '../../../lib/theme'
import Header from './header'
import Footer from './footer'

function AppLayout({ children, }) {
  return (
    <ChakraProvider theme={customeTheme} >
      <CSSReset />
      <Header />

      <Box as='main' className='main'>
        {children}
      </Box>

      <Footer />

    </ChakraProvider>
  )
}

export default AppLayout
