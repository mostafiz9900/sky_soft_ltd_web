import { Container, SectionHeading } from "@/components/ui/primitives";

const stats = [
  { value: "250+", label: "Products shipped" },
  { value: "12", label: "Years in business" },
  { value: "98%", label: "Client retention" },
  { value: "60+", label: "Senior engineers" },
];

const stack = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue"] },
  { group: "Backend", items: ["Node.js", "Go", "Python", "Java", ".NET"] },
  { group: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { group: "Cloud & Data", items: ["AWS", "GCP", "Azure", "Kubernetes", "PostgreSQL", "Redis"] },
];

export function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-20 border-t border-ink/[0.06] py-16 sm:py-20 lg:py-24">
      <Container>
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/[0.08] lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`group relative flex flex-col-reverse p-6 text-center transition-colors hover:bg-ink/[0.02] sm:p-10 ${
                i % 2 === 1 ? "border-l border-ink/[0.08]" : ""
              } ${i >= 2 ? "border-t border-ink/[0.08] lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
            >
              <dt className="mt-2 text-sm text-zinc-500">{s.label}</dt>
              <dd className="bg-gradient-to-b from-ink to-zinc-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 sm:mt-20">
          <SectionHeading
            eyebrow="Technology"
            title="Modern stacks, chosen for your problem"
            description="We're technology-agnostic and pragmatic. Every choice is justified by performance, maintainability and the talent market you'll hire from."
          />

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((g) => (
              <div
                key={g.group}
                className="rounded-2xl border border-ink/[0.08] bg-gradient-to-b from-ink/[0.03] to-transparent p-6"
              >
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{g.group}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="cursor-default rounded-lg border border-ink/[0.08] bg-ink/[0.03] px-3 py-1.5 text-sm text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
