import { type ReactElement } from 'react'
import Link from 'next/link'
import { type Author as AuthorType } from '@/payload-types'
import { Image } from '@/components/image'

function Author(props: AuthorType): ReactElement {
  const { name, slug, shortBio, image } = props

  return (
    <Link href={`/author/${slug}`} className="flex flex-row gap-4 items-center text-lg">
      {image ? (
        <Image media={image} width={85} height={85} />
      ) : (
        <div className="w-[85px] h-[85px] font-bold text-black flex items-center text-6xl justify-center">
          {name[0]}
        </div>
      )}
      <p>
        <span className="font-bold">{name}</span>
        <span className="block text-sm">{shortBio}</span>
      </p>
    </Link>
  )
}

export { Author }
