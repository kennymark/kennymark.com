import { Box, chakra, Container, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import MetricCard from '@components/metric-card'
import PageHeader from '@components/page-header'
import SEO from '@components/seo'
import Track from '@components/track'
import axios from 'axios'
import { TrackResult } from 'interfaces/Tidal'
import cachedTracks from 'lib/cached-tracks'
import Tidal from 'lib/tidal'
import { UnsplashProfile } from 'models/unsplash.profile'
import React from 'react'
import useSWR from 'swr'

interface DashboardProps {
  tracks: TrackResult
  unsplashProfile: UnsplashProfile
}

const get = async (url: string) => await axios.get(url)

function Dashboard({ tracks, unsplashProfile }: DashboardProps) {
  const { data: devto } = useSWR('api/dashboard/dev', get)
  const { data: subscribers } = useSWR('api/dashboard/subscribers', get)
  const { data: git } = useSWR('api/dashboard/github', get, {
    errorRetryCount: 4,
  })

  return (
    <Container maxW='8xl'>
      <SEO title='Dashboard' description='Keep in touch with my personal stats' />
      <Flex>
        <PageHeader title='Dashboard' />
      </Flex>

      <SimpleGrid columns={{ sm: 1, md: 2 }} spacingX={{ lg: 4 }}>
        <Box>
          <Text mb={8}>Keeping track of some of the most important metrics in my dev life.</Text>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacingY={8} spacingX={4}>
            <MetricCard title='Articles View Count' number={devto?.data.total} />
            <MetricCard title='Articles Likes' number={devto?.data.likes} />
            <MetricCard title='Unsplash Views' number={unsplashProfile.views.total} />
            <MetricCard title='Unsplash Downloads' number={unsplashProfile.downloads.total} />
            <MetricCard title='Github Stars' number={git?.data?.stars} />
            <MetricCard title='NewsLetter Subscribers' number={subscribers?.data.count} />
          </SimpleGrid>
        </Box>

        <Box rounded='lg' pos={'relative'}>
          <Heading position={{ sm: 'relative', lg: 'absolute' }} top={{ sm: 0, md: -20 }}>
            Tracks
          </Heading>

          <Text>
            Here are some of the songs I listen to the most from Tidal. Tracks are being pulled by
            reverse engineering the Tidal API which isn't public yet.
          </Text>

          {tracks?.items.map((track) => (
            <Track
              title={track.item.title}
              artist={track.item.artist.name}
              album={track.item.album.cover}
              url={track.item.url}
              key={track.created}
            />
          ))}
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export const getServerSideProps = async () => {
  const id = process.env.UNSPLASH_ID
  const req = await fetch(`https://api.unsplash.com/users/kennymark/statistics?client_id=${id}`)
  const unsplashProfile = await req.json()

  const { TIDAL_PASS: password, TIDAL_EMAIL: username } = process.env

  const tidal = new Tidal({ username, password })
  let tracks

  try {
    tracks = await tidal.getMyFavTracks()
  } catch (error) {
    tracks = cachedTracks
  }

  return { props: { unsplashProfile, tracks } }
}

export default Dashboard
