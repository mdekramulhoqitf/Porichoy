import * as THREE from "three";

/**
 * Screen artwork for the four hero panels, drawn to <canvas> at runtime so the
 * scene ships no image assets. Each panel is one layer of how a product is made.
 */

export type PanelKind = "code" | "design" | "ai" | "product";

type Fonts = { mono: string; display: string; sans: string };

const W = 1024;
const H = 640;

const C = {
  ink: "#0c0d10",
  graphite: "#16181d",
  carbon: "#1f2228",
  paper: "#f4f5f7",
  mist: "#e8eaee",
  steel: "#6a6f78",
  fog: "#a9adb5",
  signal: "#ff8b00",
  filament: "#ffc90c",
  white: "#ffffff",
};

function readFonts(): Fonts {
  const cs = getComputedStyle(document.documentElement);
  const get = (v: string, fb: string) => cs.getPropertyValue(v).trim() || fb;
  return {
    mono: get("--font-jetbrains", "ui-monospace, monospace"),
    display: get("--font-poppins", "sans-serif"),
    sans: get("--font-inter", "sans-serif"),
  };
}

function rect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string | CanvasGradient,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

function stroke(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, color: string, lw = 2) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.stroke();
}

function chrome(ctx: CanvasRenderingContext2D, f: Fonts, title: string, dark: boolean) {
  const dot = dark ? "#343842" : "#d5d8de";
  [0, 1, 2].forEach((i) => {
    ctx.beginPath();
    ctx.arc(40 + i * 26, 36, 8, 0, Math.PI * 2);
    ctx.fillStyle = dot;
    ctx.fill();
  });
  ctx.font = `500 21px ${f.mono}`;
  ctx.fillStyle = dark ? "#7d828c" : C.steel;
  ctx.textBaseline = "middle";
  ctx.fillText(title, 132, 37);
  ctx.fillStyle = dark ? "rgba(255,255,255,0.06)" : "rgba(12,13,16,0.07)";
  ctx.fillRect(0, 72, W, 2);
}

function drawCode(ctx: CanvasRenderingContext2D, f: Fonts) {
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, W, H);
  chrome(ctx, f, "assembly.tsx", true);

  const kw = "#ff9f33";
  const fn = "#ffd24d";
  const id = "#e8e9ec";
  const pn = "#8b909a";
  const cm = "#565b65";
  type Tok = [string, string];
  const lines: Tok[][] = [
    [["// how a product gets made", cm]],
    [["export ", kw], ["function ", kw], ["Product", fn], ["({ idea }) {", pn]],
    [["  const ", kw], ["design ", id], ["= ", pn], ["craft", fn], ["(idea);", pn]],
    [["  const ", kw], ["system ", id], ["= ", pn], ["engineer", fn], ["(design);", pn]],
    [["  const ", kw], ["faster ", id], ["= ", pn], ["ai", id], [".", pn], ["assist", fn], ["(system);", pn]],
    [],
    [["  return ", kw], ["ship", fn], ["(faster, { care: ", pn], ["true", kw], [" });", pn]],
    [["}", pn]],
  ];

  ctx.textBaseline = "alphabetic";
  lines.forEach((toks, i) => {
    const y = 136 + i * 56;
    ctx.font = `400 22px ${f.mono}`;
    ctx.fillStyle = "#3a3e47";
    ctx.fillText(String(i + 1).padStart(2, " "), 40, y);
    let x = 108;
    ctx.font = `500 27px ${f.mono}`;
    toks.forEach(([t, c]) => {
      ctx.fillStyle = c;
      ctx.fillText(t, x, y);
      x += ctx.measureText(t).width;
    });
    if (i === 6) rect(ctx, x + 6, y - 24, 14, 32, 2, C.signal);
  });
}

function drawDesign(ctx: CanvasRenderingContext2D, f: Fonts) {
  ctx.fillStyle = C.white;
  ctx.fillRect(0, 0, W, H);
  chrome(ctx, f, "product.design", false);

  // Layers rail
  ctx.font = `500 17px ${f.sans}`;
  ctx.textBaseline = "middle";
  ["Frame", "Headline", "Visual", "Button", "Cards"].forEach((l, i) => {
    const y = 118 + i * 44;
    if (i === 1) rect(ctx, 20, y - 17, 196, 34, 8, "rgba(255,139,0,0.1)");
    stroke(ctx, 34, y - 7, 14, 14, 3, i === 1 ? C.signal : C.fog, 2);
    ctx.fillStyle = i === 1 ? C.ink : C.steel;
    ctx.fillText(l, 60, y);
  });

  // Artboard
  const ax = 244;
  const ay = 100;
  const aw = 520;
  const ah = 508;
  rect(ctx, ax, ay, aw, ah, 12, C.paper);
  ctx.strokeStyle = "rgba(255,139,0,0.12)";
  ctx.lineWidth = 1;
  for (let c = 1; c < 6; c++) {
    const x = ax + (aw / 6) * c;
    ctx.beginPath();
    ctx.moveTo(x, ay);
    ctx.lineTo(x, ay + ah);
    ctx.stroke();
  }
  rect(ctx, ax + 36, ay + 52, 330, 34, 6, C.ink);
  rect(ctx, ax + 36, ay + 98, 230, 34, 6, C.ink);
  // selection
  ctx.setLineDash([]);
  stroke(ctx, ax + 28, ay + 44, 346, 96, 2, C.signal, 2);
  [
    [ax + 28, ay + 44],
    [ax + 374, ay + 44],
    [ax + 28, ay + 140],
    [ax + 374, ay + 140],
  ].forEach(([x, y]) => {
    rect(ctx, x - 6, y - 6, 12, 12, 2, C.white);
    stroke(ctx, x - 6, y - 6, 12, 12, 2, C.signal, 2);
  });
  rect(ctx, ax + 28, ay + 150, 148, 28, 6, C.signal);
  ctx.font = `600 15px ${f.mono}`;
  ctx.fillStyle = C.white;
  ctx.fillText("Poppins 600", ax + 40, ay + 165);

  const g = ctx.createLinearGradient(ax + 36, ay + 200, ax + aw - 36, ay + 420);
  g.addColorStop(0, "#d9dce2");
  g.addColorStop(1, "#b9bdc6");
  rect(ctx, ax + 36, ay + 204, aw - 72, 196, 14, "#dfe2e7");
  rect(ctx, ax + 36, ay + 204, aw - 72, 196, 14, g);
  rect(ctx, ax + 36, ay + 426, 132, 44, 22, C.ink);
  stroke(ctx, ax + 180, ay + 426, 132, 44, 22, "rgba(12,13,16,0.25)", 2);

  // Inspector
  ctx.font = `600 104px ${f.display}`;
  ctx.fillStyle = C.ink;
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Aa", 800, 222);
  [C.ink, C.paper, C.signal, C.filament].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(818 + i * 46, 282, 17, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.strokeStyle = "rgba(12,13,16,0.12)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  [0, 1, 2, 3].forEach((i) => {
    const y = 350 + i * 52;
    rect(ctx, 800, y, 180, 6, 3, C.mist);
    rect(ctx, 800, y, 60 + i * 28, 6, 3, i === 0 ? C.ink : C.fog);
    ctx.beginPath();
    ctx.arc(860 + i * 28, y + 3, 10, 0, Math.PI * 2);
    ctx.fillStyle = C.white;
    ctx.fill();
    ctx.strokeStyle = "rgba(12,13,16,0.2)";
    ctx.stroke();
  });
}

function drawAI(ctx: CanvasRenderingContext2D, f: Fonts) {
  ctx.fillStyle = C.graphite;
  ctx.fillRect(0, 0, W, H);
  chrome(ctx, f, "assist.session", true);

  // prompt
  rect(ctx, 330, 104, 650, 92, 22, "#2a2d34");
  ctx.font = `500 25px ${f.sans}`;
  ctx.fillStyle = C.white;
  ctx.textBaseline = "middle";
  ctx.fillText("Three layouts for a booking flow,", 362, 136);
  ctx.fillStyle = "#b8bcc4";
  ctx.fillText("mobile first.", 362, 170);

  // response
  ctx.font = `600 34px ${f.sans}`;
  ctx.fillStyle = C.filament;
  ctx.fillText("✦", 44, 246);
  ctx.font = `500 20px ${f.mono}`;
  ctx.fillStyle = "#8b909a";
  ctx.fillText("3 directions · for review", 92, 246);

  [0, 1, 2].forEach((i) => {
    const x = 44 + i * 318;
    const y = 290;
    rect(ctx, x, y, 292, 250, 18, "#23262d");
    stroke(ctx, x, y, 292, 250, 18, i === 1 ? C.signal : "rgba(255,255,255,0.08)", 2);
    rect(ctx, x + 24, y + 26, 150, 14, 7, "#3a3e47");
    rect(ctx, x + 24, y + 50, 100, 14, 7, "#3a3e47");
    if (i === 0) {
      rect(ctx, x + 24, y + 86, 244, 90, 12, "#30343c");
    } else if (i === 1) {
      rect(ctx, x + 24, y + 86, 116, 90, 12, "#30343c");
      rect(ctx, x + 152, y + 86, 116, 90, 12, "#30343c");
    } else {
      [0, 1, 2].forEach((r) => rect(ctx, x + 24, y + 86 + r * 32, 244, 22, 8, "#30343c"));
    }
    rect(ctx, x + 24, y + 196, 96, 30, 15, i === 1 ? C.signal : "#3a3e47");
  });

  rect(ctx, 44, 572, 214, 40, 20, "rgba(255,255,255,0.07)");
  ctx.font = `500 18px ${f.mono}`;
  ctx.fillStyle = "#d7d9de";
  ctx.fillText("→ human decides", 64, 592);
}

function drawProduct(ctx: CanvasRenderingContext2D, f: Fonts) {
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, W, H);
  // browser chrome
  ctx.fillStyle = C.white;
  ctx.fillRect(0, 0, W, 74);
  [0, 1, 2].forEach((i) => {
    ctx.beginPath();
    ctx.arc(40 + i * 26, 37, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#d5d8de";
    ctx.fill();
  });
  rect(ctx, 312, 18, 400, 38, 19, C.paper);
  ctx.font = `500 19px ${f.mono}`;
  ctx.fillStyle = C.steel;
  ctx.textBaseline = "middle";
  ctx.fillText("your-product.live", 404, 38);
  ctx.beginPath();
  ctx.arc(384, 37, 6, 0, Math.PI * 2);
  ctx.fillStyle = C.signal;
  ctx.fill();

  // page nav
  rect(ctx, 48, 110, 30, 30, 8, C.ink);
  [0, 1, 2].forEach((i) => rect(ctx, 640 + i * 90, 119, 64, 12, 6, "#c9ccd3"));
  rect(ctx, 916, 106, 64, 38, 19, C.ink);

  // hero copy
  ctx.font = `600 78px ${f.display}`;
  ctx.fillStyle = C.ink;
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Ship it.", 48, 262);
  rect(ctx, 48, 294, 360, 14, 7, "#c9ccd3");
  rect(ctx, 48, 320, 280, 14, 7, "#c9ccd3");
  rect(ctx, 48, 362, 170, 52, 26, C.ink);
  ctx.font = `500 20px ${f.sans}`;
  ctx.fillStyle = C.white;
  ctx.textBaseline = "middle";
  ctx.fillText("Get started", 74, 389);
  stroke(ctx, 232, 362, 140, 52, 26, "rgba(12,13,16,0.2)", 2);

  // visual
  const g = ctx.createLinearGradient(520, 170, 980, 440);
  g.addColorStop(0, "#1f2228");
  g.addColorStop(1, "#0c0d10");
  rect(ctx, 520, 176, 460, 262, 22, g);
  ctx.beginPath();
  ctx.arc(830, 300, 70, 0, Math.PI * 2);
  const rg = ctx.createRadialGradient(810, 280, 10, 830, 300, 80);
  rg.addColorStop(0, C.filament);
  rg.addColorStop(1, C.signal);
  ctx.fillStyle = rg;
  ctx.fill();
  rect(ctx, 552, 396, 120, 12, 6, "rgba(255,255,255,0.25)");

  // cards
  [0, 1, 2].forEach((i) => {
    const x = 48 + i * 316;
    rect(ctx, x, 470, 296, 140, 18, C.white);
    stroke(ctx, x, 470, 296, 140, 18, "rgba(12,13,16,0.06)", 2);
    rect(ctx, x + 22, 494, 36, 36, 10, i === 0 ? C.signal : C.mist);
    rect(ctx, x + 22, 552, 180, 12, 6, "#c9ccd3");
    rect(ctx, x + 22, 576, 120, 12, 6, C.mist);
  });
}

const drawers: Record<PanelKind, (ctx: CanvasRenderingContext2D, f: Fonts) => void> = {
  code: drawCode,
  design: drawDesign,
  ai: drawAI,
  product: drawProduct,
};

export function createPanelTexture(kind: PanelKind, maxAnisotropy: number) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  drawers[kind](ctx, readFonts());
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, maxAnisotropy);
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

export const PANEL_ASPECT = W / H;
