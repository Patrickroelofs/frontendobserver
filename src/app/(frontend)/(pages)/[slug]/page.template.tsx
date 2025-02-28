import { Blocks } from "@/blocks/blocks";
import type { Page } from "@/payload-types";
import type { ReactElement } from "react";

interface PageProps {
  page: Page;
}

function PageTemplate(props: PageProps): ReactElement {
  return <Blocks blocks={props.page.blocks} />;
}

export { PageTemplate };
