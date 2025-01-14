import { type ReactElement } from 'react'
import { type Blog } from '@/payload-types'

interface BlogProps {
  page: Blog
}

function BlogTemplate(props: BlogProps): ReactElement {
  return <p>Blog: {props.page.name}</p>
}

export { BlogTemplate }
