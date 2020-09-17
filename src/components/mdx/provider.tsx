import { Box, Heading, Text, Code, ListItem, List, Image, Link } from '@chakra-ui/core'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import CodeBlock from './code-block'


const components = {
  h1: props => <Heading mb={10} textAlign='center'  {...props} />,
  h2: props => <Heading mt={5} mb={3}{...props} fontSize={30} />,
  h3: props => <Heading mt={5} mb={3}{...props} fontSize={20} />,
  a: props => <Link isExternal {...props} color='blue.600' _hover={{ color: 'blue.800' }} />,
  p: props => <Text fontSize={19} pb={4} color='gray.500' {...props} />,
  ul: props => <List p={5} {...props} />,
  li: props => <ListItem {...props} fontSize={19} pb={1} color='gray.500' />,
  pre: props => <Box borderRadius='lg' {...props} />,
  img: props => <Image borderRadius='lg' maxH={500} border='1px' borderColor='gray.200' shadow='lg' {...props} />,
  code: props => <CodeBlock {...props} fontSize={16} fontFamily='source code pro' />,
  inlineCode: props => <Code as='span' fontSize={16} w='auto' rounded='lg' letterSpacing={0.1} px={2} fontFamily='source code pro' {...props} colorScheme='orange' />,
  blockquote: props => <Box as='blockquote' px={3} borderLeft={4} borderLeftColor='green.400' {...props} />
}


const MDXWrapper = props => (
  <MDXProvider components={components}>
    <article {...props} />
  </MDXProvider>
)

export { components }

export default MDXWrapper