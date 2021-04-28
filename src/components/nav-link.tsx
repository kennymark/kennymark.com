import { Link as ChakraLink, LinkProps, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface NavLinkProps extends LinkProps {
  children?: string | React.ReactNode
  to: string
  activeProps?: LinkProps
  _hover?: LinkProps
}

function NavLink({ to, activeProps, children, _hover, ...props }: NavLinkProps) {
  const router = useRouter()
  const isActive = router.pathname === to
  const color = useColorModeValue('black', 'selected')

  if (isActive) {
    console.log('pathname is', isActive, router.pathname, to)
    return (
      <Link href={to}>
        <ChakraLink
          fontWeight='bold'
          {...props}
          {...activeProps}
          _hover={{ color: 'selected' }}
          color={color}>
          {children}
        </ChakraLink>
      </Link>
    )
  }

  return (
    <Link href={to}>
      <ChakraLink {...props} _hover={{ color: 'selected' }}>
        {children}
      </ChakraLink>
    </Link>
  )
}

export default NavLink
