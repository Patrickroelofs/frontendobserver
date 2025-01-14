import { type ReactElement } from 'react'
import { FooterClient } from '@/patterns/footer/footerClient'
import { payload } from '@/util/getPayloadConfig'

async function Footer(): Promise<ReactElement> {
  const footer = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })

  return <FooterClient {...footer} />
}

export { Footer }
