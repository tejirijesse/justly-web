# Justly — Website

> **Your rights. Secured.**
>
> Marketing site for [Justly](https://getjustly.org) — the digital legal infrastructure closing the access to justice gap across Nigeria, Kenya, Ghana, Uganda, and Rwanda.

Single-page React application. Pure black and white. Editorial, brutalist-lite. Heavy on interaction — custom cursor, scroll-linked progress, section-active nav, magnetic buttons, interactive terminal, hover-reveal markets, animated traction bars, live join toasts, multi-currency pricing, searchable FAQ.

- **Live:** https://tejirijesse.github.io/justly-web/
- **Repo:** https://github.com/tejirijesse/justly-web

---

## Contents

1. [Stack](#stack)
2. [Quick start](#quick-start)
3. [Project structure](#project-structure)
4. [Design system](#design-system)
5. [Sections](#sections)
6. [Interactive features](#interactive-features)
7. [Customising copy and data](#customising-copy-and-data)
8. [Build and deploy](#build-and-deploy)
9. [Accessibility and motion](#accessibility-and-motion)
10. [Performance notes](#performance-notes)
11. [Browser support](#browser-support)
12. [Troubleshooting](#troubleshooting)
13. [License](#license)

---

## Stack

| Layer       | Choice                     | Why                                                    |
|-------------|----------------------------|--------------------------------------------------------|
| Bundler     | **Vite 5**                 | Fast dev server, zero-config React, tiny prod bundles |
| Framework   | **React 18**               | Component model fits the section-by-section layout     |
| Styling     | **Tailwind CSS 3**         | Design tokens in one config; no CSS file to hunt       |
| Motion      | **Framer Motion 11**       | Declarative scroll reveals, layout animations          |
| Icons       | **lucide-react**           | Consistent 1.5 stroke-width line icons                 |
| Fonts       | Inter + JetBrains Mono     | Editorial sans + mono, loaded from Google Fonts        |

No UI kit, no component library, no runtime state manager. Everything is local `useState` / custom hooks.

---

## Quick start

```bash
# install
npm install

# dev — http://localhost:5173
npm run dev

# production build → dist/
npm run build

# preview the built site — http://localhost:5180
npm run preview
```

Node 18+ recommended. No environment variables required to run locally.

---

## Project structure

```
justly-site/
├── index.html              # Vite HTML entry
├── vite.config.js          # base path, dev server config
├── tailwind.config.js      # design tokens (colors, fonts, keyframes)
├── postcss.config.js
├── package.json
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions → GitHub Pages
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Orchestrates chrome + sections
    ├── index.css           # Tailwind + global CSS (cursor, marquee, a11y)
    ├── data.js             # ALL copy, stats, and content lives here
    ├── hooks.js            # useReveal, useMagnetic, useTilt, useCountUp,
    │                       # useScrollDirection, useScrollProgress,
    │                       # useActiveSection, useMousePosition
    ├── chrome/             # Overlays shown on every view
    │   ├── CursorFollower.jsx   # Custom dot + ring cursor with labels
    │   ├── ProgressBar.jsx      # Top-of-page scroll progress
    │   ├── Nav.jsx              # Hide-on-scroll + active section highlight
    │   ├── Marquee.jsx          # Black strip under nav
    │   ├── ScrollToTop.jsx      # Floating return-to-top button
    │   └── JoinToast.jsx        # Mock waitlist-join toast rotation
    ├── ui/                 # Reusable primitives
    │   ├── Reveal.jsx           # Fade-up on enter-viewport wrapper
    │   ├── MagneticButton.jsx   # Cursor-attracting button/link
    │   ├── TiltCard.jsx         # 3D tilt on hover wrapper
    │   ├── Counter.jsx          # Count-up animation
    │   ├── Typewriter.jsx       # Cycling typing effect
    │   ├── TerminalCard.jsx     # Interactive command terminal
    │   └── Icon.jsx             # Named Lucide icon lookup
    └── sections/           # One file per section — rendered in order by App.jsx
        ├── Hero.jsx             # Typewriter, stats, terminal
        ├── NumberBand.jsx       # Black band, three big numbers
        ├── Problem.jsx          # 01 — stats with tilt cards
        ├── Solution.jsx         # 02 — four-layer platform grid
        ├── HowItWorks.jsx       # 03 — three-step flow
        ├── Platforms.jsx        # 04 — WhatsApp / Mobile / Web
        ├── Impact.jsx           # 05 — mission + founders
        ├── SDG.jsx              # 06 — UN Sustainable Development Goals
        ├── Markets.jsx          # 07 — five countries with hover reveal
        ├── Traction.jsx         # 08 — animated metric bars
        ├── Pricing.jsx          # 09 — three tiers + currency switcher
        ├── FAQ.jsx              # 10 — accordion with search filter
        ├── Waitlist.jsx         # Email capture with success state
        └── Footer.jsx           # Four link columns + socials
```

### File-size budget

- Largest file is `src/data.js` (~7 KB) — intentional, everything textual lives there.
- No file in `src/` exceeds 250 lines. If a section grows past that, split it.

---

## Design system

> Pure black and white. No gradients. No shadows. No color accents. Contrast is the only brand emphasis.

### Tokens (`tailwind.config.js`)

```js
colors: {
  ink:   '#000000',   // primary text, borders-on-hover, CTAs
  paper: '#FFFFFF',   // primary background
  mist:  '#F9F9F9',   // alternating section background
  rule:  '#E5E7EB',   // default borders
  muted: '#6B7280'    // secondary text
}
```

### Typography

- **Sans:** Inter 400, 500, 600, 700, 800, 900
- **Mono:** JetBrains Mono 400, 500, 600 — used for labels, numbers, tags
- **Scale:** `text-4xl md:text-6xl` for section headlines, `text-5xl md:text-7xl` for hero, `text-lg` for body paragraphs, `text-xs uppercase tracking-widest` for labels

### Section rhythm

Sections alternate between `bg-paper` (white) and `bg-mist` (#F9F9F9) with black bands at Number Band, Impact, Waitlist, and Footer breaking the rhythm. Vertical padding is `py-28`. Max width is `max-w-7xl`, horizontal padding `px-6 md:px-10`.

### Card language

- Sharp corners (`rounded-none`)
- 1px rule borders (`border-rule`)
- Hover: border goes black (`hover:border-black`)
- Optional black accent-bar on left (see Solution)
- Tilt on problem cards (very subtle — max 5°)

### Motion

- Reveal on scroll with `transform: translateY(24px) → 0`, `opacity: 0 → 1`, easing `cubic-bezier(0.22, 1, 0.36, 1)`, 700ms.
- Nav hides translating `y: -80` in 350ms.
- FAQ opens with height/opacity tween in 350ms.
- Counters ease-out cubic over 1.8s.
- All animations respect `prefers-reduced-motion`.

---

## Sections

Rendered in order by `App.jsx`:

| # | Section     | Id           | Background | Highlights                                            |
|---|-------------|--------------|------------|-------------------------------------------------------|
| — | Hero        | `#top`       | White      | Typewriter, counters, **interactive terminal**        |
| — | Number Band | —            | Black      | `4.5B / $37B / 13K` with count-up                     |
| 01| Problem     | `#problem`   | White      | Tilt-cards with `70% / 3% / $0`                       |
| 02| Solution    | `#product`   | Mist       | Four-layer grid with accent-bar-on-hover              |
| 03| How It Works| —            | White      | Three-step flow with connecting line                  |
| 04| Platforms   | —            | Mist       | WhatsApp / Mobile / Web                               |
| 05| Impact      | `#impact`    | Black      | Mission + founders (Linda / Ali)                      |
| 06| SDG         | `#sdg`       | Mist       | UN Goals 16, 10, 5, 1                                 |
| 07| Markets     | `#mission`   | White      | **Hover reveal** — each country shows a local stat    |
| 08| Traction    | —            | Mist       | **Animated bars** fill to proportional widths         |
| 09| Pricing     | `#pricing`   | White      | **Currency switcher** — USD / NGN / KES / GHS / UGX / RWF |
| 10| FAQ         | —            | Mist       | **Searchable** accordion                              |
| — | Waitlist    | `#waitlist`  | Black      | Email capture with success micro-animation            |
| — | Footer      | `#company`*  | Black      | Four link columns + socials                           |

*The `#company` id is attached to the founders grid in Impact, not the footer, so the nav link scrolls there.

---

## Interactive features

Every feature is keyboard-reachable and respects `prefers-reduced-motion`.

### Chrome-level (on every screen)

- **Custom cursor** (`CursorFollower.jsx`) — 6px dot that follows instantly, 28px ring that trails with lerp. Ring grows to 40px over interactive targets. Elements with `data-cursor="join"` morph the ring into a 72px label pill. Hidden on touch devices.
- **Scroll progress bar** (`ProgressBar.jsx`) — 2px black line at the top of the page, scaled 0→1 via `useScrollProgress`.
- **Hide-on-scroll nav** (`Nav.jsx`) — `useScrollDirection` returns `down` past 120px, nav translates `-80px`.
- **Active section highlight** (`Nav.jsx`) — `useActiveSection` watches offsets; the current link gets an underline that scales in.
- **Scroll to top** (`ScrollToTop.jsx`) — appears after leaving the top of the page.
- **Live join toasts** (`JoinToast.jsx`) — rotating mock `Ada O. · Lagos — just joined the waitlist` notifications bottom-left. Purely decorative social proof.

### Section-level

- **Interactive terminal** (`ui/TerminalCard.jsx`, Hero) — plays a scripted reveal, then accepts commands. Try `help`, `jurisdictions`, `case`, `pricing`, `clear`.
- **Typewriter headline** (`ui/Typewriter.jsx`, Hero) — cycles `Everyone. → Africa. → The Forgotten. → You.`
- **Count-up numbers** (`ui/Counter.jsx`) — every stat animates once when scrolled into view.
- **Magnetic buttons** (`ui/MagneticButton.jsx`) — primary CTAs pull toward the cursor on hover with `strength=0.2` (default).
- **Tilt problem cards** (`ui/TiltCard.jsx`) — `Problem` section cards tilt ±5° following the cursor.
- **Country hover reveal** (`Markets.jsx`) — each country card reveals its justice-gap stat in an overlay; the same stat is echoed in a detail panel below.
- **Animated traction bars** (`Traction.jsx`) — each metric gets a proportional bar that fills on enter-viewport.
- **Currency switcher** (`Pricing.jsx`) — pills above the tiers switch the displayed price between USD, NGN, KES, GHS, UGX, RWF (rates in `data.js` are indicative).
- **FAQ search** (`FAQ.jsx`) — real-time substring filter across question + answer.
- **Waitlist success state** (`Waitlist.jsx`) — submit button animates to `✓ You're in.` and locks.

### Custom cursor labels

Any element can declare a label for the cursor:

```jsx
<a href="#top" data-cursor="top">JUSTLY</a>
```

The ring becomes a 72px pill with the label inside — useful for CTAs, country cards (`data-cursor={c.name.toLowerCase()}`), and navigation.

---

## Customising copy and data

All site content lives in `src/data.js`. There is **no copy in components** except section labels and the three headlines that are tightly coupled to layout. Typical edits:

| To change…              | Edit                                              |
|-------------------------|---------------------------------------------------|
| Hero rotating word      | `typewriterWords` in `data.js`                    |
| Hero stats              | `heroStats`                                       |
| Marquee ticker items    | `marqueeItems`                                    |
| Terminal demo lines     | `terminalLines`                                   |
| Terminal command output | `terminalCommands`                                |
| Problem stats           | `problemStats`                                    |
| Platform layers         | `solutionCards` (icons come from `Icon.jsx`)      |
| Steps in How It Works   | `howItWorks`                                      |
| Access channels         | `platforms`                                       |
| Founders                | `founders`                                        |
| SDG goals               | `sdgs`                                            |
| Countries + local stats | `countries`                                       |
| Traction metrics        | `traction`                                        |
| Pricing tiers           | `pricingTiers`                                    |
| Currency switcher       | `currencies` (USD rate must stay 1)               |
| FAQ entries             | `faqs`                                            |
| Footer link columns     | `footerCols`                                      |
| Mock join toast names   | `joinFeed`                                        |

Adding a new icon:

1. Add the Lucide component to the import block at the top of `src/ui/Icon.jsx`.
2. Add an entry to the `map` object keyed by string name.
3. Reference by string in `data.js` (e.g. `icon: 'shield'`).

Adding a new section:

1. Create `src/sections/MySection.jsx`.
2. Wrap content blocks in `<Reveal>`.
3. Import and render in `src/App.jsx` in the desired order.
4. If it should appear in the nav, add its id to `navLinks` in `data.js` and `SECTION_IDS` in `Nav.jsx`.

---

## Build and deploy

### Base path (important)

GitHub Pages serves this site under `/justly-web/`, so `vite.config.js` sets `base: '/justly-web/'` by default. For any other host, override at build time:

```bash
# custom domain or root hosting
VITE_BASE=/ npm run build

# GitHub Pages (default)
npm run build

# hosted at /legal/site/
VITE_BASE=/legal/site/ npm run build
```

### GitHub Pages (automatic)

`.github/workflows/deploy.yml` builds on every push to `main` and deploys `dist/` via the official Pages actions. Requires the repository setting **Pages → Build and deployment → Source → GitHub Actions** (this is set for this repo already). You can trigger a manual run from the Actions tab with **Run workflow**.

### Vercel

1. Import the repo in Vercel.
2. Framework preset: **Vite**.
3. Environment variable: `VITE_BASE=/`.
4. Deploy. Done.

### Netlify

```toml
# netlify.toml
[build]
  command = "VITE_BASE=/ npm run build"
  publish = "dist"
```

### Any static host

```bash
VITE_BASE=/ npm run build
# upload dist/* to your bucket, CDN, or server
```

---

## Accessibility and motion

- Semantic headings (`<h1>` in Hero, `<h2>` per section).
- All interactive elements are reachable by keyboard; focus rings are visible (`:focus-visible` outline).
- `aria-label` on the FAQ search, currency toggles, social links, scroll-to-top, and email input.
- `aria-expanded` on FAQ buttons, `aria-pressed` on currency toggles, `aria-live="polite"` on the typewriter.
- Country cards are focusable (`tabIndex={0}`) and trigger the hover overlay on focus.
- `prefers-reduced-motion: reduce` disables the marquee and short-circuits all animation durations to ~1ms (set in `index.css`).
- Custom cursor is **disabled on touch devices** and hidden on small screens (`@media (hover: none)`).
- The site still works fully with JavaScript but a noscript message could be added in `index.html` if needed.

---

## Performance notes

- Prod bundle is ~100 KB gzipped (React + Framer Motion + the app itself). Tailwind purges unused classes via the `content` glob in `tailwind.config.js`.
- No images; every icon is an inline SVG via `lucide-react`.
- Fonts are loaded from Google Fonts with `preconnect` and `display=swap`.
- `framer-motion` uses the `lazy` motion features implicitly; there is no `<LazyMotion>` wrapper, which keeps bundle slightly larger but saves setup complexity. Swap in `<LazyMotion features={domAnimation}>` if shaving is required.
- Scroll handlers are passive and cheap; nothing reads layout on every frame except the magnetic and tilt hooks, which only bind on hover.

---

## Browser support

- Chrome, Edge, Firefox, Safari — latest two versions.
- iOS Safari 15+, Android Chrome 100+.
- The custom cursor is desktop-only (`hover: none` disables it).
- Not tested on IE (never will be).

---

## Troubleshooting

**Site shows unstyled content locally.** Tailwind isn't building — ensure `npm run dev` is running. If you edited `tailwind.config.js`, restart the dev server.

**Fonts aren't loading.** Check the network tab for `fonts.googleapis.com`. If blocked, copy the `<link>` tags from `index.html` into your own font host.

**GitHub Pages shows a 404 at `/justly-web/`.** Two likely causes: (a) the Actions workflow hasn't finished running — check **Actions** tab; (b) Pages source is set to a branch instead of Actions — set it to **GitHub Actions** in Settings → Pages.

**Cursor is stuck off-screen.** The browser probably focused another tab mid-move. Move the mouse anywhere in the viewport to resync.

**Build fails with `Cannot find module '@vitejs/plugin-react'`.** Delete `node_modules` and reinstall.

---

## License

© 2026 Justly Limited. All rights reserved.
