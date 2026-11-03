import type { ComponentType, SVGProps } from "react";
import {
  CloudIcon,
  CodeBracketIcon,
  CubeIcon,
  DevicePhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@/components/icons";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type Service = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tags: string[];
};

const services: Service[] = [
  {
    title: "Custom Web Platforms",
    description:
      "High-performance SaaS products, portals and internal tools built on modern, type-safe stacks. Designed for scale from day one.",
    icon: CodeBracketIcon,
    tags: ["Next.js", "TypeScript", "Node", "PostgreSQL"],
  },
  {
    title: "Mobile Applications",
    description: "Native-quality iOS and Android apps with a shared codebase and offline-first sync.",
    icon: DevicePhoneIcon,
    tags: ["React Native", "Flutter", "Swift"],
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure as code, CI/CD pipelines and cost-optimised architectures on AWS, GCP and Azure.",
    icon: CloudIcon,
    tags: ["Terraform", "Kubernetes", "AWS"],
  },
  {
    title: "AI & Data Engineering",
    description: "LLM-powered features, RAG pipelines, analytics warehouses and ML models that ship to production.",
    icon: SparklesIcon,
    tags: ["LLMs", "Python", "dbt"],
  },
  {
    title: "Security & Compliance",
    description:
      "Threat modelling, penetration testing and SOC 2 / ISO 27001 readiness, baked into the development lifecycle rather than bolted on.",
    icon: ShieldCheckIcon,
    tags: ["SOC 2", "OWASP", "Zero-trust"],
  },
  {
    title: "Product Design & UX",
    description: "Research, prototyping and design systems that make complex software feel effortless.",
    icon: CubeIcon,
    tags: ["Figma", "Design Systems"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              End-to-end engineering, <span className="text-zinc-500">under one roof.</span>
            </>
          }
          description="From the first wireframe to a globally distributed production system, our cross-functional squads own the outcome."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <SpotlightCard key={s.title} className="h-full">
              <article className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex size-11 items-center justify-center rounded-xl border border-ink/10 bg-gradient-to-br from-blue-500/15 to-violet-500/15 text-violet-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-ink">
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{s.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink/[0.08] bg-ink/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </SpotlightCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
