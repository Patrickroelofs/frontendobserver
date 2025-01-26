import { type Buffer } from 'node:buffer'
import { type NextRequest, NextResponse } from 'next/server'

interface RequestBody {
  image: Buffer
  filename: string
}

async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const requestBody = (await req.json()) as RequestBody

    console.log(requestBody)

    return NextResponse.json({
      message: 'Media created',
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
