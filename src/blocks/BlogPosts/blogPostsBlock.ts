import type { Block } from 'payload'

export const BlogPostsBlock: Block = {
  slug: 'BlogPosts',
  labels: {
    plural: 'Blog Posts',
    singular: 'Blog Posts',
  },
  interfaceName: 'BlogPostsType',
  fields: [
    {
      name: 'onlyFeatured',
      label: 'Only show Featured',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'limit',
      label: 'Limit',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'paginate',
      label: 'Paginate',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
