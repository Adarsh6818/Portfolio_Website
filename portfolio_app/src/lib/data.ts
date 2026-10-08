/**
 * Single source of truth for all portfolio content.
 * Swap the placeholder values below for real content.
 */

export const siteConfig = {
  name: "Adarsh",
  /** Shown in the browser tab / SEO */
  fullName: "Adarsh Vishwakarma",
  role: "Software Developer",
  /** One-line value proposition for the hero */
  tagline:
    "I build fast, scalable, production-ready web experiences from frontend to backend.",
  shortBio:
    "Full-stack developer focused on clean, performant interfaces and reliable systems. I turn ideas into polished digital products.",
  location: "India",
  availability: "Available for projects",
  email: "adarshvish01@gmail.com",
  resumeUrl: "/resume.pdf",
  url: "https://example.com",
};

export type SocialLink = {
  label: string;
  href: string;
  /** lucide-react icon name resolved in the component */
  icon: "github" | "linkedin" | "twitter" | "mail" | "instagram" | "facebook";
};

export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/", icon: "github" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
];

/** Primary navigation (the logo itself links Home, so Home is omitted here). */
export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

/** Shown separately on the right of the navbar. */
export const adventureLink = { label: "Let's Adventure", href: "/adventure" };

/** Links used in the footer (includes Home). */
export const footerLinks = [
  { label: "Home", href: "/" },
  ...navLinks,
  adventureLink,
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "Docker", "Vercel", "AWS", "Figma", "Jest"],
  },
];

/**
 * Technologies shown in the honeycomb. `slug` is a simple-icons slug
 * (resolved to a logo in the SkillHoneycomb component). Order matters:
 * the first six fill the inner ring, the rest fill the outer ring.
 */
export type Tech = { name: string; slug: string };

export const techStack: Tech[] = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "JavaScript", slug: "javascript" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS", slug: "css" },
  { name: "Express", slug: "express" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Prisma", slug: "prisma" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Docker", slug: "docker" },
  { name: "Vercel", slug: "vercel" },
  { name: "Figma", slug: "figma" },
  { name: "Jest", slug: "jest" },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  sourceUrl?: string;
  /** path under /public, e.g. /projects/foo.png */
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Commerce Platform",
    description:
      "A full-stack e-commerce storefront with cart, checkout, and an admin dashboard. Optimized for Core Web Vitals and SEO.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com/",
    featured: true,
  },
  {
    title: "Realtime Chat App",
    description:
      "A realtime messaging application with presence, typing indicators, and group channels powered by WebSockets.",
    tech: ["React", "Node.js", "Socket.IO", "MongoDB"],
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com/",
    featured: true,
  },
  {
    title: "Analytics Dashboard",
    description:
      "An analytics dashboard turning raw event data into interactive charts, filters, and exportable reports.",
    tech: ["Next.js", "TypeScript", "Prisma", "Recharts"],
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com/",
    featured: true,
  },
  {
    title: "Task Manager API",
    description:
      "A RESTful task-management API with authentication, role-based access, and comprehensive test coverage.",
    tech: ["Node.js", "Express", "PostgreSQL", "Jest"],
    sourceUrl: "https://github.com/",
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const experience: Experience[] = [
  {
    role: "Software Developer",
    company: "Company Name",
    period: "2024 — Present",
    description:
      "Build and maintain production web applications across the stack, collaborating with design and product to ship features that scale.",
  },
  {
    role: "Frontend Developer",
    company: "Previous Company",
    period: "2022 — 2024",
    description:
      "Developed responsive, accessible interfaces and reusable component libraries, improving page performance and developer velocity.",
  },
  {
    role: "Freelance Developer",
    company: "Self-employed",
    period: "2021 — 2022",
    description:
      "Delivered websites and web apps for small businesses and startups, owning projects from requirements to deployment.",
  },
];
