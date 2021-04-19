import { extendTheme } from "@chakra-ui/react";

const customeTheme = extendTheme({
  colors: {
    accent: "#ffedc5",
    selected: "#38a169",
    darkMode: "#111216",
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "IBM Plex Sans, sans-serif",
    monospace: "Source Code Pro, monospace",
  },
  fontSizes: {},

  textStyles: {
    p: {
      fontSize: 17,
      pb: 4,
      // color: (props) => (props.colorMode === "dark" ? "gray.200" : "gray.700"),
    },
  },

  components: {
    Link: {
      baseStyle: {
        textDecoration: "none",
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "md",
        _active: { border: 0, outline: 0 },
        _focus: { outline: 0, border: "1px" },
        _hover: { color: "gray.900", bg: "gray.500" },
      },
      defaultProps: {
        variant: "solid",
        size: "lg",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "gray.600",
      },
    },
    Input: {
      baseStyle: {
        borderRadius: "md",
        border: "1px",
      },
      defaultProps: {
        size: "lg",
        variant: "outline",
      },
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      "html, body": {
        textDecoration: "none",
        scrollBehavior: "smooth",
        "a:hover": {
          textDecoration: "none !important",
        },
        "*:focus": {
          outline: "0 !important",
          boxShadow: "none !important",
        },
      },
      pre: { fontFamily: "monospace" },
      p: {
        color: props.colorMode === "light" ? "gray.700" : "gray.200",
      },
      ul: {
        listStyleType: "none",
      },
      borderColor: props.colorMode === "light" ? "gray.100" : "gray.600",

      body: {
        bg: props.colorMode === "light" ? "white" : "darkMode",
      },
    }),
  },
});

export default customeTheme;
