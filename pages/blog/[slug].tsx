import { Box, Container, Flex, Heading, Text, Img } from '@chakra-ui/react'
import AuthorCard from '@components/blog/author-card'
import { components } from '@components/mdx/provider'
import SEO from '@components/seo'
import matter from 'gray-matter'
import { getAllArticles, getArticleByPath } from 'lib/devblog'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import React from 'react'
import Date from '@components/blog/date-time'
import NewsLetterForm from '@components/newsletter-form'

function Post({ post }) {
  const { image, title, description } = post.frontmatter
  const content = hydrate(post.body, { components })

  return (
    <Container mb={20} my={10} maxW='3xl'>
      <SEO title={title} description={description} slug={post.slug} image={post?.cover_image} />

      <Heading mb={10} fontSize='5xl'>
        {title}
      </Heading>

      <Flex justify='space-between' alignItems='center' color='gray.400' mb={10}>
        <Flex alignItems='center'>
          <AuthorCard author='Kenneth Coffie' mr={3} />
          <Date date={post.date} />
        </Flex>
        <Text>{post.timeToRead.m + 1} min read</Text>
      </Flex>

      {image && <Box as={Img} src={image} height={[400, '', 620]} borderRadius='lg' mb={10} />}

      <Box>{content}</Box>

      <NewsLetterForm />
    </Container>
  )
}

// Create paths without .mdx
export const getStaticPaths = async () => {
  const posts = await getAllArticles()
  const paths = posts.map((name) => ({
    params: { slug: name.devToSlug },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const time = require('read-time')
  const mdx = await getArticleByPath(slug)
  const { content, data } = matter(mdx.body_markdown)
  const source = await renderToString(content, { components, scope: data })

  return {
    revalidate: 5,
    props: {
      post: {
        slug,
        body: source,
        frontmatter: data,
        timeToRead: time(content),
      },
    },
  }
}

export default Post
