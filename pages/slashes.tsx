import { Container, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'
import SEO from '@components/seo'
import React, { Fragment } from 'react'

function Slashes({ redirects }) {
  return (
    <Fragment>
      <SEO title='My slashes' />

      <Container mt={10}>
        <Heading>My Slashes</Heading>
        <Text>A list of all my redirects</Text>
        <List mt={10}>
          {redirects.map((item, i) => (
            <ListItem key={i} py={1}>
              <Link
                href={item.destination}
                isExternal
                color='blue.600'
                textTransform='capitalize'
                _hover={{ color: 'blue.300' }}>
                {item.source.replace(/\//, '')}
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </Fragment>
  )
}

export default Slashes

export async function getStaticProps() {
  const next = require('../next.config')
  const redirects = await next.redirects()

  return {
    props: { redirects },
  }
}
