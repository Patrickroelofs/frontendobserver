'use client'
import React, { type ReactElement, useCallback } from 'react'
import Link from 'next/link'
import { type SiteSetting } from '@/payload-types'
import { RichText } from '@/blocks/RichText/richText'
import { Icon } from '@/components/icon'
import { getNoteFrequency, playNote } from '@/util/audio'

function FooterClient(props: SiteSetting['footer'] & SiteSetting['social']): ReactElement {
  const handleMouseEnter = useCallback((index: number) => {
    playNote(getNoteFrequency(index))
  }, [])

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
          <div className="col-span-2 flex flex-col gap-16">
            <ul className="flex flex-col m-4 gap-2">
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
              className="text-4xl xl:text-6xl 2xl:text-8xl font-black text-center mb-6"
            >
              {Array.from('Frontend Observer').map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-300 ease-in-out hover:-translate-y-2"
                  onMouseEnter={() => {
                    handleMouseEnter(index)
                  }}
                >
                  {char}
                </span>
              ))}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FooterClient }
