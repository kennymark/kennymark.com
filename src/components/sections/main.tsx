import { chakra, Container, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

function Home() {
  const bgColor = useColorModeValue('orange.50', null)
  const color = useColorModeValue('black', 'white')


  return (

    <Container h={{sm:'70vh', md:'70vh', lg:'90vh'}} maxW='6xl'>

      <chakra.div my={20}>
        <Heading as='h1' fontSize={['4xl', '5xl', '6xl', "9xl"]} letterSpacing={2} lineHeight={1.3} >
          I design & build beautiful web
          
          <chakra.span bg={bgColor} color={color}> experiences</chakra.span>
        </Heading>
      </chakra.div>

      <chakra.div>
        <Text fontSize="lg" color='gray.500' fontWeight='medium' >Fullstack JavaScript Developer</Text>
        <Link href='https://twitter.com/mrkennymark' isExternal fontWeight={500} fontSize='md' color='green.500' >
          @mrkennymark
        </Link>
      </chakra.div>
    
    </Container>

  )
}

export default Home