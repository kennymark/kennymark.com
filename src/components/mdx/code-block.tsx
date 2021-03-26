import React, { useState } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import lightTheme from 'prism-react-renderer/themes/dracula';
import darkTheme from 'prism-react-renderer/themes/oceanicNext';
import { Box, Button, useClipboard, useColorModeValue } from '@chakra-ui/react';

export const CodeBlock = ({ children, className }) => {
  const language = className?.replace(/language-/, '')
  const theme = useColorModeValue(lightTheme, darkTheme)
  const [value, setValue] = useState("Hello world")
  const { hasCopied, onCopy } = useClipboard(value)

  return (
    <Highlight {...defaultProps} code={children} language={language} theme={theme}>

      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box as='pre' borderRadius='lg' mb={5} p={25} overflowX='auto' rounded='lg' fontSize="md" pb={1} className={className}
          style={{ ...style, }}>

          <Button onClick={onCopy} ml={2} colorScheme='cyan' size='xs' float='right' pos='relative' top={-5}>
            {hasCopied ? "Copied" : "Copy"}
          </Button>

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