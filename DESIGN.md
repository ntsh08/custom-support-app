# JusDesk design rules

Apply these to everything designed in this project: the app, static pages, Figma frames, slides and the presentation. They adapt Linear's DESIGN.md composition rules (VoltAgent awesome-design-md, linear.app) to light mode and our green. The reference code is `jusdesk/app/globals.css`.

## 1. One accent, used rarely
- Green `#3A7C57` (hover `#2F6547`) appears only on the logo, the primary button, the focus ring and links.
- Green is never a fill, a section background, a selected state or a decoration.
- Exception (Nitish, 6 Nov): the executive's own messages use a light green tint (`#F1F7F3`, border `#CFE3D6`). Customer messages stay white. The AI assistant's replies use the same green card, marked with the AI tag.
- No purple, no blue.

## 2. Depth from greys, not effects
- Surfaces: s0 `#FFFFFF`, s1 `#FAFAFB`, s2 `#F4F4F6`, s3 `#EDEDF0`. Don't skip steps.
- Borders: hairline `#E8E8EB`, strong `#DCDCE1`, both 1px.
- Selected and hover states are a grey step (s1 or s2).
- Tonal layering: no divider lines in the queue or the right panel. Panels sit on s1; groups are white cards (12px radius, no border) or grey steps. Lists have no divider lines. Sections are separated by space and grey steps: the queue sits on white (s0), hover is s2, selected is s3, rows are rounded 8px and inset 8px.
- No shadows, no gradients, no glows. The only exception is the toast.

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

- Label column: 112px.

## 8. Components
- Under the case title: plain grey tags (s2, 6px radius, no border) for order, customer, email or channel, language and reply due. No breadcrumb. Status, owner, follow-up and reason live in the right panel.
- Dashed border means "not real yet":
  - unset fields
  - prototype-only buttons
- Icons: Hugeicons Stroke Rounded, stroke 1.5.
  - 14–16px inline, 18px in the nav.
  - The selected nav icon is filled.
- No avatars or icons on queue rows: name, time and one meta line only.

## 9. AI signature, notes and the pattern
- Anything AI wrote or did gets one signature, and nothing else uses it:
  - a green wash gradient (`#E6F2EA` → `#F4F9F6` → white, 135°, border `#D5E7DB`), on the AI summary and the AI recommendation card
  - a green "AI" tag (`#E3F0E8` bg, `#2F6547` text), on AI events and the assistant's messages
  - the sparkle icon
- Internal notes are a plain yellow card (`#FFF8E6`, border `#F3E3B5`, label `#8A6512`), with a lock icon and "Internal note". No badge, no dashed border. The composer turns yellow in note mode. (Nitish, 6 Nov: the industry convention wins here.)
- No wallpaper behind the conversation for now; plain `#FAFAFB`.
- Columns: rail 52px, queue 272px, case 460–600px, panel min 380px. The case column takes the extra width; the case column never grows past 600px.

## 10. Don'ts
- No second accent colour.
- No coloured section backgrounds or tinted cards.
- No shadows or gradients for hierarchy.
- No invented names, labels or IDs for real people or research.
