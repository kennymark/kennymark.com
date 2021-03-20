
import { Box, Container, Flex, Text, Heading } from '@chakra-ui/react'
import AuthorCard from '@components/blog/AuthorCard'
import Date from '@components/blog/Date'
import { components } from '@components/mdx/provider'
import SEO from '@components/seo'
import { readFileSync, readdirSync } from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import React from 'react'
import Img from "react-cool-img";


function Post({ post }) {
  const { author, date, image, title, description } = post.frontmatter
  const content = hydrate(post.body, { components })


  return (
    <Container mb={20} my={10} maxW='3xl'>

      <SEO title={title} description={description} />

      <Heading mb={10} fontSize="5xl"  >
        {title}
      </Heading>

      <Flex justify='space-between' alignItems='center' color='gray.400' mb={10}>
        <Flex alignItems='center'>
          <AuthorCard author={author} mr={3} />
          <Date date={date} />
        </Flex>
        <Text>{post.timeToRead.m + 1} min read</Text>
      </Flex>

      {image && <Box as={Img} src={image} height={[400, '', 620]} borderRadius='lg' mb={10} />}

      <Box>{content}</Box>

    </Container>
  )
}

// Create paths without .mdx
export const getStaticPaths = async () => {
  const files = readdirSync("posts")
  const paths = files.map(name => ({
    params: { slug: name.replace(".mdx", "") }
  }));

  return { paths, fallback: false }
};

// parsing mdx 

export const getStaticProps = async ({ params: { slug } }) => {
  const time = require('read-time')
  const mdx = readFileSync(path.join('posts', slug + '.mdx'), 'utf-8')
  const { content, data } = matter(mdx);
  const source = await renderToString(content, { components, scope: data })

  return {
    revalidate: 1,
    props: {
      post: { body: source, frontmatter: data, timeToRead: time(content) }
    }
  };
};

export default Post