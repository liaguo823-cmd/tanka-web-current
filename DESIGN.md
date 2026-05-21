---
name: Tanka
description: AI workspace where AI is a coworker, not a tool
colors:
  press-ink: "#26201c"
  newsprint: "#827d73"
  margin-rule: "#bdbbaf"
  stock-paper: "#e5e3db"
  endpaper: "#efefea"
  bond-paper: "#f2f1ee"
  margin-white: "#fafaf9"
  sheet-white: "#ffffff"
typography:
  display:
    fontFamily: "Geist Sans, Inter, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: "40px"
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Geist Sans, Inter, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "1.4"
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Geist Sans, Inter, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "1.4"
  body:
    fontFamily: "Geist Sans, Inter, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "1.5"
  body-small:
    fontFamily: "Geist Sans, Inter, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "1.4"
  label:
    fontFamily: "Geist Sans, Inter, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: "1.3"
    letterSpacing: "0.04em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 500
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  composer: "24px"
  squircle: "10px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.press-ink}"
    textColor: "{colors.sheet-white}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    typography: "{typography.title}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.sm}"
    padding: "6px 8px"
  button-ghost-hover:
    backgroundColor: "{colors.stock-paper}"
    textColor: "{colors.press-ink}"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.full}"
    padding: "5px 10px"
    typography: "{typography.body-small}"
  chip-filter-active:
    backgroundColor: "{colors.press-ink}"
    textColor: "{colors.margin-white}"
  workspace-tile:
    backgroundColor: "{colors.press-ink}"
    textColor: "{colors.sheet-white}"
    rounded: "{rounded.squircle}"
    size: "32px"
    typography: "{typography.label}"
  nav-row:
    backgroundColor: "transparent"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "36px"
    typography: "{typography.title}"
  nav-row-active:
    backgroundColor: "{colors.stock-paper}"
    textColor: "{colors.press-ink}"
  card:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.xl}"
    padding: "12px"
  composer-card:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.composer}"
    padding: "16px"
  search-container:
    backgroundColor: "transparent"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "36px"
  send-button:
    backgroundColor: "{colors.press-ink}"
    textColor: "{colors.sheet-white}"
    rounded: "{rounded.full}"
    size: "32px"
---

# Design System: Tanka

## 1. Overview

**Creative North Star: "The Considered Workshop"**

Tanka's interface is a workshop that has been carefully tidied. The surfaces are warm paper. The brand mark is press ink. Components sit at Linear-grade density, but the room feels worked-in rather than sterile. A user should be able to look at any screen and read: *"this was made by people who care about their craft, for people who care about theirs."*

Three voices hold the system together. **Calm** is the 60% baseline: dense layouts, near-invisible shadows, no hero motifs that fight for attention. **Sharp** lives in the AI's voice (proactive copy, asking back, clear hierarchy). **Crafted** is the signature touch: one or two distinctive details per surface (the 10-pixel workspace squircle, the 3px active-tab, the soft vertical gradient inside the composer card) that mark this as Tanka and not generic product UI.

The system explicitly rejects four families, carried directly from PRODUCT.md: **typical SaaS** (pure-white + black button + blue accent + glassmorphism), **AI-startup cliché** (purple gradient + neon + sparkle icons), **enterprise admin** (SF Pro + navy + serif accents), and **playful-assistant cartoon** (round-eye mascots + bounce animations + emoji-as-personality). A screen that could be confused for any of those four is rejected and rebuilt.

**Key Characteristics:**

- **Warm-neutral canvas, single ink.** Every surface is a slightly different paper warmth. Press Ink (#26201c) is the only brand-bearing color.
- **Dense and quiet.** Linear-grade information density with shadows that exist only as ambient warmth, not structural lift.
- **Bilingual EN + 中文** validated together. Type scale, density, and component height are tuned so Chinese and Latin glyphs land on the same rhythm.
- **Signature details over pattern repetition.** Workspace tiles, the composer, and the section labels each carry one hand-tuned detail that fingerprints the system.

## 2. Colors: The Press Room Palette

The palette is taken from the typesetter's bench: ink at one extreme, a stack of paper stocks running through warm cream to white at the other. There is no second brand color. The avatar and chat-author hues that appear in conversation tiles are *content*, not palette.

### Primary

- **Press Ink** (`#26201c`): The single brand-bearing color. Body text, active states, the workspace tile, the brand mark, primary buttons. Carries 100% of the brand signal.

### Neutral

- **Newsprint** (`#827d73`): Secondary text, muted icons. The aged-newspaper gray that lives one tier below Press Ink.
- **Margin Rule** (`#bdbbaf`): Stronger borders, the color of uppercase section labels. Reserved for typography and chrome that should feel printed-on, not handwritten.
- **Stock Paper** (`#e5e3db`): Default dividers, hover backgrounds (used at 60% alpha as `bg-warm-gray-2/60`), 1px component borders. The single most-used neutral.
- **Endpaper** (`#efefea`): The tag, kbd, and small chip background. One step warmer than Stock Paper, used where a printed-label feel is wanted.
- **Bond Paper** (`#f2f1ee`): The workspace rail and other secondary surface bands. Warmer than the main canvas.
- **Margin White** (`#fafaf9`): The main application canvas. Off-white with a perceptible warm tint, never reads as pure paper.
- **Sheet White** (`#ffffff`): Cards, modals, popovers, the composer. Pure white reserved for *surfaces that float*, not for background.

### Named Rules

**The One Voice Rule.** Press Ink is the only brand-bearing color in the UI. Every other surface lives on the warm-neutral ramp. No secondary brand accent. No tertiary. If a screen needs another color, the answer is hierarchy via Press Ink intensity (100% / 80% / 60% / 40% alpha) before adding a hue.

**The Avatar Exception.** Person and workspace avatars carry their own hues (`#5b5fd6`, `#10a37f`, `#e89a8a`, `#dc2626`, others). These are *content*, not palette: they identify a person, not the brand. They never escape an avatar circle, a workspace tile, or a chat author dot. They never appear on buttons, surfaces, borders, or focus rings.

**The Warm-Tinted Shadow Rule.** Shadows are always `rgba(38, 32, 28, X)` (Press Ink at low alpha), never pure black, never neutral gray. The warmth carries through even where it cannot be seen consciously.

## 3. Typography

**Display & Body:** Geist Sans (with Inter, Noto Sans SC, and PingFang SC as fallbacks)
**Mono:** Geist Mono

**Character:** A single sans-serif family pulled across all sizes. The pairing's job is to be *invisible enough that the warmth of the paper does the talking, sharp enough that 11px section labels stay legible.* Geist's slightly humanist forms keep the system from reading as purely technical. The Chinese fallback into PingFang SC is selected for its calmness alongside Geist (rounded geometric counters, similar perceived x-height).

### Hierarchy

- **Display** (Geist Sans, 36px / 40 line-height, 600, `tracking-tight`): The empty-state hero ("Your task today?"). Used at most once per screen; usually only on first-run or blank-state surfaces.
- **Headline** (Geist Sans, 16px / 1.4, 500, `tracking-tight`): List column h2 ("Flow", "Chat"), section heads inside detail views.
- **Title** (Geist Sans, 14px, 500): Nav rows, chat message author names, panel labels.
- **Body** (Geist Sans, 13px, 400, 1.5): List item titles, message body, the default reading text. Line length capped to roughly 65–75ch in flowing content.
- **Body Small** (Geist Sans, 12px, 400): Secondary list line (preview, time), metadata, second-tier copy in popovers.
- **Label** (Geist Sans, 11px, 500, `tracking-wider`, uppercase): Group headers in the list ("MAY", "TODAY", "PINNED"), tab headings, small uppercase chrome. Always in **Margin Rule** color (`#bdbbaf`), never Press Ink.
- **Caption / Hint** (Geist Sans, 10px, 600): The TAB keyboard hint inside the composer, badge numerals, tiny chrome.

### Named Rules

**The 11px Uppercase Rule.** When a label is set in 11px uppercase with `tracking-wider`, its color is *always* Margin Rule (`#bdbbaf`). Never Press Ink. Never Newsprint. The uppercase plus tracked treatment carries authority on its own; full ink at that size would shout.

**The Bilingual Density Rule.** Type scale, leading, and component height are all validated against a Simplified Chinese block of the same role *before* shipping. A 13px line-height that reads beautifully in English may crowd 中文 (Chinese glyphs carry more visual weight per row). When in doubt, give Chinese a touch more leading, not less.

## 4. Elevation

The system is flat by default. Surfaces sit on the canvas without lift. Depth is implied by spacing, divider lines, and warm-paper tone shift, not by drop shadows. Where shadows do appear, they are *ambient warmth*: the suggestion that a card has settled onto the desk, not structural lift announcing "I am above you."

Every shadow uses Press Ink at low alpha (`rgba(38, 32, 28, X)`). Pure black and neutral gray shadows are forbidden; they betray the warm-paper metaphor.

### Shadow Vocabulary

- **Ambient (cards at rest)** (`box-shadow: 0 1px 1.5px rgba(38,32,28,0.02), 0 4px 6px rgba(38,32,28,0.02)`): Flow detail cards, follow-up cards, the composer. So subtle the card mostly relies on its 1px Stock Paper border for definition; the shadow only registers when the card sits on Margin White rather than another card.
- **Lift on hover** (`box-shadow: 0 2px 12px rgba(38,32,28,0.06)`): Link tiles and interactable rows. The lift is intentionally low; this is not a "rise toward you" effect.
- **Active workspace tile** (`box-shadow: 0 2px 6px rgba(38,32,28,0.18)` plus `ring-2 ring-warm-black/25`): The strongest shadow in the system, and earned: it marks the user's current workspace identity.
- **Dropdown menu** (`box-shadow: 0 4px 24px rgba(38,32,28,0.08), 0 1px 3px rgba(38,32,28,0.06)`): Two-layer warmth that lets the menu read as floating without darkening the page beneath.
- **Popover / context menu** (`box-shadow: 0 8px 24px rgba(38,32,28,0.10)`): For tooltips and richer popovers.
- **Modal** (`box-shadow: 0 24px 60px rgba(38,32,28,0.18)`): Reserved for genuine modal dialogs. The depth here is allowed to feel architectural because it is rare.

### Named Rules

**The Ambient-Only Rule.** Shadows at rest are so subtle they are easy to mistake for nothing. That is the point. Cards do not announce themselves. The page is calm. Shadow intensity only rises in response to state (hover, active, floating).

**The No-Pure-Black Rule.** Every shadow alpha is on Press Ink (`rgba(38,32,28, X)`). The day a shadow becomes `rgba(0,0,0, X)` is the day the warm-paper feel breaks.

## 5. Components

The current build is closest to **quietly tactile**: defaults are restrained, but hover and active states earn a small amount of texture (warm-tinted shadow lift, ring glow, slight color shift). The system is still exploring how far to push toward *refined-restrained* (Linear-grade asceticism, even fewer state cues) or *editorial-crafted* (per-component signature flourishes). Document any new component against all three directions and pick one deliberately, not by reflex.

### Buttons

- **Shape:** Rounded medium (8px) for default actions, rounded small (6px) for the tightest controls (chrome notches, toolbar buttons). Pill-shaped (`rounded-full`) only for filter chips and the send button.
- **Primary:** Press Ink fill, Sheet White text, 8–10px height padding, label-weight typography (medium). Reserved for committing actions (send, save, confirm).
- **Ghost:** Transparent background, Newsprint icon and text at rest. Press Ink plus Stock Paper background on hover. The default for nav, toolbar, and chrome.
- **Composer Outline:** Pill-shaped ghost button living inside the composer card (`ComposerOutlineBtn`); subtle Stock Paper border, hosts the "+" and "sparkles" affordances. The decorative-button family.
- **SendBtn:** Circular Press Ink button with a white arrow icon. Sits at the bottom-right of the composer. The single most-visually-loaded action in the system. Disabled state is muted (Stock Paper background, Newsprint icon).

### Workspace Tile (signature component)

- **Shape:** 32px square, 10px radius (the system's defining radius. Not 8, not 12. Exactly 10). A *squircle*, not a rounded square. This is the system's identifying form.
- **Identity:** A colored fill plus a bold uppercase letter (Press Ink for Tanka, hue-coded for other workspaces) or a photographic avatar image.
- **Active state:** `ring-2 ring-warm-black/25` (warm-tinted ring) plus `shadow-[0_2px_6px_rgba(38,32,28,0.18)]` (ambient lift) plus a 3px tall by 6px wide Press Ink bar pinned to the left edge of the row. Three signals stacked, because the rail itself is narrow (40px) and this is a high-value identity selection.
- **Inactive state:** 55% opacity at rest, full opacity on hover.

### Nav Row

- **Shape:** 156px wide by 36px tall, 8px radius, 10px horizontal padding inside a 12px outer gutter.
- **Resting state:** Press Ink text on transparent. Icon at 18px square, stroke 1.6, in muted Newsprint.
- **Active state:** Stock Paper fill, icon shifts to Press Ink, label stays Press Ink. The reveal: a small `+ create` button slides in on the right edge, only on hover.

### Filter Chip

- **Shape:** Fully rounded (`rounded-full`), 10px by 5px padding, 12px label.
- **Inactive:** Transparent background, Newsprint text.
- **Active:** Press Ink fill, Margin White text. The single most-saturated use of Press Ink as a button-style fill outside the workspace tile.

### Cards

- **Corner Style:** 16px (`rounded-xl`) for most informational cards, 16–24px (`rounded-2xl`) for cards inside the detail view, 24px (`rounded-3xl`) reserved for the composer card.
- **Background:** Sheet White over Margin White canvas. The contrast against the warm canvas is what gives the card definition; the border is secondary.
- **Border:** 1px Stock Paper.
- **Shadow Strategy:** Ambient at rest (see Elevation), 0.06-alpha lift on hover for interactable cards.
- **Internal Padding:** 12–16px (`p-3` / `p-4`) for content cards.

### Composer Card (signature component)

- **Shape:** 24px radius (`rounded-3xl`), the largest in the system. The radius itself is a signature; nothing else in the system rounds this far.
- **Background:** Sheet White with a deliberate four-stop vertical gradient: `linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)`. The gradient is so subtle most users will not notice it consciously; that is the point. The card *settles* into the warmth of the page.
- **Content:** Multi-line textarea with the TAB-suggestion hint inline, plus an action bar at the bottom (Add content, AI suggestions, then the Send button at the right edge).
- **Border:** 1px Stock Paper, ambient shadow.

### Search Container

- **Pattern:** The input itself is **transparent**, hosted inside a 36px-tall, 8px-radius, 1px-Stock-Paper-bordered container with a Search icon at the left and 12px horizontal padding. The container is the visible search surface; the input is just a typing-channel.
- **Reuse:** This pattern repeats across the app (list column, members panel, dropdown sub-search). Reuse it. Do not invent a second search-input style.

### Section Label

- **Pattern:** 11px / uppercase / `tracking-wider` / weight 500 / Margin Rule color. Always.
- **Used for:** Date group headers ("MAY", "YESTERDAY"), table column heads, sub-section dividers inside a panel.

### Avatar with Status Dot

- **Shape:** `rounded-full`. Sizes by context: 24px (small chrome), 28–32px (inline mentions and chat tiles), 36px (list rows), 44px and up (header and detail).
- **Identity:** Either a photographic image or hue plus initials. Initials are weight-semibold or bold depending on size.
- **Status dot:** 9px square, `rounded-full`, pinned to the bottom-right of the avatar, ringed with `ring-2 ring-warm-bg-2` so the dot reads as floating above the avatar. Colors: online `#10b981`, away `#f59e0b`, offline `#a1a1aa`.

## 6. Do's and Don'ts

### Do:

- **Do** use Press Ink (#26201c) as the single brand-bearing color. Hierarchy in copy is achieved via Press Ink at decreasing opacities (100% / 80% / 60% / 40%) before reaching for a second hue.
- **Do** validate every type and layout decision in both English and 中文 before merging. Line-height that works in EN often needs a touch more leading in 中文; a component height that fits 14px Geist may crop a PingFang descender.
- **Do** keep shadows as `rgba(38, 32, 28, X)`. Warm-tinted depth, not neutral gray, not black.
- **Do** lead with the 10px workspace squircle as the system's identifying form. New brand surfaces, mark elements, and avatar-adjacent UI all defer to this radius.
- **Do** treat the 24px (`rounded-3xl`) radius as reserved for the composer card and direct descendants. The radius is a signature; do not borrow it for ordinary surfaces.
- **Do** keep section labels at 11px uppercase `tracking-wider` in Margin Rule color. No exceptions, no Press-Ink variants.
- **Do** match component voice deliberately. The current default is *quietly tactile*. A new component aiming for *refined-restrained* or *editorial-crafted* is welcome, but the direction must be a conscious choice, not a reflex.

### Don't:

- **Don't** use pure white (`#ffffff`) as the canvas. The canvas is Margin White (`#fafaf9`); pure white is reserved for floating surfaces only.
- **Don't** use pure black or neutral gray shadows. The day a shadow is `rgba(0,0,0, X)` is the day the warm-paper system breaks.
- **Don't** introduce a secondary brand color. If a screen needs more than Press Ink can hold, the answer is hierarchy, not a new hue. (Avatar hues are content, not palette.)
- **Don't** use glassmorphism, blurs, or backdrop filters as decoration. PRODUCT.md flags **typical SaaS** (white background + black button + blue primary + glassmorphism); the visual spec enforces that line.
- **Don't** use purple gradients, neon halos, or "AI sparkle" iconography. PRODUCT.md flags **AI-startup cliché** by name. The Sparkles icon used in the composer is a single muted accent at 16px square, stroke 1.8, inside a ghost button. It is not a brand element.
- **Don't** use SF Pro, deep navy, or serif accents. PRODUCT.md flags **enterprise admin** by name.
- **Don't** use cartoon mascots, round-eye AI characters, bouncy easing curves, or emoji-as-personality. PRODUCT.md flags **playful-assistant cartoon** by name. The AI's identity is carried by its voice and proactive behavior, not by visual ornament.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe on cards or alerts. Use full borders, background tints, or leading icons instead.
- **Don't** use `background-clip: text` gradients for headlines. The hero ("Your task today?") is solid Press Ink at 600 weight. That is the system's emphasis pattern.
- **Don't** use em dashes in UI copy or doc copy. Use commas, colons, semicolons, periods, or parentheses.
