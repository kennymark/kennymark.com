import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
import darkTheme from 'prism-react-renderer/themes/oceanicNext';
import { Box, useColorMode } from '@chakra-ui/core';

export const CodeBlock = ({ children, className }) => {
  const language = className?.replace(/language-/, '')
  const { colorMode } = useColorMode()

  return (
    <Highlight {...defaultProps} code={children} language={language} theme={colorMode === 'light' ? lightTheme : darkTheme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box as='pre' letterSpacing={0.003} borderRadius='lg' mb={5} fontFamily='Source Code Pro' p={25} overflowX='auto' rounded='lg' fontSize={16} pb={1} className={className}
          style={{ ...style, }}>
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