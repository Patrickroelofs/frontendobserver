import { type ReactElement } from 'react'
import Image from 'next/image'
import { type Blog, type Media } from '@/payload-types'
import { Blocks } from '@/blocks/blocks'
import { Author } from '@/components/author'

interface BlogProps {
  page: Blog
}

function BlogTemplate(props: BlogProps): ReactElement {
  const { name, blocks, authors } = props.page
  const { coverImage } = props.page as {
    coverImage: Media
  }

  return (
    <div>
      <header className="border-b-2 border-black">
        <div className="relative w-full h-[240px] md:h-[580px]">
          <Image
            placeholder="blur"
            className="object-cover bg-center pixelated"
            src={coverImage.url ?? ''}
            blurDataURL={coverImage.blurData ?? ''}
            alt={coverImage.alt}
            fill
            priority
          />
        </div>
        <h2 className="text-5xl font-bold my-8 px-4 md:px-0 md:max-w-[75%] mx-auto leading-snug">
          {name}
        </h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-none">
        <div className="row-start-2 md:row-start-auto md:col-start-1 md:col-end-3 md:border-r-2 border-black p-4 flex justify-center flex-col">
          <Blocks blocks={blocks} />
        </div>
        <div className="row-start-1 md:row-start-none md:col-start-3 md:col-end-3">
          <div className="border-b-2 border-black sticky top-[67px]">
            {authors.map((author) => {
              if (typeof author === 'number') return null

              return <Author key={author.id} {...author} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export { BlogTemplate }
