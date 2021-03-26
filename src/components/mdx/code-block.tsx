import { Button, chakra, useClipboard, useColorModeValue } from '@chakra-ui/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
import darkTheme from 'prism-react-renderer/themes/oceanicNext';
import React, { useEffect, useState } from 'react';

export const CodeBlock = ({ children, className }) => {
  const language = className?.replace(/language-/, '')
  const theme = useColorModeValue(lightTheme, darkTheme)
  const [value, setValue] = useState("")
  const { hasCopied, onCopy } = useClipboard(value)
  const border = useColorModeValue('gray.100', 'gray.800')



  useEffect(() => { setValue(children) }, [])

  return (
    <Highlight {...defaultProps} code={children} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (

        <chakra.pre borderRadius='lg' mb={5} p={25} overflowX='auto' rounded='lg' pb={1} className={className}
          style={{ ...style, }} border='1px' borderColor={border}>


          <chakra.div pos='relative'>
            <Button onClick={onCopy} ml={2} size='xs' bg='gray.300' pos='relative' float='right' top={-5} left={5} _focus={{ outline: 0 }}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </chakra.div>


          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line?.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </chakra.pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
