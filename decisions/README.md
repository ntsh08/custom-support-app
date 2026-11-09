# Design decisions

Why JusDesk looks and works the way it does. Each entry gives the problem, the decision, Nitish's reason in his own words, the evidence, the rejected options and guardrails for the next designer. "Not stated" means no reason was recorded; don't guess one.

Read the Active entries before changing a screen they cover.

## Scope

| Decision | Type | Status |
|---|---|---|
| [Support desk instead of the AI finance app](support-desk-over-finance-app.md) | Scope | Active |
| [Fictional business: a fashion brand selling online](fashion-business.md) | Scope | Active |
| [Only the "delivered, not received" complaint, through edge cases](one-scenario-depth.md) | Scope | Active |
| [Five cases from simple to hard](case-ladder.md) | Flow | Active |
| [Competitor set: Zendesk, Sierra and Decagon](competitor-set.md) | Scope | Active |

## How the AI works

| Decision | Type | Status |
|---|---|---|
| [The AI is first on every ticket and replies only when it can answer](ai-first-replies-only-when-it-can.md) | Interaction | Active |
| [AI investigation card after the first message](ai-investigation-card.md) | Content | Active |
| [AI suggestion card on open tickets; steps become tasks for a person or the AI](ai-suggestion-card.md) | Interaction | Active |
| [The AI flags possible fraud but never denies; people decide](ai-flags-fraud-never-denies.md) | Interaction | Active |
| [The AI sets follow-ups from the SLA when a ticket starts waiting](ai-sla-follow-ups.md) | Interaction | Active |
| [The AI closes the ticket when the payment provider confirms the refund](ai-closes-on-refund-success.md) | Flow | Active |

## Executive workspace

| Decision | Type | Status |
|---|---|---|
| [Six ticket statuses; Reopened is a tag; auto-close after 14 quiet days](ticket-statuses.md) | Flow | Active |
| [One ticket list with sort and filter](queue-one-list-sort-filter.md) | IA | Active |
| [Colour-coded status chips; solid status button in the header](status-colours-and-header-button.md) | Visual | Active |
| [Sentiment, tags and customer history with private risk signals](ticket-properties-sentiment-tags-history.md) | IA | Active |
| [Reply box starts empty; AI draft, Rephrase, Translate, Check reply](composer-ai-tools.md) | Interaction | Active |
| [Copilot is a chat; no action buttons in it](copilot-chat.md) | IA | Active |
| [Confirmation modals show only what the executive needs at that moment](confirmation-modals.md) | Content | Active |

## Team Lead overview

| Decision | Type | Status |
|---|---|---|
| [Dashboard only: a list of what needs the lead](team-lead-dashboard-only.md) | Scope | Active |
| [Opens on "Needs you now"; speed always paired with an outcome](team-lead-needs-you-now.md) | IA | Active |

## Visual

| Decision | Type | Status |
|---|---|---|
| [Linear's composition rules with one green accent](linear-rules-green-accent.md) | Visual | Active |
| [Inter, light theme only](inter-light-only.md) | Visual | Active |

## Superseded

Earlier directions, kept for the history. Each one links to what replaced it.

| Decision | Replaced by |
|---|---|
| [Design language inspired by the Family app](family-inspired-design-language.md) | [Linear rules with a green accent](linear-rules-green-accent.md) |
| [Purple as the brand colour and the AI colour](purple-brand-and-ai.md) | [Linear rules with a green accent](linear-rules-green-accent.md) |

## Open questions

None. Every Active entry has a recorded reason.

## Adding an entry

One file per decision, named with a short slug (for example `ticket-statuses.md`), added to the right section above. If a new decision replaces an old one, mark the old one Superseded and link the two.
