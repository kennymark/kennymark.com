import { Box, Flex, Heading, Link, Stack, Text, useColorModeValue } from '@chakra-ui/core'
import React from 'react'

function Home() {
  const bgColor = useColorModeValue('green.50', null)

  return (
    <Stack h={['70vh', null, '70vh', '90vh']} mx='auto' w='80%' justifyContent='center' flexDirection='column'>
      <Flex alignSelf='center'>
        <Heading as='h1' fontSize={['4xl', '5xl', '6xl', '140px']} letterSpacing={2} lineHeight={1.1} fontWeight='bold' fontFamily='Alata'>
          I design & build beautiful web
          <Box as='span'> experiences
          </Box >
        </Heading>
      </Flex>

      <Box mt={20} border='1px'>
        <Text fontWeight='bold' fontSize={[20, 25]} color='gray.500' >Fullstack JavaScript Developer</Text>
        <Link href='https://twitter.com/mrkennymark' isExternal fontWeight='bold' fontSize={[15, 20]} color='green.500' >@mrkennymark</Link>
      </Box>

    </Stack>
  )
}

export default Home
