
import { Box, Container, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import AuthorCard from '@components/blog/author-card';
import PageHeader from '@components/page-header';
import SEO from '@components/seo';
import matter from 'gray-matter';
import { ago } from 'lib/dateFormat';
import { getAllArticles } from 'lib/devblog';
import Link from "next/link";
import { Fragment } from "react";
import timeRead from 'read-time';
import NewsLetterForm from '@components/newsletter-form'


function Blog({ posts }) {
  const tone = useColorModeValue('gray.900', 'gray.600')
  const titleC = useColorModeValue('black', 'gray.300')

  return (
    <Fragment>
      <SEO title='Blog Posts' />

      <Container p={3} maxW='4xl'>
        <PageHeader title='Thoughts' />

        {posts.map((post) => {
          const { title, description } = post.data

          return (
            <Box key={title} mx='auto' cursor='pointer' mb={10}>
              <Link href={post.slug.replace('.mdx', '')}>

                <Flex direction='column' >


                  <Heading fontWeight={900} mb={4} fontSize={{ lg: "4xl", base: "2xl" }} color={titleC} >{title}</Heading>

                  <Text color="gray.600" fontSize="lg" mb={4} >{description}</Text>

                  <Flex fontSize="sm" >
                    <AuthorCard author="Kenneth Coffie" withAvatar={false} mr={3} color={tone} fontWeight='bold' />

                    <Text rounded='lg' mr={3} color='gray.400'>{post?.timeToRead.m + 1}  min read</Text>
                    <Text color='gray.400' fontSize='sm' fontStyle="italic">{ago(post.date)}</Text>
                  </Flex>

                </Flex>

              </Link>
            </Box>
          )
        })}
      </Container>
      <NewsLetterForm />
    </Fragment >
  )
}




export const getStaticProps = async () => {

  const articles = await getAllArticles()

  const posts = articles.map(post => {
    return {
      timeToRead: timeRead(post.markdown),
      data: matter(post.markdown).data,
      slug: 'blog/' + post.devToSlug,
      date: post.publishedAt,
    }
  })

  return {
    revalidate: 1,

    props: { posts }
  }
};

export default Blog;