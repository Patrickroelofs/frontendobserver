import { type ReactElement } from 'react'
import { type Page } from '@/payload-types'
import { Blocks } from '@/components/blocks/blocks'

interface PageProps {
  page: Page
}

function PageTemplate(props: PageProps): ReactElement {
  return <Blocks blocks={props.page.blocks} />
}

export { PageTemplate }
