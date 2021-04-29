import { Box, Container, Heading, SimpleGrid, Text, useColorMode, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import { skillTypes } from '../../data/data'

const MBox = motion(Box)

function Skills({ skills }) {
  const { colorMode } = useColorMode()
  const types = Object.keys(skills)
  const images = [
    '/images/front-end.svg',
    '/images/backend.svg',
    '/images/devops.svg',
    '/images/extras.svg',
  ]

  return (
    <Container px={5} minW={{ lg: '6xl' }} mt={20}>
      <Heading as='h1' mb={5} textAlign={['left', 'center']}>
        Skills
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {types.map((type, key) => (
          <MBox
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2 } as any}
            borderRadius='lg'
            pb={8}
            key={type}
            position='relative'
            bg={skillTypes[type].color + '.100'}
            zIndex={206}>
            <Image
              src={images[key]}
              alt={type}
              pos='absolute'
              width='inherit'
              height='100%'
              opacity={0.14}
              zIndex={205}
            />

            <Heading
              textAlign='center'
              as='h2'
              fontSize={20}
              textTransform='capitalize'
              my={5}
              color={colorMode && 'black'}>
              {type}
            </Heading>

            {skills[type].skills.map((item) => (
              <Text
                py={2}
                textAlign='center'
                width='80%'
                borderRadius='lg'
                mb={2}
                mx='auto'
                color='gray.700'
                fontWeight='600'
                key={item}>
                {item}
              </Text>
            ))}
          </MBox>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Skills
