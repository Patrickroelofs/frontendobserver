import { type ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Author as AuthorType, type Media } from '@/payload-types'

function Author(props: AuthorType): ReactElement {
  const { name, slug } = props
  const { image } = props as {
    image: Media | null
  }

  return (
    <Link href={`/author/${slug}`} className="flex gap-4 items-center font-bold text-lg">
      {image ? (
        <Image src={image.url ?? ''} alt={image.alt} width={85} height={85} />
      ) : (
        <div className="w-[85px] h-[85px] text-black flex items-center text-6xl justify-center">
          {name[0]}
        </div>
      )}
      <p>{name}</p>
    </Link>
  )
}

export { Author }
