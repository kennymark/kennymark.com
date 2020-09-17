import React, { Fragment } from "react"
import Contact from 'src/components/sections/contact'
import Main from 'components/sections/main'
import Portfolio from 'components/sections/portfolio'
import Skills from "components/sections/skills"
import SEO from 'components/seo'




const IndexPage = () => {

  return (
    <Fragment>
      <SEO title="Home" />

      <Main />

      <Portfolio />

      <Skills />

      <Contact />

    </Fragment>

  )
}


export default IndexPage