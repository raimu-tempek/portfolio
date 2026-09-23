# Current Copy Audit

> Verbatim text extracted from the code as-is. No paraphrasing. No changes made to the original components.

## Metadata (src/app/layout.tsx)

- Title: `Faishal Portfolio`
- Description: `Portfolio of Muhammad Faishal Syarif - Freelance Graphic Design & Video Editor based in Surabaya, Indonesia.`

## Navbar (src/components/Navbar.tsx)

- `Home`
- `Works`
- `About`
- `Contact`
- `Hire me now` (desktop button + mobile dropdown button, same text twice)
- Logo image alt text: `Logo`
- Mobile menu button aria-label: `Toggle Navigation Menu`

## Hero (src/components/HeroSection.tsx)

- `Open to work`
- `Hi, I'm Muhammad Faishal Syarif`
- `Freelance Graphic Design & Video Editor`
- `based in Surabaya, Indonesia`
- `Hire me now`
- `View my work`

## Experience & Stats (src/components/ExperienceStatsSection.tsx)

- `My Experience`
- `Freelancer`
- `2026 | Remote | Self-Employed`
- `Assistant Practicum UI/UX`
- `2026 | On-Site | Contract`
- `Graphic Design at Simetriee`
- `2025-2026 | On-Site | Internship`
- `Video Editor Jeville Samael`
- `2023-2024 | Remote | Freelance`
- Stat numbers (rendered with `+` suffix via CountUp): `2+`, `150+`, `6+`
- `years of design`
- `design done's`
- `client satisfied`
- `Telkom University Surabaya (Digital Business)`
- `2022-2026 | 3.77 / 4.00 | Fresh Graduate (Cumlaude)`
- Telkom logo image alt text: `Telkom University`
- Avatar image alt text: `Muhammad Faishal Syarif Animated Avatar`

## What Can I Do (src/components/WhatCanIDoSection.tsx, id="about")

- `What can i do?`
- `My background in Digital Business allows me to look at design from both creative and business perspectives.`
- `Download CV`
- `Graphic Design`
- `Creating visual content that turns ideas into clear, engaging, and memorable visuals.`
- `Video Editing`
- `Turning raw footage into engaging stories through pacing, visuals, transitions, and sound.`
- `UI/UX Design`
- `Designing digital interfaces and experiences that are simple, intuitive, and built around user needs.`

## Project Gallery (src/components/ProjectGallerySection.tsx, id="works")

- `Project Gallery`
- Tab list aria-label: `Project categories`
- Tab labels:
  - `All`
  - `Graphic design`
  - `Thumbnail design`
  - `Video editing`
  - `Website`
- Tab panel aria-labels (dynamic, `"{Tab label} projects"`):
  - `All projects`
  - `Graphic design projects`
  - `Thumbnail design projects`
  - `Video editing projects`
  - `Website projects`
- Category headings shown in the "All" tab:
  - `Graphic design`
  - `Thumbnail design`
  - `Video editing`
  - `Website`
- Category descriptions shown in the "All" tab:
  - `Selected branding, marketing, and UI projects.`
  - `YouTube thumbnails and cover art.`
  - `Edits, reels, and motion pieces.`
  - `Live sites and web experiments.`
- Graphic design cards (title / category / cover alt / screen-reader note):
  - `23Bouquet — Custom Bouquet E-Commerce UX Case Study`
  - `Graphic Design Portfolio 2026`
  - `Mid-Year Portfolio 2025`
  - `Portfolio Design 2025`
  - Category line on every card: `Graphic design`
  - Cover alt pattern (`"{title} — cover"`):
    - `23Bouquet — Custom Bouquet E-Commerce UX Case Study — cover`
    - `Graphic Design Portfolio 2026 — cover`
    - `Mid-Year Portfolio 2025 — cover`
    - `Portfolio Design 2025 — cover`
  - Screen-reader-only text on every card: ` (opens in a new tab)`
- Thumbnail design tiles (title = image alt text, generated `Thumbnail {N}`):
  - `Thumbnail 1`
  - `Thumbnail 2`
  - `Thumbnail 3`
  - `Thumbnail 4`
  - `Thumbnail 5`
  - `Thumbnail 6`
  - `Thumbnail 7`
  - `Thumbnail 8`
  - `Thumbnail 9`
  - `Thumbnail 10`
  - `Thumbnail 11`
  - `Thumbnail 12`
  - `Thumbnail 13`
- Video editing cards (title used for alt / aria-label only, never shown visually):
  - `Video 1`
  - `Video 2`
  - `Video 3`
  - `Video 4`
  - `Video 5`
  - `Video 6`
  - `Video 7`
  - `Video 8`
  - `Video 9`
  - `Video 10`
  - `Video 11`
  - `Video 12`
  - `Video 13`
  - `Video 14`
  - `Video 15`
  - Play button aria-label pattern (`"Play {title}"`): e.g. `Play Video 1`, `Play Video 2`, … `Play Video 15`
- Website cards:
  - `This Website — Personal Portfolio`
  - `Freelance designer portfolio with gallery, filters, and motion details.`
  - Tech pills: `Next.js`, `TypeScript`, `Tailwind CSS`, `Framer Motion`
  - Cover alt text: `This Website — Personal Portfolio — cover`
  - Action buttons: `View code`, `Live demo`
  - Screen-reader-only text on the unavailable Live demo button: ` (unavailable)`
  - Live demo button aria-label (href is `"#"`): `Live demo: Live demo (unavailable)`
  - `ERP Inventory & Forecasting Dashboard — UI/UX Case Study`
  - `Academic project: demand forecasting and inventory dashboard for a fashion MSME.`
  - Tech pills: `Figma`, `UI/UX`, `Dashboard`, `Forecasting`
  - Cover alt text: `ERP Inventory & Forecasting Dashboard — UI/UX Case Study — cover`
  - Action button: `View case study`
  - Link button label: `Discover more`
- Preview toggle button (only in the "All" tab):
  - `View all projects (34)` (count is dynamic: total of all items, currently 34 = 4 graphic + 13 thumbnail + 15 video + 2 website)
  - `Show less`

## Contact & Footer (src/components/ContactAndFooter.tsx, id="contact")

- `Contact me`
- `Whether you're looking for a designer, a product thinker, or someone who can bridge creative and business — let's talk.`
- `+6289525365675`
- WhatsApp icon alt text: `WhatsApp`
- Footer nav links:
  - `Home`
  - `Works`
  - `About`
  - `Contact`
- `Social Media`
- `LinkedIn`
- `Instagram`
- `Threads`
- `Twitter`
- `M Faishal Syarif`
- `© 2026 Muhammad Faishal Syarif. All rights reserved.`
- `Privacy Policy`
- `|`
- `Terms and Condition`
