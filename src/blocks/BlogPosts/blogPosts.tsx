import { type ReactElement } from 'react'
import { payload } from '@/util/getPayloadConfig'
import { type BlogPostsType } from '@/payload-types'
import { BlogPostsClient } from '@/blocks/BlogPosts/blogPostsClient'

async function BlogPosts(props: BlogPostsType): Promise<ReactElement> {
  const blogPosts = await payload.find({
    collection: 'blog',
    limit: props.limit === 0 ? undefined : props.limit,
    where: {
      featured: {
        equals: true,
      },
      state: {
        equals: 'published',
      },
    },
  })

  return <BlogPostsClient {...blogPosts} />
}

export { BlogPosts }
