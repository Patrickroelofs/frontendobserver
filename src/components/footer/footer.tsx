import { FooterClient } from "@/components/footer/footerClient";
import { payload } from "@/util/getPayloadConfig";
import type { ReactElement } from "react";

async function Footer(): Promise<ReactElement> {
  const footer = await payload.findGlobal({
    slug: "siteSettings",
    depth: 1,
  });

  return <FooterClient {...footer.footer} {...footer.social} />;
}

export { Footer };
