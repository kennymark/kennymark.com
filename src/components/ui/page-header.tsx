import React from 'react'
import { Heading, useColorMode } from '@chakra-ui/core'

interface Props {
  title: string;
  simple: boolean;
  hasB: boolean;
}
function PageHeader({ title, simple, hasB }: Partial<Props>) {

  if (simple) {
    return <Heading as='h1' mb={hasB && 5}>{title}</Heading>
  }
  return (
    <Heading as='h1' textAlign='center' fontSize={[30, 40]} mb={[5, 10]} mt={3}>{title}</Heading>
  )
}

export default PageHeader
