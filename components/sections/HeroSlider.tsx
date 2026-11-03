"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink, Container } from "@/components/ui/primitives";
// Generated artwork, see scripts/generate-hero-images.py
import teamsImg from "@/public/hero/teams.jpg";
import marketsImg from "@/public/hero/markets.jpg";
import cloudImg from "@/public/hero/cloud.jpg";
import teamsLightImg from "@/public/hero/teams-light.jpg";
import marketsLightImg from "@/public/hero/markets-light.jpg";
import cloudLightImg from "@/public/hero/cloud-light.jpg";

type Slide = {
  label: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: StaticImageData;
  imageLight: StaticImageData;
  alt: string;
  tags: string[];
  cta: { href: string; label: string };
};

const slides: Slide[] = [
  {
    label: "Software",
    eyebrow: "Custom Software Development",
    title: "Code that",
    highlight: "means business.",
    description:
      "We turn bold ideas into fast, secure and scalable software: web platforms, mobile apps and enterprise systems engineered to grow your revenue.",
    image: teamsImg,
    imageLight: teamsLightImg,
    alt: "Code editor windows connected to a team of engineers",
    tags: ["Web apps", "Mobile apps", "Enterprise systems"],
    cta: { href: "#services", label: "Explore services" },
  },
  {
    label: "Fintech",
    eyebrow: "Capital Markets Technology",
    title: "Built for the",
    highlight: "speed of the market.",
    description:
      "Trading terminals, order management and investor apps that keep pace with every tick, trusted by brokerage houses on the Dhaka Stock Exchange.",
    image: marketsImg,
    imageLight: marketsLightImg,
    alt: "Rising candlestick stock chart with a moving average line",
    tags: ["Trading terminals", "OMS", "FIX · ITCH · FAST"],
    cta: { href: "#projects", label: "See our projects" },
  },
  {
    label: "Cloud & Security",
    eyebrow: "Cloud, DevOps & Cybersecurity",
    title: "Always on.",
    highlight: "Always secure.",
    description:
      "Cloud infrastructure, automated deployments and security by design, so your systems stay fast, protected and online around the clock.",
    image: cloudImg,
    imageLight: cloudLightImg,
    alt: "Stacked cloud infrastructure layers protected by a security shield",
    tags: ["AWS · Azure · GCP", "DevOps", "Security"],
    cta: { href: "#stack", label: "Our technology" },
  },
];

const DURATION = 6500;

// Renders both artwork variants; the `light:` variant on <html data-theme> picks which is visible,
// so switching themes needs no re-render and never mismatches the server HTML.
function ThemedImage({
  slide,
  sizes,
  preload,
  className,
}: {
  slide: Slide;
  sizes: string;
  preload?: boolean;
  className: string;
}) {
  return (
    <>
      <Image src={slide.image} alt="" fill sizes={sizes} preload={preload} placeholder="blur" className={`${className} light:hidden`} />
      <Image src={slide.imageLight} alt="" fill sizes={sizes} placeholder="blur" className={`${className} hidden light:block`} />
    </>
  );
}

function ControlButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-zinc-300 transition-all hover:border-ink/30 hover:bg-ink/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-95"
    >
      {children}
    </button>
  );
}

export function HeroSlider() {
  const [active, setActive] = useState(0);
  // Autoplays continuously; the pause button is the only thing that stops it.
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => setActive((i + slides.length) % slides.length), []);
  const touchX = useRef<number | null>(null);

  // Re-armed on every slide change, so manual navigation restarts the timer.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(active + 1), DURATION);
    return () => clearTimeout(t);
  }, [active, paused, go]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Sky Soft highlights"
      className="relative isolate flex flex-col overflow-hidden xl:h-[100svh] xl:max-h-[1100px] xl:min-h-[720px]"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
      }}
    >
      {/* Large desktop: full-bleed artwork behind the copy (crossfade + slow zoom) */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 hidden xl:block">
        {slides.map((s, i) => (
          <div
            key={s.label}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            <ThemedImage
              slide={s}
              sizes="100vw"
              preload={i === 0}
              className={`object-cover object-right transition-transform ease-out ${
                i === active ? "scale-100 duration-[8000ms]" : "scale-110 duration-0"
              }`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background from-30% via-background/75 via-55% to-transparent 2xl:from-40% 2xl:via-60%" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 -z-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.25),transparent)] blur-2xl"
      />

      <Container className="flex flex-1 flex-col justify-center gap-10 pb-10 pt-28 sm:pt-32 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:pb-14 xl:flex xl:pb-32 xl:pt-24">
        {/* Copy: all slides share one grid cell, so height never jumps between slides */}
        <div className="grid max-w-3xl lg:max-w-2xl xl:max-w-3xl">
          {slides.map((s, i) => {
            const isActive = i === active;
            const Heading = i === 0 ? "h1" : "h2";
            return (
              <div
                key={s.label}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
                aria-hidden={!isActive}
                inert={!isActive}
                className={`[grid-area:1/1] transition-all duration-700 ease-out ${
                  isActive ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-4 opacity-0"
                }`}
              >
                <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-300 sm:text-xs">
                  <span className="h-px w-8 bg-gradient-to-r from-blue-500 to-violet-500" />
                  {s.eyebrow}
                </p>
                <Heading className="mt-5 text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-ink sm:mt-6 sm:text-6xl xl:text-7xl 2xl:text-8xl">
                  {s.title} <span className="text-gradient block">{s.highlight}</span>
                </Heading>
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:mt-6 sm:text-lg sm:leading-8">
                  {s.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-1 text-xs text-zinc-300 backdrop-blur"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                  <ButtonLink href="#contact" arrow className="w-full sm:w-auto">
                    Start your project
                  </ButtonLink>
                  <ButtonLink href={s.cta.href} variant="secondary" className="w-full backdrop-blur sm:w-auto">
                    {s.cta.label}
                  </ButtonLink>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile to laptop: artwork as its own panel, cropped to the illustrated (right) side */}
        <div
          aria-hidden="true"
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10 bg-surface lg:aspect-[4/3] xl:hidden"
        >
          {slides.map((s, i) => (
            <div
              key={s.label}
              className={`absolute inset-y-0 right-0 w-[170%] transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <ThemedImage slide={s} sizes="170vw" className="object-cover" />
            </div>
          ))}
          <span className="absolute bottom-3 left-3 rounded-full border border-ink/10 bg-background/80 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
            {slides[active].label}
          </span>
        </div>
      </Container>

      {/* Controls */}
      <div className="border-t border-ink/[0.08] bg-background/40 backdrop-blur-md xl:absolute xl:inset-x-0 xl:bottom-0">
        <Container className="flex items-center gap-4 py-4 sm:gap-6 sm:py-5">
          <ol className="grid flex-1 grid-cols-3 gap-3 sm:gap-6">
            {slides.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}: ${s.label}`}
                  aria-current={i === active}
                  className="group w-full py-2 text-left focus-visible:outline-none"
                >
                  <span className="relative block h-0.5 overflow-hidden rounded-full bg-ink/15 group-focus-visible:ring-2 group-focus-visible:ring-violet-500">
                    {i === active && (
                      <span
                        key={`${active}-${paused}`}
                        className="absolute inset-0 origin-left bg-gradient-to-r from-blue-500 to-violet-500"
                        style={{
                          animation: paused ? "none" : `progress ${DURATION}ms linear forwards`,
                          transform: paused ? "scaleX(1)" : undefined,
                        }}
                      />
                    )}
                  </span>
                  <span
                    className={`mt-3 hidden items-baseline gap-2 text-xs transition-colors sm:flex ${
                      i === active ? "text-ink" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                    {s.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="flex gap-2">
            <ControlButton label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((p) => !p)}>
              {paused ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                </svg>
              )}
            </ControlButton>
            <ControlButton label="Previous slide" onClick={() => go(active - 1)}>
              <ArrowRightIcon className="size-4 rotate-180" />
            </ControlButton>
            <ControlButton label="Next slide" onClick={() => go(active + 1)}>
              <ArrowRightIcon className="size-4" />
            </ControlButton>
          </div>
        </Container>
      </div>
    </div>
  );
}
