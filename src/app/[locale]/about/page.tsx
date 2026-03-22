import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { Link } from "@/i18n/navigation";
import { productImages } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    "about",
    "about",
    absoluteUrl(productImages.coffee),
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const nav = await getTranslations("nav");

  return (
    <section className="border-b border-border-subtle py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent sm:text-base">
              Citikopi Mandailing Beans
            </p>
            <h1 className="font-display mt-4 text-5xl text-balance text-ink sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-ink-muted">
              {t("body")}
            </p>
            <Link
              href="/products"
              className="mt-10 inline-flex items-center gap-2 text-base font-semibold uppercase tracking-widest text-accent transition-colors hover:text-ink"
            >
              {nav("products")}
              <span aria-hidden>→</span>
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border-subtle bg-surface-card shadow-lift">
              <Image
                src={productImages.coffee}
                alt={t("heroImageAlt")}
                fill
                className="object-contain object-center p-6 sm:p-10"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
