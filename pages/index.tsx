import ContactSection from '@components/sections/contact'
import PortfolioSection from '@components/sections/portfolio'
import SkillsSection from '@components/sections/skills'
import Seo from '@components/seo'
import HeroSection from '@components/sections/hero'
import React, { Fragment, useEffect } from 'react'
import router from 'next/router'

const IndexPage = ({ mainProjects, skills }) => {
  useEffect(() => {
    router.prefetch('/projects')
  }, [])

  return (
    <Fragment>
      <Seo title='Welcome to my portfolio' />

      <HeroSection />
      <PortfolioSection projects={mainProjects} />
      <SkillsSection skills={skills} />
      <ContactSection />
    </Fragment>
  )
}

export async function getStaticProps() {
  const { mainProjects } = require('src/data/projects')
  const { skillTypes } = require('src/data/data')

  return { props: { mainProjects, skills: skillTypes } }
}

export default IndexPage
