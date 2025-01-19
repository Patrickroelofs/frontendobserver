import React, { type ReactElement } from 'react'
import Link from 'next/link'
import { type SiteSetting } from '@/payload-types'
import { RichText } from '@/blocks/RichText/richText'
import { Icon } from '@/blocks/Icon/icon'

function FooterClient(props: SiteSetting['footer'] & SiteSetting['social']): ReactElement {
  return (
    <footer>
      <div className="container border-t-2 border-l-2 border-r-2 border-black">
        <div className="grid md:grid-cols-3">
          <div className="space-y-4 border-r-2 border-black p-4">
            <RichText blockType="RichText" richText={props.text} />
            <nav className="flex flex-row gap-4">
              {props.socialMedia?.map((item) => (
                <Link
                  key={item.id}
                  href={item.link ?? ''}
                  target="_blank"
                  className="hover:underline inline-flex text-lg items-center gap-2"
                >
                  <Icon name={item.icon} />
                  <span className="sr-only">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="relative overflow-clip col-span-2">
            <ul className="flex flex-col m-4 gap-2 mb-36">
              {props.links.map((item) => {
                return (
                  <li key={item.id}>
                    <Link href={item.link} className="text-2xl font-bold">
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Link
              href="#"
              className="text-4xl xl:text-6xl 2xl:text-8xl absolute -bottom-2 left-0 font-black"
            >
              Frontend Observer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FooterClient }
