import { CheckIcon, EnvelopeIcon } from "@/components/icons";
import { ButtonLink, Container } from "@/components/ui/primitives";

const perks = ["Free 30-minute consultation", "Fixed-price proposal in 5 days", "NDA on request"];

export function CallToAction() {
  return (
    <section id="contact" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl border border-ink/10 bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="animate-pulse-slow absolute left-1/2 top-full -z-10 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.45),rgba(139,92,246,0.15)_60%,transparent)] blur-2xl"
          />
          {/* Top edge highlight */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
          />

          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Have a project in mind? <span className="text-gradient">Let&apos;s build it.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            Tell us about your idea, product or legacy system. A senior engineer, not a salesperson, will get back to
            you within one business day.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="mailto:dev@skysoftltd.com" arrow className="w-full sm:w-auto">
              Start a project
            </ButtonLink>
            <ButtonLink href="mailto:dev@skysoftltd.com" variant="secondary" className="w-full sm:w-auto">
              <EnvelopeIcon className="size-4" />
              dev@skysoftltd.com
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-400 sm:flex-row">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <CheckIcon className="size-4 text-violet-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
