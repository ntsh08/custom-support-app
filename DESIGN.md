# JusDesk design rules

Apply these to everything designed in this project: the app, static pages, Figma frames, slides and the presentation. They adapt Linear's DESIGN.md composition rules (VoltAgent awesome-design-md, linear.app) to light mode and our green. The reference code is `jusdesk/app/globals.css`.

## 1. One accent, used rarely
- Green `#3A7C57` (hover `#2F6547`) appears only on the logo, the primary button, the focus ring and links.
- Green is never a fill, a section background, a selected state or a decoration.
- Exception (Nitish, 6 Nov): the executive's own messages use a light green tint (`#F1F7F3`, border `#CFE3D6`). Customer messages stay white. The AI assistant's replies use the same green card, marked with the AI tag.
- No purple, no blue.

## 2. Depth from greys, not effects
- Surfaces: s0 `#FFFFFF`, s1 `#FCFCFD`, s2 `#F7F7F9`, s3 `#F1F1F4`. Don't skip steps.
- Borders: hairline `#E8E8EB`, strong `#DCDCE1`, both 1px.
- Selected and hover states are a grey step (s1 or s2).
- Queue: no divider lines; sits on white, hover s1, selected s2 (the same grey as the header tags). Right panel: white, sections divided by one light grey 1px line, no cards.
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
- Under the case title: plain grey tags (s2, 6px radius, no border) for order, customer, email or channel, language and reply due. No breadcrumb. Status, owner, follow-up and reason live in the right panel.
- Dashed border means "not real yet":
  - unset fields
  - prototype-only buttons
- Icons: Hugeicons Stroke Rounded, stroke 1.5.
  - 14px inline and in tags and key-value rows, 16px in task rows and the Ask box, 18px in the nav.
  - The selected nav icon is filled.
- No avatars or icons on queue rows or in front of names in the conversation: name, time and one meta line only.

## 9. AI signature, notes and the pattern
- Anything AI wrote or did gets one signature, and nothing else uses it:
  - a grey wash gradient (`#EDEDF1` → `#F6F6F8` → white, 135°, border `#ECECF0`), on the AI summary and the AI recommendation card (Nitish, 6 Nov: grey, not green)
  - a grey "AI" tag (`#F1F1F4` bg, `#5F636A` text), on AI events and the assistant's messages
  - the sparkle icon
- Internal notes are a plain yellow card (`#FFF8E6`, border `#F3E3B5`, label `#8A6512`), with a lock icon and "Internal note". No badge, no dashed border. The composer turns yellow in note mode. (Nitish, 6 Nov: the industry convention wins here.)
- No wallpaper behind the conversation for now; plain `#FAFAFB`.
- Columns: rail 52px, queue 304px, case flexible (min 460px), details panel 420px. The conversation fills the case column with 24px side padding (no cap).

- Conversation borders are extra light so cards read by fill, not outline: customer `#F0F0F3`, own green `#E1EEE6`, note `#F7EDCB`, AI wash `#E3F0E8`, composer `#E8E8EC`.

- The conversation shows only messages and internal notes. No activity-log lines (courier or AI events); the AI summary and the right panel carry that context. (Nitish, 6 Nov)

## 10. Don'ts
- No second accent colour.
- No coloured section backgrounds or tinted cards.
- No shadows or gradients for hierarchy.
- No invented names, labels or IDs for real people or research.
