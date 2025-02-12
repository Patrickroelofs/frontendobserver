import { type ReactElement } from 'react'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { type Media } from '@/payload-types'

type ImageProps = {
  media: Media | number
} & Omit<NextImageProps, 'src' | 'alt'>

function Image(props: ImageProps): ReactElement {
  const { media } = props

  if (typeof media === 'number') {
    // TODO: Handle when image is an id reference to the Media Collection
    throw new Error('Image media is not defined')
  }

  return (
    <NextImage
      blurDataURL={media.blurData ?? ''}
      src={media.url ?? ''}
      alt={media.alt}
      {...props}
    />
  )
}

export { Image }
