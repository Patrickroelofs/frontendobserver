import React, { type ReactElement } from 'react'
import Link from 'next/link'
import { type TitleWithBlocksType } from '@/payload-types'
import { Blocks } from '@/blocks/blocks'

function TitleWithBlocks(props: TitleWithBlocksType): ReactElement {
  return (
    <div className="p-7 relative">
      <div className="container sm:grid grid-cols-4 gap-8 mb-12">
        <div className="col-end-2 relative mb-12 sm:mb-auto">
          <div className="sticky top-[65px] pt-4">
            <h2 className="font-black text-3xl lg:text-7xl">{props.title}</h2>
            {props.showButton ? (
              <Link
                href={props.buttonLink ?? ''}
                className="z-10 absolute lg:-bottom-12 lg:right-36 bg-ginger text-base lg:text-lg rounded-full px-2 py-1 font-bold border-4 border-transparent text-black outline-4 outline outline-black hover:border-redleather hover:scale-110 transition-all ease-in-out duration-300"
              >
                {props.buttonText ?? ''}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="col-start-2 col-end-5">
          <Blocks blocks={props.blocks} />
        </div>
      </div>
    </div>
  )
}

export { TitleWithBlocks }
