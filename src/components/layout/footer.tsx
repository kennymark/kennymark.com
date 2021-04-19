import React from "react";
import { Box, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import NLink from "next/link";

function Footer() {
  const footColor = useColorModeValue("gray.200", "gray.800");
  const year = new Date().getFullYear() || "2021";

  return (
    <Flex
      as="footer"
      h={24}
      justifyContent="center"
      borderTop="1px"
      borderColor={footColor}
      alignItems="center"
      flexDirection="column"
    >
      <Box as="span">
        Built with{" "}
        <span role="img" aria-label="love">
          ❤️{" "}
        </span>{" "}
        by Kenny Mark ©{year}
      </Box>
      <Link
        href="/KennyCV.pdf"
        isExternal
        fontWeight="bold"
        _hover={{ color: "green.500" }}
      >
        View CV
        <NLink href="/slashes">
          <Link color="gray.400" ml={3}>
            /s
          </Link>
        </NLink>
      </Link>
    </Flex>
  );
}

export default Footer;
