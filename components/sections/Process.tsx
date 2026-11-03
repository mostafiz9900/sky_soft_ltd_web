import { Container, SectionHeading } from "@/components/ui/primitives";

const steps = [
  {
    n: "01",
    title: "Discover",
    duration: "1–2 weeks",
    body: "Workshops with your stakeholders to map goals, users and constraints. You get a technical roadmap and a fixed estimate.",
  },
  {
    n: "02",
    title: "Design",
    duration: "2–3 weeks",
    body: "Architecture decisions, clickable prototypes and a design system, validated with real users before we write production code.",
  },
  {
    n: "03",
    title: "Build",
    duration: "Two-week sprints",
    body: "A dedicated squad ships working software every sprint, with live staging environments and full visibility into progress.",
  },
  {
    n: "04",
    title: "Launch & Scale",
    duration: "Ongoing",
    body: "Zero-downtime releases, monitoring and SLAs. We stay on to iterate, optimise and grow the product with you.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-20 border-t border-ink/[0.06] py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="How we work"
              title="A process built for predictable delivery"
              description="No black boxes. Clear milestones, weekly demos and a single accountable team from kickoff to launch."
            />
          </div>

          <ol className="relative">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-blue-500/60 via-violet-500/40 to-transparent"
            />
            {steps.map((s) => (
              <li key={s.n} className="group relative flex gap-6 pb-12 last:pb-0">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-background font-mono text-xs text-zinc-400 transition-all duration-300 group-hover:border-violet-500/60 group-hover:text-ink group-hover:shadow-[0_0_24px_-2px_rgba(139,92,246,0.6)]">
                  {s.n}
                </span>
                <div className="flex-1 rounded-2xl border border-ink/[0.06] bg-ink/[0.015] p-6 transition-colors duration-300 group-hover:border-ink/[0.12] group-hover:bg-ink/[0.03]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                    <span className="font-mono text-xs text-zinc-500">{s.duration}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
