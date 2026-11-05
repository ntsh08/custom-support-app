# Purple is the brand colour, and also marks what the AI did

Status: Active          Type: Visual
Date: 2026-11-05        Decided by: Nitish
Skill version: 1.0.0
Screens: All
Link: Figma variables "JusDesk Color" (color/bg/brand, color/bg/ai, color/text/ai)
Supersedes: none

## Problem
Family is black and white. JusDesk needed one brand colour, and AI actions needed a consistent marker.

## Decision
Purple (#7040F5, purple/600) is the brand colour for primary buttons, selection and links. Purple tints also mark anything the AI suggested or did (AI Suggestion, AI badge, AI timeline items). Red, amber, green and blue are only for status.

## Why
Nitish chose a "fun purple" as the brand colour. Claude suggested reusing it for AI, since JusDesk is AI-native.

## Evidence
Contrast checked: white on purple/600 is 5.6:1; all text tokens pass WCAG AA on white.   Confidence: Medium

## Rejected options
- A separate AI colour → a second accent would compete with the brand.

## Guardrails for the next designer
- Don't use status colours for decoration.
- Don't use purple for anything that isn't a brand action or AI-related.
- Keep white text on purple/600 or darker only.

## Revisit when
Users confuse brand actions with AI actions in testing.
