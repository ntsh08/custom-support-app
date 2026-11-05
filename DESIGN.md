---
name: JusDesk
description: Evidence-first support workspace for "delivered, not received" cases, with AI doing the routine.
colors:
  brand-purple: "#7040F5"
  brand-purple-deep: "#5B2FD6"
  focus-purple: "#8457FF"
  purple-line: "#D9CCFF"
  purple-mist: "#ECE5FF"
  purple-tint: "#F5F2FF"
  night-rail: "#1B1235"
  ink: "#0D0D10"
  canvas: "#FFFFFF"
  thread-grey: "#FBFBFC"
  subtle-grey: "#F7F7F8"
  queue-grey: "#F4F4F7"
  muted-grey: "#EFEFF1"
  hairline: "#EFEFF1"
  border-grey: "#E4E4E8"
  border-strong: "#D1D1D6"
  slate-text: "#5C5D65"
  quiet-text: "#6B6C74"
  dot-neutral: "#A3A4AB"
  success: "#1E9E61"
  success-text: "#147A4B"
  warning: "#F0A01E"
  warning-text: "#9A5B00"
  danger: "#D2342B"
  danger-text: "#B3261E"
typography:
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: "34px"
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: "26px"
    letterSpacing: "-0.015em"
  section-title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: "24px"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    fontFeature: "tnum"
  body-strong:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
  small:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "18px"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  tag:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: "14px"
    letterSpacing: "0.04em"
rounded:
  xs: "6px"
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  full: "999px"
spacing:
  "2": "2px"
  "4": "4px"
  "6": "6px"
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "20": "20px"
  "24": "24px"
  "32": "32px"
components:
  button-primary:
    backgroundColor: "{colors.brand-purple}"
    textColor: "{colors.canvas}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.full}"
    padding: "10px 18px"
  button-primary-hover:
    backgroundColor: "{colors.brand-purple-deep}"
  button-secondary:
    backgroundColor: "{colors.muted-grey}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.full}"
    padding: "10px 18px"
  button-secondary-hover:
    backgroundColor: "{colors.border-grey}"
  button-secondary-small:
    backgroundColor: "{colors.muted-grey}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  ai-tag:
    backgroundColor: "{colors.purple-tint}"
    textColor: "{colors.brand-purple-deep}"
    typography: "{typography.tag}"
    rounded: "{rounded.xs}"
    padding: "2px 6px"
  queue-row:
    backgroundColor: "{colors.queue-grey}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "12px"
    padding: "10px 12px"
  queue-row-selected:
    backgroundColor: "{colors.canvas}"
  bubble-customer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "16px"
    padding: "12px 14px"
  bubble-agent:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "16px"
    padding: "12px 14px"
  composer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "16px"
    padding: "12px 14px"
  rail:
    backgroundColor: "{colors.night-rail}"
    width: "64px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.full}"
    padding: "8px 8px 8px 18px"
---

# Design System: JusDesk

## Overview

**Creative North Star: "The Case File on a Clean Desk"**

JusDesk reads every case as one contradiction (the courier's story against the customer's) and lays out the proof to settle it. The surface is a white desk under a cool grey queue column and a deep night-purple rail. Content does the work: a large plain headline names the contradiction, the conversation sits on the left, the evidence on the right, and a single decision bar closes the column. Nothing is boxed for its own sake; sections are separated by hairlines and quiet tonal shifts, never by cards inside cards.

Density is that of an all-day work tool: 14px body, 13px secondary lines, tabular numerals everywhere, three fixed columns at desktop width. Colour is held back so it can mean something. Purple appears on the one action the executive is expected to take, on the current selection, on the small "AI" tag and on the logo. Red, amber and green only ever describe state, as text or as a single dot. The design language takes cues from the Family wallet app, adapted for desktop, and from Attio's restraint.

The system refuses the helpdesk default: no ticket-field grids, no side panel of AI cards, no badge on every row, no eyebrow labels above headings.

**Key Characteristics:**
- Three-column shell: 64px rail, 300px queue, flexible work area.
- One purple action per decision; everything else is a grey pill.
- Status is plain text with a dot, not a pill or badge.
- AI is marked by a single small tag, never by a coloured panel.
- Hairline dividers and tonal surfaces instead of shadows and nested cards.
- Inter throughout, tabular numerals, sentence case.

## Colors

A cool neutral desk with one saturated purple voice and a night-purple frame.

### Primary
- **Brand Purple** (`brand-purple`): fill of the single primary action in the decision bar and confirm step, and the logo tile. White text on it only.
- **Deep Purple** (`brand-purple-deep`): hover state of the primary action; also the text colour of the AI tag.
- **Focus Purple** (`focus-purple`): the 2px keyboard focus outline (offset 2px).
- **Purple Line** (`purple-line`): the 1px inset ring on the selected queue row.
- **Purple Mist** (`purple-mist`): text selection highlight.
- **Purple Tint** (`purple-tint`): background of the AI tag.

### Neutral
- **Night Rail** (`night-rail`): the left navigation rail; the only dark surface in the shell. Rail icons sit at 55% white, full white with a 14% white fill when active.
- **Ink** (`ink`): primary text, the executive's own message bubbles, the undo toast.
- **Canvas** (`canvas`): the work area, evidence column, composer, customer bubbles and the selected queue row.
- **Thread Grey** (`thread-grey`): the conversation column, a half-step off white so the evidence column reads as the brighter "proof" side.
- **Queue Grey** (`queue-grey`): the queue column.
- **Subtle Grey** (`subtle-grey`): the private "Only your team sees this" signals panel, ghost-button hover.
- **Muted Grey** (`muted-grey`): secondary pill buttons.
- **Hairline** (`hairline`) / **Border Grey** (`border-grey`) / **Border Strong** (`border-strong`): dividers inside the work area, column and composer borders, and dashed outlines respectively.
- **Slate Text** (`slate-text`): secondary text (summaries, captions, fact labels, group headings).
- **Quiet Text** (`quiet-text`): tertiary text (metadata line, timestamps, "who" lines, hints).
- **Neutral Dot** (`dot-neutral`): status dot when no state applies.

### Status
- **Success** / **Warning** / **Danger** (`success`, `warning`, `danger`): status dots and map pins only.
- **Success Text** / **Warning Text** / **Danger Text** (`success-text`, `warning-text`, `danger-text`): fact values and queue time-left that need a verdict colour ("14 orders, no past claims", "15 min"). Text is coloured; there is no tinted background behind it.

### Named Rules
**The One Voice Rule.** Purple marks exactly four things: the primary action, the current selection (row ring, focus, text selection), the AI tag, and the logo. If purple is on anything else, it is wrong.

**The One Primary Rule.** Any decision row has at most one purple button. Alternatives are grey pills of equal size beside it.

**The Status Is Words Rule.** State is said in text, optionally led by an 8px dot. Status colours never fill a pill, a card or a row background, and are never decoration.

## Typography

**Display Font:** Inter (with system-ui, sans-serif), loaded via next/font
**Body Font:** Inter
**Label/Mono Font:** none; numerals use Inter's tabular figures

**Character:** One family carrying everything through weight and size alone; bold, tightly tracked headlines over calm regular body text. Numbers line up in every column because `tabular-nums` is set on the body.

### Hierarchy
- **Headline** (700, 28px/34px, -0.025em): the case headline that states the contradiction ("Delivered to the wrong door?"). Balanced wrapping. One per screen.
- **Title** (700, 20px/26px, -0.015em): the inline confirm step heading; the narrow-screen notice.
- **Section Title** (700, 17px/24px, -0.01em): the queue header.
- **Body** (400, 14px/20px; 21px line-height in bubbles, composer and AI line): conversation, facts, AI line, buttons (at 600). Case summary capped at 72ch.
- **Small** (400 or 600, 13px/18px): queue row secondary lines, group headings (600), metadata line, signals list.
- **Caption** (400–500, 12px/16px): who/time above bubbles, timeline events, evidence captions, composer hints.
- **Tag** (600, 11px/14px, 0.04em): the "AI" tag only.

### Named Rules
**The No Eyebrow Rule.** Headings stand alone. No small uppercase label above a heading, ever; context goes in the plain metadata line or the heading itself.

**The Sentence Case Rule.** Everything is sentence case, including group headings and buttons. The only tracked text is the two-letter AI tag.

## Layout

A fixed three-column shell at desktop width: rail 64px, queue 300px, work area flexible (`min-width: 1200px` on the shell). The work area is a header band (24px 32px 20px padding, hairline below) over two columns: conversation `minmax(380px, 1fr)` and evidence `minmax(460px, 560px)`, divided by a hairline.

- The queue scrolls independently, grouped Needs me / Waiting / With lead / Handled by AI, with group gaps of 16px and row padding of 10px 12px.
- The conversation scrolls above a composer pinned to its foot (20px inset).
- The evidence column scrolls (24px 28px padding, 20px gap) and ends in a sticky decision bar that bleeds to the column edges with a hairline above.
- Evidence images form one strip: two or three tiles at 118px tall, the map tile slightly wider (1.15fr). A compare mode shows the two door photos side by side at 184px with the map below.
- Below 1100px the app does not reflow; it shows a centred notice that JusDesk is a desktop workspace.

Spacing follows a 2/4/6/8/12/16/20/24/32 scale. Gutters of 28px (evidence) and 10px (strip gap) are used as built.

## Elevation & Depth

Flat and tonal. Depth comes from the three surface tones (night rail, grey queue, white desk) and hairline dividers. Shadow is used in three places only: a barely-there lift under the selected queue row, a soft card shadow under the composer so it floats over the thread, and a raised shadow under the undo toast.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 2px rgb(13 13 16 / 0.04), 0 2px 8px rgb(13 13 16 / 0.04)`): the composer.
- **Selected row** (`box-shadow: 0 1px 2px rgb(13 13 16 / .06), inset 0 0 0 1px #D9CCFF`): the selected queue row.
- **Raised** (`box-shadow: 0 2px 6px rgb(13 13 16 / 0.06), 0 12px 32px rgb(13 13 16 / 0.12)`): the floating undo toast.

### Named Rules
**The No Nested Cards Rule.** A bordered container never sits inside another bordered container. Group with hairlines and whitespace instead.

## Shapes

Soft, generous corners on content and fully round pills on every button. Token radii are 6 / 10 / 14 / 20 / 28px plus full. As built: buttons and the toast are full pills; message bubbles and the composer 16px; queue rows, rail buttons and evidence images 12px; the signals panel 14px; the logo tile 10px; the AI tag 6px; status dots are circles. Borders are 1px hairlines; the only dashed outline is the "No photo" evidence placeholder.

## Components

### Buttons
Round, quiet, decisive: one purple pill and its grey peers.
- **Shape:** full pill (999px), 10px 18px, 14px weight 600; small variant 6px 12px at 13px.
- **Primary:** brand purple, white text; hover deep purple. Leading 18px check icon on confirm.
- **Secondary:** muted grey pill, ink text; hover border grey. Used for every alternative action, "Back", "Send now" and "Compare photos".
- **Ghost:** transparent, subtle grey on hover.
- **Press / Disabled:** scale to 0.98 on press; disabled at 45% opacity. Background transitions 150ms.

### AI Tag
- **Style:** "AI" in 11px/600, tracked 0.04em, deep purple on purple tint, 6px radius, 2px 6px padding, 8px gap before the text it introduces.
- **Use:** leads the one AI recommendation line in the decision bar, AI events in the thread, and the AI-drafted note in the composer. It is the only AI marker in the system.

### Status Line
- **Style:** 8px dot + 13px slate text, under the case summary. Dot is amber for "needs me", dark grey for waiting, green for closed or AI-handled, neutral grey otherwise.

### Queue Row
- **Style:** borderless, 12px radius, three lines: customer (600) with time-left at right (amber or red text at 600 when urgent), item · value, next step.
- **States:** hover 4% ink wash; selected becomes a white card with a purple-line inset ring and the next step turns to ink. J / K moves the selection.

### Conversation
- **Customer bubble:** white, hairline border, 16px radius, max 82% width, left-aligned, with a caption above ("Customer · chat · 8:52 am"). Translations sit under a hairline inside the bubble at 72% opacity.
- **Agent bubble:** ink fill, white text, right-aligned.
- **Events:** centred caption lines (courier scans, bot handover, merges) with the time in quiet text.
- **Composer:** white, 1px border, 16px radius, card shadow; border turns purple on focus-within. Auto-sizes 64 to 200px.

### Evidence Strip
Drawn illustrations of courier photos and GPS traces in one row, 12px radius, each with a bold title and a one-line note caption, and a visible "Illustrations of courier evidence · demo data" label. The map shows the delivery pin green when on address, red with a dashed line and distance chip when far.

### Facts and Decision Bar
- **Facts:** a definition list of label (slate) and value (500, right-aligned, verdict colour where it applies), each row separated by a hairline, 11px vertical padding.
- **Private signals:** subtle-grey panel with a lock icon and "Only your team sees this", for fraud signals the customer must never see.
- **Decision bar:** sticky at the evidence column foot: one AI line, then the action row. Choosing an action that moves money expands an inline confirm step in place (Title heading, key/value lines, a quiet note, primary + Back), rising in over 200ms with `cubic-bezier(.16, 1, .3, 1)`.

### Navigation
- **Rail:** night-purple, 64px wide, purple logo tile on top, 40px icon buttons with 12px radius. Icons are a small authored set on a 24px grid, 1.6px stroke, round caps and joins.
- **Undo toast:** ink pill at bottom centre with a raised shadow and a translucent "Undo" pill; dismisses after 8 seconds.

## Do's and Don'ts

### Do:
- **Do** keep exactly one primary (brand purple) button per decision row; alternatives are grey pills.
- **Do** write status as text with an 8px dot, and colour verdict values as text only.
- **Do** mark AI involvement with the single "AI" tag and nothing else.
- **Do** separate sections with 1px hairlines and surface tone, keeping shadows to the composer, selected row and toast.
- **Do** confirm money-moving actions inline in the decision bar, then offer an undo toast.
- **Do** label drawn evidence as illustration and demo data.
- **Do** honour `prefers-reduced-motion`: drop the confirm rise and button/row transitions.

### Don't:
- **Don't** put purple on anything other than the primary action, selection, the AI tag or the logo.
- **Don't** render status as a coloured pill, badge or tinted row.
- **Don't** add eyebrow or kicker labels above headings.
- **Don't** nest cards inside cards or add an AI card panel beside the case.
- **Don't** use status colours for decoration.
- **Don't** put white text on any purple lighter than brand purple.
