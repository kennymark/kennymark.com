// import { useColorMode, Container, Stack, Flex, Heading, Avatar, Box, Link, Text } from "@chakra-ui/core";
// import { format } from "path";

// const Index(frontMatter) => {
//   const slug = frontMatter.__resourcePath
//     .replace('blog/', '')
//     .replace('.mdx', '');

//   return ({ children }) => {
//     const { colorMode } = useColorMode();
//     const textColor = {
//       light: 'gray.700',
//       dark: 'gray.400'
//     };

//     return (
//       <Container>
//         {/* <BlogSeo url={`https://leerob.io/blog/${slug}`} {...frontMatter} /> */}
//         <Stack
//           as="article"
//           spacing={8}
//           justifyContent="center"
//           alignItems="flex-start"
//           m="0 auto 4rem auto"
//           maxWidth="700px"
//           w="100%"
//         >
//           <Flex
//             flexDirection="column"
//             justifyContent="flex-start"
//             alignItems="flex-start"
//             maxWidth="700px"
//             w="100%"
//           >
//             <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
//               {frontMatter.title}
//             </Heading>
//             <Flex
//               justify="space-between"
//               align={['initial', 'center']}
//               direction={['column', 'row']}
//               mt={2}
//               w="100%"
//               mb={4}
//             >
//               <Flex align="center">
//                 <Avatar
//                   size="xs"
//                   name="Lee Robinson"
//                   src="https://bit.ly/33vEjhB"
//                   mr={2}
//                 />

//               </Flex>

//             </Flex>
//           </Flex>
//           {children}



//         </Stack>
//       </Container>
//     );
//   };
// }


// export { Index }