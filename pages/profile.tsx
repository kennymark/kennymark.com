import { Box, Text, Container, Link } from '@chakra-ui/core';
import React from 'react';
import SEO from 'components/seo';
import PageHeader from 'components/page-header';


export default function Profiles() {
  return (
    <>
      <SEO title="Profile" />

      <Box p={3} >
        <PageHeader title='About me' />
        <Container my={20} maxW="md" fontSize={20} color='gray.500'>
          <Text pb={5}>
            I’m Kenny Coffie, currently a Software Engineer for SABS Travel Technologies. I am front-end focused developer with full stack experience. With a total of 5 years of experience, 3 years freelancing, studying and building hobby projects and 2 years commercial I have worked on every kind of application be it small, medium or very large enterprise application. I love everything UI and UX on the web but I have also worked on developed mobile applications, web apps and some backend applications.
          </Text>
          <Text> I actively spend many hours per day working on my side projects which can be found on
          <span>
              <Link isExternal href="https://github.com/kennymark">github</Link>
            </span>. Software development aside, I am also heavily invested in the creation and nurturing of ideas that are used by the masses. I incline to be entrepreneurial at times and product design would be an area I would love to explore and competent at. I see beyond code and design.
          </Text>
        </Container>
      </Box>

    </>
  );
}
