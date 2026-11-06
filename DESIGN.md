# JusDesk design rules

Apply these to everything designed in this project: the app, static pages, Figma frames, slides and the presentation. They adapt Linear's DESIGN.md composition rules (VoltAgent awesome-design-md, linear.app) to light mode and our green. The reference code is `jusdesk/app/globals.css`.

## 1. One accent, used rarely
- Green `#3A7C57` (hover `#2F6547`) appears only on the logo, the primary button, the focus ring and links.
- Green is never a fill, a section background, a selected state or a decoration.
- Customer messages are grey (s2); the executive's and the AI assistant's are white with a light outline. Green appears on AI surfaces only (see section 9).
- No purple, no blue.

## 2. Depth from greys, not effects
- Surfaces: s0 `#FFFFFF`, s1 `#FCFCFD`, s2 `#F7F7F9`, s3 `#F1F1F4`. Don't skip steps.
- Borders: hairline `#E8E8EB`, strong `#DCDCE1`, both 1px.
- Selected and hover states are a grey step (s1 or s2).
- Queue: no divider lines; sits on s2 grey like the rail, hover s3, selected `#ECECEF`. (Nitish, 6 Nov) Right panel: white, sections divided by one light grey 1px line, no cards.
- No shadows, no gradients, no glows. The only exception is the toast. (Tried a soft lift on right-panel cards on 6 Nov; Nitish reverted it.)

## 3. Corner radius by role
| Radius | Use |
|---|---|
| 4px | Small chips, source tags, the AI tag |
| 6px | Tags, property chips, channel tiles |
| 8px | Buttons, inputs, small boxes |
| 12px | Cards: messages, AI card, summary, composer |

- Never pill-shaped buttons.

## 4. Type: Inter only
- Use Linear's alternates `cv01` and `ss03`, and tabular numbers.
- Sizes:
  - 14px: titles
  - 13px/20px: body
  - 12px: meta and labels
  - 11px: captions
- Weights: 590 for titles, 510 for labels and buttons, 400 for body. Nothing heavier than 590.
- Hierarchy comes from weight and grey level, not from bigger sizes.

## 5. Text greys
- ink `#1C1D1F`: primary
- ink2 `#5F636A`: secondary
- ink3 `#8A8E95`: meta

Colour carries meaning only:
- red `#B42318`: wrong or risky
- orange `#B45309`: urgent or missing
- green `#15803D`: confirmed good

## 6. Spacing on a 4px grid
- 24px around main content.
- 16px inside panel blocks.
- 8px between items.
- 4–6px between chips.

## 7. Fixed sizes
| Height | Use |
|---|---|
| 44px | Header bars |
| 32px | Group headers, key-value rows |
| 56px | Queue rows |
| 28px | Buttons |
| 24px | Chips |

- Label column: 128px; icons never shrink (flex none).

## 8. Components
- Every ticket has the same title, "Marked delivered, but not received". Under it: plain grey tags (s2, 6px radius, no border) for order, customer, email or channel, language and reply due. No breadcrumb. Status, owner, follow-up and reason live in the right panel.
- Dashed border means "not real yet":
  - unset fields
  - prototype-only buttons
- Icons: Hugeicons Stroke Rounded, stroke 1.5.
  - 14px inline and in tags and key-value rows, 16px in task rows and the Ask box, 18px in the nav.
  - The selected nav icon is filled.
- No avatars or icons on queue rows or in front of names in the conversation: name, time and one meta line only.

## 9. AI signature, notes and the pattern
- Anything AI wrote or did gets one signature, and nothing else uses it:
  - a green glow from the top edge (`#8FC4A2` 0% → `#CDEAD9` 35% → white at ~60% of the card height, straight down, at 60% opacity in the app), copied exactly from Nitish's final Figma card (node 1337:83); summary card spacing: 8px under the label, 2px between headline and paragraph as an SVG gradient that stretches with the card, like Figma does; hairline border, on the AI summary and the AI recommendation card. The assistant's chat replies stay white with the AI tag (Nitish, 6 Nov).
  - a green "AI" tag (`#E3F0E8` bg, `#2F6547` text), on AI events and the assistant's messages
  - the sparkle icon
- Internal notes are a plain yellow card (`#FFF8E6`, border `#F3E3B5`, label `#8A6512`), with a lock icon and "Internal note". No badge, no dashed border. The composer turns yellow in note mode. (Nitish, 6 Nov: the industry convention wins here.)
- AI summary card (Nitish 6 Nov): sits after the customer's messages. White card with the top-edge green glow; "AI summary" label with sparkle, one bold catchy line (14px/590), a short grey paragraph. Below the card, outside it: "Helpful?" thumbs and Hide, shown only on hover. No "Show sources" (the sources are the messages above), no status strip.
- The conversation sits on plain white (s0), no wallpaper.
- Columns: rail 52px, queue 304px, case flexible (min 460px), details panel 420px. The conversation fills the case column with 24px side padding (no cap).


- The conversation shows only messages and internal notes. No activity-log lines (courier or AI events); the AI summary and the right panel carry that context. (Nitish, 6 Nov)

- Customer emails keep the normal message header (name, "Email · time"), then a hairline divider, a bold subject, and the body with greeting and sign-off (line breaks kept). (Nitish, 6 Nov)
- The assistant's replies show how it got there, using the INA agent trace pattern: one line under the name, "Show thinking" / "Hide thinking" with a chevron, no icon, closed by default; it opens to ticked steps along a thin hairline, ink2 text and ink3 ticks (our greys, not INA's). Translations under a message are italic. (Nitish, 6 Nov)
- Messages are 20px apart. They are grouped by day with a centred pill (s2 background, 12px grey text, 22px tall), like WhatsApp. Messages default to "Today"; a message can carry its own `day`.
- Bubble borders are very soft: customer `#F0F0F3`, own `#F3F3F6`, AI `#E6F1EA`, note `#FAF1D6`, composer `#EDEDF0`.

## 10. Don'ts
- No second accent colour.
- No coloured section backgrounds or tinted cards.
- No shadows or gradients for hierarchy.
- No invented names, labels or IDs for real people or research.
