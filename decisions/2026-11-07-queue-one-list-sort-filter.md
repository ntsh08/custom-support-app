# Ticket list is one "All tickets" list with sort and filter; rows show name, title, ticket number and status

Status: Active          Type: IA
Date: 2026-11-07        Decided by: Nitish
Skill version: 1.0.0
Screens: Queue
Link: ../research/Custom%20Support%20Interview%20Transcript.md
Supersedes: none

## Problem
Grouping the list by status means scrolling to reach a status once there are many tickets.

## Decision
- One flat list headed "All tickets" with a count. No status group headers, no view tabs.
- Header right: sort (Due time default, Newest, Oldest) and a filter icon (not wired in the prototype).
- Each row: customer name with time left, the ticket title, then a grey ticket-number tag and a coloured status chip.

## Why
Nitish: "suppose there are a lot of tickets in Waiting… assuming 50 tickets. I have to scroll if I have to find tickets of a certain status… this will not work." Customer name chosen over the issue as the row's first line because every ticket has the same title.

## Evidence
P01's priorities: first response time and never losing a follow-up (research/Custom Support Interview Transcript.md).   Confidence: Low

## Rejected options
- Status group headers in the list → too much scrolling at volume.
- View tabs (Needs you, Follow-ups, Escalated, Waiting, Closed) → tried, then removed. Reason: Not stated.
- An "Urgency" sort option → removed. Reason: Not stated.

## Guardrails for the next designer
- Don't bring back group headers without solving the 50-ticket scroll.

## Revisit when
Filters are designed.
