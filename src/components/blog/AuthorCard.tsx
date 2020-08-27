import { Avatar, Flex, Link as NLink } from '@chakra-ui/core'
import Link from 'next/link'


function AuthorCard({ author, withAvatar = true, ...rest }) {
  return (
    <Flex alignItems='center' {...rest}>

      {withAvatar && <Avatar name="me" size='sm' src="/images/me.jpg" mr={3} />}

      <Link href='/profile'>
        <NLink _hover={{ color: 'green.500' }} _focus={{ outline: 0 }} letterSpacing={0.5} fontWeight={500}>{author} </NLink>
      </Link>

    </Flex>
  )
}

export default AuthorCard
