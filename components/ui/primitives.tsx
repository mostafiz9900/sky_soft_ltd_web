import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1440px] ${className}`}
      {...props}
    />
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-zinc-300 backdrop-blur">
      <span className="size-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="text-base leading-7 text-zinc-400 sm:text-lg">{description}</p>}
    </div>
  );
}

type ButtonProps = ComponentProps<"a"> & { variant?: "primary" | "secondary"; arrow?: boolean };

export function ButtonLink({ variant = "primary", arrow, className = "", children, ...props }: ButtonProps) {
  const base =
    "group relative inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_8px_30px_-8px_rgba(139,92,246,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_10px_40px_-6px_rgba(139,92,246,0.8)] hover:brightness-110",
    secondary:
      "border border-ink/10 bg-ink/[0.03] text-zinc-200 hover:border-ink/20 hover:bg-ink/[0.07] hover:text-ink",
  };
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow && (
        <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}
