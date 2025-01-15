import type { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Blog, BlogListType, Media } from '@/payload-types'

function BlogList(props: BlogListType): ReactElement {
  const { posts } = props as {
    posts: Blog[]
  }
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4">
      {posts.map((post) => {
        const { coverImage } = post as {
          coverImage: Media
        }

        return (
          <article key={post.id} className="border-2 border-black">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative w-full h-56 border-b-2 border-black">
                <Image
                  fill
                  src={coverImage.url ?? ''}
                  alt={coverImage.alt}
                  className="object-cover object-center"
                />
              </div>
              <div className="p-2">
                <h2 className="text-lg font-medium mb-2">{post.name}</h2>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

export { BlogList }
