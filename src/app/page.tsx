import { Achievements } from "@/components/Achievements";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Contact } from "@/components/Contact";
import { CosmosField } from "@/components/CosmosField";
import { CustomCursor } from "@/components/CustomCursor";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProgressRail } from "@/components/ProgressRail";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="relative">
      <AmbientBackground />
      <CosmosField />
      <ProgressRail />
      <ThemeToggle />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Achievements />
      <Contact />
      <Footer />
      <CustomCursor />

      {/* Cinematic film-grain overlay */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-[70]"
      />
    </main>
  );
}