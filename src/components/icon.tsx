import { type ComponentProps, type ComponentType, type ReactElement } from 'react'
import * as PhosphorIcons from '@phosphor-icons/react/dist/ssr'

type IconName = keyof typeof PhosphorIcons

interface IconType {
  name: IconName
}

function isValidIcon(name: string): name is IconName {
  return name in PhosphorIcons
}

function Icon(props: IconType): ReactElement | null {
  if (!isValidIcon(props.name)) return null

  const IconComponent = PhosphorIcons[props.name] as ComponentType<
    Omit<ComponentProps<(typeof PhosphorIcons)[IconName]>, 'weights'>
  >

  return <IconComponent size={32} weight="duotone" />
}

export { Icon }
