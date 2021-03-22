import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Link as CLink, LinkProps } from "@chakra-ui/react"


interface ActiveLinkProps extends LinkProps {
  href: string;
  children?: React.ReactNode | any
}
const ActiveLink = ({ href, children, ...props }: ActiveLinkProps) => {
  const router = useRouter()

  let className = children.props.className || ''

  if (router.pathname === href) {
    className = `${className} selected`
  }

  return <CLink as={Link} href={href} {...props} textDecor="none" >{React.cloneElement(children, { className })}</CLink>
}


export default ActiveLink