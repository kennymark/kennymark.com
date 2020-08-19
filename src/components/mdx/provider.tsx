import { Box, Heading, Text, Code, ListItem, List, Image } from '@chakra-ui/core'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { Img } from 'react-image'
import CodeBlock from './code-block'


const components = {
  h1: props => <Heading mb={10} textAlign='center'  {...props} />,
  h2: props => <Heading mt={5} mb={1}{...props} />,
  h3: props => <Heading mt={5} mb={2}{...props} />,
  p: props => <Text fontSize={19} pb={4} color='gray.700' {...props} />,
  ul: props => <List p={5} {...props} />,
  li: props => <ListItem {...props} fontSize={19} pb={4} color='gray.700' />,
  pre: props => <Box borderRadius='lg' {...props} />,
  img: props => <Image borderRadius='lg' mx='auto' maxH={500} border='1px' borderColor='gray.200' shadow='lg' {...props} />,
  // code: props => <CodeBlock {...props} />,
  inlineCode: props => <Code as='span' fontSize={18} w='auto' rounded='lg' letterSpacing={0.1} px={2} fontFamily='source code pro' {...props} colorScheme='orange' />,

  blockquote: props => <Box as='blockquote' px={3} borderLeft={4} borderLeftColor='green.400' {...props} />
}


const MDXWrapper = props => (
  <MDXProvider components={components}>
    <article {...props} />
  </MDXProvider>
)


export default MDXWrapper