import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { images, productImages } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";

const productKeys = [
  "coffee",
  "nest",
  "fishMaw",
  "seaCucumber",
  "spices",
  "sweets",
  "palmSugar",
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "products", "products", images.coffeeFarmBg);
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("productsPage");
  const tp = await getTranslations("products");
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    inLanguage: locale,
    name: t("title"),
    description: t("intro"),
    url: absoluteUrl(`/${locale}/products`),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl(`/${locale}`),
    },
    hasPart: productKeys.map((key) => ({
      "@type": "Product",
      name: tp(`${key}.title`),
      description: tp(`${key}.description`),
      category: t("title"),
      image: absoluteUrl(productImages[key]),
      brand: {
        "@type": "Brand",
        name: siteConfig.name,
      },
    })),
  } as const;

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </script>
      <section className="relative min-h-[42vh] overflow-hidden border-b border-border-subtle">
        <Image
          src={images.coffeeFarmBg}
          alt=""
          fill
          className="object-cover object-center opacity-50"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-surface-page/40 via-surface-page/85 to-surface-page"
          aria-hidden
        />
        <Container className="relative flex min-h-[42vh] flex-col justify-end py-16 sm:py-20">
          <FadeIn>
            <h1 className="font-display text-5xl text-balance text-ink sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-ink-muted leading-relaxed">
              {t("intro")}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productKeys.map((key, index) => (
              <li key={key}>
                <FadeIn delay={index * 0.05}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface-card shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                    <div className="relative aspect-[5/3] overflow-hidden">
                      <Image
                        src={productImages[key]}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-surface-page via-transparent to-transparent opacity-80"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-display text-2xl text-ink">
                        {tp(`${key}.title`)}
                      </h2>
                      <p className="mt-3 flex-1 text-base leading-relaxed text-ink-muted">
                        {tp(`${key}.description`)}
                      </p>
                    </div>
                  </article>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
