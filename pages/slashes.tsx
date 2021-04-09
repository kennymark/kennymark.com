import { Container, Link, List, ListItem, Text } from '@chakra-ui/react'
import SEO from '@components/seo'
import React, { Fragment } from 'react'
import next from '../next.config'


function Slashes() {
  let data;
  async () => await next.redirects().then(links => data = links)
  return (
    <Fragment>
      <SEO title="My slashes" />

      <Container>

        <List>
          {data.map((item, i) => (
            <ListItem key={i}>
              <Link href={item.destination} isExternal>{item.source}</Link>
            </ListItem>
          ))}
        </List>
      </Container>

    </Fragment>
  )
}

export default Slashes
