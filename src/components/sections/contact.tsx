

import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea, useColorMode, useToast, Text, } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import PageHeader from '../page-header';
import { ErrorMessage } from '@hookform/error-message';

function Contact() {
  const { register, handleSubmit, errors, reset } = useForm({ mode: 'onChange' });

  const toast = useToast()
  const { colorMode } = useColorMode()

  const commonToast = {
    position: "top-right",
    variant: 'subtle',
    isClosable: true
  } as any

  const inputProps = {
    color: colorMode == 'light' ? 'black' : 'gray.300',
    borderColor: colorMode == 'light' ? 'gray.200' : 'gray.900',
    focusBorderColor: colorMode == 'light' ? 'gray.900' : 'green.900',
    _hover: {
      border: '1px',
      borderColor: colorMode === 'light' ? 'gray.400' : 'green.900',
    }
  } as any

  const sendMail = async (data) => {

    try {
      await fetch("/api/contact", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(data)
      })
      toast({
        title: 'Email sent',
        description: 'Email has been sucessfully sent.',
        status: 'success',
        ...commonToast
      })
      setTimeout(() => reset(), 2000);
    } catch (error) {
      toast({
        title: 'Email sending failed',
        description: 'The email has failed to send. Please try again...',
        status: 'error',
        ...commonToast
      })
    }

  }



  function setValidation(name: string, isMessage = false, minLength = 4) {
    return {
      minLength: {
        value: minLength,
        message: `${name} should be ${minLength} characters or greater`
      },
      maxLength: isMessage ? 2000 : 40,
      required: `${name} is required`
    }
  }
  return (
    <Box pb={40} w={{ lg: 700 }} mx='auto' mt={20} p={4}>
      <PageHeader simple title='Contact me' hasB />
      <form onSubmit={handleSubmit(sendMail)}>
        <Stack>

          <FormControl >
            <FormLabel htmlFor="subject">Subject</FormLabel>
            <Input id='subject' type="text" name="subject"  {...inputProps} ref={register(setValidation('Subject', false, 2))} />
            <ErrorMessage errors={errors} name='subject' as={<Text color='red.600' />} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="name" >Name</FormLabel>
            <Input id='name' type="name" name="name" ref={register(setValidation('Name'))} {...inputProps} />
            <ErrorMessage errors={errors} name='name' as={<Text color='red.600' />} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email" >Email address</FormLabel>
            <Input id='email' type="email" name="email" ref={register({ ...setValidation('Email') })}  {...inputProps} />
            <ErrorMessage errors={errors} name='email' as={<Text color='red.600' />} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea id='message' type='textarea' name="message" ref={register(setValidation('Message', true))} {...inputProps} h={300} resize='none' />
            <ErrorMessage errors={errors} name='message' as={<Text color='red.600' />} />
          </FormControl>

          <FormControl>
            <Button type='submit' color='white' bg='gray.900' width='100%' h={55} mt={5}>
              Submit
              </Button>
          </FormControl>
        </Stack>

      </form>

    </Box>

  )
}

export default Contact
