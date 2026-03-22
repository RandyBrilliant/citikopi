import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = {
  locale: string;
};

export function OrganizationJsonLd({ locale }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: absoluteUrl(`/${locale}`),
    email: siteConfig.email,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Jl. Yose Rizal No.77, Sei Rengas I, Kec. Medan Kota, Kota Medan",
      addressLocality: "Medan",
      addressRegion: "Sumatera Utara",
      postalCode: "20211",
      addressCountry: "ID",
    },
  } as const;

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}
