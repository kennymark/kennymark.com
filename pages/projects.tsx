import {
  Box,
  Button,
  Flex,
  Heading,
  Link as NLink,
  Stack,
  Text,
  useColorModeValue,
  Container,
  Img,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import Masonry from 'react-masonry-css'
import PageHeader from '@components/page-header'
import SEO from '@components/seo'
import { motion } from 'framer-motion'
import slug from 'lib/slug'
import DataTabs from '@components/tab'
import { lowerCase } from 'lodash'
const MBox = motion(Box)

const tabData = [
  { label: 'Showcase', content: '' },
  { label: 'Fullstack', content: '' },
  { label: 'Frontend', content: '' },
  { label: 'Mobile', content: '' },
]

export default function Projects({ topProjects, extraProjects }) {
  const extraBg = useColorModeValue('gray.50', 'gray.800')
  const extraHeader = useColorModeValue('black', 'gray.400')
  const [filterData, setFilterData] = useState(topProjects)

  const onTabSelected = (selected) => {
    const rec = topProjects.filter((item) => {
      return item.tag?.includes(lowerCase(selected.label))
    })

    setFilterData(lowerCase(selected.label).includes('show') ? topProjects : rec)

    console.log(rec)
  }

  return (
    <Fragment>
      <SEO title='Projects' />

      <Container maxW={{ base: '10xl', xl: '8xl' }}>
        <PageHeader title='Portfolio Showcase' ml={4} />

        <DataTabs data={tabData} onSelect={onTabSelected} />
        <Masonry
          className='my-masonry-grid '
          breakpointCols={{ default: 3, 800: 2, 600: 1 }}
          columnClassName='my-masonry-grid_column'>
          {filterData
            .filter((item) => item.showCase === true)
            .map((project, idx) => (
              <Link href={`/project/${slug(project.name)}`} key={idx}>
                <MBox
                  bg={project.color}
                  rounded='lg'
                  p={5}
                  m={4}
                  cursor='pointer'
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 } as any}
                  _hover={{ shadow: '2xl' }}
                  className='proj'
                  minH={300}
                  maxH={700}>
                  <Heading
                    as='h2'
                    fontSize='xl'
                    textTransform='capitalize'
                    textAlign='center'
                    mb={2}
                    color='black'>
                    {project.name}
                  </Heading>

                  <Box
                    as={Img}
                    src={project.image}
                    alt={project.name}
                    borderRadius='md'
                    shadow='lg'
                    maxH={600}
                    mx='auto'
                    objectFit='contain'
                  />

                  <Stack
                    bg={project.color}
                    w='inherit'
                    height='inherit'
                    position='absolute'
                    top={0}
                    bottom={0}
                    right={0}
                    left={0}
                    borderRadius='inherit'
                    p={4}
                    justifyContent='center'
                    className='desc'>
                    <MBox
                      position='relative'
                      textAlign='center'
                      mx='auto'
                      mb={5}
                      fontSize='md'
                      color='black'>
                      {project.description}
                    </MBox>
                  </Stack>
                </MBox>
              </Link>
            ))}
        </Masonry>
      </Container>

      <Container py={8} px={{ sm: 4 }} maxW='8xl'>
        <PageHeader simple title='More...' ml='4' />

        {extraProjects.map((project, idx) => (
          <Box
            bg={extraBg}
            borderRadius='md'
            p={3}
            m={4}
            key={idx}
            border='1px'
            borderColor={useColorModeValue('gray.200', 'gray.700')}>
            <Flex justifyContent='space-between'>
              <Text
                fontFamily='heading'
                as='h3'
                textTransform='capitalize'
                size='lg'
                mb={2}
                fontWeight='semibold'
                fontSize='lg'
                color={extraHeader}>
                {project.name.replace(/-/g, ' ')}
              </Text>

              <Button
                as={NLink}
                href={project.link}
                isExternal
                px={5}
                ml={2}
                bg='gray.100'
                size='sm'
                color='black'
                _active={{ outline: 0 }}
                _hover={{
                  textDecor: 0,
                  bg: 'green.500',
                  color: 'white',
                  outline: 0,
                  textDecoration: 'none',
                }}>
                View
              </Button>
            </Flex>
            <Text w='70%' textStyle='p' pb={0}>
              {project.description}
            </Text>
          </Box>
        ))}
      </Container>
    </Fragment>
  )
}

export function getStaticProps() {
  const { extraProjects, topProjects } = require('../src/data/projects')

  return {
    props: {
      extraProjects,
      topProjects: topProjects,
    },
  }
}
