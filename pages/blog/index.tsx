
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/core";
import fs from "fs";
import matter from 'gray-matter';
import Link from "next/link";
import path from "path";
import timeRead from 'read-time';
import { Fragment } from "react";
import AuthorCard from 'components/blog/AuthorCard';
import SEO from 'components/seo';
import PageHeader from 'components/page-header';
import { dateFormat } from 'lib/dateFormat';




function Blog({ posts }) {
  const description = useColorModeValue('gray.600', 'gray.400')
  const titleC = useColorModeValue('black', 'gray.300')


  return (
    <Fragment>
      <SEO title='Blog Posts' />

      <Box p={3}>
        <PageHeader title='Thoughts' />
        {posts.map((post) => {
          const { title, author } = post.data

          return (
            <Box key={title} width={['', '', 800]} mx='auto' cursor='pointer'>
              <Link href={post.slug.replace('.mdx', '')}>

                <Flex justify='space-around' direction='column' p={6} >
                  <Heading fontWeight={500} mb={4} fontSize={30} color={titleC} >{title}</Heading>

                  <Text color={description} fontSize={17} mb={4} >{post?.data.description}</Text>

                  <Flex justify='space-between' alignItems='center' color='gray.500' fontSize={14}>
                    <AuthorCard author={author} withAvatar={false} />
                    <Text rounded='lg' >{post?.timeToRead.m + 1}  min read</Text>
                  </Flex>
                </Flex>

              </Link>
            </Box>
          )
        })}
      </Box>

    </Fragment >
  )
}




export const getStaticProps = async () => {
  const files = fs.readdirSync("posts").filter(name => !name.includes('.DS_Store'))
  const postMatter = file => matter(fs.readFileSync(path.join("posts", file), 'utf-8'))

  const posts = files.map(filename => ({
    timeToRead: timeRead(postMatter(filename).content),
    data: postMatter(filename).data,
    slug: 'blog/' + filename
  }))

  return {
    props: {
      posts: posts.sort((a, b) => dateFormat(a.data.date).unix() + dateFormat(b.data.date).unix())
    }
  }
};

export default Blog;