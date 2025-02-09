import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string().min(1),
    PAYLOAD_SECRET: z.string().min(1),
    BLOB_READ_WRITE_TOKEN: z.string().min(1),
  },
  clientPrefix: '',
  client: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
