import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import React from 'react'

function MetricCard({ title, number }) {
  return (
    <Stat border='1px' borderColor='gray.200' rounded='lg' h={110} p={3}>
      <StatLabel fontSize='lg'>{title}</StatLabel>
      <StatNumber fontWeight={900} fontSize='4xl' fontFamily='heading'>{
        new Intl.NumberFormat('en-gb').format(number)}
      </StatNumber>
    </Stat>
  )
}

export default MetricCard
