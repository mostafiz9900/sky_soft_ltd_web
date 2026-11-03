"use client";

import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@/components/icons";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#stack", label: "Technology" },
  { href: "#clients", label: "Clients" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink/[0.08] bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="flex shrink-0 items-center transition-opacity hover:opacity-85" aria-label="Sky Soft Ltd home">
          <BrandLogo className="h-9 sm:h-10" preload />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-sm text-zinc-400 xl:px-4 transition-colors hover:bg-ink/[0.05] hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a href="#contact" className="text-sm text-zinc-400 transition-colors hover:text-ink">
            Contact
          </a>
          <ButtonLink href="#contact" className="h-9 whitespace-nowrap px-4" arrow>
            Start a project
          </ButtonLink>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-ink/[0.06] hover:text-ink"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <Container className="flex flex-col gap-1 pb-6 pt-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-zinc-300 transition-colors hover:bg-ink/[0.05] hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <ButtonLink href="#contact" onClick={() => setOpen(false)} className="mt-3" arrow>
              Start a project
            </ButtonLink>
          </Container>
        </div>
      </div>
    </header>
  );
}
