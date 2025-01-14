import { type ReactElement } from 'react'
import { type Author } from '@/payload-types'

interface AuthorProps {
  page: Author
}

function AuthorTemplate(props: AuthorProps): ReactElement {
  return <p>Author: {props.page.name}</p>
}

export { AuthorTemplate }
