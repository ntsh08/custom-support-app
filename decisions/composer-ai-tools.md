# Reply box starts empty; tools are AI draft, Rephrase, Translate, Check reply; no status picker

Status: Active          Type: Interaction
Decided by: Nitish
Skill version: 1.0.0
Screens: Case workspace (composer)
Link: ../DESIGN.md
Supersedes: none

## Problem
The reply box was pre-filled by the AI, had a status picker that didn't make sense, and had no way to check a reply before sending.

## Decision
- The box starts empty; the AI drafts only when the agent presses "AI draft".
- Tools: AI draft, Rephrase, Translate, Check reply. Check reply lists notes (ask answered, tone vs mood, promises vs policy, no fraud talk, language) with Apply; nothing changes until Apply.
- No "After sending" picker; sending a reply sets Waiting on customer.

## Why
Check reply, Nitish: "analyze the reply that he has written based on the customer sentiment or the request… AI can scan… and suggest if any changes are required." After sending picker: "Remove the after sending thing. Doesn't make sense." Empty box: "Can you not automatically create drafts? Just write a placeholder." Reason behind not auto-drafting: Not stated.

## Evidence
P01 uses AI to fix grammar and rephrase, and reads things himself because "the bot is sometimes wrong" (research/personas.md).   Confidence: Medium

## Rejected options
- Auto-filled AI draft → removed.
- "After sending: <status> ▾" picker → removed.

## Guardrails for the next designer
- Check reply never edits the draft on its own.

## Revisit when
Rephrase and Translate are wired up.
