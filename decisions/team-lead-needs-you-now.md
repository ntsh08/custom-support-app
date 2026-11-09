# Team Lead overview opens on "Needs you now", and every speed number is paired with an outcome

- **Status:** Active
- **Type:** IA
- **Decided by:** Nitish
- **Screens:** Team Lead overview (/lead)
- **Link:** ../research/Desk%20Research.md
- **Supersedes:** none

## Problem
Lead dashboards usually report the past and show speed on its own, so the lead finds out about problems after they can be fixed, and fast numbers can hide customers coming back.

## Decision
- The page opens on "Needs you now": approvals, fraud reviews, failed refunds, courier replies due and tickets close to the first-reply deadline, each with its ticket and a one-line reason.
- Beside it: "Patterns the AI spotted", such as one courier's claims spiking in one area.
- Four KPI tiles, each pairing speed with an outcome: open tickets with tickets waiting on couriers, first reply with reopened, resolved with came back within 7 days, AI resolved alone with handed to people.
- A per-person table for load.

## Why
Nitish: this follows the research finding that leads need a live list of where to step in, not reports that arrive after the fact.

## Evidence
- Late reports can't be acted on: "next week I get the report, how am I going to learn from it?" (research/Desk Research.md, §4).
- Speed can look good while customers come back (research/Desk Research.md, §1 and §4).
- No competitor gives a live, ranked list of where the lead should step in (research/competitors.md, gaps 6–7).

Confidence: Medium. No team lead was interviewed.

## Rejected options
- A reporting dashboard with charts first → shows the past, not where to act now.
- Speed metrics on their own → can reward closing tickets that come back.

## Guardrails for the next designer
- Every item on "Needs you now" names its ticket and why it needs the lead.
- Never show a speed number without its outcome.

## Revisit when
A team lead is interviewed or tests the page.
