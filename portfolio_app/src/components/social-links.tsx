import { Mail } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/brand-icons";
import { socials, type SocialLink } from "@/lib/data";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  mail: Mail,
} as const;

function isExternal(href: string) {
  return href.startsWith("http");
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((social: SocialLink) => {
        const Icon = iconMap[social.icon];
        return (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            title={social.label}
            target={isExternal(social.href) ? "_blank" : undefined}
            rel={isExternal(social.href) ? "noopener noreferrer" : undefined}
            className="grid size-11 place-items-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          >
            <Icon className="size-5" />
          </a>
        );
      })}
    </div>
  );
}
