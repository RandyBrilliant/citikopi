import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { absoluteUrl, alternates, siteConfig } from "@/lib/site";

type PageKey = "home" | "about" | "products" | "contact";

export async function pageMetadata(
  locale: string,
  pathSegments: string,
  page: PageKey,
  openGraphImage?: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const suffix = pathSegments ? `/${pathSegments}` : "";

  const meta: Metadata = {
    title,
    description,
    metadataBase: new URL(absoluteUrl("/")),
    alternates: alternates(pathSegments, locale),
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${locale}${suffix}`),
      siteName: siteConfig.name,
      locale,
      type: "website",
      ...(openGraphImage
        ? { images: [{ url: openGraphImage, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(openGraphImage ? { images: [openGraphImage] } : {}),
    },
    robots: { index: true, follow: true },
  };

  return meta;
}
