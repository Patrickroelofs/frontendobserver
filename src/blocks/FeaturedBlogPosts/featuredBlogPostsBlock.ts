import type { Block } from 'payload'

export const FeaturedBlogPostsBlock: Block = {
  slug: 'FeaturedBlogPosts',
  labels: {
    plural: 'Featured Blog Posts',
    singular: 'Featured Blog Posts',
  },
  interfaceName: 'FeaturedBlogPostsType',
  fields: [
    {
      name: 'limit',
      label: 'Limit',
      type: 'number',
      defaultValue: 3,
    },
  ],
}
