import { type ReactElement } from 'react'
import * as PhosphorIcons from '@phosphor-icons/react/dist/ssr'

interface IconType {
  name: unknown
}

function Icon(props: IconType): ReactElement | null {
  // @ts-expect-error - we're using the name prop to dynamically select the icon
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- we're using the name prop to dynamically select the icon
  const IconComponent = PhosphorIcons[props.name as string]

  if (!IconComponent) {
    return null
  }

  return <IconComponent size={32} />
}

export { Icon }
