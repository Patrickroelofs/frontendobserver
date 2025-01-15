import { type Block } from 'payload'

export const BlogList: Block = {
  slug: 'BlogList',
  interfaceName: 'BlogListType',
  fields: [
    {
      type: 'relationship',
      name: 'posts',
      label: 'Posts',
      relationTo: 'blog',
      hasMany: true,
    },
  ],
}
