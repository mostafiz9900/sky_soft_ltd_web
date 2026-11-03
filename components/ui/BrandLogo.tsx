import Image from "next/image";
import logoDark from "@/public/brand/logo-dark.png";
import logoLight from "@/public/brand/logo-light.png";

// Both wordmarks are rendered; the `light:` variant on <html data-theme> decides which shows,
// so it switches instantly with the theme toggle and never mismatches the server HTML.
export function BrandLogo({ className = "h-8", preload }: { className?: string; preload?: boolean }) {
  return (
    <>
      <Image src={logoDark} alt="Sky Soft Ltd" preload={preload} sizes="240px" className={`w-auto ${className} light:hidden`} />
      <Image src={logoLight} alt="Sky Soft Ltd" sizes="240px" className={`hidden w-auto ${className} light:block`} />
    </>
  );
}
