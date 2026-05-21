# Product

## Register

product

## Users

Tanka serves knowledge workers and the cross-functional teams they sit inside. Two perspectives, one product:

- **The individual operator** (founder, PM, designer, engineer) who needs a single place to think, delegate, and track work without paying the Slack-Notion-Linear tax.
- **The cross-functional team** (design, product, eng, growth pods) that needs shared chat, shared workflows (Flow / SOP), and shared visibility into what Tanka is doing on their behalf.

The primary job-to-be-done: *"I want to talk to my work, not configure it."* Users come to Tanka to delegate work to AI, to capture team workflows once and reuse them, and to keep the team's chat, tasks, and SOPs in one place. The primary verb is **chat-as-command**: open the app, type what you want done, and Tanka either does it, asks back, or pushes it through.

## Product Purpose

Tanka is the AI coworker that turns a team's messy work into operatable assets. It collapses chat, task workflows (Flow), reusable procedures (SOP), AI agents, and external connectors (Link) into one surface, so a small team can stop bouncing between Slack, Notion, and Linear and instead delegate, structure, and re-run their work through a single AI-native assistant.

Two intertwined theses define the product:

1. **AI as a coworker.** Tanka has presence and opinion. You chat with it, you hand things off, it asks back, it drives the next step. It is not a sparkle icon next to a text field.
2. **Chaos into structure.** The same conversations that today are scattered across chat threads, task lists, and tribal knowledge become, inside Tanka, captured workflows: SOPs the team can re-run, agents that execute them, follow-ups that close loops. Tanka is the back office for the work you already do.

Success looks like this. A founder closes Slack, Notion, and Linear, opens Tanka, types "what did design discuss about onboarding last week?", and Tanka pulls the conversation, summarizes it, and proposes the next action. The first time a team handles a tricky workflow, it is a chat. The second time, it is an SOP. The third time, it is the AI doing it on its own.

## Brand Personality

Three voices held in balance, with **craft as the signature**:

- **Calm** (the 60% baseline). Linear- and Stripe-grade composure. Dense but legible. Quiet by default. Tanka does not yell, does not over-decorate, does not chase attention.
- **Sharp** (most visible in the AI's voice). Arc- and Raycast-style intelligence. When Tanka speaks, it has opinions, asks back, drives the conversation forward. Never servile, never cute.
- **Crafted** (the signature touch). One or two distinctive details per surface that mark this as Tanka and not generic product UI: the warm palette, considered typography, hand-tuned micro-interactions, copy that reads like it was written and not generated.

Emotional goal: the user thinks *"this was made by people who care about their craft, for people who care about theirs."* Not slick. Not playful. Considered.

## Anti-references

Four explicit traps Tanka must avoid. Every visual choice is checked against this list before it lands.

1. **Typical SaaS.** Pure white background, black primary button, generic blue accent, glassmorphism cards. (Slack, early Notion, most B2B tools.) Cold, broad, uncommitted.
2. **AI startup cliché.** Dark purple gradients, neon highlights, glow halos, "AI sparkle" icons everywhere. (Generic OpenAI-style black landings, most "AI for X" pages.) Saturated, homogenized.
3. **Enterprise product.** SF Pro everywhere, deep navy, serif accents, corporate-website tone. (Salesforce, Workday, most CRM admin UIs.) Heavy, dated.
4. **Playful AI assistant.** Cartoon mascot, round-eye expressions, bouncy animation, emoji-as-personality. (Duolingo-style, early Cursor, some Copilot UIs.) Over-eager, infantilizing, undermines authority.

If a design choice could land in any of these four buckets, redo it.

## Design Principles

1. **AI is a coworker, not a tool.** Tanka's AI has presence. It asks back, proposes, drives. It is not a sparkle icon next to a text box. The AI's voice, tone, and proactive behavior carry the product's identity more than any visual flourish does.

2. **Turn chaos into operatable assets.** Every screen should help the user move work one step further along the chaos-to-structure ladder: a chat becomes a flow, a flow becomes an SOP, an SOP becomes an agent task. Designs that trap information in a single ephemeral view (a chat thread, a one-off task) fail this test. Show the path forward.

3. **Craft is the signature.** The product is calm and dense by default, Linear-grade in composure. But every surface earns one or two hand-tuned, opinionated details (palette, typography, a micro-interaction, a copy choice) that make Tanka recognizable at a glance and impossible to mistake for generic AI SaaS. The signature is what tells the user *this was made for them*, not generated.

4. **Bilingual as a first-class citizen.** Every design decision must work simultaneously in English and 中文. Type scale, line-height, density, copy length, button labels, truncation behavior: all validated in both languages before shipping. No retrofit, no "we'll add Chinese later".

5. **The four anti-references are gatekeepers.** Visual choices are checked against the four traps above before they land. If a screen could be confused for typical SaaS, AI-startup cliché, enterprise admin, or playful-assistant cartoon, it is rejected and rebuilt.

## Accessibility & Inclusion

- **Bilingual EN + 中文** is a hard requirement. Typography, layout density, line-breaking, truncation, and copy length are all validated in both languages before shipping. The font stack must handle Latin and Simplified Chinese gracefully (currently Geist + PingFang SC + Noto Sans SC fallback).
- **WCAG AA** is a sensible working default for contrast and keyboard access, though the user has not yet committed to a formal compliance target. Revisit when ready to commit.
- **Reduced motion, color blindness accommodation, and dark mode support** are open questions for a future pass. Not committed in the current phase.
