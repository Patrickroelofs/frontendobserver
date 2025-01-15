import { type Block } from 'payload'
import { RichText } from '@/blocks/richText'
import { spacingField } from '@/fields/spacing'
import { BlogList } from '@/blocks/blogList'
import { Code } from '@/blocks/code'

const Container: Block = {
  slug: 'Container',
  interfaceName: 'ContainerType',
  fields: [
    spacingField(),
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      blocks: [RichText, BlogList, Code],
    },
  ],
}

export { Container }
