# Fictional business: a fashion brand selling clothes online

- **Status:** Active
- **Type:** Scope
- **Decided by:** Nitish
- **Screens:** All (order data, products, copy)
- **Link:** ../process/scoping-the-assignment.md
- **Supersedes:** none

## Problem
The brief says "an e-commerce business" without saying what it sells. The product type shapes orders, values, stock and resolutions.

## Decision
A fictional D2C fashion brand. Example orders: T-shirt ₹1,200, kurta ₹1,800, dress ₹4,500, jacket ₹6,500.

## Why
Nitish: returns and refunds are most common in fashion, from his own experience as a shopper too, so it's easy to relate to. It also makes edge cases easier to find. There was no deeper design reason behind the choice.

## Evidence
Designer judgement.   Confidence: Medium

## Rejected options
- Electronics → higher value suits fraud and approvals, but fewer resolution types, and OTP delivery makes disputes rarer.

## Guardrails for the next designer
- Keep products and prices consistent across screens.
- Use stock and size as real constraints (Case 4 depends on "size out of stock").

## Revisit when
Juspay feedback suggests a different merchant type.
