import type { Metadata } from "next";
import { ContactDirect } from "@/components/sections/contact-direct";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactSocial } from "@/components/sections/contact-social";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — reach me by email, send a message, or find me online.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 md:pt-28">
      <ContactDirect index="01" />
      <ContactForm index="02" />
      <ContactSocial index="03" />
      <CtaBand />
    </div>
  );
}
