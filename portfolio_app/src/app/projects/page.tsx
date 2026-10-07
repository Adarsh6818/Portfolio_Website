import type { Metadata } from "next";
import { Projects } from "@/components/sections/projects";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of things I've designed, built, and shipped — from full products to focused tools.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <Projects index="01" />
      <CtaBand />
    </div>
  );
}
