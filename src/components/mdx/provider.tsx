
import { chakra, Code, Heading } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import CodeBlock from './code-block'

export const components = {
  h1: props => <Heading mb={10} textAlign='center'  {...props} />,
  h2: props => <Heading mt={5} mb={3}{...props} fontSize="4xl" />,
  h3: props => <Heading mt={5} mb={3}{...props} fontSize="3xl" />,
  a: props => <chakra.a isExternal {...props} color='blue.600' _hover={{ color: 'blue.800' }} />,
  p: props => <chakra.p fontSize="lg" pb={4} color='gray.600' {...props} />,
  ul: props => <chakra.ul p={5} {...props} />,
  li: props => <chakra.li  {...props} fontSize="lg" pb={1} color='gray.600' />,
  pre: props => <chakra.pre borderRadius='lg' {...props} />,
  img: props => <chakra.img borderRadius='lg' maxH={500} borderColor='gray.200' shadow='lg' {...props} />,
  code: props => <CodeBlock {...props} fontSize="md" />,
  inlineCode: props => <Code as='span' fontSize="md" fontFamily="monospace" rounded='lg' letterSpacing={0.1} px={2}  {...props} colorScheme='orange' />,
  blockquote: props => <chakra.blockquote px={3} borderLeft={4} borderLeftColor='green.400' {...props} />
}


const MDXWrapper = props => (
  <MDXProvider components={components}>
    <article {...props} />
  </MDXProvider>
)



export default MDXWrapper