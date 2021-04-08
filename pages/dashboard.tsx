import { chakra, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import MetricCard from '@components/metric-card'
import PageHeader from '@components/page-header'
import SEO from '@components/seo'
import Track from '@components/track'
import axios from 'axios'
import { TrackResult } from 'interfaces/Tidal'
import Tidal from 'lib/tidal'
import React from 'react'
import useSWR from 'swr'


interface DashboardProps {
  tracks: TrackResult
}

const get = async (url) => await axios.get(url)

function Dashboard({ tracks }: DashboardProps) {
  const { data: devto, } = useSWR('api/dashboard/dev', get)
  const { data: subscribers } = useSWR('api/dashboard/subscribers', get)
  const { data: git } = useSWR('api/dashboard/github', get, {
    errorRetryCount: 4,
  })

  return (

    <Container maxW="8xl" >
      <SEO title='Dashboard' description='Keep in touch with my personal stats' />

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>


        <chakra.div p={{ base: 4, lg: 8 }}>
          <PageHeader title='Dashboard' />
          <Text mb={8}>Keeping track of some of the most important metrics in my dev life.</Text>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
            <MetricCard title='Articles View Count' number={devto?.data.total} />
            <MetricCard title='Articles Likes' number={devto?.data.likes} />
            <MetricCard title='Github Stars' number={git?.data?.stars} />
            <MetricCard title='NewsLetter Subscribers' number={subscribers?.data.count} />

          </SimpleGrid>

        </chakra.div>

        <chakra.div p={{ base: 4, lg: 8 }} rounded='lg'>
          <Heading >Top Tracks</Heading>

          <Text my={8}>Here are some of the songs I listen to the most from Tidal. Tracks are being pulled by reverse engineering the Tidal API which isn't public yet.</Text>

          {tracks.items.map(track => (
            <Track title={track.item.title}
              artist={track.item.artist.name}
              album={track.item.album.cover}
              url={track.item.url}
              key={track.created} />
          ))}
        </chakra.div>


      </ SimpleGrid>

    </Container>
  )
}

export default Dashboard


export const getStaticProps = async () => {

  const { TIDAL_PASS: password, TIDAL_EMAIL: username } = process.env

  const tidal = new Tidal({ username, password })

  return {
    props: {
      revalidate: 60 * 60,
      tracks: await tidal.getMyFavTracks()
    }
  }
}