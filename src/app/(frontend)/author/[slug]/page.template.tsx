import { type ReactElement } from 'react'
import Image from 'next/image'
import { type Author, type Media } from '@/payload-types'

interface AuthorProps {
  page: Author
}

function AuthorTemplate(props: AuthorProps): ReactElement {
  const { name } = props.page
  const { image } = props.page as {
    image: Media | null
  }
  return (
    <header>
      {image ? (
        <div className="relative w-full h-[240px] md:h-[580px]">
          <Image
            placeholder="blur"
            className="object-cover bg-center pixelated"
            src={image.url ?? ''}
            blurDataURL={image.blurData ?? ''}
            alt={image.alt}
            fill
            priority
          />
        </div>
      ) : null}
      <h2 className="text-5xl font-bold py-8 px-4 md:px-0 md:max-w-[75%] mx-auto leading-snug">
        {name}
      </h2>
    </header>
  )
}

export { AuthorTemplate }
