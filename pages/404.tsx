import React from "react";
import SEO from "@components/seo";
import { Heading, Text, Box, useColorModeValue, Img } from "@chakra-ui/react";

const NotFoundPage = () => {
  const text = useColorModeValue("black", "gray.300");
  const img = "/images/error404.svg";
  return (
    <>
      <SEO title="Error 404" />

      <Box mt={5}>
        <Heading size="2xl" textAlign="center" color={text}>
          Not found
        </Heading>
        <Img src={img} mx="auto" my={10} />
        {/* <ErrorImage /> */}
        <Text textAlign="center" color={text}>
          This page does not seem to exist
        </Text>
      </Box>
    </>
  );
};

export default NotFoundPage;
