import React from "react"
import SEO from "../src/components/seo"
import { Box } from '@chakra-ui/core'
import Contact from '../src/components/sections/contact'
import Main from '../src/components/sections/main'
import Portfolio from '../src/components/sections/portfolio'
import { Fragment } from 'react'
import Skills from "../src/components/sections/skills"



const IndexPage = () => (

  <Fragment>
    <SEO title="Home" />
    <Main />

    <Box w={['', '', 700,]} mx='auto' mt={20} >
      <Portfolio />
    </Box>

    <Box w={['', '', 700, 1400,]} mx='auto' mt={20} >
      <Skills />
    </Box>

    <Box w={['', '', '', 700]} mx='auto' mt={20} p={4} >
      <Contact />
    </Box>
  </Fragment>

)


export default IndexPage