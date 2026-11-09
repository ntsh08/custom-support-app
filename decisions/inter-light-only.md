# Inter, light theme only

- **Status:** Active
- **Type:** Visual
- **Decided by:** Nitish
- **Screens:** All
- **Link:** ../DESIGN.md
- **Supersedes:** none

## Problem
A rounded font such as SF Pro Rounded was an option, but the prototype will be viewed in Chrome on a Mac and deployed on Vercel.

## Decision
Use Inter in Figma and on the web. Light theme only.

## Why
Nitish: keep it simple. SF Pro Rounded can't be served on the web, and Chrome doesn't support `ui-rounded`, so Inter keeps Figma and the build identical.

## Evidence
Designer judgement; Apple font licence and Chrome support for ui-rounded.   Confidence: High

## Rejected options
- SF Pro Rounded with a web fallback → Chrome viewers would see a different font.
- Nunito everywhere → considered; Nitish chose Inter.
- Dark theme → extra tokens and time.

## Guardrails for the next designer
- Don't add a second font family.
- Use the JusDesk text styles; whole-pixel sizes only.

## Revisit when
A dark mode is requested.
