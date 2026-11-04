import Image from "next/image";
import { AppleIcon, ArrowRightIcon, GooglePlayIcon } from "@/components/icons";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/components/sections/benemoy-links";
import workspaceImg from "@/public/projects/benemoy/workspace.png";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const protocols = [
  { name: "FIX", full: "Financial Information eXchange", body: "Order routing, execution reports and session management with brokers and exchanges." },
  { name: "ITCH", full: "Binary market data feed", body: "Low-latency, full-depth order book data decoded and rebuilt in real time." },
  { name: "FAST", full: "FIX Adapted for STreaming", body: "Compressed, high-throughput market data streams with template-based decoding." },
];

const exchanges = [
  { code: "DSE", name: "Dhaka Stock Exchange" },
  { code: "CSE", name: "Chittagong Stock Exchange" },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-ink/[0.08] bg-ink/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400">
      {children}
    </li>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 border-t border-ink/[0.06] py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Featured projects"
          title={
            <>
              Built for the stock market, <span className="text-zinc-500">where milliseconds matter.</span>
            </>
          }
          description="We build trading platforms, order management and exchange connectivity for brokers and investors in Bangladesh's capital market."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-6">
          {/* Benemoy — flagship */}
          <SpotlightCard className="lg:col-span-4">
            <article className="grid h-full gap-8 p-6 sm:p-8 md:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-violet-300">Flagship product</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">OMS</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  The real-time trading terminal for OMS, with live watchlists, market
                  depth, an order blotter and advanced charts in one configurable workspace.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  <Tag>Live market data</Tag>
                  <Tag>Order blotter</Tag>
                  <Tag>Charting</Tag>
                  <Tag>iOS & Android</Tag>
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
                  <a
                    href="#benemoy"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-violet-300"
                  >
                    Explore the platform
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Benemoy on the App Store"
                    className="text-zinc-500 transition-colors hover:text-ink"
                  >
                    <AppleIcon className="size-5" />
                  </a>
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Benemoy on Google Play"
                    className="text-zinc-500 transition-colors hover:text-ink"
                  >
                    <GooglePlayIcon className="size-[18px]" />
                  </a>
                </div>
              </div>

              <a
                href="#benemoy"
                className="relative block overflow-hidden rounded-xl border border-ink/[0.08] bg-surface transition-transform duration-500 hover:scale-[1.02]"
              >
                <Image
                  src={workspaceImg}
                  alt="Benemoy trading terminal workspace"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="h-full w-full object-cover object-left-top"
                />
              </a>
            </article>
          </SpotlightCard>

          {/* OMS */}
          <SpotlightCard className="lg:col-span-2">
            <article className="flex h-full flex-col p-6 sm:p-8">
              <span className="font-mono text-xs text-violet-300">Brokerage infrastructure</span>
              <h3 className="mt-3 text-xl font-semibold text-ink">Order Management System</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                An OMS for brokers covering the whole order lifecycle: pre-trade risk checks, routing, execution,
                and real-time positions and limits.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                {["Pre-trade risk & limits", "Smart order routing", "Real-time P&L and positions"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          </SpotlightCard>

          {/* Protocols */}
          <SpotlightCard className="lg:col-span-4">
            <article className="p-6 sm:p-8">
              <span className="font-mono text-xs text-violet-300">Exchange connectivity</span>
              <h3 className="mt-3 text-xl font-semibold text-ink">Trading protocol engines</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
                Fast, reliable handlers for the protocols capital markets run on, for both order flow and
                market data.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {protocols.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-xl border border-ink/[0.08] bg-ink/[0.02] p-4 transition-colors duration-200 hover:border-violet-500/40 hover:bg-violet-500/[0.06]"
                  >
                    <p className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text font-mono text-lg font-semibold text-transparent">
                      {p.name}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">{p.full}</p>
                    <p className="mt-3 text-xs leading-5 text-zinc-400">{p.body}</p>
                  </div>
                ))}
              </div>
            </article>
          </SpotlightCard>

          {/* Exchanges */}
          <SpotlightCard className="lg:col-span-2">
            <article className="flex h-full flex-col p-6 sm:p-8">
              <span className="font-mono text-xs text-violet-300">Market integration</span>
              <h3 className="mt-3 text-xl font-semibold text-ink">DSE & CSE</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Integration with Bangladesh&apos;s two stock exchanges for trading, market data and
                reports.
              </p>
              <ul className="mt-6 grid gap-3">
                {exchanges.map((e) => (
                  <li
                    key={e.code}
                    className="flex items-center gap-3 rounded-xl border border-ink/[0.08] bg-ink/[0.02] p-3"
                  >
                    <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 font-mono text-xs font-semibold text-ink">
                      {e.code}
                    </span>
                    <span className="text-sm text-zinc-300">{e.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          </SpotlightCard>
        </div>
      </Container>
    </section>
  );
}
