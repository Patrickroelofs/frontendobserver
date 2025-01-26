import { type Buffer } from 'node:buffer'
import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

interface RequestBody {
  image: Buffer
  filename: string
  showcaseID: string
}

async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const requestBody = (await req.json()) as RequestBody

    const payload = await getPayload({
      config,
    })

    const createdWorkflow = await payload.jobs.queue({
      workflow: 'createAndUpdateMediaWorkflow',
      input: {
        showcaseID: requestBody.showcaseID,
        buffer: requestBody.image.toString('base64'),
        filename: requestBody.filename,
      },
    })

    await payload.jobs.runByID({
      id: createdWorkflow.id,
    })

    return NextResponse.json({
      message: 'Media created',
      job: createdWorkflow,
      status: 200,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json({
      message: 'Internal server error',
      error: errorMessage,
      status: 500,
    })
  }
}

export { POST }
