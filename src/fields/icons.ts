import { deepMerge, type Field } from 'payload'
import { icons } from '@phosphor-icons/core'

type IconField = (overrides?: Partial<Field>) => Field

const iconField: IconField = (overrides = {}) =>
  deepMerge(
    {
      name: 'icon',
      label: 'Icon',
      type: 'select',
      interfaceName: 'Icons',
      options: icons.map((icon) => icon.pascal_name),
      required: true,
    },
    overrides,
  )

export { iconField }
