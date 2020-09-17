import React from 'react'
import { Box } from '@chakra-ui/core'

function Container({ children }) {
  return (
    <Box p={5} mx='auto' w={['', '', 700,]} mt={20}>
      {children}
    </Box>
  )
}

export default Container
