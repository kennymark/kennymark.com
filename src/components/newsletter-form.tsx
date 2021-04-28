import { CheckIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import axios from 'axios'
import { FormError, setValidation } from 'lib/form-utils'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function NewsLetterForm() {
  const { handleSubmit, register, formState, reset } = useForm({ mode: 'onChange' })
  const toast = useToast()
  const border = useColorModeValue('gray.300', 'gray.700')
  const [error, setError] = useState(false)

  const def = {
    position: 'top-right',
    variant: 'subtle',
    duration: 5000,
    isClosable: true,
  } as any

  const subscribe = async ({ email }) => {
    try {
      const { data } = await axios.post('/api/dashboard/subscribe-newsletter', { email })
      toast({ title: `You're subscribed`, description: data.message, status: 'success', ...def })
      setTimeout(() => reset(), 2000)
    } catch (error) {
      setError(true)
      toast({ title: 'Darn it', description: error.response.data.error, status: 'error', ...def })
    }
  }

  return (
    <Flex my={10} align={'center'} justify={'center'}>
      <Container maxW={'lg'} rounded={'lg'} p={6} direction={'column'}>
        <Heading as={'h2'} fontSize={{ base: 'xl', sm: '2xl' }} textAlign={'center'} mb={5}>
          Subscribe to my newsletter
        </Heading>

        <Stack
          as={'form'}
          direction={{ base: 'column', md: 'row' }}
          spacing={'12px'}
          onSubmit={handleSubmit(subscribe)}>
          <FormControl>
            <Input
              borderWidth={1}
              borderColor={border}
              focusBorderColor='gray.900'
              color={'gray.800'}
              _placeholder={{ color: 'gray.400' }}
              ref={register({ ...setValidation('Email') })}
              name='email'
              id={'email'}
              type={'email'}
              placeholder={'example@aol.com'}
            />
            <FormError name='email' errors={formState.errors} />
          </FormControl>

          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              variant='main'
              isLoading={formState.isSubmitting}
              mt={0}
              disabled={!formState.isValid || !formState.isDirty}
              type='submit'>
              {formState.isSubmitting ? <CheckIcon /> : 'Submit'}
            </Button>
          </FormControl>
        </Stack>

        <Text mt={2} textAlign={'center'} color={error ? 'red.500' : 'gray.500'}>
          {error
            ? 'Oh no an error occured! 😢 Please try again later.'
            : "You won't receive any spam! ✌️"}
        </Text>
      </Container>
    </Flex>
  )
}
