# AI flags possible fraud but never denies a claim; people decide

Status: Active          Type: Interaction
Date: 2026-11-05        Decided by: Nitish
Skill version: 1.0.0
Screens: Case workspace (Case 5), Team Lead overview
Link: ../process/assignment-task.md
Supersedes: none

## Problem
Some "not received" claims may be false. AI can see patterns across accounts and payments that one executive can't.

## Decision
AI shows fraud signals (repeat claims, linked accounts, payment links) privately to staff only. It never accuses the customer or denies the claim. The executive replies neutrally; the Team Lead decides.

## Why
Not stated. Nitish asked for the fraud case to be covered and accepted this handling.

## Evidence
Desk research: matching proof can still be theft after a correct delivery (research/reddit-follow-up.md).   Confidence: Medium

## Rejected options
- AI denies automatically when signals are strong → not proposed or chosen.

## Guardrails for the next designer
- Never show fraud signals or suspicion in customer-facing text.
- Never let AI deny a claim on its own.
- Don't treat matching proof of delivery as proof the customer is lying.

## Revisit when
Policy or legal review requires a different handling.
