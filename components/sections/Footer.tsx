import { LogoMark } from "@/components/icons";
import { Container } from "@/components/ui/primitives";

const columns = [
  {
    title: "Services",
    links: ["Web Platforms", "Mobile Apps", "Cloud & DevOps", "AI & Data", "Security"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Case Studies", "Blog"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/[0.06] pb-10 pt-12 sm:pt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5 text-ink" aria-label="Sky Soft Ltd home">
              <LogoMark className="size-7" />
              <span className="text-[15px] font-semibold tracking-tight">Sky Soft</span>
            </a>
            <p className="mt-4 text-sm leading-6 text-zinc-500">
              Senior software engineering and IT solutions for companies that refuse to compromise on quality.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-xs text-zinc-500">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Accepting new projects
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-3">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="text-sm font-medium text-ink">{c.title}</h3>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-zinc-500 transition-colors hover:text-ink">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink/[0.06] pt-8 text-xs text-zinc-600 sm:flex-row">
          <p>© 2026 Sky Soft Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {["GitHub", "LinkedIn", "X"].map((s) => (
              <a key={s} href="#" className="transition-colors hover:text-zinc-300">
                {s}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
