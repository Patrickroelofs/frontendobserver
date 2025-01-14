import { type Block } from 'payload'
import { SimpleText } from '@/blocks/simpleText'
import { spacingField } from '@/fields/spacing'

const Container: Block = {
  slug: 'Container',
  interfaceName: 'ContainerType',
  fields: [
    spacingField(),
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      blocks: [SimpleText],
    },
  ],
}

export { Container }
