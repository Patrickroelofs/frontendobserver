import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string().min(1),
    PAYLOAD_SECRET: z.string().min(1),
    BLOB_READ_WRITE_TOKEN: z.string().min(1),
    VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1),
  },
  clientPrefix: 'NEXT_PUBLIC_',
  client: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
