import { Center, chakra, Container, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

function Home() {
  const bgColor = useColorModeValue('green.100', 'green.100')
  const color = useColorModeValue('black', 'black')

  return (
    <Container h={{ sm: '70vh', md: '70vh', lg: '50vh' }} maxW='6xl'>
      <Center my={20} w='auto'>
        <Heading as='h1' fontSize={['4xl', '5xl', '6xl', '8xl']} letterSpacing={2} lineHeight={1.2}>
          I design & build beautiful web{' '}
          <Text bg={bgColor} color={color} w='auto' display='inline'>
            experiences
          </Text>
        </Heading>
      </Center>

      <chakra.div>
        <Text fontSize='lg'>Fullstack JavaScript Developer</Text>
        <Link href='https://twitter.com/mrkennymark' isExternal color='selected'>
          @mrkennymark
        </Link>
      </chakra.div>
      <style jsx>
        {`
          #namesvg: {
            stroke-dasharray: 1;
          }
        `}
      </style>
    </Container>
  )
}

export default Home
