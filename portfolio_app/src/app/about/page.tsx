import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "Get to know me — my background, what I do, and the experience behind my work.",
};

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      <About index="01" />
      <Experience index="02" />
      <CtaBand />
    </div>
  );
}
