import React from 'react'
import { Heading, TextProps } from '@chakra-ui/react'

interface Props extends TextProps {
  title: string;
  simple: boolean;
  hasB: boolean;
}
function PageHeader({ title, simple, hasB, ...props }: Partial<Props>) {

  if (simple) {
    return <Heading as='h1' mb={hasB && 5} >{title}</Heading>
  }
  return (
    <Heading as='h1' fontSize='5xl' mb={[5, 10]} mt={3} {...props}>{title}</Heading>
  )
}

export default PageHeader
