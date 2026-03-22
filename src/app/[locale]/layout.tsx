import {
  Cormorant_Garamond,
  Noto_Sans_SC,
  Source_Sans_3,
} from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { routing } from "@/i18n/routing";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSc = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-sc-family",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isZh = locale === "zh";

  return (
    <html
      lang={locale}
      className={`${display.variable} ${bodyFont.variable} ${notoSc.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`min-h-full flex flex-col bg-surface-page text-ink antialiased ${isZh ? "font-sc" : ""}`}
      >
        <div
          className="pointer-events-none fixed inset-0 z-[5] grain-overlay opacity-[0.35] mix-blend-overlay"
          aria-hidden
        />
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main className="relative flex-1" id="main-content">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
