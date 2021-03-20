import React from 'react'
import { Box } from '@chakra-ui/react'

function Container({ children }) {
  return (
    <Box p={5} mx='auto' w={{ lg: 700 }} mt={20}>
      {children}
    </Box>
  )
}

export default Container
