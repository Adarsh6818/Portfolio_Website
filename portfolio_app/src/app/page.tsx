import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { CtaBand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills index="01" />
      <Projects index="02" limit={3} showViewAll />
      <CtaBand />
    </>
  );
}
