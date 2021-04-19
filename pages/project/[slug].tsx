import { ExternalLinkIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  List,
  ListItem,
  Text,
  Tooltip,
  chakra,
} from "@chakra-ui/react";
import PageHeader from "@components/page-header";
import SEO from "@components/seo";
import { motion } from "framer-motion";
import slugify from "lib/slug";
import { startCase, upperFirst } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Img from "react-cool-img";
import { topProjects } from "src/data/projects";
const MFlex = motion(Flex);
const MText = motion(Text);

export default function Project(project) {
  const originalImage = project.image;
  const [src, setSrc] = useState(originalImage);

  const {
    query: { slug },
  } = useRouter();

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
  };

  const spring = { type: "spring", damping: 10, stiffness: 100 };

  const showGif = () => {
    setSrc(`/images/gifs/${slug}.gif`);
  };

  const unshowGif = () => {
    setSrc(originalImage);
  };

  return (
    <Container maxW="8xl" mb={10}>
      <SEO title={startCase(project.name)} description={project.description} />

      <Grid templateColumns="repeat(6, 1fr)" gap={10}>
        <GridItem colSpan={{ base: 6, lg: 4 }}>
          <PageHeader title={startCase(project.name)} hasB />

          <chakra.div display="flex" alignItems="center" fontSize="sm">
            {project.link && (
              <Tooltip label="Visit Website" aria-label="Visit website tooltip">
                <Link isExternal href={project.link} mr={3}>
                  <ExternalLinkIcon
                    color="gray.500"
                    _hover={{ color: "black" }}
                  />
                </Link>
              </Tooltip>
            )}
            <Tooltip
              label="View Source Code on Github"
              aria-label="Visit website tooltip"
            >
              <Link
                isExternal
                href={project.source}
                color="gray.500"
                _hover={{ color: "black" }}
              >
                Source Code
              </Link>
            </Tooltip>
          </chakra.div>

          <MText
            variants={variants}
            initial="initial"
            animate="animate"
            my={5}
            textStyle="p"
          >
            {upperFirst(project.description)}
          </MText>

          <MFlex
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            mx="auto"
            rounded={[null, "lg"]}
            shadow="xl"
            p={10}
            backgroundColor={project.color}
            maxW={{ xs: 400, xl: 1000 }}
            onMouseEnter={showGif}
            onMouseLeave={unshowGif}
            cursor="pointer"
          >
            <Box
              as={Img}
              src={src}
              rounded="inherit"
              mx="auto"
              shadow="md"
              maxHeight={700}
            />
          </MFlex>
        </GridItem>

        <GridItem colSpan={{ base: 6, lg: 2 }} p={{ base: 4, lg: 8 }}>
          <Heading>Stack </Heading>
          <Text my={8} textStyle="p">
            Technologies and libraries used to build the application
          </Text>
          <List>
            {project.stack.map((stack) => (
              <ListItem key={stack} textStyle="p">
                <ChevronRightIcon color="gray.300" /> {stack}
              </ListItem>
            ))}
          </List>
        </GridItem>
      </Grid>
    </Container>
  );
}

export async function getStaticPaths() {
  const paths = topProjects.map((proj) => ({
    params: { slug: slugify(proj.name) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const props = topProjects.find((proj) => slugify(proj.name) === slug);
  return { props };
}
