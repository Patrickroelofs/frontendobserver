import { type ReactElement } from 'react'
import { type SimpleTextType } from '@/payload-types'

function SimpleText(props: SimpleTextType): ReactElement {
  return <p>{props.text}</p>
}

export { SimpleText }
