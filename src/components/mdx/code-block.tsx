import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl';
import { Box } from '@chakra-ui/core';

export const CodeBlock = ({ children, className }) => {
  const language = className.replace(/language-/, '')
  return (
    <Highlight {...defaultProps} code={children} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box as='pre' borderRadius='lg' mb={5} fontFamily='Source Code Pro' p={25} overflowX='auto' fontSize={18} pb={1} className={className} style={{ ...style, }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line?.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Box>
      )}
    </Highlight>
  )
}

export default CodeBlock