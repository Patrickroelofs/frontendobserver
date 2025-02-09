'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import React, { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import { env } from '../../env'

function RefreshRouteOnSave(): ReactElement {
  const router = useRouter()

  return (
    <PayloadLivePreview
      refresh={() => {
        router.refresh()
      }}
      serverURL={`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`}
    />
  )
}

export { RefreshRouteOnSave }
