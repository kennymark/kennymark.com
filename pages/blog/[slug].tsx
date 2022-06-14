import { Box, Container, Flex, Heading, Text, Img } from '@chakra-ui/react'
import AuthorCard from '@components/blog/author-card'
import { components } from '@components/mdx/provider'
import SEO from '@components/seo'
import { getAllArticles, getArticleByPath } from 'lib/devblog'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import React from 'react'
import Date from '@components/blog/date-time'
import NewsLetterForm from '@components/newsletter-form'

function Post({ post }) {
  const { title, cover_image, description } = post.source.frontmatter

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

      {cover_image && (
        <Box
          as={Img}
          src={cover_image}
          height={[400, '', 620]}
          borderRadius='lg'
          mb={10}
          objectFit='fill'
        />
      )}

      <Box>
        <MDXRemote {...post.source} components={components} />
      </Box>

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
  const source = await serialize(mdx.body_markdown, { parseFrontmatter: true })

  return {
    revalidate: 5,
    props: {
      post: {
        slug,
        source,
        timeToRead: time(source.compiledSource),
      },
    },
  }
}

export default Post
