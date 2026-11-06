# AI suggestion card replaces the AI summary on open tickets; each step can become a task for me or the AI

Status: Active          Type: Interaction
Date: 2026-11-07        Decided by: Nitish
Skill version: 1.0.0
Screens: Case workspace (conversation)
Link: ../DESIGN.md
Supersedes: none

## Problem
The summary repeated what the messages said, and AI next steps were split between the conversation and the task panel.

## Decision
- Open tickets: an "AI suggestion" card with a few distinct next steps (no headline, no paragraph). Closed tickets keep the "AI summary".
- Each step has "+ Add task ▾": Me or AI ("AI can't make calls" disables AI for phone steps). After adding it reads "Added for you" / "AI will do it" and can be reassigned or removed. Task rows show the assignee.
- AI-suggested tasks no longer appear in the task panel.

## Why
Nitish: "Remove the summary part. Just show the suggestion part only." On closed tickets: "You can still give the AI summary once the ticket is closed… Keep that." On merging steps: "This could be only one suggestion instead of four." Add task: suggested by Claude, Nitish agreed ("show it by default", then "Option A").

## Evidence
P01 keeps a personal tracker so follow-ups aren't missed (research/interviews/p01-support-practitioner.md).   Confidence: Medium

## Rejected options
- Suggestions inside "Show investigation" → moved out.
- A separate suggestions bubble under the assistant's reply → merged into the card.
- Add task on hover only → always visible.

## Guardrails for the next designer
- Keep steps few and distinct; merge steps that are one action.
- Never offer the AI a step it can't do.

## Revisit when
The AI can actually run tasks and report back.
