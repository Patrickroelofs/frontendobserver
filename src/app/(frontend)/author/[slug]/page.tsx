import { AuthorTemplate } from "@/app/(frontend)/author/[slug]/page.template";
import type { Author } from "@/payload-types";
import { payload } from "@/util/getPayloadConfig";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import type { ReactElement } from "react";

async function Page({
  params,
}: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;

  let page: Author | null = null;

  try {
    page = await payload
      .find({
        collection: "authors",
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

    return <AuthorTemplate page={page} />;
  } catch (error) {
    return <p>500</p>;
  }
}

export async function generateStaticParams() {
  try {
    const authors = await payload
      .find({
        collection: "authors",
      })
      .then((result) => {
        if (result.docs.length === 0) {
          return null;
        }

        return result.docs;
      });

    if (!authors) {
      return [];
    }

    return authors.map((author) => ({
      slug: author.slug,
    }));
  } catch (error) {
    return [];
  }
}

export function generateMetadata(): Metadata {
  return {};
}

export default Page;
