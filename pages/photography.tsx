import React, { useEffect, useState } from 'react'
import { Box, Container, Heading, Img, SimpleGrid, Text } from '@chakra-ui/react'
import PageHeader from '@components/page-header'
import { Photos } from 'models/photos'
import { Plock } from 'react-plock'
import SEO from '@components/seo'
import Masonry from 'react-masonry-css'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

interface Props {
  photos: Photos[]
}

const isBrowser = () => typeof window !== 'undefined'

function Photography({ photos }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState([])

  const zoomIn = (index) => {
    setIsOpen(true)
    setPhotoIndex(index)
  }

  useEffect(() => {
    console.log({ images })
    photos.forEach((phone) => setImages((prev) => [...prev, phone.urls.full]))
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
          <Box mr={{ sm: 0, md: 4 }} mb={4}>
            <Img
              src={phone.urls.regular}
              key={phone.id}
              objectFit={'cover'}
              cursor={'zoom-in'}
              onClick={() => zoomIn(i)}
            />
          </Box>
        ))}
      </Masonry>

      {isOpen && (
        <Lightbox
          imageCaption='Hello'
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}
    </Container>
  )
}

export async function getServerSideProps() {
  const clientID = process.env.UNSPLASH_ID
  const req = await fetch(`https://api.unsplash.com/users/kennymark/photos?client_id=${clientID}`)
  const photos = await req.json()

  return {
    props: { photos },
  }
}
export default Photography
