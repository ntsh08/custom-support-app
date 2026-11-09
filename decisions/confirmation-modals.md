# Confirmation modals show only what the executive needs at that moment

Status: Active          Type: Content
Decided by: Nitish
Skill version: 1.0.0
Screens: Case workspace (reship, refund and escalation modals)
Link: ../DESIGN.md
Supersedes: none

## Problem
The first confirmation modals carried more than the executive needed to confirm an action: a full shipping address, a limit line and a tracking line.

## Decision
- Reship and refund: a title, a few rows (item, ship to, arrives, cost) and one button.
- Escalation: a one-line question ("Ask Priya to review Rohan's claim?") and an editable note to the team lead, written by the AI in plain sentences in the executive's voice.

## Why
Nitish: what the modal shows is his own call on what's relevant to the executive at that point. It isn't driven by Linear.

## Evidence
None beyond the design discussion.   Confidence: Low

## Rejected options
- The full shipping address → shortened to "Same address · Flat B-204".
- The limit line and the tracking line → not needed at the moment of confirming.
- A bulleted escalation note → replaced by plain sentences.

## Guardrails for the next designer
- Only show what the executive needs to confirm this one action.

## Revisit when
Testing shows executives confirm the wrong action.
