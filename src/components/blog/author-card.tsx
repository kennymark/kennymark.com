import { Avatar, Flex, Link as NLink } from '@chakra-ui/react'
import Link from 'next/link'

function AuthorCard({ author, withAvatar = true, ...rest }) {
  return (
    <Flex alignItems='center' {...rest}>
      {withAvatar && <Avatar name='me' size='sm' src='/images/me2.jpg' mr={3} zIndex='20' />}

      <Link href='/profile'>
        <NLink _hover={{ color: 'selected' }}>{author} </NLink>
      </Link>
    </Flex>
  )
}

export default AuthorCard
