import { Box, Heading, Text } from '@chakra-ui/core'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { Img } from 'react-image'
import CodeBlock from './code-block'


const components = {
  h1: props => <Heading mb={10} color='gray.500' textAlign='center'  {...props} />,
  h2: props => <Heading as='h1' mt={5} mb={1}{...props} color='black' />,
  h3: props => <Heading as='h1' mt={5} mb={2}{...props} />,
  p: props => <Text color='gray.500' fontSize={[20, 22]} pb={4}  {...props} />,
  ul: props => <ul className='lg:text-xl sm:text-md leading-snug text-gray-500 pb-1 tracking-small' {...props} />,
  li: props => <Text as='li' color='gray.500' fontSize={[20, 22]} {...props} />,
  pre: props => <Box borderRadius='lg' {...props} />,
  code: props => <CodeBlock {...props} />,
  img: props => <Box as={Img} borderRadius='lg' mx='auto' maxH={500} border='1px' borderColor='gray.200' shadow='lg' {...props} />,
  inlineCode: props => <Box as='span' fontSize={18} borderRadius='md' w='auto' px={2} color='gray.400'
    bg='#011627' fontFamily='work sans' {...props} />,
  blockquote: props => <Box as='blockquote' px={3} borderLeft={4} borderLeftColor='green.400' {...props} />
}


const MDXWrapper = props => (
  <MDXProvider components={components}>
    <article {...props} />
  </MDXProvider>
)


export default MDXWrapper