import { Blocks } from "@/blocks/blocks";
import type { TitleWithBlocksType } from "@/payload-types";
import Link from "next/link";
import React, { type ReactElement } from "react";

function TitleWithBlocks(props: TitleWithBlocksType): ReactElement {
  return (
    <div className="p-7 relative">
      <div className="container sm:grid grid-cols-4 gap-8 mb-12">
        <div className="col-end-2 relative mb-16 sm:mb-auto sm:sticky sm:top-[65px]">
          <div className="pt-4">
            <h2 className="lg:font-black text-3xl lg:text-7xl font-bold">
              {props.title}
            </h2>
            {props.showButton ? (
              <Link
                href={props.buttonLink ?? ""}
                className="z-10 absolute lg:-bottom-12 lg:right-36 bg-ginger text-base lg:text-lg rounded-full px-2 py-1 font-bold border-4 border-transparent text-black outline-4 outline outline-black hover:border-redleather hover:scale-110 transition-all ease-in-out duration-300"
              >
                {props.buttonText ?? ""}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="col-start-2 col-end-5">
          <Blocks blocks={props.blocks} />
        </div>
      </div>
    </div>
  );
}

export { TitleWithBlocks };
