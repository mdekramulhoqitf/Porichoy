import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter, JetBrains_Mono, Poppins } from "next/font/google";
import { Cursor } from "@/components/providers/Cursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { AskAI } from "@/components/layout/AskAI";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });
// Only used inside the VingoBD mockup; not preloaded so it never blocks the hero.
const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali"],
  weight: ["500", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Creative Technologist & Full-Stack Developer`,
    template: `%s — ${profile.name}`,
  },
  description: `${profile.name} designs and builds digital products where code, design and AI meet. Full-stack developer based in ${profile.base}.`,
  openGraph: {
    title: `${profile.name} — Creative Technologist`,
    description: profile.thesis,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f5f7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${jetbrains.variable} ${hind.variable} antialiased`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <SiteFooter />
        <CommandPalette />
        <AskAI />
      </body>
    </html>
  );
}
