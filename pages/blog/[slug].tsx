import { Box, Container, Flex, Text, Heading } from '@chakra-ui/core'
import Date from 'components/blog/Date'
import { components } from 'components/mdx/provider'
import SEO from 'components/seo'
import fs from 'fs'
import matter from 'gray-matter'
import { lowerCase, startCase } from 'lodash'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import React from 'react'
import Img from "react-cool-img";
import timeRead from 'read-time'
import slugify from 'slug'
import AuthorCard from 'components/blog/AuthorCard'

function Post({ post }) {
  const { author, date, image, title, description } = post.frontmatter
  const content = hydrate(post.body, { components })


  return (
    <Container mb={20} my={10} maxW="md">

      <SEO title={startCase(title)} description={description} />

      <Heading mb={3} fontSize={40} textAlign='center'>{title}</Heading>

      <Flex justify='space-between' alignItems='center' color='gray.400' fontSize={15} mb={10}>
        <Flex alignItems='center'>
          <AuthorCard author={author} mr={3} />
          <Date date={date} />
        </Flex>
        <Text>{post.timeToRead.m + 1} min read</Text>
      </Flex>

      {image && <Box as={Img} src={image} height={[400, '', 620]} borderRadius='lg' mb={10} />}
      <Box>
        {content}
      </Box>

    </Container>
  )
}


export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");
  const paths = files.filter(file => !file.includes('DS_Store'))
    .map(name => ({
      params: { slug: slugify(name.replace(".mdx", "")) }
    }));

  return { paths, fallback: false }
};

export const getStaticProps = async ({ params: { slug } }) => {
  const files = fs.readdirSync("posts").filter(filename => !filename.includes('DS_Store'))
  const unSlugged = slug.replace(/-/gi, ' ')
  const actualFolder = files.find(filename => lowerCase(filename).includes(unSlugged.slice(0, 10)))

  const mdx = fs.readFileSync(path.join('posts', actualFolder, 'blog' + ".mdx"), 'utf-8')
  const { content, data } = matter(mdx);
  const mdxSource = await renderToString(content, { components, scope: data })



  return {
    props: {
      post: {
        body: mdxSource,
        frontmatter: data,
        timeToRead: timeRead(content),
      }
    }
  };
};

export default Post
