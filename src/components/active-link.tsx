import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Link as CLink, useColorModeValue } from "@chakra-ui/react"

const ActiveLink = ({ href, children }) => {
  const router = useRouter()
  const color = useColorModeValue('black', 'selected')
  let className = children.props.className || ''

  if (router.pathname === href) {
    className = `${className} selected`
  }

  return <CLink as={Link} href={href} color={color}>{React.cloneElement(children, { className })}</CLink>
}


export default ActiveLink