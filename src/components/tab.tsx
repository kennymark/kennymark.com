import { Tab, TabList, Tabs, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

function DataTabs({ data, onSelect }) {
  const color = useColorModeValue('black', 'gray.200')
  return (
    <Tabs overflowX={{ base: 'scroll', md: 'hidden' }}>
      <TabList>
        {data.map((tab, index) => (
          <Tab
            key={index}
            color={color}
            onClick={() => onSelect(tab)}
            _selected={{ color, borderColor: color }}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {/* <TabPanels>
        {data.map((tab, index) => (
          <TabPanel p={4} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels> */}
    </Tabs>
  )
}

export default DataTabs
