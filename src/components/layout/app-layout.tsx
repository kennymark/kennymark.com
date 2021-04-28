import { ChakraProvider, Box } from '@chakra-ui/react'
import Header from './header'
import Footer from './footer'
import customeTheme from 'lib/theme'

function AppLayout({ children }) {
  return (
    <ChakraProvider resetCSS theme={customeTheme}>
      <Header />

      <Box as='main' className='main' flex={1} minH='80vh' mx='auto'>
        {children}
      </Box>

      <Footer />
    </ChakraProvider>
  )
}

export default AppLayout
