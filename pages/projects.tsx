//@ts-nocheck
import { Box, Button, Flex, Heading, Link as NLink, Stack, Text, useColorModeValue, Container } from '@chakra-ui/react';
import Link from "next/link";
import React, { Fragment } from 'react';
import Img from "react-cool-img";
import Masonry from 'react-masonry-css';
import slug from 'slug';
import PageHeader from '@components/page-header';
import SEO from "@components/seo";
import { extraProjects, topProjects } from '../src/data/projects';
import { motion } from 'framer-motion'


const MBox = motion(Box)


export default function Projects() {
  const extraBg = useColorModeValue('gray.200', 'gray.700')
  const extraHeader = useColorModeValue('black', 'gray.400')


  return (
    <Fragment>
      <SEO title="Projects" />

      <Container maxW="8xl" >
        <PageHeader title='Portfolio Showcase' mr={8} />

        <Masonry
          breakpointCols={{ default: 3, 800: 2, 600: 1 }}
          className="my-masonry-grid "
          columnClassName="my-masonry-grid_column">

          {topProjects.reverse().map((project, idx) => (
            <Link href={`/project/${slug(project.name)}`} key={idx}>
              <MBox
                bg={project.color} p={5}
                rounded='lg' m={4}
                cursor='pointer'
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 } as any}
                _hover={{ shadow: '2xl' }}
                className='proj'
                minH={300} >


                <Heading as='h2' fontSize="xl" textTransform='capitalize' textAlign='center' mb={2} color='black' >
                  {project.name}
                </Heading>

                <Box as={Img} src={project.image} alt={project.name} borderRadius='md' shadow='lg' />

                <Stack
                  bg={project.color}
                  w='inherit'
                  height='inherit'
                  position='absolute'
                  top={0}
                  bottom={0}
                  right={0}
                  borderRadius='inherit'
                  p={4}
                  justifyContent='center'
                  className="desc">

                  <MBox position='relative' textAlign='center' mx='auto' mb={5} fontSize="md" color='black'>
                    {project.description}
                  </MBox>

                </Stack>

              </MBox>
            </Link>

          ))}
        </Masonry>
      </Container>



      <Container py={8} px={{ sm: 4 }} maxW="8xl" >

        <PageHeader simple title='More...' ml="4" />

        {extraProjects.map((project, idx) => (

          <Box bg={extraBg} borderRadius='md' p={3} m={4} key={idx} >

            <Flex justifyContent='space-between'>

              <Heading textTransform='capitalize' size='lg' mb={2} fontSize="lg" color={extraHeader}>
                {project.name}
              </Heading>

              <Button as={NLink}
                href={project.link} isExternal
                px={5} ml={2}
                bg='white'
                size="sm"
                color='black'
                _active={{ outline: 0 }}
                _hover={{ textDecor: 0, bg: 'green.500', color: 'white', outline: 0, textDecoration: 'none' }}>
                View
              </Button>
            </Flex>
            <Text color='gray.500' fontWeight='semibold' w='70%'>{project.description}</Text>
          </Box>
        ))}
      </Container>

    </Fragment>
  );
}
