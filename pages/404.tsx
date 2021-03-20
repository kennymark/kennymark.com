import React from "react"

import SEO from "@components/seo"
import { Heading, Text, Box, useColorModeValue } from "@chakra-ui/react"

const NotFoundPage = () => {
  const text = useColorModeValue('black', 'gray.300')
  return (
    <>
      <SEO title="Error 404" />

      <Box mt={5}>
        <Heading size='2xl' textAlign='center' color={text}>Error 404: Not found</Heading>
        <Text textAlign='center' color={text}>This page does not seem to exist</Text>
      </Box>

    </>)
}

export default NotFoundPage
