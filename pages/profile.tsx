import { Box, Text } from '@chakra-ui/core';
import React from 'react';
import SEO from "../src/components/seo";
import PageHeader from '../src/components/ui/page-header';

export default function Profiles() {
  return (
    <>
      <SEO title="Profile" />

      <Box p={3} >
        <PageHeader title='About me' />
        <Box mx='auto' w={['', '', '', 820]} color='gray.600' fontSize={25}>
          <Text pb={5}>
            I’m Kenny Mark, currently a Software Engineer for SABS Travel Technologies. I am front-end focused developer with full stack experience. With a total of 5 years of experience, 3 years freelancing,studying and building hobby projects and 2 years commercial I have worked on every kind of application be it small, medium or very large enterprise application. I love everything UI and UX on the web but I have also worked on developed mobile applications, web apps and some backend applications.
          </Text>
          <Text> I actively spend many hours per day working on my side projects which can be found on
          <span className='bg-yellow-200 mx-1 px-1 text-gray-700 hover:bg-yellow-300 dark:bg-gray-500 rounded '>
              <a href="https://github.com/kennymark" target="_blank" rel="noopener noreferrer" >github</a>
            </span>. Software development aside, I am also heavily invested in the creation and nurturing of ideas that are used by the masses. I incline to be entrepreneurial at times and product design would be an area I would love to explore and competent at. I see beyond code and design.
          </Text>
        </Box>
      </Box>

    </>
  );
}
