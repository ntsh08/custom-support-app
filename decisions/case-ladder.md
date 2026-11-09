# Five cases from simple to hard, with the AI/human split shifting

- **Status:** Active
- **Type:** Flow
- **Decided by:** Nitish
- **Screens:** Executive queue, case workspace, Team Lead overview
- **Link:** ../process/scoping-the-assignment.md
- **Supersedes:** none

## Problem
One long "main path" was confusing. The work needed a clear way to show where AI acts alone and where people take over.

## Decision
Show five cases of the same scenario, simple to hard:
1. Delivered to the guard (customer writes in Hindi): AI handles it alone.
2. Scanned too early: AI waits and follows up with the courier.
3. Evidence doesn't match, duplicate complaint on chatbot and email: AI merges and recommends; executive decides.
4. High value, size out of stock, refund fails: executive proposes, Team Lead approves, executive recovers.
5. Suspected false claim: AI flags, people decide.

## Why
Nitish: start with a simple case and move to more difficult ones, giving some tasks to AI and some parts to humans. He added the fraud case, the duplicate-complaint merge and the language case.

## Evidence
Designer judgement.   Confidence: High

## Rejected options
- One main path with many branches → confusing to follow and present.

## Guardrails for the next designer
- Keep the order simple → hard; it's the story.
- Each case must show clearly who acts: AI alone, AI suggests and a person decides, or Team Lead.

## Revisit when
Time runs short (cut Case 2 first) or a case doesn't add a new AI/human pattern.
