# AI flags possible fraud but never denies a claim; people decide

Status: Active          Type: Interaction
Decided by: Nitish
Skill version: 1.0.0
Screens: Case workspace (Case 5), Team Lead overview
Link: ../process/scoping-the-assignment.md
Supersedes: none

## Problem
Some "not received" claims may be false. AI can see patterns across accounts and payments that one executive can't.

## Decision
AI shows fraud signals (repeat claims, linked accounts, payment links) privately to staff only. It never accuses the customer or denies the claim. The executive replies neutrally; the Team Lead decides.

## Why
Nitish: the customer relationship matters a lot, and denying a claim is a serious matter. Above a certain price point, someone has to take ownership of that call, so it can't be left to the AI. For small amounts the AI might handle it, but that's out of scope for this assignment.

## Evidence
Desk research: matching proof can still be theft after a correct delivery (research/Desk Research.md, §2).   Confidence: Medium

## Rejected options
- AI denies automatically when signals are strong → not proposed or chosen.

## Guardrails for the next designer
- Never show fraud signals or suspicion in customer-facing text.
- Never let AI deny a claim on its own.
- Don't treat matching proof of delivery as proof the customer is lying.

## Update
Signals moved into the Customer history block, with a source on each one and a risk box on every case: "Low risk · nothing unusual found" for clean customers (fast path, research insight 6), "Worth a look before deciding" when signals exist. Refunds and address sharing added as history rows. (Nitish)

## Revisit when
Policy or legal review requires a different handling.
