import Contact from '@components/sections/contact'
import Portfolio from '@components/sections/portfolio'
import Skills from '@components/sections/skills'
import SEO from '@components/seo'
import Main from '@components/sections/main'
import React, { Fragment } from "react"





const IndexPage = () => {

  return (
    <Fragment>
      <SEO title="Home" description='welcome to my blog' lang='en' />

      <Main />
      <Portfolio />
      <Skills />
      <Contact />

    </Fragment>

  )
}


export default IndexPage