# AI closes the ticket when the payment provider confirms the refund

- **Status:** Active
- **Type:** Flow
- **Decided by:** Nitish
- **Screens:** Case workspace (Case 4), Team Lead overview
- **Link:** ../process/scoping-the-assignment.md
- **Supersedes:** none

## Problem
After a refund starts, the ticket needs a clear end. The store usually knows when the gateway reports success, not when the money reaches the customer's bank.

## Decision
When the payment provider confirms the refund succeeded, AI sends the customer the amount, reference number (ARN/UTR) and expected date, then closes the ticket. A failed refund keeps the ticket open with the executive. If the customer says the money never arrived, the ticket reopens with the reference number ready. The Team Lead sees failed refunds only.

## Why
Nitish: when a ticket needs a refund, the loop only closes when the customer gets the refund; otherwise there's no honest point to mark it done. Tracking the refund through to the customer was one of the gaps found in research (no competitor does it), so the design includes it on purpose. Background: Nitish chose this after asking whether stores track the money reaching the customer's account; they usually don't, because the bank notifies the customer.

## Evidence
Designer judgement; common store practice (not verified across stores).   Confidence: Medium

## Rejected options
- Keep the ticket open until the customer confirms they got the money → extra follow-ups for a rare problem.

## Guardrails for the next designer
- Never show "credited" unless the system actually knows it.
- A failed refund must never close the ticket.

## Revisit when
"Refund not received" reopens become frequent.
