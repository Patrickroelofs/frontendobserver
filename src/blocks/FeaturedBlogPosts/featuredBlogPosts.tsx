import { type ReactElement } from 'react'
import { payload } from '@/util/getPayloadConfig'
import { type FeaturedBlogPostsType } from '@/payload-types'
import { FeaturedBlogPostsClient } from '@/blocks/FeaturedBlogPosts/featuredBlogPostsClient'

async function FeaturedBlogPosts(props: FeaturedBlogPostsType): Promise<ReactElement> {
  const blogPosts = await payload.find({
    collection: 'blog',
    limit: props.limit ?? 3,
    where: {
      featured: {
        equals: true,
      },
    },
  })

  return <FeaturedBlogPostsClient {...blogPosts} />
}

export { FeaturedBlogPosts }
