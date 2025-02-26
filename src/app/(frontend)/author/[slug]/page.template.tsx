import { RichText } from "@/blocks/RichText/richText";
import { Image } from "@/components/helpers/image";
import type { Author } from "@/payload-types";
import type { ReactElement } from "react";

interface AuthorProps {
  page: Author;
}

function AuthorTemplate(props: AuthorProps): ReactElement {
  const { name, coverImage, image } = props.page;

  return (
    <>
      <header>
        {coverImage ? (
          <div className="relative w-full h-[240px] md:h-[580px]">
            <Image
              media={coverImage}
              placeholder="blur"
              className="object-cover bg-center"
              fill
              priority
            />
          </div>
        ) : null}
        <h2 className="text-3xl font-bold py-8 px-4 md:px-0 md:max-w-[75%] mx-auto leading-snug flex gap-4 items-center">
          {image ? (
            <div className="w-[94px] h-[94px] relative">
              <Image media={image} fill className="block" />
            </div>
          ) : null}
          <span>{name}</span>
        </h2>
      </header>
      <main className="container pb-12">
        <RichText blockType="RichText" richText={props.page.bio} />
      </main>
    </>
  );
}

export { AuthorTemplate };
