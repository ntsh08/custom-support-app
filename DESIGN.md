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
- Every ticket has the same title, "Marked delivered, but not received". Under it, 4px below, plain grey tags (s2, 6px radius, no border): ticket number, customer name, language, and "Reply in 40 min" (clock icon, orange/red when urgent) while a reply is due. No order number, channel or status tags in the header (Nitish, 7 Nov). On the right of the title, a status split button (G3: 28px, 8px radius, vertically centred on the title + tags block, solid fill in the status colour with white 12px/510 text: First response `#5B84E4`, Needs reply `#6B46C9`, Escalated `#C2410C`, Waiting `#5F636A`, Closed `#A9ACB2`; a 28% white divider before the chevron). The main half reads the current status; either half opens "Change status" with all six statuses, each with a coloured dot, and a tick on the current one. No breadcrumb. Status, owner, follow-up and reason live in the right panel.
- Dashed border means "not real yet":
  - unset fields
  - prototype-only buttons
- Icons: Hugeicons Stroke Rounded, stroke 1.5.
  - 14px inline and in tags and key-value rows, 16px in task rows and the Ask box, 18px in the nav.
  - The selected nav icon is filled.
- No avatars or icons on queue rows or in front of names in the conversation. A queue row has three lines: customer name (time left on the right); the ticket title in ink2; then a grey ticket-number tag and a coloured status chip. The ticket number also leads the header tags. Ticket numbers are demo data. (Nitish, 7 Nov)

## 9. AI signature, notes and the pattern
- Anything AI wrote or did gets one signature, and nothing else uses it:
  - a green gradient border, 1.5px, 120° (`#3A7C57` → `#7CC4A0` → `#9FD7A8` → `#5EB8A8`), with a barely-there tint inside (`#FBFDFC` → white); used on the AI summary and the recommendation card (B6, Nitish, 6 Nov). While the summary is being written (about 1.8s when a case opens) a single green streak runs around a grey border and the label shimmers "Writing summary…" (E4); then it settles. Reduced motion turns the animation off; summary card spacing: 8px under the label, 2px between headline and paragraph as an SVG gradient that stretches with the card, like Figma does; hairline border, on the AI summary and the AI recommendation card. The assistant's chat replies stay white with the AI tag (Nitish, 6 Nov).
  - a green "AI" tag (`#E3F0E8` bg, `#2F6547` text), on AI events and the assistant's messages
  - the sparkle icon
- Internal notes are a plain yellow card (`#FFF8E6`, border `#F3E3B5`, label `#8A6512`), with a lock icon and "Internal note". No badge, no dashed border. The composer turns yellow in note mode. (Nitish, 6 Nov: the industry convention wins here.)
- AI summary card (Nitish 6 Nov, replaced 7 Nov by the AI suggestion card, see below): sat after the customer's messages. White card with the top-edge green glow; "AI summary" label with sparkle, one bold catchy line (14px/590), a short grey paragraph. Below the card, outside it: "Helpful?" thumbs and Hide, shown only on hover. No "Show sources" (the sources are the messages above), no status strip.
- The conversation sits on plain white (s0), no wallpaper.
- Statuses (Nitish, 7 Nov): First response, Needs reply, Waiting on customer, Waiting on others, Escalated, Closed. The queue is one flat list headed "All tickets" with a count, sorted most urgent first (Needs reply, First response, Escalated, Waiting on others, Waiting on customer, Closed), then by time left. No group headers and no view tabs (Nitish tried tabs on 7 Nov and removed them). The queue header has, on the right, a sort button (sort icon + current option, ghost, 28px) opening a menu: Due time (default: soonest reply timer, then follow-ups, closed last), Newest, Oldest. No "Urgency" option (Nitish removed it); and a 28px filter icon button (not wired in the prototype). Status is a quiet dropdown in Properties; under "Waiting on customer" an ink3 line says the AI nudges on day 3 and 7 and closes on day 14. Sending a reply moves the ticket to Waiting on customer; there is no picker on the composer (Nitish removed it, 7 Nov). "Reopened" is an orange 11–12px tag on the queue row and in the header tags, never a status. The reply timer shows only for First response and Needs reply. See decisions/2026-11-07-ticket-statuses.md.
- The reply box starts empty, never pre-filled. Placeholder: "Reply to Ananya, or use AI draft to start from the evidence". The AI writes only when the agent presses AI draft (Nitish, 7 Nov).
- Composer tools (Nitish, 7 Nov), left to right: AI draft (fills the AI's draft), Rephrase, Translate, Check reply, then attach and Send on the right. Check reply opens a small s1 box above the tools: sparkle + "N suggestions" (or "Looks good. Nothing to change."), then one line per note with an orange alert or green tick, and an Apply button where a fix exists. It checks: the customer's ask answered (e.g. date), tone vs sentiment (apology if Frustrated/Angry), promises against policy (refund needing lead approval), no fraud talk, and language. Nothing changes until the agent presses Apply. The box closes on edit or ticket switch.
- Right panel has two tabs in its 44px header, Details and Copilot (510 weight; selected = ink with a 2px ink underline, others ink3). Copilot holds the AI recommendation and "Ask about this case"; Details holds order details, properties, customer history, linked tickets, tasks and evidence. (Nitish, 7 Nov)
- Every right-panel section header has a 14px chevron on its left (ink3); clicking the title collapses the section to its header (chevron turns -90°). Collapsed sections stay collapsed when switching tickets. (Nitish, 7 Nov)
- Right panel, Properties (Nitish, 7 Nov): Status, Owner, Reply due, Follow up, Reason, Channel, then **Sentiment** (read by AI from the customer's messages: Angry red, Frustrated orange, Neutral ink, Happy green, with a one-line why in ink3) and **Tags** (multi-select; grey s2 chips, 6px radius, 24px, × to remove; dashed "+ Add" opens a checklist menu). Reason stays single-choice because it drives the due date; tags are free and several are allowed.
- **Customer history** block after Properties: Customer since, Orders · spend, Past claims (green "None", red count), Refunds (count · ₹, reversed), Address (red when shared with other accounts). Then the private **risk box** (s1, hairline, 8px): lock + "Only your team sees this", a verdict-free line ("Low risk · nothing unusual found" in green, or "Worth a look before deciding" in red), three checks each with its source on the right (Order history, Address match, Payment data), and for Review a note: "Signals, not a verdict… your lead decides." Every case shows the box, so a clean customer visibly gets a fast path. Then a "Past tickets" list. Fraud signals live here only, never under delivery evidence or in customer-facing text.
- Columns: rail 52px, queue 328px (380px together), case flexible (min 460px), details panel 380px (Nitish, 7 Nov). The conversation fills the case column with 24px side padding (no cap).


- The conversation shows messages, internal notes, status changes and assignments only. Assignments use the same line: "AI assigned this ticket to you · 8:53 am", "You took over this ticket from AI". Status lines name the status only, no extra detail in brackets. Status changes are one centred 12px ink2 line, no dot or icon: "AI set status to First response · 8:53 am", "You escalated to Priya (team lead) · Now", "You changed status to Waiting on customer". Other activity (courier or AI events) stays out; the AI summary and right panel carry it. (Nitish, 6–7 Nov)

- Customer emails keep the normal message header (name, "Email · time"), then a hairline divider, a bold subject, and the body with greeting and sign-off (line breaks kept). (Nitish, 6 Nov)
- The AI is first on every ticket and replies only when it can answer (decisions/2026-11-07-ai-first-replies-only-when-it-can.md). After the customer's first message on every ticket there is an "AI investigation" card (full width, 12px radius) with the AI signature: the same green gradient border and faint tint as the AI suggestion card, and a green (#2F6547) AI-search icon (magnifier with sparkle) + green "AI investigation" label, then the time, "🔒 Only your team sees this" on the right, two labelled rows (12px ink3 label column, 13px ink text): "Evidence" (what the AI found) and "Policy" (the rule that decided what it did, ending "so I didn't reply" or "so I replied…"), then "Show investigation" expanding to the ticked steps. (Nitish, 7 Nov)
- The assistant's replies no longer carry their own "Show investigation"; the investigation lives in the card above. The trace pattern (INA) used there is: one line, "Show investigation" / "Hide investigation" with a chevron, no icon, closed by default (Nitish renamed it 7 Nov: the AI investigates). It opens to ticked steps along a thin hairline, ink2 text and ink3 ticks (our greys, not INA's). Steps only; no suggestions inside the investigation. The card after the customer's messages is now "AI suggestion" only: sparkle label, then 2–3 next steps for the executive with green arrows (13px ink). No summary headline or paragraph. Steps come from the assistant's latest investigation, else the case's own suggestions. Suggestion rows are plain text (no leading arrow). Each has an always-visible "+ Add task ▾" (ghost with a 1px #DCDCE1 border, no fill, ink2 text) that opens "Who does it?": Me (goes to your tasks) or AI (does it at the due time and reports back; disabled with "AI can't make calls" for steps that need a phone call). Once added, the row reads "✓ Added for you ▾" or "✓ AI will do it ▾"; clicking it reopens the menu to switch between Me and AI (only the current one carries a tick; no other icons) or a plain-text "Remove task" (13px, ink2). In Tasks and follow-ups, each task is top-aligned: checkbox (or sparkle for AI), the text, then a meta line with the assignee tag ("You" grey, "✨ AI" green) and the due time. Keep suggestions few and distinct: merge steps that are one action. Due is read from the text: "by 4 pm", "on Monday", "in 5 days". Closed tickets show the AI summary instead (same card: "AI summary" label, bold headline, grey paragraph). While writing, the label reads "Thinking…". (Nitish, 7 Nov) Messages in another language show the original by default (what was actually received or sent). Under the bubble, 12px ink3: translate icon and "See translation" (ink2, 510, no underline; no language label), which flips the bubble to English and back ("See original"). Wording follows Grab, Facebook and Instagram. (Nitish, 6 Nov) (Nitish, 6 Nov)
- Messages are 20px apart. They are grouped by day with a centred plain-text label (12px, ink2, 510, no pill or background) (Nitish, 7 Nov). Messages default to "Today"; a message can carry its own `day`.
- Bubble borders are very soft: customer `#F0F0F3`, own `#F3F3F6`, AI `#E6F1EA`, note `#FAF1D6`, composer `#EDEDF0`.

## 10. Don'ts
- No second accent colour. Exception: status chips (6px radius, 22px, 12px/510) are colour-coded, in the queue row and the header (Nitish, 7 Nov): First response light blue `#F0F5FF`/`#5B84E4`, Needs reply purple `#F2EEFD`/`#6B46C9`, Escalated orange `#FFF0E5`/`#C2410C`, both Waiting states grey `#EEEEF1`/`#4B4F57`, Closed light grey `#F3F3F5`/`#8A8E95` (Nitish asked for blue, a little purple and grey).
- No coloured section backgrounds or tinted cards.
- No shadows or gradients for hierarchy.
- No invented names, labels or IDs for real people or research.
