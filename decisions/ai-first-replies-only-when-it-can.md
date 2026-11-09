# The AI is first on every ticket and replies only when it can answer

- **Status:** Active
- **Type:** Interaction
- **Decided by:** Nitish
- **Screens:** Case workspace (conversation)
- **Link:** ../DESIGN.md
- **Supersedes:** none

## Problem
Rohan got no reply while Ananya and Meera got a holding reply ("I'm passing this to our team"). The behaviour was inconsistent and the rule wasn't written down.

## Decision
The JusDesk AI is always first on every ticket. It reads the message and investigates (tracking, photo, GPS, stock, history). It replies to the customer only when it can actually answer. Otherwise it sends nothing, hands the ticket to a person, and leaves a team-only "AI investigated this ticket" line in the conversation that opens to its steps.
- Replies: Vikram (guard had it), Kavya (early scan).
- No reply, investigation line only: Ananya (wrong door), Rohan (refund needs approval), Meera (suspicious claim).

## Update
The investigation now shows as an "AI investigation" card after the customer's first message on every ticket, with a two-line result and an expandable list of steps. The team-only "No reply sent" message and the per-reply "Show investigation" are gone. (Nitish)

## Why
Nitish: "Just Desk AI will work with the first person who will reply and investigate, and reply only if he can reply." On staying silent instead of a holding reply (Nitish): we shouldn't answer someone filing a complaint before doing our own research. If the AI replies with something wrong or without enough context, it gives the customer the wrong impression of the company.

## Evidence
None beyond the design discussion.   Confidence: Low

## Rejected options
- A holding reply on every ticket ("passing this to our team") → removed for Ananya and Meera.

## Guardrails for the next designer
- Never let the AI send a reply it can't stand behind.
- Always leave the investigation visible to the team, reply or not.

## Revisit when
Research shows customers need an acknowledgement before a person picks up.
