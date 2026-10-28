/**
 * LAB — experiments and creative practice. Each entry renders a small live
 * visual (see components/lab/LabVisual.tsx). Add `image` to show real work.
 */

export type LabEntry = {
  id: string;
  title: string;
  kind: "Experiment" | "Creative" | "Prototype";
  line: string;
  visual: "orbit" | "flow" | "grid" | "type" | "prompt" | "brand";
  size: "wide" | "tall" | "square";
  image?: string;
};

export const labEntries: LabEntry[] = [
  {
    id: "this-site",
    title: "This portfolio",
    kind: "Prototype",
    line: "Next.js, React Three Fiber and Motion — the hero scene is built live in your browser.",
    visual: "orbit",
    size: "wide",
  },
  {
    id: "ai-visuals",
    title: "AI visual generation",
    kind: "Creative",
    line: "Product and marketing visuals explored with image models, then art-directed by hand.",
    visual: "prompt",
    size: "tall",
  },
  {
    id: "creative-coding",
    title: "Creative coding",
    kind: "Experiment",
    line: "Generative systems and small canvas sketches.",
    visual: "flow",
    size: "square",
  },
  {
    id: "ui-experiments",
    title: "UI experiments",
    kind: "Experiment",
    line: "Interaction patterns tried in isolation before they reach a product.",
    visual: "grid",
    size: "square",
  },
  {
    id: "branding",
    title: "Branding & graphics",
    kind: "Creative",
    line: "Logos, colour systems, marketing creatives and product visuals.",
    visual: "brand",
    size: "square",
  },
  {
    id: "type-motion",
    title: "Motion concepts",
    kind: "Creative",
    line: "Type and interface motion studies.",
    visual: "type",
    size: "wide",
  },
];
