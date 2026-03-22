import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  params?: Promise<{ locale: string }>;
};

export default async function NotFound({ params }: Props) {
  const resolved = params ? await params : undefined;
  const locale =
    resolved?.locale && hasLocale(routing.locales, resolved.locale)
      ? resolved.locale
      : routing.defaultLocale;
  setRequestLocale(locale);
  const nav = await getTranslations("nav");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="font-display text-5xl text-accent">404</p>
      <h1 className="font-display text-2xl text-ink">{nav("home")}</h1>
      <p className="max-w-md text-ink-muted leading-relaxed">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="rounded-full border border-border-subtle px-6 py-2 text-sm font-semibold uppercase tracking-widest text-accent transition-colors hover:border-accent hover:text-ink"
      >
        {nav("home")}
      </Link>
    </div>
  );
}
