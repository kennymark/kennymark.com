import Contact from '@components/sections/contact'
import Portfolio from '@components/sections/portfolio'
import Skills from '@components/sections/skills'
import SEO from '@components/seo'
import Main from '@components/sections/hero'
import React, { Fragment, useEffect } from 'react'
import router from 'next/router'

const IndexPage = () => {
  useEffect(() => {
    router.prefetch('/projects')
  }, [])

  return (
    <Fragment>
      <SEO title='Welcome to my portfolio' />

      <Main />
      <Portfolio />
      <Skills />
      <Contact />
    </Fragment>
  )
}

export default IndexPage
