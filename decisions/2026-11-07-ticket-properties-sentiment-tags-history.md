# Properties get sentiment and multi-select tags; a Customer history block carries refunds, address and private risk signals

Status: Active          Type: IA
Date: 2026-11-07        Decided by: Nitish
Skill version: 1.0.0
Screens: Case workspace (right panel: Properties, Customer history)
Link: ../research/competitors.md
Supersedes: none

## Problem
The right panel had no mood cue, only one single-choice reason, and fraud signals sat under delivery evidence on one case only.

## Decision
- Properties: Sentiment (Angry / Frustrated / Neutral / Happy, with a one-line why) and multi-select Tags (chips, "+ Add" checklist). Reason stays single-choice because it drives the due date.
- Customer history: customer since, orders and spend, past claims, refunds, address sharing, then a private risk box on every case ("Low risk · nothing unusual found" or "Worth a look before deciding") with a source on each signal, then past tickets.

## Why
Nitish, after the triage research: "We need to add sentiment in the ticket properties section" and tags "where you can select multiple". On fraud: "You should also add fraud signals for the customer. That was the whole point we were talking about: customer history."

## Evidence
Zendesk Intelligent Triage sets intent, sentiment and language with confidence (research/competitors.md). Research insight 6: surface repeat-claim risk privately as a neutral signal, give low-risk customers a fast path (research/user-pain-points.md). Reddit agents check address and account history (research/reddit-follow-up.md).   Confidence: Medium

## Rejected options
- Fraud signals under Delivery evidence → moved to Customer history.

## Guardrails for the next designer
- Risk signals never appear in customer-facing text; every signal names its source.
- Show the risk box on clean customers too, so the fast path is visible.

## Revisit when
Real triage data shows which properties agents actually use.
