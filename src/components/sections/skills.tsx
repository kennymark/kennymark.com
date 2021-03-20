
import { Box, Heading, SimpleGrid, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { skillTypes } from '../../data/data';
import { motion } from 'framer-motion'


const MBox = motion(Box)


function Skills() {
  const { colorMode } = useColorMode()
  const types = Object.keys(skillTypes)
  const images = ['/images/front-end.svg', '/images/backend.svg', '/images/devops.svg', '/images/extras.svg']


  return (
    <Box px={5} w={{ lg: 700, xl: 1400 }} mx='auto' mt={20}>
      <Heading as='h1' mb={5} textAlign={['left', 'center']}>Skills</Heading>

      <SimpleGrid columns={[1, 1, 2, 4]} spacing={5} >
        {types.map((type, key) =>
          <MBox whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 } as any}
            borderRadius='lg' pb={8} key={type} position='relative'
            bg={skillTypes[type].color + '.100'} zIndex={206}>

            <Box as='img' src={images[key]} alt={type} pos='absolute' width='inherit' height='100%' opacity={.14} zIndex={205} />

            <Heading textAlign='center' as='h2' fontSize={20} textTransform='capitalize' my={5} color={colorMode && 'black'}>{type}
            </Heading>

            {skillTypes[type].skills.map(item => (
              <Text py={2} textAlign='center' width='80%' borderRadius='lg' mb={2} mx='auto' color='gray.700' fontWeight='600' key={item}>
                {item}
              </Text>
            ))}

          </MBox>
        )}

      </SimpleGrid>

    </Box >

  )
}

export default Skills
