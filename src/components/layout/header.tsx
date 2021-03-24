import { Box, Flex, Link as NLink, Text, useColorMode, useColorModeValue, chakra } from "@chakra-ui/react";
import { MoonIcon, SunIcon, } from "@chakra-ui/icons";
import React from "react";
import ActiveLink from '@components/active-link';



const MenuItems = ({ children, to }) => {
  return (
    <ActiveLink href={to}>
      <NLink mr={3} color='gray.500' py={[2, 0]}>
        {children}
      </NLink>
    </ActiveLink>
  )
};

const Header = props => {
  const [show, setShow] = React.useState(false);
  const bottomColor = useColorModeValue('gray.100', 'green.900')
  const iconColor = useColorModeValue('gray.800', 'green.500')
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggle = () => setShow(!show)

  const iconProps = {
    mr: [0, 3],
    color: colorMode === 'dark' ? 'green.400' : 'gray.500',
    fontSize: [20, 24]
  } as any

  return (
    <Flex
      as="nav"
      alignItems={["start", "center"]}
      justifyContent="center"
      wrap="wrap"
      px={10}
      py={6}
      borderBottom={['1px', 0]}
      borderBottomColor={bottomColor}
      direction={['column', 'row']}
      color="gray.700"
      {...props}>

      <Box display={['inline', 'none']} mr={3} onClick={handleToggle} color={iconColor}>
        <svg fill="currentColor" width="25px" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </Box>

      <Flex
        fontWeight='bold'
        flexGrow={1}
        direction={['column', 'row']}
        display={[show ? 'flex' : 'none', 'flex']}
        transition='all .5s linear'
      >
        <MenuItems to='/'>Home</MenuItems>
        <MenuItems to='/blog'>Blog</MenuItems>
        <MenuItems to='/projects'>Projects</MenuItems>
        <MenuItems to='/dashboard'>Dashboard</MenuItems>

      </Flex>

      <Flex
        alignItems={['start', 'center']}
        direction={['column', 'row']}
        display={[show ? 'flex' : 'none', 'flex']}
      >
        <Flex onClick={toggleColorMode} >
          <Text mr={2} display={[show ? 'flex' : 'none']} color='gray.500' >Turn  on {colorMode == 'light' ? 'dark' : 'light'} mode</Text>
          {colorMode === 'dark' ? <SunIcon {...iconProps} /> : <MoonIcon {...iconProps} />}
        </Flex>


        <NLink href='https://github.com/kennymark' isExternal _focus={{ outline: 0 }} alignItems='center' color='gray.500' display='flex'>
          <Text mr={2} display={[show ? 'flex' : 'none']}>Visit my Github</Text>

          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 32 32" focusable="false" className="chakra-icon css-1s84rmb e149g1240" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path></svg>
        </NLink>

      </Flex>

    </Flex>
  );
};

export default Header;