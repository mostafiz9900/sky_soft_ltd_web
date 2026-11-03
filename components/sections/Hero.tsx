import { HeroSlider } from "@/components/sections/HeroSlider";
import { clients as clientList } from "@/components/sections/clients-data";

const clients = clientList.map((c) => c.short);

export function Hero() {
  return (
    <section id="top" className="relative">
      <HeroSlider />

      {/* Logo marquee */}
      <div className="relative border-b border-ink/[0.06] py-10">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Trusted by leading brokerage houses
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
          <ul className="animate-marquee flex w-max gap-16 hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((name, i) => (
              <li
                key={i}
                aria-hidden={i >= clients.length}
                className="whitespace-nowrap text-xl font-semibold tracking-tight text-zinc-600 transition-colors hover:text-zinc-300"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
