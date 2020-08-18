import { Flex, Heading, Stack, Text, Box, Link, useColorMode, } from '@chakra-ui/core'
import React from 'react'

function Home() {
  const { colorMode } = useColorMode()

  return (
    <Stack h={['65vh', null, '70vh', '90vh']} mx='auto' w='80%' justifyContent='center' flexDirection='column'>
      <Flex alignSelf='center'>
        <Heading as='h1' fontSize={['4xl', '5xl', '6xl', '140px']} letterSpacing={2} lineHeight={1.1} fontWeight='bold'>
          I design & build beautiful web
          <Box as='span' background={colorMode === 'light' && '#ffedc5'} > experiences</Box>
        </Heading>
      </Flex>

      <Text fontWeight='bold' fontSize={[20, 25]} color='gray.500' mt={20} >Fullstack JavaScript Developer</Text>
      <Link href='https://twitter.com/mrkennymark' isExternal fontWeight='bold' fontSize={[15, 20]} color='green.500' width='fit-content' _focus={{ outline: 0 }}>@mrkennymark</Link>
    </Stack>
  )
}

export default Home
