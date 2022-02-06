import { Box, Container, Img, Text } from '@chakra-ui/react'
import PageHeader from '@components/page-header'
import SEO from '@components/seo'
import { Photos } from 'models/photos'
import React, { useEffect, useState } from 'react'
import ReactBnbGallery from 'react-bnb-gallery'
import 'react-bnb-gallery/dist/style.css'
import Masonry from 'react-masonry-css'

interface Props {
  photos: Photos[]
  images: SingleImage[]
}

function Photography({ photos, images }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const zoomIn = (index) => {
    setIsOpen(true)
    setPhotoIndex(index)
  }

  useEffect(() => {
    console.log({ images })

    return () => {}
  }, [])

  return (
    <Container maxW={'8xl'}>
      <PageHeader title='Photos' />
      <SEO title='Photos' />

      <Text mb={8}>
        I am a hobbyist photography who enjoys taking photos of events, architecture, places and
        people around me.
      </Text>

      <Masonry
        className='my-masonry-grid '
        breakpointCols={{ default: 3, 800: 2, 600: 1 }}
        cellPadding={4}
        columnClassName='my-masonry-grid_column'>
        {photos.map((phone, i) => (
          <Box mr={{ sm: 0, md: 4 }} mb={4} key={phone.id}>
            <Img
              src={phone.urls.regular}
              objectFit={'cover'}
              cursor={'zoom-in'}
              onClick={() => zoomIn(i)}
            />
          </Box>
        ))}
      </Masonry>

      <ReactBnbGallery
        show={isOpen}
        photos={images}
        onClose={() => setIsOpen(false)}
        activePhotoIndex={photoIndex}
        backgroundColor='black'
        opacity={0.94}
      />
    </Container>
  )
}

interface SingleImage {
  photo: string
  number: number
  caption: string
  thumbnail: string
}
export async function getStaticProps() {
  const clientID = process.env.UNSPLASH_ID

  const req = await fetch(
    `https://api.unsplash.com/users/kennymark/photos?client_id=${clientID}&per_page=100`
  )
  const photos: Photos[] = await req.json()
  const images = []

  photos.forEach((phone, i) =>
    images.push({
      photo: phone.urls.regular,
      number: i,
      caption: phone.description,
      thumbnail: phone.urls.small,
    })
  )

  return {
    props: { photos, images },
  }
}
export default Photography
