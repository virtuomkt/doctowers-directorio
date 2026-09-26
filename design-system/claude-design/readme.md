# DocTowers Design System

DocTowers is a medical office tower ("torre de consultorios") in Boca del Río. This design system supports the product team building **DocTowers' medical directory website** — the tool patients use to search the tower's roster of specialists and find their consulting room.

## Sources provided
- `Home preview.png` — full desktop home screen (1920px) of the directory site
- `bacnground-hero.png` — the hero section's full-bleed gradient/grain background image
- `Recurso 1 8–12.svg` — five color lockups of the DocTowers logo (black+teal, white+teal, all-white, all-black, navy+white)
- `IntradeDemo-Regular-BF69f161ce9da34.ttf` — the brand's rounded display webfont ("Intrade Demo")

No Figma file, codebase, or additional decks were provided — this system was built directly from the screenshot, background image, logo files and font above. If a live site or codebase exists, re-attach it so this system can be verified/extended against real markup.

## Components (`components/`)
No component library or Figma file was given, so a small standard set was authored to match what the home screen actually uses:
- **Button** (`components/core`) — pill actions: primary (teal), dark (navy), secondary, ghost
- **Badge** (`components/core`) — small pill labels for specialty/availability tags
- **Avatar / AvatarGroup** (`components/core`) — doctor photo circles, overlapping stack for the trust strip
- **SearchInput** (`components/forms`) — the hero search field with embedded "Buscar" button
- **DoctorCard** (`components/data`) — directory listing card (photo, name, specialty, office, availability)

### Intentional additions
None of these were invented beyond what's visible in the source screenshot — Badge and DoctorCard extrapolate the "especialidad/disponibilidad" concept visible in the trust strip into a directory-listing pattern, since a directory site needs one.

## UI kit (`ui_kits/directorio-web/`)
`index.html` recreates the home screen (hero, search, trust strip) plus a directory results grid below it, built from the components above. It's a click-through: typing in the search field and pressing "Buscar" filters the sample roster.

## Foundations (`tokens/`, `guidelines/`)
- `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css` — CSS custom properties, imported by root `styles.css`
- `guidelines/*.html` — specimen cards for the Design System tab

## Assets (`assets/`)
- `assets/logos/` — 5 color variants of the DocTowers wordmark+plus-sign lockup
- `assets/images/hero-background.png` — hero gradient/grain background
- `assets/fonts/IntradeDemo-Regular.ttf` — display webfont

## CONTENT FUNDAMENTALS
Copy is in **Spanish** (Mexico — Boca del Río), written directly and functionally, no marketing fluff.
- Direct imperative/infinitive verbs for actions: "Busca por nombre o especialidad", "Encuentra a tu médico en DocTowers"
- Sentence case throughout, no ALL CAPS
- Second person informal ("tú" implied — "Busca...", "Encuentra a tu médico") when addressing the visitor
- Numbers used for concrete trust signals, not vague superlatives: "+200 especialistas confían en DocTowers"
- No emoji anywhere in the source material
- Tone is calm, clinical-adjacent but warm — a wellness/healthcare register, not corporate-medical or clinical-cold
- Labels are short and task-oriented: "Directorio", "Consultorios disponibles", "Buscar" — no taglines or clever wordplay

## VISUAL FOUNDATIONS
- **Color**: two-tone brand palette — teal accent (`#10CFC9`) and deep navy (`#003245`), plus a "+" cross mark in teal signaling the medical/health context. No third brand hue; everything else is white, near-black ink, and light neutral grays.
- **Backgrounds**: the hero uses a full-bleed photographic/rendered background — a large soft organic blob shape blending pale seafoam into deep teal into navy, with visible **film-grain texture** over the gradient (not a flat CSS gradient — treat `hero-background.png` as the real asset; the CSS `--gradient-hero` token is a flat-color approximation for UI chrome only, not a replacement for the textured image in hero contexts).
- **Shapes**: organic, rounded blob forms in the hero (not geometric); everything else (buttons, search field, avatar stack, chips) is fully pill-shaped (`border-radius: 999px`). No sharp rectangles in interactive elements.
- **Typography**: display font "Intrade Demo" is a rounded, friendly geometric face used only for large headlines and the wordmark; body/UI text uses a separate humanist sans (Manrope substituted — see Caveats) at regular/medium/semibold weight, never the display face at small sizes.
- **Cards/surfaces**: white background, subtle 1px light-gray border, soft low-contrast shadow (`--shadow-sm`/`--shadow-md`), 14px corner radius — no colored left-border accents.
- **Buttons**: solid fill (teal primary, navy dark, or white/bordered secondary), always fully pill-shaped, white or dark text depending on fill; hover is a subtle brightness dim, no color-hue shift.
- **Imagery**: warm-cool teal/navy gradient photography with grain — no separate product photography style was provided beyond the hero background and doctor headshots implied by the avatar stack.
- **Depth**: minimal — one soft shadow scale for elevated surfaces (search bar, trust-strip pill, cards); no glassmorphism, no blur, no transparency effects observed.
- **Motion**: none specified in source material; a fast (120ms) brightness transition is used for button hover/press as a sane default — no bounce, no fade choreography implied by the source.
- **Layout**: centered hero content, generous whitespace, the trust-strip pill straddles the boundary between hero and white content section (negative margin overlap) — a recurring "floating pill" motif worth reusing for callouts.

## ICONOGRAPHY
No icon font or SVG sprite was visible in the provided screenshot beyond a plain magnifying-glass glyph in the search button and the ">" chevron in "Directorio". No source icon system was supplied, so **Heroicons** (outline style, inlined as SVG, `stroke="currentColor"`) was adopted as the icon set going forward — starting with the SearchInput magnifying glass. No emoji used.

## Caveats — please help me iterate
1. **Body font substituted.** No UI/body webfont was provided — only the display face "Intrade Demo". I substituted **Manrope** (Google Fonts) for body/UI text as a close rounded-geometric match. If DocTowers has a real UI font, send the files and I'll swap it in.
2. **Only one screen was provided** (the home page). The directory results grid, doctor profile page, and any other screens in `ui_kits/directorio-web/` beyond the hero are my extrapolation, not a recreation of a real screen — please share more screens/Figma so I can correct them.
3. **No Figma/codebase access** — everything here is reverse-engineered from one screenshot, one background image, the logo files, and the font. Colors and spacing are estimated, not measured pixel-for-pixel.
4. **No icon system** was in the source — flag if DocTowers uses one.

**My ask:** tell me if any of the above guesses are wrong, and send more screens (or Figma/code access) so I can replace the extrapolated parts with real recreations.
