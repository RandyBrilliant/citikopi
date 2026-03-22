"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { images } from "@/lib/images";
import { introVideoSrc } from "@/lib/media";
import { Container } from "./container";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const reduceMotion = useReducedMotion();
  const useVideoBackground = reduceMotion !== true;

  return (
    <section className="relative isolate min-h-[85vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {useVideoBackground ? (
          <video
            className="absolute inset-0 h-full w-full scale-[1.01] object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={images.hero}
            aria-hidden
          >
            <source src={introVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={images.hero}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            fetchPriority="high"
          />
        )}
      </div>
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-surface-page/20 via-surface-page/75 to-surface-page"
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.12),_transparent_55%)]" />

      <Container className="relative z-10 flex min-h-[85vh] flex-col justify-end pb-20 pt-32 sm:pb-28 sm:pt-40">
        {reduceMotion ? (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent sm:text-base">
              {t("kicker")}
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-balance text-5xl leading-[1.08] text-ink sm:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink-muted sm:text-2xl">
              {t("subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold uppercase tracking-widest text-surface-page shadow-lift transition-transform duration-300 hover:scale-[1.02] hover:bg-ink"
              >
                {t("primaryCta")}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-border-subtle px-8 py-3.5 text-base font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {t("secondaryCta")}
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.3em] text-accent sm:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {t("kicker")}
            </motion.p>
            <motion.h1
              className="font-display mt-4 max-w-3xl text-balance text-5xl leading-[1.08] text-ink sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t("title")}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-xl leading-relaxed text-ink-muted sm:text-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold uppercase tracking-widest text-surface-page shadow-lift transition-transform duration-300 hover:scale-[1.02] hover:bg-ink"
              >
                {t("primaryCta")}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-border-subtle px-8 py-3.5 text-base font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {t("secondaryCta")}
              </Link>
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
}
