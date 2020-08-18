
import { Box, Center, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/core";
import fs from "fs";
import matter from 'gray-matter';
import Link from "next/link";
import path from "path";
import timeRead from 'read-time';
import slug from 'slug';
import SEO from "../../src/components/seo";
import PageHeader from "../../src/components/ui/page-header";
import { Fragment } from "react";


function Blog({ posts }) {
  const description = useColorModeValue('gray.700', 'gray.400')
  const titleC = useColorModeValue('black', 'gray.300')

  return (
    <Fragment>
      <SEO title='Blog Posts' />

      <Box p={3}>
        <PageHeader title='Thoughts' />
        {posts.map((post) => {

          const { title, author } = post.data

          return (
            <Center key={title} width={['', '', 800]} mx='auto'>
              <Link href={post.slug}>

                <Flex justify='space-around' direction='column' p={6} max>
                  <Heading fontWeight={500} mb={4} fontSize={30} color={titleC}>{title}</Heading>

                  <Text color={description} fontSize={17} mb={4}>{post?.excerpt}</Text>

                  <Flex justify='space-between' alignItems='center'>
                    {/* <AuthorCard author={author} /> */}
                    <Text color='green.500' fontSize={14} rounded='lg' >{post?.timeToRead.m}  min read</Text>
                  </Flex>
                </Flex>

              </Link>
            </Center>
          )
        })}
      </Box>

    </Fragment>
  )
}




export const getStaticProps = async () => {
  const files = fs.readdirSync("posts");

  const postMatter = (file) => matter(fs.readFileSync(path.join("posts", file, 'blog' + ".mdx"))
    .toString())

  const posts = files.filter(name => !name.includes('.DS_Store')).map(filename => {

    return {
      blog: postMatter(filename).content,
      timeToRead: timeRead(postMatter(filename).content),
      data: postMatter(filename).data,
      excerpt: postMatter(filename).content.slice(0, 200) + '...',
      slug: 'blog/' + slug(filename).replace(/[0-9]-/gm, '')
    }
  })

  return {
    props: { posts, }
  };
};

export default Blog;