import { type ReactElement } from 'react'
import { NavigationClient } from '@/patterns/navigation/navigationClient'
import { payload } from '@/util/getPayloadConfig'

async function Navigation(): Promise<ReactElement> {
  const navigation = await payload.findGlobal({
    slug: 'navigation',
    depth: 1,
  })

  return <NavigationClient {...navigation} />
}

export { Navigation }
