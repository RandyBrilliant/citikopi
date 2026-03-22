import { routing } from "@/i18n/routing";

/** Single line for Google Maps search / directions (matches storefront). */
export const mapQueryAddress =
  "Jl. Yose Rizal No.77, Sei Rengas I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20211, Indonesia";

export const siteConfig = {
  name: "Citikopi Mandailing Beans",
  tagline: "Proudly local, perfectly crafted",
  email: "info@citikopi.id",
  phoneDisplay: "(+62) 822 6142 6342",
  phoneHref: "tel:+6282261426342",
  addressLines: [
    "Jl. Yose Rizal No.77, Sei Rengas I",
    "Kec. Medan Kota, Kota Medan, Sumatera Utara 20211",
    "Indonesia",
  ],
  /** Short link to the saved place (same destination as maps). */
  googleMapsShareUrl: "https://share.google/IEZwJnW0jMNY5mdlz",
  get googleMapsEmbedUrl() {
    return `https://www.google.com/maps?q=${encodeURIComponent(mapQueryAddress)}&output=embed&z=17`;
  },
  get googleMapsDirectionsUrl() {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQueryAddress)}`;
  },
} as const;

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";
  return raw;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** @param pathSegments e.g. "" for home, "about", "products", "contact" */
export function alternates(pathSegments: string, locale: string) {
  const suffix = pathSegments ? `/${pathSegments}` : "";
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = absoluteUrl(`/${loc}${suffix}`);
  }
  return {
    canonical: absoluteUrl(`/${locale}${suffix}`),
    languages,
  };
}
