# Inter is the only font

- **Status:** Active
- **Type:** Visual
- **Decided by:** Nitish
- **Screens:** All
- **Link:** ../DESIGN.md
- **Supersedes:** none

## Problem
A support desk is dense: most text sits at small sizes (10–14px), and executives read it all day.

## Decision
Inter for everything: 14px titles, 13px body, 12px meta and labels, 11px captions. Hierarchy comes from weight and grey level, not bigger sizes. Light theme only.

## Why
Nitish: Inter is a safe font that works at every point size and stays readable. A customer support app needs text at small sizes (10, 11, 12, 13, 14px) to stay readable, and Inter does that.

## Evidence
Designer judgement.   Confidence: Medium

## Rejected options
- A rounded font such as SF Pro Rounded → can't be served on the web, so Chrome viewers would see a different font.

## Guardrails for the next designer
- Don't add a second font family.
- Whole-pixel sizes only; nothing below 10px.

## Revisit when
A dark mode or a brand font is requested.
