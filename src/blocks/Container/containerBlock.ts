import { type Block } from 'payload'
import { RichTextBlock } from '@/blocks/RichText/richTextBlock'
import { spacingField } from '@/fields/spacing'
import { BlogListBlock } from '@/blocks/BlogList/blogListBlock'
import { CodeBlock } from '@/blocks/Code/codeBlock'

const ContainerBlock: Block = {
  slug: 'Container',
  interfaceName: 'ContainerType',
  fields: [
    spacingField(),
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      blocks: [RichTextBlock, BlogListBlock, CodeBlock],
    },
  ],
}

export { ContainerBlock }
