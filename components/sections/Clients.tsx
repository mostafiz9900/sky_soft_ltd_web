import { ArrowRightIcon, ArrowUpRightIcon, BuildingIcon, MapPinIcon } from "@/components/icons";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { clients, type Client } from "@/components/sections/clients-data";

const featured = clients.find((c) => c.featured)!;
const others = clients.filter((c) => !c.featured);

const stats = [
  { value: String(clients.length), label: "Brokerage houses" },
  { value: "DSE", label: "Member brokers" },
  { value: "2", label: "Cities served" },
];

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function Monogram({ initials, large }: { initials: string; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-gradient-to-br from-blue-500/25 to-violet-500/25 font-semibold tracking-tight text-ink ${
        large ? "size-16 text-xl" : "size-12 text-sm"
      }`}
    >
      {initials}
    </span>
  );
}

function TrecBadge({ trec }: { trec?: string }) {
  if (!trec) return null;
  return (
    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-1 font-mono text-[11px] text-emerald-300">
      DSE TREC #{trec}
    </span>
  );
}

function Location({ client }: { client: Client }) {
  if (!client.city) return <span className="text-zinc-500">Stock brokerage</span>;
  return (
    <span className="inline-flex items-center gap-1.5">
      <MapPinIcon className="size-4 text-zinc-500" />
      {client.area}, {client.city}
    </span>
  );
}

function ClientCard({ client }: { client: Client }) {
  return (
    <SpotlightCard className="h-full">
      <article className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <Monogram initials={client.initials} />
          <TrecBadge trec={client.trec} />
        </div>
        <h3 className="mt-5 text-base font-semibold text-ink">{client.short}</h3>
        <p className="mt-1 text-xs leading-5 text-zinc-500">{client.name}</p>
        {client.note && <p className="mt-3 text-sm leading-6 text-zinc-400">{client.note}</p>}

        <div aria-hidden="true" className="min-h-5 flex-1" />
        <div className="mt-auto flex flex-col items-start gap-2 border-t border-ink/[0.06] pt-4 text-sm text-zinc-400">
          <Location client={client} />
          {client.website && (
            <a
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${client.short} website`}
              className="inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-ink"
            >
              {hostname(client.website)}
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          )}
        </div>
      </article>
    </SpotlightCard>
  );
}

export function Clients() {
  return (
    <section id="clients" className="relative scroll-mt-20 border-t border-ink/[0.06] py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our clients"
          title={
            <>
              Trusted by Bangladesh&apos;s <span className="text-gradient">brokerage houses</span>
            </>
          }
          description="Stockbrokers on the Dhaka Stock Exchange rely on Sky Soft for the technology behind their trading: terminals, order management, mobile apps and exchange connectivity."
        />

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 divide-x divide-ink/[0.08] rounded-2xl border border-ink/[0.08] bg-ink/[0.02]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse items-center gap-1 px-3 py-5 text-center sm:py-6">
              <dt className="text-xs text-zinc-500 sm:text-sm">{s.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        {/* Featured client */}
        <SpotlightCard className="mt-12">
          <article className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
            <Monogram initials={featured.initials} large />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-2.5 py-1 text-[11px] font-medium text-white">
                  Featured client
                </span>
                <TrecBadge trec={featured.trec} />
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{featured.name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{featured.note}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
                <Location client={featured} />
                {featured.website && (
                  <a
                    href={featured.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-ink"
                  >
                    {hostname(featured.website)}
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
            <a
              href="#benemoy"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink/10 bg-ink/[0.04] px-5 text-sm font-medium text-ink transition-all hover:border-ink/20 hover:bg-ink/[0.08]"
            >
              View case study
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </article>
        </SpotlightCard>

        {/* All other clients */}
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((c) => (
            <li key={c.name}>
              <ClientCard client={c} />
            </li>
          ))}
        </ul>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-zinc-600">
          <BuildingIcon className="size-4" />
          TREC numbers as published in the Dhaka Stock Exchange TREC holder directory.
        </p>
      </Container>
    </section>
  );
}
