/**
 * Career + study timeline. `when` is only filled where the date is known —
 * add years to Creative IT Institute / Digital Hub when you want them shown.
 */

export type Chapter = {
  id: string;
  lane: "work" | "study";
  when?: string;
  title: string;
  org: string;
  body: string;
  tags?: string[];
  current?: boolean;
};

export const chapters: Chapter[] = [
  {
    id: "freelance",
    lane: "work",
    when: "2021",
    title: "Freelancing",
    org: "Fiverr · Upwork",
    body: "Started taking on web projects for clients. Learned to scope a brief, communicate clearly and ship on a deadline.",
    tags: ["Client work", "Websites", "Delivery"],
  },
  {
    id: "creative-it",
    lane: "work",
    title: "Creative IT Institute",
    org: "Previous role",
    body: "Worked in a professional institute environment, alongside designers and developers.",
    tags: ["Team work", "Web"],
  },
  {
    id: "digital-hub",
    lane: "work",
    when: "Now",
    title: "Digital Hub Bangladesh Ltd",
    org: "Current",
    body: "Building digital products and client work across web, branding, automation and AI-related services — including WishHub.",
    tags: ["WishHub", "Products", "30-30 Program"],
    current: true,
  },
  {
    id: "diu",
    lane: "study",
    title: "Computer Science & Engineering",
    org: "Daffodil International University",
    body: "Studying the fundamentals — algorithms, systems, databases — alongside real-world work.",
    tags: ["CSE", "DIU"],
    current: true,
  },
];

/** The Digital Hub 30-30 Program — shown as context, not as a company page. */
export const thirtyThirty = {
  name: "30-30 Program",
  line: "Ongoing A–Z digital support for startups and businesses.",
  services: [
    "Logo design",
    "Branding",
    "Banner design",
    "Messenger automation",
    "Reels strategy & production",
    "Website audit",
    "Social media posts",
    "Motion graphics",
    "Digital marketing",
  ],
};
