import {
  Container,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import SEO from "@components/seo";
import React, { Fragment, useEffect, useState } from "react";
import next from "../next.config";

function Slashes() {
  const [redirects, setRedirects] = useState([]);

  useEffect(() => {
    async function getRedirects() {
      setRedirects(await next.redirects());
    }
    getRedirects();
  }, []);

  return (
    <Fragment>
      <SEO title="My slashes" />

      <Container mt={10}>
        <Heading>My Slashes</Heading>
        <Text>A list of all my redirects</Text>
        <List mt={10}>
          {redirects.map((item, i) => (
            <ListItem key={i} py={1}>
              <Link
                href={item.destination}
                isExternal
                color="blue.300"
                textTransform="capitalize"
                _hover={{ color: "blue.600" }}
              >
                {item.source.replace(/\//, "")}
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </Fragment>
  );
}

export default Slashes;
