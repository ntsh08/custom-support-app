# Six ticket statuses, set by actions; Reopened is a tag; auto-close after 14 quiet days

Status: Active          Type: Flow
Date: 2026-11-07        Decided by: Nitish
Skill version: 1.0.0
Screens: Queue, Case workspace (composer, Properties)
Link: ../research/competitors.md
Supersedes: none

## Problem
The old groups (New tickets, With your lead, Waiting, Handled by AI, Closed) didn't say who had the ball, and mixed status with owner ("Handled by AI").

## Decision
Statuses: First response · Needs reply · Waiting on customer · Waiting on others · Escalated · Closed.
- Actions set them: new ticket → First response; agent replies → Waiting on customer (picker next to Send can change it); customer writes → Needs reply; escalate to lead → Escalated; courier claim or refund pending → Waiting on others.
- Reopened is a tag on Needs reply, not a status.
- AI is an owner, not a status.
- Waiting on customer: AI nudges on day 3 and 7, closes on day 14. Escalated and Waiting on others never auto-close.
- Reply timer shows only for First response and Needs reply.
- Queue order: Needs reply, First response, Escalated, Waiting, Closed.

## Why
Nitish proposed First response, Needs reply, Waiting on customer, Closed, Reopened, and added Escalated. Waiting on others added because most of our cases wait on a courier, lead or bank. Reopened as a tag keeps reopened tickets in the urgent bucket. Auto-close because customers often stop replying once they find the parcel (Nitish).

## Evidence
Plain: Todo / Snoozed / Done with sub-statuses, and new activity moves a ticket back to Todo (plain.com docs). Zendesk auto-solves quiet tickets and sets status on submit.   Confidence: Medium

## Rejected options
- Reopened as its own status → splits the most urgent tickets into a separate bucket.
- "Handled by AI" as a status → it's an owner.

## Guardrails for the next designer
- Closed means the customer knows the outcome, not that a refund was sent.
- Never auto-close Escalated or Waiting on others.

## Revisit when
Real SLA data or the Team Lead dashboard needs finer states.
