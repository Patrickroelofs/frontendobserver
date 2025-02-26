import type { AboutSectionType } from "@/payload-types";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";
import React, { type ReactElement } from "react";

function AboutSection(props: AboutSectionType): ReactElement {
  return (
    <div className="bg-black p-7 text-white relative">
      <div className="container sm:grid gap-8 mb-12">
        <div className="col-end-2 mb-4 sm:mb-auto sm:sticky sm:top-[65px]">
          <h2 className="text-3xl lg:text-7xl font-bold lg:font-black pt-4">
            {props.title}
          </h2>
        </div>
        <div className="col-start-2 col-end-5 text-lg text-white">
          <LexicalRichText
            data={props.content}
            className="prose prose-xl text-white w-full mx-auto break-words columns-1 lg:columns-2 max-w-full"
          />
        </div>
      </div>
      {props.showButton ? (
        <Link
          href={props.buttonLink ?? ""}
          className="z-10 absolute -bottom-6 right-12 bg-ginger text-xl rounded-full px-4 py-2 font-bold border-4 border-transparent text-black outline-4 outline outline-black hover:border-redleather hover:scale-110 transition-all ease-in-out duration-300"
        >
          {props.buttonText ?? ""}
        </Link>
      ) : null}
    </div>
  );
}

export { AboutSection };
