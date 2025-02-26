import { Blocks } from "@/blocks/blocks";
import { Author } from "@/components/author";
import { Image } from "@/components/helpers/image";
import type { Blog } from "@/payload-types";
import type { ReactElement } from "react";

interface BlogProps {
  page: Blog;
}

function BlogTemplate(props: BlogProps): ReactElement {
  const { title, blocks, authors, coverImage } = props.page;

  return (
    <div>
      <header className="border-b-2 border-black">
        <div className="relative w-full h-[240px] md:h-[580px]">
          <Image
            media={coverImage}
            placeholder="blur"
            className="object-cover bg-center"
            fill
            priority
          />
        </div>
        <h2 className="text-5xl font-bold my-8 px-4 md:px-0 max-w-7xl mx-auto leading-snug text-pretty">
          {title}
        </h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-none">
        <div className="row-start-2 md:row-start-auto md:col-start-1 md:col-end-3 md:border-r-2 border-black p-4 flex justify-center flex-col">
          <Blocks blocks={blocks} />
        </div>
        <div className="row-start-1 md:row-start-none md:col-start-3 md:col-end-3">
          <div className="border-b-2 border-black sticky top-[67px]">
            {authors.map((author) => {
              if (typeof author === "number") return null;

              return <Author key={author.id} {...author} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { BlogTemplate };
