import {
  siClaude,
  siCloudflare,
  siCpanel,
  siCss,
  siExpress,
  siFirebase,
  siGooglegemini,
  siHostinger,
  siHtml5,
  siJavascript,
  siLaravel,
  siMongodb,
  siMysql,
  siNamecheap,
  siNextdotjs,
  siNodedotjs,
  siOvh,
  siPhp,
  siReact,
  siSupabase,
  siTailwindcss,
  siThreedotjs,
  type SimpleIcon,
} from "simple-icons";

export type SkillCategory = {
  id: string;
  label: string;
  /** One line shown when the category is focused. */
  blurb: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  icon?: Pick<SimpleIcon, "path" | "hex">;
  /** Short glyph when there is no brand icon. */
  glyph?: string;
  context: string;
  /** Project slugs from data/projects.ts. */
  projects?: string[];
};

export const skillCategories: SkillCategory[] = [
  { id: "frontend", label: "Frontend", blurb: "Interfaces, motion and 3D on the web." },
  { id: "backend", label: "Backend", blurb: "APIs, auth and application logic." },
  { id: "data", label: "Database", blurb: "Where products keep their truth." },
  { id: "mobile", label: "Mobile", blurb: "The same ideas, in people's pockets." },
  { id: "ai", label: "AI", blurb: "Tools that speed up thinking and building." },
  { id: "infra", label: "Infrastructure", blurb: "Domains, hosting and getting it live." },
  { id: "creative", label: "Creative", blurb: "The visual side of every build." },
];

export const skills: Skill[] = [
  // Frontend
  { id: "html", name: "HTML", category: "frontend", icon: siHtml5, context: "Semantic, accessible structure underneath every interface." },
  { id: "css", name: "CSS", category: "frontend", icon: siCss, context: "Layout, responsive design and motion without extra weight." },
  { id: "js", name: "JavaScript", category: "frontend", icon: siJavascript, context: "Interactive interfaces and the language across the whole stack." },
  { id: "react", name: "React", category: "frontend", icon: siReact, context: "Component-driven interfaces for products and dashboards." },
  { id: "next", name: "Next.js", category: "frontend", icon: siNextdotjs, context: "Full-stack React apps — including this portfolio." },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", icon: siTailwindcss, context: "Fast, consistent design systems in code." },
  { id: "three", name: "3D web", category: "frontend", icon: siThreedotjs, context: "Three.js scenes for product and brand storytelling.", projects: ["safat-group"] },

  // Backend
  { id: "node", name: "Node.js", category: "backend", icon: siNodedotjs, context: "JavaScript on the server for APIs and automation." },
  { id: "express", name: "Express.js", category: "backend", icon: siExpress, context: "REST APIs and backend architecture for MERN apps." },
  { id: "php", name: "PHP", category: "backend", icon: siPhp, context: "Server-side work for classic hosting environments." },
  { id: "laravel", name: "Laravel", category: "backend", icon: siLaravel, context: "Structured PHP applications with auth and admin." },
  { id: "rest", name: "REST & Auth", category: "backend", glyph: "{ }", context: "API design and authentication for real users.", projects: ["billing-saas", "academy-platform"] },

  // Data
  { id: "mongodb", name: "MongoDB", category: "data", icon: siMongodb, context: "Document data for MERN applications, hosted on Atlas." },
  { id: "mysql", name: "MySQL", category: "data", icon: siMysql, context: "Relational data for PHP and Laravel projects." },
  { id: "supabase", name: "Supabase", category: "data", icon: siSupabase, context: "PostgreSQL, auth and storage for full-stack apps.", projects: ["academy-platform", "billing-saas"] },
  { id: "firebase", name: "Firebase", category: "data", icon: siFirebase, context: "Realtime Database for live-updating features." },

  // Mobile
  { id: "rn", name: "React Native", category: "mobile", icon: siReact, context: "Mobile apps that share thinking — and code — with the web." },

  // AI
  { id: "claude", name: "Claude", category: "ai", icon: siClaude, context: "Reasoning partner for architecture, code and writing." },
  { id: "cursor", name: "Cursor", category: "ai", glyph: "▲", context: "AI-assisted editing inside the codebase." },
  { id: "gemini", name: "Gemini", category: "ai", icon: siGooglegemini, context: "Research, exploration and multimodal ideas." },
  { id: "lovable", name: "Lovable", category: "ai", glyph: "♥", context: "Rapid prototypes to test an idea before building it properly." },

  // Infra
  { id: "hostinger", name: "Hostinger", category: "infra", icon: siHostinger, context: "Hosting and deployment for client websites." },
  { id: "cpanel", name: "cPanel", category: "infra", icon: siCpanel, context: "Server, database and email management." },
  { id: "namecheap", name: "Namecheap", category: "infra", icon: siNamecheap, context: "Domains and DNS configuration." },
  { id: "cloudflare", name: "Cloudflare", category: "infra", icon: siCloudflare, context: "DNS, SSL and performance at the edge." },
  { id: "ovh", name: "OVH", category: "infra", icon: siOvh, context: "Server hosting for production environments." },

  // Creative
  { id: "uiux", name: "UI/UX", category: "creative", glyph: "◧", context: "Flows and interfaces designed before they are coded." },
  { id: "branding", name: "Branding", category: "creative", glyph: "◆", context: "Identity work — logos, colour and type systems." },
  { id: "motion", name: "Motion", category: "creative", glyph: "∿", context: "Motion concepts and interface animation." },
  { id: "aivisual", name: "AI visuals", category: "creative", glyph: "✦", context: "AI image generation for product and marketing visuals." },
];
