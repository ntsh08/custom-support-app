# Copilot tab is a chat with suggested questions above a text box; no recommendation card or decision buttons

- **Status:** Active
- **Type:** IA
- **Decided by:** Nitish
- **Screens:** Right panel (Copilot tab)
- **Link:** ../DESIGN.md
- **Supersedes:** none

## Problem
The Copilot tab mixed a recommendation card, decision buttons and a small ask box.

## Decision
Copilot is a chat in the INA agent pattern, in our design system: centred empty state (gradient sparkles on a light circle), questions as grey bubbles, answers under a green "Copilot" label, suggested-question chips above an "Ask a follow-up" box. The recommendation card and its decision buttons (Reship, Send to Priya, refund steps) are removed.

## Why
Nitish: "I'm taking reference from the INA agent, but keep the design system we have used." Decision buttons: Nitish chose "Leave them out". Reason (Nitish): the actions belong next to the AI suggestion in the conversation, where the executive already has all the context and can see what the AI suggests. Acting from Copilot means switching tabs first, which is slower for support work.

## Evidence
None.   Confidence: Low

## Rejected options
- Recommendation card with actions in Copilot → removed.

## Guardrails for the next designer
- Case-stage actions now run from the AI suggestion card (see ai-suggestion-card.md), not from Copilot.

## Revisit when
The case actions need a home again.
