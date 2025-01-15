'use client'

import { type ReactElement } from 'react'
import Link from 'next/link'
import { GithubLogo } from '@phosphor-icons/react'
import { type Footer, type Page } from '@/payload-types'

function FooterClient(props: Footer): ReactElement {
  return (
    <footer>
      <div className="container border-t-2 border-l-2 border-r-2 border-black">
        <div className="grid md:grid-cols-3">
          <div className="space-y-4 border-r-2 border-black pt-4 pb-8">
            <div className="flex items-center gap-2 text-3xl">
              <span className="font-bold">Frontend Observer</span>
            </div>
            <p className="max-w-xs pb-8">
              Keeping an eye on the latest frontend development trends and best practices.
            </p>
            <p className="max-w-xs">
              Created by{' '}
              <Link href="https://patrickroelofs.com" target="_blank" className="hover:underline">
                Patrick Roelofs
              </Link>{' '}
              ❤️.
            </p>
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
              {props.links?.map((link) => {
                const { title, slug } = link.link as Page

                return (
                  <Link
                    href={slug === 'home' ? '/' : slug}
                    className="hover:underline text-lg p-4"
                    key={title}
                  >
                    {title}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FooterClient }
