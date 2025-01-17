import Link from 'next/link'
import { type ReactElement } from 'react'
import { type SiteSetting } from '@/payload-types'
import { EyeBalls } from '@/components/navigation/eyeBalls'

function NavigationClient(props: SiteSetting['navigation']): ReactElement {
  return (
    <nav className="sticky top-0 mt-12 z-50">
      <div className="relative container mx-auto grid grid-cols-3 border-2 bg-ginger border-black py-4 items-center">
        <div>
          <Link href="/" className="text-2xl font-bold">
            Frontend Observer
          </Link>
        </div>
        <div className="flex justify-center">
          <EyeBalls />
        </div>
        <div className="flex justify-end">
          <ul className="flex space-x-6">
            {props.links.map((item) => {
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
      </div>
    </nav>
  )
}

export { NavigationClient }
