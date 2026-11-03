import { Container, SectionHeading } from "@/components/ui/primitives";
import { BenemoyMobile } from "@/components/sections/BenemoyMobile";

const facts = [
  { label: "Client", value: "Benemoy Securities Limited", note: "Stock brokerage, Bangladesh" },
  { label: "What we built", value: "Web terminal + mobile apps", note: "Browser, iOS and Android" },
  { label: "Who uses it", value: "Dealers and investors", note: "Office desk and on the go" },
  { label: "Market", value: "Dhaka Stock Exchange", note: "Live prices and orders" },
];

export function BenemoyShowcase() {
  return (
    <section id="benemoy" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-40 -z-10 h-[500px] w-[min(1000px,120vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.12),rgba(99,102,241,0.1)_55%,transparent)] blur-2xl"
      />
      <Container>
        <SectionHeading
          eyebrow="Featured project"
          title={
            <>
              Benemoy: <span className="text-gradient">a complete stock trading platform</span>
            </>
          }
          description="We built the trading software for Benemoy Securities Limited. Their dealers use our web terminal in the office, and their investors use our mobile app to follow the Dhaka Stock Exchange and manage their portfolio from anywhere."
        />

        {/* At a glance */}
        <dl className="mt-10 grid sm:mt-12 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-5">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">{f.label}</dt>
              <dd className="mt-2 text-base font-semibold text-ink">{f.value}</dd>
              <dd className="mt-0.5 text-sm text-zinc-500">{f.note}</dd>
            </div>
          ))}
        </dl>

        <div id="benemoy-mobile" className="mt-12 scroll-mt-24 sm:mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Mobile app</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Investors check prices, place orders and follow their portfolio from their phone.
              </p>
            </div>
            <span className="self-start rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 text-xs text-zinc-300 sm:self-auto">
              For investors · iOS & Android
            </span>
          </div>
          <BenemoyMobile />
        </div>
      </Container>
    </section>
  );
}
