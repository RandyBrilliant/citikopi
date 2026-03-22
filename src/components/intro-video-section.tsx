import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { images } from "@/lib/images";
import { introVideoSrc } from "@/lib/media";

export async function IntroVideoSection() {
  const t = await getTranslations("home.introVideo");

  return (
    <section className="border-t border-border-subtle bg-surface-page py-20 sm:py-28">
      <Container>
        <FadeIn>
          <h2 className="font-display text-4xl text-balance text-ink sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted leading-relaxed sm:text-xl">
            {t("description")}
          </p>
          <div className="mt-10 overflow-hidden rounded-xl border border-border-subtle bg-surface-card shadow-lift">
            {/* biome-ignore lint/a11y/useMediaCaption: Add a WebVTT file under /public/video/ when a transcript is available. */}
            <video
              className="aspect-video w-full bg-surface-raised object-cover"
              controls
              controlsList="nodownload"
              preload="metadata"
              poster={images.hero}
              aria-label={t("playerLabel")}
            >
              <source src={introVideoSrc} type="video/mp4" />
            </video>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
