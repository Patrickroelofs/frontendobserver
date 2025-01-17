import { type Block } from 'payload'
import { grammars } from 'tm-grammars'
import { spacingField } from '@/fields/spacing'

export const CodeBlock: Block = {
  slug: 'Code',
  interfaceName: 'CodeType',
  fields: [
    spacingField(),
    {
      name: 'codeLanguage',
      label: 'Code Language',
      type: 'select',
      required: true,
      options: grammars.map((grammar) => ({
        label: grammar.displayName,
        value: grammar.name,
      })),
    },
    {
      name: 'code',
      label: 'Code',
      type: 'code',
      required: true,
    },
  ],
}
