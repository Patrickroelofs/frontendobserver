'use client'

import Link from 'next/link'
import { type ReactElement } from 'react'
import { type SiteSetting } from '@/payload-types'

function NavigationClient(props: SiteSetting['navigation']): ReactElement {
  return (
    <nav className="sticky top-0 mt-12 z-50">
      <div className="container mx-auto flex justify-between items-center border-2 bg-ginger border-black py-4">
        <Link href="/" className="text-2xl font-bold flex gap-2 items-center">
          <span className="text-4xl leading-none">👀</span> Frontend Observer
        </Link>
        <ul className="flex space-x-6">
          {props?.links?.map((item) => {
            return (
              <li key={item.id}>
                <Link href={item.link} className="text-xl font-bold">
                  {item.label}
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
