# Status chips are colour-coded; the header shows status as a solid colour button (G3)

- **Status:** Active
- **Type:** Visual
- **Decided by:** Nitish
- **Screens:** Queue rows, Case header
- **Link:** ../DESIGN.md
- **Supersedes:** none

## Problem
The first status chip colours didn't look good, and the header split button felt off because both halves did the same thing.

## Decision
- Chips: First response light blue, Needs reply purple, Escalated orange, Waiting grey, Closed light grey.
- Header: a split button filled solid in the status colour with white text (G3), vertically centred on the title and tags; either half opens "Change status".

## Why
Nitish: "Can you use normal colors like blue, a little bit of purple, and gray, because these colors do not look good?" and asked for a lighter blue to match the chip text. Choice of G3 over the other options (Nitish): the status is an important data point on a ticket, so the button is filled solid to draw attention to it clearly.

## Evidence
References on Mobbin: Featurebase, Jira, Klaviyo, Zendesk, Plane, Plain.   Confidence: Low

## Rejected options
- Amber / red / rose / teal chips → "do not look good".
- Tinted outlined split, single tinted chip, white button with dot, Close-ticket split (G1), always-blue status (G2) → not chosen; they don't draw enough attention to the status.

## Guardrails for the next designer
- These colours are status only; they are the single exception to "one accent".

## Revisit when
Colour-blind or contrast testing.
