import { chakra, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import MetricCard from '@components/metric-card'
import PageHeader from '@components/page-header'
import Track from '@components/track'
import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { Tidal } from 'lib/tidal'
import { cacheTracks } from 'lib/cachedTracks'
import SEO from '@components/seo'


function Dashboard({ tracks }) {
  const { data: devto } = useSWR('api/dashboard/dev', (url) => axios.get(url))
  const { data: git } = useSWR('api/dashboard/github', (url) => axios.get(url), {
    initialData: { data: { stars: 0 } }
  })
  console.log(cacheTracks)


  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>

      <SEO title='Dashboard' description='Keep in touch with my personal stats' />

      <chakra.div p={{ base: 4, lg: 8 }}>
        <PageHeader title='Dashboard' />
        <Text mb={8}>Keeping track of some of the most important metrics in my dev life.</Text>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          <MetricCard title='Articles View Count' number={devto?.data.total} />
          <MetricCard title='Articles Likes' number={devto?.data.likes} />
          <MetricCard title='Github Stars' number={git?.data?.stars} />
          <MetricCard title='Github Stars' number={git?.data?.stars} />

        </SimpleGrid>

      </chakra.div>

      <chakra.div p={{ base: 4, lg: 8 }} rounded='lg'>
        <Heading >Top Tracks</Heading>

        <Text my={8}>Here are some of the songs I listen to the most from Tidal. Tracks are being pulled by reverse engineering the Tidal API which isn't public yet.</Text>

        {cacheTracks.map(track => (
          <Track title={track.item.title}
            artist={track.item.artist.name}
            album={track.item.album.cover}
            url={track.item.url}
            key={track.created} />
        ))}
      </chakra.div>




    </ SimpleGrid>
  )
}

export default Dashboard


export const getStaticProps = () => {
  const { TIDAL_EMAIL: username, TIDAL_PASS: password } = process.env

  // const api = new Tidal({ username, password, });
  // async function main() {
  //   // const info = await api.getUser("174928383");
  //   const res = await api.getMyFavTracks()
  //   console.log(res)
  // };

  const tracks = cacheTracks
  // main()

  return {
    props: { tracks }
  }
}