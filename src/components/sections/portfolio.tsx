
import { Box, Flex, Link as NLink, Text } from '@chakra-ui/core'
import Link from 'next/link'
import React from 'react'
import Img from "react-cool-img";
import { mainProjects } from '../../data/projects'
import PageHeader from '../page-header'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'



function Portfolio() {


  return (
    <Box w={['', '', 700,]} mx='auto' mt={20}>
      <Flex alignItems='center' mb={5} justify={['space-around', null, 'space-between']}>
        <PageHeader simple title='Projects' />

        <Link href='/projects'>
          <NLink as='a' fontSize={20} color='gray.500' fontWeight='bold' _hover={{ color: 'green.500' }} _focus={{ outline: 0 }}>

            View More projects <ChevronRightIcon />
          </NLink>
        </Link>

      </Flex>

      {
        mainProjects.map(project => (
          <Flex
            p={10}
            key={project.name}
            mb={{ lg: 10, xl: 20 }}
            bg={project.color + '.100'}
            borderRadius={{ md: 'lg' }}
            h={[500, 600, 700]}
            position='relative'
            direction='column'
            alignItems='center'
            justifyContent='space-around'>

            <Text textAlign='center' fontWeight='bold'
              position='relative'
              fontSize={20}
              mt={-4}
              pb={2}
              textTransform='capitalize'
              color={project.color + '.800'}>
              {project.name}
            </Text>

            <Box as={Img} src={project.image} alt={project.name} width='95%' shadow='lg' />
          </Flex>

        ))
      }

    </Box >
  )
}



export default Portfolio