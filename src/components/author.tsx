import { type ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Author as AuthorType, type Media } from '@/payload-types'

function Author(props: AuthorType): ReactElement {
  const { name, slug } = props
  const { image } = props as {
    image: Media
  }

  return (
    <Link href={`/author/${slug}`} className="flex gap-4 items-center font-bold text-lg">
      <Image src={image.url ?? ''} alt={image.alt} width={85} height={85} />
      <p>{name}</p>
    </Link>
  )
}

export { Author }
