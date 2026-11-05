# Only the delivered-not-received scenario, explored through edge cases

Status: Active          Type: Scope
Date: 2026-11-05        Decided by: Nitish
Skill version: 1.0.0
Screens: All executive screens, Team Lead overview
Link: ../process/assignment-task.md
Supersedes: none

## Problem
Support covers orders, deliveries, payments, refunds and returns. Designing for all of them in 3 days would stay shallow.

## Decision
Design only the brief's scenario ("marked delivered, but not received"). Cover it through edge cases drawn from the scenario itself, across two journeys: Support Executive (queue to close) and Team Lead (one overview screen).

## Why
Nitish: focus on the main scenario the brief gives and find edge cases inside it, rather than jumping to other issue types. That makes a better case than covering many issues thinly.

## Evidence
Designer judgement. The brief names this one scenario.   Confidence: High

## Rejected options
- Design several issue types (returns, payment failures, cancellations) → spreads 3 days too thin; outside the brief's scenario.

## Guardrails for the next designer
- Don't add full flows for other issue types. They can appear as queue labels only.
- New variants go in as annotations on the existing cases.

## Revisit when
The brief or the hiring manager asks for other issue types.
