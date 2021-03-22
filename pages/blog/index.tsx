
import { Box, Container, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import AuthorCard from '@components/blog/author-card';
import PageHeader from '@components/page-header';
import SEO from '@components/seo';
import fs from 'fs';
import matter from 'gray-matter';
import { ago, dateFormat } from 'lib/dateFormat';
import Link from "next/link";
import path from "path";
import { Fragment } from "react";
import timeRead from 'read-time';



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


                  <Heading fontWeight={900} mb={4} fontSize={{ lg: "4xl", base: "2xl" }} color={titleC} >{title}</Heading>

                  <Text color="gray.600" fontSize="lg" mb={4} >{post?.data.description}</Text>

                  <Flex fontSize="sm" >
                    <AuthorCard author={author} withAvatar={false} mr={3} color={description} fontWeight='bold' />
                    <Text rounded='lg' mr={3} color='gray.400'>{post?.timeToRead.m + 1}  min read</Text>
                    <Text color='gray.400' fontSize='sm' fontStyle="italic">{ago(post.data.date)}</Text>
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
  const files = fs.readdirSync("posts")
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