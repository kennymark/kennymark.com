import { Box, Flex, Link, Text } from '@chakra-ui/core'
import { startCase, upperFirst } from 'lodash'
import React from 'react'
import { Img } from 'react-image'
import SEO from '../../src/components/seo'
import PageHeader from '../../src/components/ui/page-header'
import { topProjects } from '../../src/data/projects'
import slugify from 'slug'


export default function Project(project) {

  const btn = {
    isExternal: true,
    px: 8,
    py: 2,
    bg: 'black',
    color: 'gray.200',
    rounded: 'md'
  }

  return (
    <>
      <SEO title={startCase(project.name)} />

      <PageHeader title={startCase(project.name)} hasB />
      <Text textAlign='center' color='gray.500' my={5} fontSize={20}>{upperFirst(project.description)}</Text>

      <Flex mx='auto' rounded={[null, 'lg']} shadow='lg' p={12} backgroundColor={project.color} maxW={600} maxH={600}>
        <Box as={Img} src={project.image} mx='auto' shadow='md' />
      </Flex>

      <Box mx='auto' my={30} justifySelf='center' alignSelf='center' w='fit-content'>
        {project.link && <Link isExternal href={project.link} mr={5} {...btn}>Demo</Link>}

        <Link isExternal href={project.source} {...btn}>Source</Link>
      </Box>

    </>
  )
}


export async function getStaticPaths() {
  const paths = topProjects.map(proj => {
    return {
      params: { slug: slugify(proj.name) }
    }
  })
  return {
    paths, fallback: false
  }


}

export async function getStaticProps({ params: { slug } }) {
  const project = topProjects.find(proj => slugify(proj.name) === slug)

  return {
    props: project
  }
}