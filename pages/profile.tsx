import { chakra, Container, Link } from '@chakra-ui/react'
import PageHeader from '@components/page-header'
import SEO from '@components/seo'
import React from 'react'

export default function Profiles() {
  const exp = new Date().getFullYear() - new Date('2018').getFullYear() || 3

  return (
    <>
      <SEO title='Profile' />

      <Container maxW='3xl' p={3}>
        <PageHeader title='About me' />

        <chakra.div fontSize='lg' lineHeight='tall' color='gray.600'>
          <chakra.p pb={4}>
            I’m Kenny Coffie, currently a Software Engineer for Evergreen Health. I am primarily a
            front-end focused developer with fullstack skills. With a total of 5 years of
            experience, 3 years freelancing, studying and building hobby projects and {exp} years
            commercial I have worked on every kind of application from small, medium to very
            large/bloated enterprise applications. I love everything UI and UX on the web but I have
            also worked and developed mobile applications and desktop applications.
          </chakra.p>

          <chakra.p fontSize='lg' pb={4}>
            I actively spend many hours per day working on my side projects which can be found on
            <span>
              <Link isExternal href='https://github.com/kennymark'>
                github
              </Link>
            </span>
            . Software development aside, I love photography. I take lots of photos and I edit them
            on my favourite photos. I also love some music production on Logic Pro X.
          </chakra.p>
        </chakra.div>
      </Container>
    </>
  )
}
