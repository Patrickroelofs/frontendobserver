import { PageTemplate } from "@/app/(frontend)/(pages)/[slug]/page.template";
import type { Page as PageType } from "@/payload-types";
import { payload } from "@/util/getPayloadConfig";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import type { ReactElement } from "react";

async function Page({
  params,
}: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
  const { isEnabled: draft } = await draftMode();
  const { slug = "home" } = await params;

  let page: PageType | null = null;

  try {
    page = await payload
      .find({
        collection: "pages",
        draft,
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })
      .then((result) => {
        if (result.docs.length === 0) {
          return null;
        }

        return result.docs[0] ?? null;
      });

    if (!page) return <p>404</p>;

    return <PageTemplate page={page} />;
  } catch (error) {
    return <p>500</p>;
  }
}

export async function generateStaticParams() {
  try {
    const pages = await payload
      .find({
        collection: "pages",
        where: {
          _status: {
            equals: "published",
          },
        },
      })
      .then((result) => {
        if (result.docs.length === 0) {
          return null;
        }

        return result.docs;
      });

    if (!pages) {
      return [];
    }

    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    return [];
  }
}

export function generateMetadata(): Metadata {
  return {};
}

export default Page;
