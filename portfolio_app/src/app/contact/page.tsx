import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact-hero";
import { ContactSocial } from "@/components/sections/contact-social";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — reach me by email, send a message, or find me online.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSocial index="01" />
      <CtaBand />
    </>
  );
}
