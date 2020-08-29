import { Box, Flex, Heading, Link, Stack, Text, useColorModeValue } from '@chakra-ui/core'
import React from 'react'

function Home() {
  const bgColor = useColorModeValue('orange.50', null)
  const color = useColorModeValue('black', 'white')


  return (
    <Stack h={['70vh', null, '70vh', '90vh']} mx='auto' w='80%' justifyContent='center' flexDirection='column'>
      <Flex alignSelf='center' mb={20} zIndex={100}>
        <Heading as='h1' fontSize={['4xl', '5xl', '6xl', '140px']} letterSpacing={2} >
          I design & build beautiful web
          <Box as='span' bg={bgColor} color={color}> experiences</Box >
        </Heading>
      </Flex>


      <Text fontFamily='Alata' fontSize={[20, 25]} color='gray.500' >Fullstack JavaScript Developer</Text>
      <Link href='https://twitter.com/mrkennymark' isExternal fontWeight='bold' fontSize={[15, 20]} color='green.500' >@mrkennymark</Link>


    </Stack >
  )
}

export default Home
