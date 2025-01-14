import { type ReactElement } from 'react'
import { draftMode } from 'next/headers'
import { type Metadata } from 'next'
import { type Blog } from '@/payload-types'
import { payload } from '@/util/getPayloadConfig'
import { BlogTemplate } from '@/app/(frontend)/blog/[slug]/page.template'

async function Page({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params

  let page: Blog | null = null

  try {
    page = await payload
      .find({
        collection: 'blog',
        draft,
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })
      .then((result) => {
        if (result.docs.length === 0) {
          return null
        }

        return result.docs[0] ?? null
      })

    if (!page) return <p>404</p>

    return <BlogTemplate page={page} />
  } catch (error) {
    return <p>500</p>
  }
}

export async function generateStaticParams() {
  try {
    const pages = await payload
      .find({
        collection: 'blog',
      })
      .then((result) => {
        if (result.docs.length === 0) {
          return null
        }

        return result.docs
      })

    if (!pages) {
      return {
        paths: [],
      }
    }

    return pages.map((page) => ({
      slug: page.slug,
    }))
  } catch (error) {
    return {
      paths: [],
    }
  }
}

export function generateMetadata(): Metadata {
  return {}
}

export default Page
