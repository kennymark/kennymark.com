import { extendTheme } from '@chakra-ui/react'

const customeTheme = extendTheme({
  colors: {
    selection: '#ffedc5',
    selected: '#38a169',
    darkMode: '#111216',
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: `'Neue Haas Grotesk Display Pro 75 Bold'`,
    monospace: 'IBM Plex Mono, monospace',
  },
  fontSizes: {},

  textStyles: {
    p: (props) => ({
      fontSize: 18,
      pb: 4,
      color: props.colorMode === 'dark' ? 'gray.100' : 'gray.700',
    }),
  },

  components: {
    Link: {
      baseStyle: {
        textDecoration: 'none',
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 'md',
        fontWeight: '400',
        _active: { border: 0, outline: 0 },
        _focus: { outline: 0, border: '1px' },
        _hover: { color: 'gray.900', bg: 'gray.500' },
      },
      defaultProps: {
        variant: 'solid',
        size: 'lg',
      },
      variants: {
        plain: {
          bg: 'white',
          border: '1px',
          borderColor: 'gray.200',
          fontWeight: 'normal',
          _focus: { boxShadow: 'none' },
          _active: { boxShadow: 'none' },
          _hover: { bg: 'gray.50', shadow: 'sm' },
        },
        main: {
          color: 'white',
          _hover: { bg: 'gray.800', color: 'gray.400', borderColor: 0 },
          _active: { bg: 'gray.700', shadow: 'md', outline: 0 },
          _focus: { boxShadow: 'none' },
          _disabled: { _hover: { color: 'black', bg: 'black' } },
          bg: 'gray.900',
          width: '100%',
          height: 50,
          mt: 4,
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'gray.600',
      },
    },
    Input: {
      baseStyle: {
        borderRadius: 'md',
        border: '1px',
      },
      defaultProps: {
        size: 'lg',
        variant: 'outline',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      'html, body': {
        textDecoration: 'none',
        scrollBehavior: 'smooth',
        'a:hover': {
          textDecoration: 'none !important',
        },
        '*:focus': {
          outline: '0 !important',
          boxShadow: 'none !important',
        },
      },
      '::selection': {
        backgroundColor: 'selection',
        color: 'black',
      },
      pre: { fontFamily: 'monospace' },
      p: {
        color: props.colorMode === 'light' ? 'gray.700' : 'gray.200',
      },
      ul: {
        listStyleType: 'none',
      },
      borderColor: props.colorMode === 'light' ? 'gray.100' : 'gray.600',

      body: {
        bg: props.colorMode === 'light' ? 'white' : 'darkMode',
      },
    }),
  },
})

export default customeTheme
