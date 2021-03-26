import { CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  Flex, FormControl,
  Heading, Input, Stack,
  Text, useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useSwr from 'swr';


export default function NewsLetterForm() {

  const { handleSubmit, register, formState, getValues } = useForm({ mode: 'onChange' })
  const email = getValues('email')
  const req = useSwr(email ? '/api/newsletter' : null, (url) => axios.post(url, { email }))


  const subscribe = (e) => {

    // req.mutate()

    console.log(e)
    // remove this code and implement your submit logic right here

  }

  return (
    <Flex my={10} align={'center'} justify={'center'}>

      <Container
        maxW={'lg'}
        rounded={'lg'}
        p={6}
        direction={'column'}>

        <Heading
          as={'h2'}
          fontSize={{ base: 'xl', sm: '2xl' }}
          textAlign={'center'}
          mb={5}>
          Subscribe to my newsletter
        </Heading>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          as={'form'}
          spacing={'12px'}
          onSubmit={handleSubmit(subscribe)}>

          <FormControl>
            <Input
              borderWidth={1}
              color={'gray.800'}
              _placeholder={{
                color: 'gray.400',
              }}
              ref={register}
              name='email'
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              id={'email'}
              type={'email'}
              placeholder={'Your Email'}
            />
          </FormControl>

          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              bg='gray.900'
              isLoading={formState.isSubmitting}
              type='submit'>
              {formState.isSubmitting ? <CheckIcon /> : 'Submit'}

            </Button>
          </FormControl>
        </Stack>

        <Text
          mt={2}
          textAlign={'center'}
          color={formState.errors ? 'red.500' : 'gray.500'}>
          {formState.errors
            ? 'Oh no an error occured! 😢 Please try again later.'
            : "You won't receive any spam! ✌️"}
        </Text>
      </Container>
    </Flex>
  );
}