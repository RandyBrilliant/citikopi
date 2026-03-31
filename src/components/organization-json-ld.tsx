import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = {
  locale: string;
};

export function OrganizationJsonLd({ locale }: Props) {
  const sameAs = siteConfig.sameAs.filter(Boolean);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: absoluteUrl(`/${locale}`),
    logo: absoluteUrl(siteConfig.logoPath),
    email: siteConfig.email,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    hasMap: siteConfig.googleMapsShareUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:30",
        closes: "12:00",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Jl. Yose Rizal No.77, Sei Rengas I, Kec. Medan Kota, Kota Medan",
      addressLocality: "Medan",
      addressRegion: "Sumatera Utara",
      postalCode: "20211",
      addressCountry: "ID",
    },
    ...(sameAs.length ? { sameAs } : {}),
  } as const;

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}
