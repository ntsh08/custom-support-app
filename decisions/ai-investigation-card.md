# An AI investigation card follows the first message: what it found, then "As per our policy…"

- **Status:** Active
- **Type:** Content
- **Decided by:** Nitish
- **Screens:** Case workspace (conversation)
- **Link:** ../DESIGN.md
- **Supersedes:** none

## Problem
The agent couldn't see what the AI checked before handing over, or why it did or didn't reply.

## Decision
After the customer's first message on every ticket: an "AI investigation" card with the AI signature (gradient border, green label, AI-search icon), "Only your team sees this", one plain paragraph (what it found, then "As per our policy, …" and what it did), and "Show investigation" expanding to the steps. Assistant replies no longer carry their own investigation toggle.

## Why
Nitish renamed "thinking" to "investigation": "because we are investigating a thing." On the content: "you should also mention that these things are the evidence that I have found. As per our policy, we can't do that." Then: "remove the title Evidence and Policy. Just write it simply."

## Evidence
None beyond the design discussion.   Confidence: Low

## Rejected options
- "Show thinking" on each reply → renamed, then moved into the card.
- Labelled Evidence / Policy rows → simplified to one paragraph.
- A centred line or a "No reply sent" message → replaced by the card.

## Guardrails for the next designer
- Always name the policy that decided the AI's action.

## Revisit when
Policies are configurable per business.
