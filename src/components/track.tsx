import { Avatar, Center, chakra, Text, Link, Box } from '@chakra-ui/react'
import React from 'react'

function Track({ title, artist, album, url }) {
  const imageUrl = 'https://resources.tidal.com/images/' + album.replace(/-/g, '/') + '/' + 640 + 'x' + 640 + '.jpg';
  return (
    <chakra.div borderBottom='1px' borderColor='gray.100' h={100} p={3} fontSize='lg' display='flex' maxW={600}>

      <Center>
        <Avatar mr={10} src={imageUrl} size='lg' />

        <chakra.a display='flex' flexDir='column' justifyContent='space-around' h={10} href={url} _focus={{ outline: 0 }} target='_blank'>
          <Text color='gray.600'>{artist}</Text>
          <Text fontWeight='bold'>{title}</Text>
        </chakra.a>
      </Center>


    </chakra.div>
  )
}

export default Track
