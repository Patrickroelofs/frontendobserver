'use client'

import Link from 'next/link'
import { type ReactElement } from 'react'
import { type Navigation, type Page } from '@/payload-types'

function NavigationClient(props: Navigation): ReactElement {
  return (
    <nav className="sticky top-0 mt-12 z-50">
      <div className="container mx-auto flex justify-between items-center border-2 bg-ginger border-black py-4">
        <Link href="/" className="text-2xl font-bold flex gap-2 items-center">
          <span className="text-4xl leading-none">👀</span> Frontend Observer
        </Link>
        <ul className="flex space-x-6">
          {props.items?.map((item) => {
            const { title, slug } = item.link as Page

            return (
              <li key={title}>
                <Link href={slug === 'home' ? '/' : slug} className="text-xl font-bold">
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export { NavigationClient }
