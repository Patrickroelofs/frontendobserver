import { type ReactElement } from 'react'
import { type Showcase } from '@/payload-types'

interface ShowcaseProps {
  page: Showcase
}

function ShowcaseTemplate(props: ShowcaseProps): ReactElement {
  return <p>Showcase: {props.page.name}</p>
}

export { ShowcaseTemplate }
