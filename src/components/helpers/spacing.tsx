import { type ReactElement } from 'react'
import { cva } from 'class-variance-authority'

const spacingStyling = cva([''], {
  variants: {
    spacing: {
      '': '',
      'py-4': 'py-4',
      'py-8': 'py-8',
      'py-16': 'py-16',
      'py-24': 'py-24',
      'py-32': 'py-32',
      'py-48': 'py-48',
      'py-64': 'py-64',
    },
  },
})

interface SpacingType {
  children: ReactElement
  spacing: 'py-4' | 'py-8' | 'py-16' | 'py-24' | 'py-32' | 'py-48' | 'py-64' | ''
}

function Spacing(props: SpacingType): ReactElement {
  return (
    <div
      className={spacingStyling({
        spacing: props.spacing,
      })}
    >
      {props.children}
    </div>
  )
}

export { Spacing }
