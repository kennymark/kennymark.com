import { Box, Flex, Text } from '@chakra-ui/core'
// import { MDXRenderer } from "gatsby-plugin-mdx"
import { startCase } from 'lodash'
import React, { createRef, useEffect, Fragment } from 'react'
import { Img } from 'react-image'
import Layout from '../../src/components/layout/layout'
import SEO from '../../src/components/seo'
import PageHeader from '../../src/components/ui/page-header'
import AuthorCard from '../../src/components/blog/AuthorCard'
import MDXWrapper from '../../src/components/mdx/provider'
import Date from '../../src/components/blog/Date'
import path from 'path'
import matter from 'gray-matter'
import fs from 'fs'
import marked from 'marked'
import slugify from 'slug'
import timeRead from 'read-time'
import mdx from '@next/mdx'

function Post({ post }) {
  const { author, date, image, title } = post.frontmatter
  const ref = createRef()

  useEffect(() => {
    console.log({ ref: ref.current })
  }, [])

  return (
    <Fragment>
      <SEO title={startCase(title)} />

      <Box p={4} mx='auto' w={['', '', 900]} fontSize={20} pb={20}>
        <PageHeader title={title} />

        <Flex justifyContent='space-evenly' alignItems='center' mb={4} fontWeight='600' color='gray.600' direction={['column', null, 'row']} fontSize={16}>
          {/* <AuthorCard author={author} /> */}
          <Date date={date} />
          <Text bg='gray.200' p={2} borderRadius='md' >{post.timeToRead.m} min read</Text>
        </Flex>

        <Box as={Img} src={image} height={[400, '', 620]} borderRadius='lg' mb={10} />
        <MDXWrapper>{post.body}</MDXWrapper>
      </Box>

    </Fragment>
  )
}


export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");

  const paths = files.filter(file => !file.includes('DS_Store'))
    .map(filename => ({
      params: { slug: slugify(filename.replace(".mdx", "")).replace(/[0-9]-/gm, '') }
    }));

  console.log("paths: ", paths);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const files = fs.readdirSync("posts").filter(filename => !filename.includes('DS_Store'))
  const unSlugged = slug.replace(/-/gi, ' ')
  const actualFolder = files.find(filename => filename.toLocaleLowerCase().includes(unSlugged.slice(0, 10)))

  // console.log({ files, actualFolder, unSlugged })

  const markdownWithMetadata = fs
    .readFileSync(path.join('posts', actualFolder, 'blog' + ".mdx"))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);
  console.log({ parsedMarkdown })
  const htmlString = marked(parsedMarkdown.content);


  return {
    props: {
      post: {
        body: htmlString,
        frontmatter: parsedMarkdown.data,
        timeToRead: timeRead(parsedMarkdown.content),
      }
    }
  };
};

export default Post
