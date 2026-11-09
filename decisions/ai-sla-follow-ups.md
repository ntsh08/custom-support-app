# The AI sets follow-ups from the SLA when a ticket starts waiting

Status: Active          Type: Interaction
Decided by: Nitish
Skill version: 1.0.0
Screens: Case workspace (Tasks and follow-ups, toast)
Link: ../synthesis/jusdesk-workflow.md
Supersedes: none

## Problem
Waiting tickets get lost. In the interview, follow-ups lived in a personal tracker because the tool had no follow-up system.

## Decision
When a ticket starts waiting, the AI adds a follow-up task with a due time from the SLA and owns it:
- Waiting on a courier: check tomorrow at 10 am.
- Waiting on the customer: nudge in 3 days.
- Waiting on the team lead: check in 2 hours.

A toast says when the AI will check. Like any task, it can be reassigned.

## Why
Nitish: the AI can do the follow-up, but a person can too; it depends. The executive can assign any task to whoever they want.

## Evidence
P01 keeps a personal tracker so follow-ups aren't missed: "There isn't really a follow-up system on the ticket" (research/Custom Support Interview Transcript.md).   Confidence: Medium

## Rejected options
- Leaving follow-ups to the executive's memory or a separate tracker → the problem the interview described.

## Guardrails for the next designer
- Every follow-up has an owner and a due time.
- The AI never takes a follow-up it can't do, such as a phone call.

## Revisit when
Real SLA data shows different timings.
