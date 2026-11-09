# Ticket list is one "All tickets" list with sort and filter; rows show name, title, ticket number and status

- **Status:** Active
- **Type:** IA
- **Decided by:** Nitish
- **Screens:** Queue
- **Link:** ../research/Custom%20Support%20Interview%20Transcript.md
- **Supersedes:** none

## Problem
Grouping the list by status means scrolling to reach a status once there are many tickets.

## Decision
- One flat list headed "All tickets" with a count. No status group headers, no view tabs.
- Header right: sort (Due time default, Newest, Oldest) and a filter icon (not wired in the prototype).
- Each row: customer name with time left, the ticket title, then a grey ticket-number tag and a coloured status chip.

## Why
Nitish: "suppose there are a lot of tickets in Waiting… assuming 50 tickets. I have to scroll if I have to find tickets of a certain status… this will not work." Customer name chosen over the issue as the row's first line because every ticket has the same title.

Why the list is sorted by due time and the time left is so prominent (Nitish): the interview showed that response speed is one of the key metrics in customer support, and first response matters most. So the list puts the ticket that's due soonest at the top, and each row shows how long is left to reply.

## Evidence
In the interview, first response time (P90, measured after the bot's acknowledgement) is a core metric, and a late first response triggers an escalation (research/Custom Support Interview Transcript.md).   Confidence: Medium

## Rejected options
- Status group headers in the list → too much scrolling at volume.
- View tabs (Needs you, Follow-ups, Escalated, Waiting, Closed) → tried, then removed. Nitish: with a large number of tickets it doesn't work, because he has to scroll just to see whether something needs a follow-up, and the tab labels weren't clear.
- An "Urgency" sort option → removed. Nitish: urgency and due time are almost the same thing, and having both would confuse people about the difference, so only the simpler one, Due time, stays.

## Guardrails for the next designer
- Don't bring back group headers without solving the 50-ticket scroll.

## Revisit when
Filters are designed.
