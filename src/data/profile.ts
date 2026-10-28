/**
 * Single source of truth for personal details.
 * Anything left as `null` is hidden or shown as a quiet placeholder in the UI —
 * fill these in rather than editing components.
 */

export type SocialLink = {
  label: string;
  /** `null` renders as a muted "link soon" item instead of a dead link. */
  href: string | null;
};

export const profile = {
  name: "MD EKRAMUL HOQ",
  roles: ["Creative Technologist", "Full-Stack Developer", "Digital Product Builder"],
  thesis: "Building digital experiences where code, design and AI meet.",
  base: "Bangladesh",
  city: "Dhaka",
  timeZone: "Asia/Dhaka",
  /** Shows the "Available for new projects" badge in the footer. */
  available: true,
  currentCompany: "Digital Hub Bangladesh Ltd",
  freelancingSince: "2021",
  education: {
    school: "Daffodil International University",
    short: "DIU",
    program: "B.Sc. in Computer Science & Engineering",
  },
  email: "mdekramulhoqitf@gmail.com" as string | null,
  /** TODO: path under /public, e.g. "/ekram-cv.pdf". */
  cvUrl: null as string | null,
  socials: [
    { label: "GitHub", href: "https://github.com/mdekramulhoqitf" },
    { label: "Facebook", href: "https://www.facebook.com/mdekramulhoq.diu" },
    { label: "WhatsApp", href: "https://wa.me/8801997748846" },
    { label: "01997748846", href: "tel:+8801997748846" },
    { label: "LinkedIn", href: null },
  ] satisfies SocialLink[],
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Lab", href: "/#lab" },
  { label: "Contact", href: "/#contact" },
] as const;
