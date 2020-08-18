//@ts-check
import React from "react"

import { CSSReset, ColorModeProvider, ChakraProvider } from '@chakra-ui/core'
import Header from './header'
import Footer from './footer'

import theme from "@chakra-ui/theme"


const Layout = ({ children }) => {
  const year = new Date().getFullYear() || '2020'
  const data = ''


  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ColorModeProvider>
        <Header />
        <main className='main'>{children}</main>
        <Footer data={data} year={year} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default Layout
