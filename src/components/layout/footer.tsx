import React from 'react'
import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react'
import NavLink from '@components/nav-link'

function Footer() {
  const footColor = useColorModeValue('gray.200', 'gray.800')
  const year = new Date().getFullYear() || '2021'

  return (
    <Flex
      as='footer'
      h={24}
      justifyContent='center'
      borderTop='1px'
      borderColor={footColor}
      alignItems='center'
      flexDirection='column'>
      <Box as='span'>
        Built with{' '}
        <span role='img' aria-label='love'>
          ❤️{' '}
        </span>{' '}
        by Kenny Mark ©{year}
      </Box>
      <Flex>
        <Link href='/KennyCV.pdf' isExternal fontWeight='bold' _hover={{ color: 'selected' }}>
          View CV
        </Link>
        <NavLink to='/slashes' pl={2}>
          /s
        </NavLink>
      </Flex>
    </Flex>
  )
}

export default Footer
