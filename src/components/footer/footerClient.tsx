import React, { type ReactElement } from 'react'
import Link from 'next/link'
import { GithubLogo } from '@phosphor-icons/react/dist/ssr'
import { type SiteSetting } from '@/payload-types'
import { RichText } from '@/blocks/RichText/richText'

function FooterClient(props: SiteSetting['footer']): ReactElement {
  return (
    <footer>
      <div className="container border-t-2 border-l-2 border-r-2 border-black">
        <div className="grid md:grid-cols-3">
          <div className="space-y-4 border-r-2 border-black p-4 max-w-sm">
            <RichText blockType="RichText" richText={props.text} />
            <nav className="flex flex-row gap-4">
              <Link
                href="https://github.com/Patrickroelofs"
                target="_blank"
                className="hover:underline inline-flex text-lg items-center gap-2"
              >
                <GithubLogo size={36} />
                <span className="sr-only">GitHub</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FooterClient }
