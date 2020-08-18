import React from 'react'
import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/core'

function Footer({ data, year }) {
  const footColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Flex as='footer' h={24} justifyContent='center' borderTop='1px' borderColor={footColor} alignItems='center' flexDirection='column'>
      <Box as='span'>Built with <span role='img' aria-label="love">❤️ </span> by Kenny Mark  ©{year}</Box>
      <Link href='../images/KennyCV.pdf' isExternal fontWeight='bold' _hover={{ color: 'green.500' }}>View CV</Link>
    </Flex>
  )
}

export default Footer
