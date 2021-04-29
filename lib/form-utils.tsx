import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { Text } from '@chakra-ui/react'

export function setValidation(name: string, isMessage = false, minLength = 4) {
  return {
    minLength: {
      value: minLength,
      message: `${name} should be ${minLength} characters or greater`,
    },
    maxLength: isMessage ? 2000 : 40,
    required: `${name} is required`,
  }
}

export const inputProps = (colorMode) => ({
  color: colorMode == 'light' ? 'black' : 'gray.300',
  borderColor: colorMode == 'light' ? 'gray.200' : 'gray.900',
  bg: colorMode == 'light' ? 'white' : 'gray.900',
  focusBorderColor: colorMode == 'light' ? 'gray.900' : 'green.900',
  _hover: {
    border: '1px',
    borderColor: colorMode === 'light' ? 'gray.400' : 'green.900',
  },
})

export function FormError({ name, errors }) {
  return <ErrorMessage errors={errors} name={name} as={<Text color='red.600' fontSize='sm' />} />
}
