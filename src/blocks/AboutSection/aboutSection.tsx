import Link from 'next/link'
import React, { type ReactElement } from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { type AboutSectionType } from '@/payload-types'

function AboutSection(props: AboutSectionType): ReactElement {
  return (
    <div className="bg-black p-7 text-white relative">
      <div className="container grid grid-cols-4 gap-8 mb-12">
        <div className="col-end-2">
          <h2 className="text-7xl font-black sticky top-[65px] pt-4">{props.title}</h2>
        </div>
        <div className="col-start-2 col-end-5 text-lg text-white">
          <LexicalRichText
            data={props.content}
            className="prose prose-xl prose-percy text-white w-full mx-auto break-words columns-2 max-w-full"
          />
        </div>
      </div>
      <Link
        href={props.buttonLink}
        className="absolute -bottom-6 right-12 bg-ginger text-xl rounded-full px-4 py-2 font-bold border-4 border-transparent text-black outline-4 outline outline-black hover:border-redleather hover:scale-110 transition-all ease-in-out duration-300"
      >
        {props.buttonText}
      </Link>
    </div>
  )
}

export { AboutSection }
