import type { Block } from 'payload'
import { FeaturedBlogPostsBlock } from '@/blocks/FeaturedBlogPosts/featuredBlogPostsBlock'

export const TitleWithBlocksBlock: Block = {
  slug: 'TitleWithBlocks',
  interfaceName: 'TitleWithBlocksType',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      required: true,
      blocks: [FeaturedBlogPostsBlock],
    },
    {
      label: 'button',
      type: 'collapsible',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
