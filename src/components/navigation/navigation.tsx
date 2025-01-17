import { type ReactElement } from 'react'
import { NavigationClient } from '@/components/navigation/navigationClient'
import { payload } from '@/util/getPayloadConfig'

async function Navigation(): Promise<ReactElement> {
  const navigation = await payload.findGlobal({
    slug: 'siteSettings',
    depth: 1,
  })

  return <NavigationClient {...navigation.navigation} />
}

export { Navigation }
