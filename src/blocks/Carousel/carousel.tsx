import { type ReactElement } from 'react'
import { type CarouselType } from '@/payload-types'
import { CarouselClient } from '@/blocks/Carousel/carouselClient'

function Carousel(props: CarouselType): ReactElement {
  return <CarouselClient {...props} />
}

export { Carousel }
