import { Image } from "@/components/helpers/image";
import type { HeroType } from "@/payload-types";
import type { ReactElement } from "react";

function Hero(props: HeroType): ReactElement {
  const { image } = props;

  return (
    <header className="border-b-2 border-black">
      <div className="relative w-full h-[240px] md:h-[580px]">
        <Image
          placeholder="blur"
          className="object-cover bg-center"
          media={image}
          fill
          priority
        />
      </div>
    </header>
  );
}

export { Hero };
