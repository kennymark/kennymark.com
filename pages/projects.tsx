
import { Box, Heading, Flex, Text, Link as NLink, Button, useColorMode, Stack, useColorModeValue } from '@chakra-ui/core';
import Link from "next/link";
import React, { Fragment } from 'react';
import Img from "react-cool-img";
import Masonry from 'react-masonry-css';
import slug from 'slug';
import SEO from "../src/components/seo";
import { extraProjects, topProjects } from '../src/data/projects';
import PageHeader from '../src/components/page-header';

export default function Projects() {
  const extraBg = useColorModeValue('gray.200', 'gray.700')

  return (
    <Fragment>
      <SEO title="Projects" />

      <PageHeader title='Portfolio Showcase' />

      <Box maxW={[null, '', 1400]} mx='auto'>
        <Masonry
          breakpointCols={{ default: 3, 800: 2, 600: 1 }}
          className="my-masonry-grid "
          columnClassName="my-masonry-grid_column">

          {topProjects.reverse().map((project, idx) => (
            <Link href={`/project/${slug(project.name)}`} key={idx}>
              <Box bg={project.color} p={5} rounded='lg' m={4} cursor='pointer' _hover={{ shadow: '2xl' }} position='relative' className='proj' minH={300} >


                <Heading as='h2' fontSize={18} textTransform='capitalize' textAlign='center' mb={2} color='black'>{project.name} </Heading>
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
                  className=" desc">
                  <Box position='relative' textAlign='center' mx='auto' mb={5} fontSize={20} color='black'>{project.description}</Box>
                </Stack>

              </Box>
            </Link>

          ))}
        </Masonry>
      </Box>



      <Flex direction='column' py={8} px={[4, null, null, null]} justifySelf='center' maxW={[null, '', 1400]} mx='auto'>
        <PageHeader simple title='More...' />
        {extraProjects.map((project, idx) => (

          <Box bg={extraBg} borderRadius='md' p={3} mt={4} key={idx} >
            <Flex justifyContent='space-between'>

              <Heading textTransform='capitalize' size='lg' mb={2} fontSize={20} color='black'>{project.name} </Heading>
              <Button as={NLink} href={project.link} isExternal
                px={5} ml={2} borderRadius='md' bg='white'
                color='black'
                _hover={{ textDecor: 0, bg: 'green.500', color: 'white', outline: 0, textDecoration: 'none' }}>
                View
              </Button>
            </Flex>
            <Text color='gray.500' fontWeight='semibold' w='70%'>{project.description}</Text>
          </Box>
        ))}
      </Flex>

    </Fragment>
  );
}
