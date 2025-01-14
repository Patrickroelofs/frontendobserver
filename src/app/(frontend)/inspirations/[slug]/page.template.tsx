import { type ReactElement } from 'react'
import { type Inspiration } from '@/payload-types'

interface InspirationProps {
  page: Inspiration
}

function InspirationTemplate(props: InspirationProps): ReactElement {
  return <p>Hello World {props.page.name}</p>
}

export { InspirationTemplate }
