import { extendTheme } from "@chakra-ui/react"

const customeTheme = extendTheme({
  colors: {
    accent: '#ffedc5',
    selected: '#38a169',
    darkMode: '#111216'
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "IBM Plex Sans, sans-serif",
    monospace: "Source Code Pro, monospace",
  },
  fontSizes: {

  },

  components: {

    Link: {
      baseStyle: {
        textDecoration: 'none'
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 'md',
        _active: { border: 0, outline: 0 },
        _focus: { outline: 0, border: '1px' },
        _hover: { color: 'gray.900', bg: 'gray.500' }
      },
      defaultProps: {
        variant: 'solid',
        size: 'lg'
      }
    },
    FormLabel: {
      baseStyle: {
        color: 'gray.600'
      }
    },
    Input: {
      baseStyle: {
        borderRadius: 'md',
        border: '1px',
      },
      defaultProps: {
        size: 'lg',
        variant: 'outline',
      }
    }
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {

    global: props => ({
      pre: { fontFamily: 'monospace' },
      ul: {
        listStyleType: "none",
      },
      borderColor: props.colorMode === 'light' ? 'gray.100' : 'gray.600',
      a: {
        textDecoration: 'none'
      },
      body: {
        bg: props.colorMode === 'light' ? 'white' : 'darkMode'
      },
    }),
  }
})

export default customeTheme