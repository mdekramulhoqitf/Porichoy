# Ekram — Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion, React Three Fiber and Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

All content lives in `src/data/` — components read from it, so you rarely need to touch UI code.

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, roles, email, CV link, social links |
| `projects.ts` | Every project + its 8-chapter case study. `featured: true` puts it in the stacked showcase |
| `skills.ts` | Skills ecosystem nodes, categories and project associations |
| `journey.ts` | Experience timeline + the Digital Hub 30-30 Program |
| `build.ts` | "What I build" pipeline and build types |
| `lab.ts` | Lab experiments / creative tiles |

### Before publishing

- `profile.ts` → set `email`, `cvUrl` and each social `href` (they currently render as "soon").
- `projects.ts` → review every `role`, `stack` and case-study chapter; the copy was drafted from the brief.
- Add real screenshots: drop images in `public/work/` and set `image: "/work/vingobd.png"` on a project — it replaces the illustrated mockup everywhere. Same for `image` on Lab entries.
- Add years to Creative IT Institute / Digital Hub in `journey.ts` if you want them shown.

## Structure

```
src/
  app/                 layout, home, /work/[slug] case studies, 404, icon
  components/
    hero/              3D "Assembly" scene (R3F) + procedural panel textures
    work/              stacked featured showcase, more-work index, project mockups
    sections/          manifesto, about, experience, skills, what-I-build, AI, lab
    case/              case-study chapter nav, tilt stage, stack diagram
    layout/            nav, contact workspace + footer
    providers/         Lenis smooth scroll, custom cursor
    ui/                button, magnetic wrapper, reveal animations, section head
  data/                all content
```

## Notes

- The hero 3D scene is client-only (`next/dynamic`, `ssr: false`), draws its screen textures on `<canvas>` at runtime (no image assets), pauses when off-screen, and drops contact shadows on smaller screens.
- `prefers-reduced-motion` disables smooth scroll, the custom cursor, intro/float animation and scroll-pinned horizontal movement.
- Project visuals morph between the home page and case studies using React `<ViewTransition>` (Chromium/Safari; other browsers just navigate).
