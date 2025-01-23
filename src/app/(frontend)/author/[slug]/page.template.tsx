import { type ReactElement } from 'react'
import Image from 'next/image'
import { type Author, type Media } from '@/payload-types'
import { RichText } from '@/blocks/RichText/richText'

interface AuthorProps {
  page: Author
}

function AuthorTemplate(props: AuthorProps): ReactElement {
  const { name } = props.page
  const { coverImage, image } = props.page as {
    coverImage: Media | null
    image: Media | null
  }

  return (
    <>
      <header>
        {coverImage ? (
          <div className="relative w-full h-[240px] md:h-[580px]">
            <Image
              placeholder="blur"
              className="object-cover bg-center"
              src={coverImage.url ?? ''}
              blurDataURL={coverImage.blurData ?? ''}
              alt={coverImage.alt}
              fill
              priority
            />
          </div>
        ) : null}
        <h2 className="text-3xl font-bold py-8 px-4 md:px-0 md:max-w-[75%] mx-auto leading-snug flex gap-4 items-center">
          {image ? (
            <div className="w-[94px] h-[94px] relative">
              <Image src={image.url ?? ''} alt={image.alt} fill className="block" />
            </div>
          ) : null}
          <span>{name}</span>
        </h2>
      </header>
      <main className="container pb-12">
        <RichText blockType="RichText" richText={props.page.bio} />
      </main>
    </>
  )
}

export { AuthorTemplate }
