
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/core";
import fs from "fs";
import matter from 'gray-matter';
import Link from "next/link";
import path from "path";
import timeRead from 'read-time';
import slug from 'slug';
import { Fragment, useEffect } from "react";
import AuthorCard from 'components/blog/AuthorCard';
import SEO from 'components/seo';
import PageHeader from 'components/ui/page-header';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)



function Blog({ posts }) {
  const description = useColorModeValue('gray.600', 'gray.400')
  const titleC = useColorModeValue('black', 'gray.300')

  useEffect(() => {
  }, [])

  return (
    <Fragment>
      <SEO title='Blog Posts' />

      <Box p={3}>
        <PageHeader title='Thoughts' />
        {posts.map((post) => {
          const { title, author } = post.data

          return (
            <Box key={title} width={['', '', 800]} mx='auto' cursor='pointer'>
              <Link href={post.slug}>

                <Flex justify='space-around' direction='column' p={6} >
                  <Heading fontWeight={500} mb={4} fontSize={30} color={titleC}>{title}</Heading>

                  <Text color={description} fontSize={17} mb={4} letterSpacing={0.5}>{post?.data.description}</Text>

                  <Flex justify='space-between' alignItems='center' color='gray.500' fontSize={14}>
                    <AuthorCard author={author} withAvatar={false} />
                    <Text color='green.500' rounded='lg' >{post?.timeToRead.m + 1}  min read</Text>
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
  const files = fs.readdirSync("posts");

  const postMatter = (file) => matter(fs.readFileSync(path.join("posts", file, 'blog' + ".mdx"))
    .toString())

  const posts = files.filter(name => !name.includes('.DS_Store')).map(filename => ({

    timeToRead: timeRead(postMatter(filename).content),
    data: postMatter(filename).data,
    slug: 'blog/' + slug(filename)

  }))

  // 
  return {
    props: {
      posts: posts.sort((a, b) => dayjs(a.data.date, 'DD-MM-YY').date() + dayjs(b.data.date, 'DD-MM-YY').date())
    }
  }
};

export default Blog;