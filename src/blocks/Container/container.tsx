import { type ReactElement } from 'react'
import { cva } from 'class-variance-authority'
import { type ContainerType } from '@/payload-types'
import { Blocks } from '@/blocks/blocks'

const ContainerStyling = cva(['container'], {
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

function Container(props: ContainerType): ReactElement {
  return (
    <section
      className={ContainerStyling({
        spacing: props.spacing,
      })}
    >
      <Blocks blocks={props.blocks} />
    </section>
  )
}

export { Container }
