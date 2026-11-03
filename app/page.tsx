import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { BenemoyShowcase } from "@/components/sections/BenemoyShowcase";
import { Clients } from "@/components/sections/Clients";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <Services />
        <Projects />
        <BenemoyShowcase />
        <Clients />
        <Process />
        <TechStack />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
