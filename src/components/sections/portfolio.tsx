import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Center, Container, Flex, Heading, Img, Link as CLink, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import PageHeader from '../page-header'

function Portfolio({ projects }) {
  return (
    <Container minW={{ lg: 700 }} mt={20}>
      <Flex alignItems='center' mb={5} justify={['space-around', null, 'space-between']}>
        <PageHeader simple title='Projects' />

        <Link href='/projects'>
          <CLink fontSize='lg' _hover={{ color: 'selected' }} _focus={{}}>
            View More projects <ChevronRightIcon />
          </CLink>
        </Link>
      </Flex>

      {projects.map((proj) => (
        <Stack
          p={10}
          key={proj.name}
          mb={{ lg: 10 }}
          bg={proj.color + '.100'}
          borderRadius={{ md: 'lg' }}
          h={[500, 600, 700]}>
          <Heading
            as='h3'
            fontSize='xl'
            mt={-4}
            pb={2}
            textAlign='center'
            textTransform='capitalize'
            color={proj.color + '.800'}>
            {proj.name}
          </Heading>

          <Center>
            <Box as={Img} src={proj.image} alt={proj.name} width='95%' shadow='lg' />
          </Center>
        </Stack>
      ))}
    </Container>
  )
}

export default Portfolio
