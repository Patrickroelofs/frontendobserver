import { type ReactElement } from 'react'
import { type PaginatedDocs } from 'payload'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowBendDownRight } from '@phosphor-icons/react/dist/ssr'
import { type Blog, type Media } from '@/payload-types'

function BlogPostsClient(props: PaginatedDocs<Blog>): ReactElement {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {props.docs.map((post) => {
        const { coverImage } = post as {
          coverImage: Media
        }

        return (
          <article key={post.id} className="border-2 border-black group">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative w-full h-56">
                <Image
                  fill
                  src={coverImage.url ?? ''}
                  alt={coverImage.alt}
                  className="object-cover object-center"
                />
                <div className="bg-black z-10 absolute bottom-4 py-1 px-2 text-white">
                  <span>Blog Article</span>
                </div>
              </div>
              <div className="p-4 pb-8">
                <h2 className="text-lg font-medium mb-2">{post.name}</h2>
                <p>{post.excerpt}</p>
              </div>
              <div className="bg-black text-white p-2 flex justify-end">
                <ArrowBendDownRight
                  size={32}
                  className="group-hover:scale-125 group-hover:rotate-12 transition-all ease-in-out duration-150"
                />
              </div>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

export { BlogPostsClient }
