import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useColorModeValue } from '@chakra-ui/core'

const ActiveLink = ({ href, children }) => {
  const router = useRouter()
  const color = useColorModeValue('black', '#38a169')
  let className = children.props.className || ''
  let style = children.props.style = { color }
  if (router.pathname === href) {
    className = `${className} selected`
  }

  return <Link href={href}>{React.cloneElement(children, { className, style })}</Link>
}


export default ActiveLink