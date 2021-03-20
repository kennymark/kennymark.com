
import { Box, Flex, Heading, Text, Container, useColorModeValue, chakra } from "@chakra-ui/react";
import matter from 'gray-matter';
import Link from "next/link";
import path from "path";
import timeRead from 'read-time';
import { Fragment } from "react";
import AuthorCard from '@components/blog/AuthorCard';
import SEO from '@components/seo';
import PageHeader from '@components/page-header';
import { ago, dateFormat } from 'lib/dateFormat';





function Blog({ posts }) {
  const description = useColorModeValue('gray.900', 'gray.600')
  const titleC = useColorModeValue('black', 'gray.300')

  return (
    <Fragment>
      <SEO title='Blog Posts' />

      <Container p={3} maxW='4xl'>
        <PageHeader title='Thoughts' />
        {posts.map((post) => {
          const { title, author } = post.data

          return (
            <Box key={title} mx='auto' cursor='pointer' mb={10}>
              <Link href={post.slug.replace('.mdx', '')}>

                <Flex direction='column' >
                  <Text color='gray.600' fontSize='sm' fontStyle="italic">{ago(post.data.date)}</Text>

                  <Heading fontWeight={900} mb={4} fontSize="4xl" color={titleC} >{title}</Heading>

                  <Text color="gray.600" fontSize="lg" mb={4} >{post?.data.description}</Text>

                  <Flex fontSize="sm" >
                    <AuthorCard author={author} withAvatar={false} mr={3} color={description} fontWeight='bold' />
                    <Text rounded='lg' mr={3} color='gray.400'>{post?.timeToRead.m + 1}  min read</Text>
                  </Flex>

                </Flex>

              </Link>
            </Box>
          )
        })}
      </Container>

    </Fragment >
  )
}




export const getStaticProps = async () => {
  const fs = require("fs");
  const files = fs.readdirSync("posts").filter((name: string) => !name.includes('.DS_Store'))
  const postMatter = (file: string) => matter(fs.readFileSync(path.join("posts", file), 'utf-8'))

  const posts = files.map(filename => ({
    timeToRead: timeRead(postMatter(filename).content),
    data: postMatter(filename).data,
    slug: 'blog/' + filename
  }))

  return {
    props: {
      posts: posts.sort((a, b) => dateFormat(a.data.date).isBefore(dateFormat(b.data.date)) ? 1 : -1)
    }
  }
};

export default Blog;