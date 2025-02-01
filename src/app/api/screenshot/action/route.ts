import { type NextRequest, NextResponse } from 'next/server'

interface DispatchRequestBody {
  event_type: string
  client_payload: {
    url: string
    showcaseID: string
  }
}

async function POST(req: NextRequest): Promise<NextResponse> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  if (!GITHUB_TOKEN) {
    return NextResponse.json({
      message: 'GitHub token not found in environment variables',
      status: 500,
    })
  }

  try {
    const body = (await req.json()) as DispatchRequestBody

    const response = await fetch(
      `https://api.github.com/repos/patrickroelofs/frontendobserver/dispatches`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: body.event_type,
          client_payload: {
            url: body.client_payload.url,
            showcaseID: body.client_payload.showcaseID,
            API_SECRET: process.env.API_SECRET,
          },
        }),
      },
    )

    if (!response.ok) {
      return NextResponse.json({
        message: 'Failed to dispatch screenshot request',
        status: response.status,
      })
    }

    return NextResponse.json({
      message: 'Screenshot request dispatched',
      status: response.status,
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
