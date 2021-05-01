import { Button, chakra, useClipboard, useColorModeValue } from '@chakra-ui/react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import darkTheme from 'prism-react-renderer/themes/oceanicNext'
import React, { useEffect, useState } from 'react'

export const CodeBlock = ({ children, className }) => {
  const language = className?.replace(/language-/, '')
  const theme = useColorModeValue(lightTheme, darkTheme)
  const [value, setValue] = useState('')
  const { hasCopied, onCopy } = useClipboard(value)
  const border = useColorModeValue('gray.100', 'gray.800')
  const copyThing = useColorModeValue('gray.200', 'gray.600')

  useEffect(() => {
    setValue(children)
  }, [])

  return (
    <Highlight {...defaultProps} code={children} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <chakra.a pos='relative' top={4} fontSize='sm' color='selected'>
            {language}
          </chakra.a>
          <chakra.pre
            rounded='lg'
            border='1px'
            overflowX='auto'
            my={5}
            p={25}
            pb={1}
            pos='relative'
            className={className}
            style={{ ...style }}
            fontSize={15}
            borderColor={border}>
            <chakra.div pos='relative'>
              <Button
                onClick={onCopy}
                ml={2}
                size='xs'
                bg={copyThing}
                pos='sticky'
                float='right'
                _focus={{ outline: 0 }}>
                {hasCopied ? 'Copied' : 'Copy'}
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
        </>
      )}
    </Highlight>
  )
}

export default CodeBlock
