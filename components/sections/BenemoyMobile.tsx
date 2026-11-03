"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { AppleIcon, ArrowRightIcon, CheckIcon, GooglePlayIcon } from "@/components/icons";
import appIcon from "@/public/projects/benemoy/app-icon.png";
import splashImg from "@/public/projects/benemoy/mobile/01-splash.jpg";
import onboardingImg from "@/public/projects/benemoy/mobile/02-onboarding.jpg";
import signInImg from "@/public/projects/benemoy/mobile/03-sign-in.jpg";
import homeImg from "@/public/projects/benemoy/mobile/04-home.jpg";
import watchlistImg from "@/public/projects/benemoy/mobile/05-watchlist.jpg";
import orderListImg from "@/public/projects/benemoy/mobile/06-order-list.jpg";
import portfolioImg from "@/public/projects/benemoy/mobile/07-portfolio.jpg";
import accountImg from "@/public/projects/benemoy/mobile/08-account-summary.jpg";

import { APP_STORE_URL, PLAY_STORE_URL } from "@/components/sections/benemoy-links";

const screens: { image: StaticImageData; alt: string }[] = [
  { image: splashImg, alt: "Benemoy app splash screen" },
  { image: onboardingImg, alt: "Onboarding screen: Manage your stocks" },
  { image: signInImg, alt: "Sign in screen" },
  { image: homeImg, alt: "Home screen with market trades, volume, value and DSEX, DSES, DS30 indices" },
  { image: watchlistImg, alt: "Watch list screen with last traded price and change percentage" },
  { image: orderListImg, alt: "Order list screen with quote, intraday chart and market depth" },
  { image: portfolioImg, alt: "Portfolio screen with portfolio value, unrealized P&L and holdings" },
  { image: accountImg, alt: "Account summary screen with cash balance and buying power" },
];

const features = [
  "Live DSEX, DSES and DS30 indices and market breadth",
  "Watchlists, quotes, market depth and time & sales",
  "Portfolio, unrealized P&L and buying power on the go",
];

function StoreButton({ href, icon, top, bottom }: { href: string; icon: React.ReactNode; top: string; bottom: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-14 items-center gap-3 rounded-xl border border-ink/15 bg-black px-4 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:translate-y-0"
    >
      {icon}
      <span className="flex flex-col leading-none">
        <span className="text-[10px] text-zinc-400">{top}</span>
        <span className="mt-1 text-base font-semibold tracking-tight">{bottom}</span>
      </span>
    </a>
  );
}

export function BenemoyMobile() {
  const scroller = useRef<HTMLUListElement>(null);

  function scroll(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-b from-ink/[0.04] to-transparent">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
        <div>
          <div className="flex items-center gap-4">
            <Image src={appIcon} alt="" className="size-14 rounded-2xl ring-1 ring-ink/10" />
            <div>
              <p className="font-mono text-xs text-emerald-400">● Live on the App Store and Google Play</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">OMS in your pocket</h3>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-[15px] sm:leading-7">
            The companion app gives Benemoy Securities&apos; investors the full market on their phone: live indices,
            watchlists, market depth, orders, portfolio and account balances, all in sync with the trading terminal.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-violet-300">
                  <CheckIcon className="size-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <StoreButton
            href={APP_STORE_URL}
            icon={<AppleIcon className="size-7" />}
            top="Download on the"
            bottom="App Store"
          />
          <StoreButton
            href={PLAY_STORE_URL}
            icon={<GooglePlayIcon className="size-6" />}
            top="Get it on"
            bottom="Google Play"
          />
        </div>
      </div>

      {/* Screenshot rail */}
      <div className="relative pb-8 sm:pb-10">
        <ul
          ref={scroller}
          aria-label="Benemoy mobile app screenshots"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] sm:scroll-px-10 sm:px-10 lg:scroll-px-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {screens.map((s) => (
            <li key={s.alt} className="w-[200px] shrink-0 snap-start sm:w-[230px] 2xl:w-[260px]">
              <Image
                src={s.image}
                alt={s.alt}
                placeholder="blur"
                sizes="260px"
                className="h-auto w-full rounded-2xl border border-ink/10 transition-transform duration-300 hover:-translate-y-1.5"
              />
            </li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"
        />

        <div className="mt-6 flex justify-end gap-2 px-6 sm:px-10 lg:px-12">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              aria-label={dir === -1 ? "Previous screenshots" : "Next screenshots"}
              className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-zinc-300 transition-all hover:border-ink/30 hover:bg-ink/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-95"
            >
              <ArrowRightIcon className={`size-4 ${dir === -1 ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
