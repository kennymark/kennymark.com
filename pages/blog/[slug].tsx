import { Box, Flex, Text } from '@chakra-ui/core'
import fs from 'fs'
import matter from 'gray-matter'
import { startCase } from 'lodash'
import marked from 'marked'
import path from 'path'
import React, { createRef, Fragment, useEffect } from 'react'
import { Img } from 'react-image'
import timeRead from 'read-time'
import slugify from 'slug'
import Date from '../../src/components/blog/Date'
import MDXWrapper from '../../src/components/mdx/provider'
import SEO from '../../src/components/seo'
import PageHeader from '../../src/components/ui/page-header'

function Post({ post }) {
  const { author, date, image, title } = post.frontmatter

  useEffect(() => {

  }, [])

  return (
    <Fragment>
      <SEO title={startCase(title)} />


      <PageHeader title={title} />

      <Flex justifyContent='space-evenly' alignItems='center' mb={4} fontWeight='600' color='gray.600' direction={['column', null, 'row']} fontSize={16}>
        {/* <AuthorCard author={author} /> */}
        <Date date={date} />
        <Text bg='gray.200' p={2} borderRadius='md' >{post.timeToRead.m} min read</Text>
      </Flex>

      <Box as={Img} src={image} height={[400, '', 620]} borderRadius='lg' mb={10} />
      <MDXWrapper>
        {post.body}
      </MDXWrapper>

      {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}



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


  const markdownWithMetadata = fs
    .readFileSync(path.join('posts', actualFolder, 'blog' + ".mdx"))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);
  const htmlString = marked(parsedMarkdown.content);


  return {
    props: {
      post: {
        body: parsedMarkdown.content,
        mdx: parsedMarkdown.orig.toString(),
        html: htmlString,
        frontmatter: parsedMarkdown.data,
        timeToRead: timeRead(parsedMarkdown.content),
      }
    }
  };
};

export default Post
