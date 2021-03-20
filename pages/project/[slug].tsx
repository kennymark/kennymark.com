
import { Box, Flex, Link, Text, Container } from '@chakra-ui/react';
import SEO from '@components/seo';
import PageHeader from '@components/page-header';
import { startCase, upperFirst } from 'lodash';
import React from 'react';
import Img from "react-cool-img";
import slugify from 'slug';
import { topProjects } from 'src/data/projects';
import { motion } from 'framer-motion'

const MFlex = motion(Flex)
const MText = motion(Text)
const MPageHeader = motion(PageHeader)

export default function Project(project) {

  const btn = {
    isExternal: true,
    px: 8,
    py: 2,
    bg: 'black',
    color: 'gray.200',
    rounded: 'md'
  }
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } }
  }

  const spring = { type: "spring", damping: 10, stiffness: 100 }


  return (
    <Container maxW="5xl">
      <SEO title={startCase(project.name)} />

      <MPageHeader variants={variants} initial="initial" animate="animate" transition={{ duration: 0.8 }} title={startCase(project.name)} hasB />

      <MText variants={variants} initial="initial" animate="animate"
        textAlign='center' color='gray.500' my={5} fontSize={20}>
        {upperFirst(project.description)}
      </MText>

      <MFlex initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={spring} mx='auto' rounded={[null, 'lg']} shadow='xl' p={20} backgroundColor={project.color} maxW={{ xs: 400, xl: 1000 }}>
        <Box as={Img} src={project.image} mx='auto' shadow='md' maxHeight={700} />
      </MFlex>

      <Box mx='auto' my={30} justifySelf='center' alignSelf='center' w='fit-content'>
        {project.link && <Link isExternal href={project.link} mr={5} {...btn}>Demo</Link>}

        <Link isExternal href={project.source} {...btn}>Source</Link>
      </Box>

    </Container>
  )
}


export async function getStaticPaths() {
  const paths = topProjects.map(proj => ({ params: { slug: slugify(proj.name) } }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug } }) {
  const props = topProjects.find(proj => slugify(proj.name) === slug)
  return { props }
}