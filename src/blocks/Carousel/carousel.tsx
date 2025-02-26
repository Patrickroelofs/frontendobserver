import { CarouselClient } from "@/blocks/Carousel/carouselClient";
import type { CarouselType } from "@/payload-types";
import type { ReactElement } from "react";

function Carousel(props: CarouselType): ReactElement {
  return <CarouselClient {...props} />;
}

export { Carousel };
