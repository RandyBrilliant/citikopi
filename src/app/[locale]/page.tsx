import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { HeroSection } from "@/components/hero-section";
import { IntroVideoSection } from "@/components/intro-video-section";
import { OrganizationJsonLd } from "@/components/organization-json-ld";
import { Link } from "@/i18n/navigation";
import { images, productImages } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "", "home", absoluteUrl(productImages.coffee));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const valueItems = ["fair", "eco", "small", "biodiversity"] as const;

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <HeroSection />

      <section className="border-t border-border-subtle bg-surface-raised py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div className="relative aspect-square max-h-[min(100vw,28rem)] overflow-hidden rounded-xl border border-border-subtle bg-surface-card shadow-lift sm:max-h-none lg:mx-0 lg:max-h-[32rem]">
                <Image
                  src={productImages.coffee}
                  alt={t("featuredCoffee.imageAlt")}
                  fill
                  className="object-contain object-center p-6 sm:p-8"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  priority
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.06}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent sm:text-base">
                {t("featuredCoffee.kicker")}
              </p>
              <h2 className="font-display mt-3 text-4xl text-balance text-ink sm:text-5xl">
                {t("featuredCoffee.title")}
              </h2>
              <p className="mt-4 text-lg text-ink-muted leading-relaxed sm:text-xl">
                {t("featuredCoffee.description")}
              </p>
              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold uppercase tracking-widest text-accent transition-colors hover:text-ink"
              >
                {t("featuredCoffee.cta")}
                <span aria-hidden>→</span>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle bg-surface-page py-20 sm:py-28">
        <Container>
          <FadeIn>
            <h2 className="font-display text-4xl text-balance text-ink sm:text-5xl">
              {t("values.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-muted leading-relaxed">
              {t("values.intro")}
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {valueItems.map((key) => (
                <li
                  key={key}
                  className="rounded-lg border border-border-subtle bg-surface-card/80 px-5 py-4 text-base text-ink-muted leading-relaxed"
                >
                  <span className="mr-2 text-accent" aria-hidden>
                    —
                  </span>
                  {t(`values.items.${key}`)}
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0">
          <Image
            src={images.coffeeHarvestBg}
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-surface-page/88" aria-hidden />
        </div>
        <Container className="relative">
          <FadeIn>
            <h2 className="font-display max-w-xl text-4xl text-balance text-ink sm:text-5xl">
              {t("local.title")}
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-ink-muted leading-relaxed">
              {t("local.body")}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="border-t border-border-subtle bg-surface-raised py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                {t("aboutTeaser.title")}
              </h2>
              <p className="mt-4 text-lg text-ink-muted leading-relaxed">
                {t("aboutTeaser.body")}
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold uppercase tracking-widest text-accent transition-colors hover:text-ink"
              >
                {t("aboutTeaser.cta")}
                <span aria-hidden>→</span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                {t("contactTeaser.title")}
              </h2>
              <p className="mt-4 text-lg text-ink-muted leading-relaxed">
                {t("contactTeaser.body")}
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold uppercase tracking-widest text-accent transition-colors hover:text-ink"
              >
                {t("contactTeaser.cta")}
                <span aria-hidden>→</span>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      <IntroVideoSection />
    </>
  );
}
