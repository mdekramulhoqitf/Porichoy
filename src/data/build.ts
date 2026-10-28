/** "What I build" — the pipeline and the kinds of products. */

export const pipeline = [
  { id: "concept", label: "Concept", line: "Shape the idea, the users and the one job it must do." },
  { id: "design", label: "Design", line: "Flows, interfaces and a visual system worth building." },
  { id: "development", label: "Development", line: "Frontend and backend, written to last." },
  { id: "database", label: "Database", line: "Data models, auth and the rules that protect them." },
  { id: "deployment", label: "Deployment", line: "Domains, DNS, SSL and a production that stays up." },
] as const;

export type BuildType = {
  name: string;
  /** Project slugs that are examples of this kind of build. */
  examples?: string[];
};

export const buildTypes: BuildType[] = [
  { name: "Digital products", examples: ["vingobd", "wishhub"] },
  { name: "SaaS applications", examples: ["billing-saas"] },
  { name: "Booking systems", examples: ["stay-booking", "dental-platform"] },
  { name: "Education platforms", examples: ["academy-platform"] },
  { name: "Admin dashboards", examples: ["academy-platform", "dental-platform"] },
  { name: "Business websites", examples: ["safat-group"] },
  { name: "E-commerce websites", examples: ["product-storefronts"] },
  { name: "AI-powered applications", examples: ["research-ai"] },
  { name: "Automation systems", examples: ["wishhub"] },
  { name: "API-driven applications" },
  { name: "Full-stack applications" },
  { name: "Mobile applications" },
  { name: "Landing pages" },
  { name: "Portfolio websites" },
];
