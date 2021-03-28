import { Spinner, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

function MetricCard({ title, number }) {
  const bColor = useColorModeValue('gray.100', 'gray.600')

  return (
    <Stat border='1px' borderColor={bColor} rounded='lg' h={110} p={3}>
      <StatLabel fontSize='lg'>{title}</StatLabel>
      {!number ? <Spinner mt={5} /> :
        <StatNumber fontWeight={900} fontSize='4xl' fontFamily='heading'>{
          new Intl.NumberFormat('en-gb').format(number)}
        </StatNumber>
      }

    </Stat>
  )
}

export default MetricCard
