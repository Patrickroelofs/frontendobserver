import { Image } from "@/components/helpers/image";
import type { Media } from "@/payload-types";
import { ArrowBendDownRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactElement } from "react";

interface BlogCardType {
  slug: string;
  coverImage: Media;
  name: string;
  excerpt: string;
}

function BlogCard(props: BlogCardType): ReactElement {
  return (
    <article className="border-2 border-black group">
      <Link href={`/blog/${props.slug}`} className="flex flex-col h-full">
        <div className="relative w-full h-56">
          <Image
            fill
            media={props.coverImage}
            className="object-cover object-center"
          />
          <div className="bg-black z-10 absolute bottom-4 py-1 px-2 text-white">
            <span>Blog Article</span>
          </div>
        </div>
        <div className="p-4 pb-8">
          <h2 className="text-lg font-medium mb-2">{props.name}</h2>
          <p className="line-clamp-3">{props.excerpt}</p>
        </div>
        <div className="bg-black text-white p-2 flex justify-end mt-auto">
          <ArrowBendDownRight
            size={32}
            className="group-hover:scale-125 group-hover:rotate-12 transition-all ease-in-out duration-150"
          />
        </div>
      </Link>
    </article>
  );
}

export { BlogCard };
