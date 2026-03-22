"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "./container";
import { LocaleSwitcher } from "./locale-switcher";

const navKeys = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/products", key: "products" as const },
  { href: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-page/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link
          href="/"
          className="font-display text-xl tracking-[0.12em] text-ink transition-colors hover:text-accent sm:text-2xl"
        >
          Citikopi
          <span className="text-accent">.</span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label={t("mainNavigation")}
        >
          {navKeys.map(({ href, key }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={key}
                href={href}
                className={`relative text-base font-medium tracking-wide transition-colors ${
                  active ? "text-accent" : "text-ink-muted hover:text-ink"
                }`}
              >
                {t(key)}
                {active ? (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-accent" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle text-ink transition-colors hover:border-accent hover:text-accent md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: Decorative menu icon; button has aria-label. */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            className="border-t border-border-subtle bg-surface-raised md:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex flex-col gap-1 py-4">
              {navKeys.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  className="rounded-md px-3 py-3 text-base text-ink transition-colors hover:bg-surface-card hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
