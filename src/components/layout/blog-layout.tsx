import React, { Fragment } from 'react'
import { Container, ChakraProvider, CSSReset } from '@chakra-ui/core'
import MDXWrapper from '../mdx/provider'
import Header from './header'
import Footer from './footer'
import customeTheme from '../../../theme'

export default function BlogLayout(props) {

  console.log(props)
  return (
    <ChakraProvider theme={customeTheme}>
      <CSSReset />

      <Header />
      <Container my={20} maxW="md" minH={600}>
        <MDXWrapper>
          {props.children}
        </MDXWrapper>

      </Container>
      <Footer />
    </ChakraProvider>

  )
}
