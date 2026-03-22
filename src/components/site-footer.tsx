import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { Container } from "./container";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface-raised">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-display text-3xl tracking-[0.08em] text-ink sm:text-4xl">
              Citikopi Mandailing Beans
            </p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
              {siteConfig.tagline}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:text-ink"
            >
              {t("cta")}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t("addressLabel")}
            </p>
            <address className="mt-3 not-italic text-base leading-relaxed text-ink-muted">
              {siteConfig.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 text-base text-ink-muted">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-ink transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
        <p className="mt-12 border-t border-border-subtle pt-8 text-center text-sm text-ink-muted">
          © {year} {siteConfig.name}. {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
