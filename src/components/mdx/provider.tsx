import { chakra, Code, Heading, Text } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import CodeBlock from './code-block'

export const components = {
  h1: (props: any) => <Heading mb={10} textAlign='center' {...props} />,
  h2: (props: any) => <Heading mt={5} mb={3} {...props} fontSize='4xl' />,
  h3: (props: any) => <Heading mt={5} mb={3} {...props} fontSize='3xl' />,
  a: (props: any) => (
    <chakra.a target='_blank' {...props} color='blue.600' _hover={{ color: 'blue.800' }} />
  ),
  p: (props: any) => <Text fontSize='lg' py={1} {...props} />,
  ul: (props: any) => <chakra.ul p={5} {...props} />,
  li: (props: any) => <chakra.li {...props} fontSize='lg' pb={1} color='gray.600' />,
  pre: (props: any) => <chakra.pre borderRadius='lg' {...props} />,
  img: (props: any) => (
    <chakra.img rounded='lg' my={5} maxH={500} borderColor='gray.200' shadow='md' {...props} />
  ),
  code: (props: any) => <CodeBlock {...props} fontSize='md' />,
  inlineCode: (props: any) => (
    <Code
      fontSize='md'
      fontFamily='monospace'
      rounded='lg'
      letterSpacing={0.1}
      px={2}
      {...props}
      colorScheme='orange'
    />
  ),
  blockquote: (props: any) => (
    <chakra.blockquote px={3} borderLeft={4} borderLeftColor='green.400' {...props} />
  ),
}

const MDXWrapper = (props) => (
  <MDXProvider components={components}>
    <article {...props} />
  </MDXProvider>
)

export default MDXWrapper
