'use client'

import { type ReactElement } from 'react'
import Link from 'next/link'
import { GithubLogo } from '@phosphor-icons/react'
import { type SiteSetting } from '@/payload-types'
import { RichText } from '@/components/richText'

function FooterClient(props: SiteSetting['footer']): ReactElement {
  return (
    <footer>
      <div className="container border-t-2 border-l-2 border-r-2 border-black">
        <div className="grid md:grid-cols-3">
          <div className="space-y-4 border-r-2 border-black pt-4 pb-8">
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

          <div className="border-black">
            <nav className="flex flex-col text-sm">
              {props.links.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="font-bold hover:underline text-lg p-4"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FooterClient }
