import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { FormError, inputProps, setValidation } from 'lib/form-utils'
import React from 'react'
import { useForm } from 'react-hook-form'
import PageHeader from '../page-header'

function Contact() {
  const { register, handleSubmit, errors, reset } = useForm({ mode: 'onChange' })

  const toast = useToast()
  const { colorMode } = useColorMode()

  const commonToast = {
    position: 'top-right',
    variant: 'subtle',
    isClosable: true,
  } as any

  const sendMail = async (data) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      toast({
        title: 'Email sent',
        description: 'Email has been sucessfully sent.',
        status: 'success',
        ...commonToast,
      })
      setTimeout(() => reset(), 2000)
    } catch (error) {
      toast({
        title: 'Email sending failed',
        description: 'The email has failed to send. Please try again...',
        status: 'error',
        ...commonToast,
      })
    }
  }

  return (
    <Box pb={40} w={{ lg: 700 }} mx='auto' mt={20} p={4}>
      <PageHeader simple title='Contact me' hasB />

      <form onSubmit={handleSubmit(sendMail)}>
        <Stack>
          <FormControl>
            <FormLabel htmlFor='subject'>Subject</FormLabel>
            <Input
              id='subject'
              type='text'
              name='subject'
              {...inputProps(colorMode)}
              ref={register(setValidation('Subject', false, 2))}
            />
            <FormError errors={errors} name='subject' />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input
              id='name'
              type='name'
              name='name'
              ref={register(setValidation('Name'))}
              {...inputProps(colorMode)}
            />
            <FormError errors={errors} name='name' />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input
              id='email'
              type='email'
              name='email'
              ref={register({ ...setValidation('Email') })}
              {...inputProps(colorMode)}
            />
            <FormError errors={errors} name='email' />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='message'>Message</FormLabel>
            <Textarea
              id='message'
              type='textarea'
              name='message'
              ref={register(setValidation('Message', true))}
              {...inputProps(colorMode)}
              h={300}
              resize='none'
            />
            <FormError errors={errors} name='message' />
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
