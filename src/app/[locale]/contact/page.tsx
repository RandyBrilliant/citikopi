import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "contact", "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  return (
    <section className="border-b border-border-subtle py-16 sm:py-24">
      <Container>
        <FadeIn>
          <h1 className="font-display text-5xl text-balance text-ink sm:text-6xl">
            {t("title")}
          </h1>
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn delay={0.05}>
            <div className="rounded-xl border border-border-subtle bg-surface-card p-8 shadow-soft">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {t("phoneLabel")}
              </h2>
              <a
                href={siteConfig.phoneHref}
                className="mt-3 block text-2xl text-ink transition-colors hover:text-accent"
              >
                {siteConfig.phoneDisplay}
              </a>

              <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {t("emailLabel")}
              </h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 block text-xl text-ink transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                  {t("hoursTitle")}
                </h2>
                <ul className="mt-3 list-none space-y-2 text-lg text-ink-muted leading-relaxed">
                  <li>{t("hoursWeekdays")}</li>
                  <li>{t("hoursSaturday")}</li>
                  <li>{t("hoursSunday")}</li>
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                  {t("visitTitle")}
                </h2>
                <address className="mt-3 not-italic text-lg text-ink-muted leading-relaxed">
                  {siteConfig.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.12}>
          <div className="mt-16">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              {t("mapTitle")}
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-border-subtle bg-surface-card shadow-soft">
              <iframe
                title={t("mapIframeTitle")}
                src={siteConfig.googleMapsEmbedUrl}
                className="aspect-video min-h-[280px] w-full border-0 sm:min-h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={siteConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold uppercase tracking-widest text-surface-page transition-colors hover:bg-ink"
              >
                {t("directionsCta")}
              </a>
              <a
                href={siteConfig.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border-subtle px-6 py-3 text-base font-semibold uppercase tracking-widest text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {t("viewOnMapsCta")}
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
