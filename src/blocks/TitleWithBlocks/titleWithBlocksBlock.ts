import type { Block } from 'payload'
import { BlogPostsBlock } from '@/blocks/BlogPosts/blogPostsBlock'

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
      blocks: [BlogPostsBlock],
    },
    {
      label: 'button',
      type: 'collapsible',
      fields: [
        {
          name: 'showButton',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'buttonText',
          type: 'text',
          required: false,
          admin: {
            condition: (
              _,
              siblingData: Partial<{
                showButton: boolean
              }>,
            ): boolean => {
              return siblingData.showButton ?? false
            },
          },
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: false,
          admin: {
            condition: (
              _,
              siblingData: Partial<{
                showButton: boolean
              }>,
            ): boolean => {
              return siblingData.showButton ?? false
            },
          },
        },
      ],
    },
  ],
}
