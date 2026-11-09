# Plain swimlane: "Delivered, but I didn't get it"

The same ticket, moved through Plain, an AI-native help desk.

- **Read it as:** the same 8 stages and lanes as the [Zendesk swimlane](zendesk-swimlane.md), so the two can be compared stage by stage. Step numbers give the order.
- **Lanes:** Customer, Plain AI (Ari + Sidekick), Support agent, Systems, Team lead / QA.
- **Source:** Plain screens on Mobbin. Plain serves software companies, so its order, courier and refund steps don't appear there; those are marked "Not shown on Mobbin".
- **Notes:** each step can carry one of two kinds:
  - **vs Zendesk:** what's different from Zendesk
  - **Gap:** something missing or not shown

## Steps

| Stage | # | Lane | Type | Step | What happens | Note |
|---|---|---|---|---|---|---|
| 1 · Intake | 1 | Customer | Customer | Writes in | "Order #4821 says delivered yesterday. I never got it." Through the chat widget or email. | |
| 1 · Intake | 2 | Plain AI | AI · automatic | Workflow assigns it to Ari | An assignment workflow matches the thread and assigns it to the AI agent, the same way it would assign a person. | vs Zendesk: the AI is an assignee, not an add-on in front of the queue. |
| 2 · Queue & pick up | 3 | Plain AI | AI · automatic | Ari answers first | Replies within seconds from its knowledge sources, labelled "AI agent". It can't settle a delivery dispute, so it hands off: "Someone from our team will take a closer look." | Gap: the handoff message is generic, with no expected time and no reference. |
| 2 · Queue & pick up | 4 | Support agent | Human | Lands in "Needs first response" | The queue is sorted by the work left: First response, Next response, Investigating, Close the loop, Waiting for customer. The agent takes it. | vs Zendesk: the queue is grouped by stage of work, not ticket state. |
| 3 · Open & understand | 5 | Plain AI | AI · automatic | Summary sits in the thread | An AI summary inline, including what Ari already tried. Similar threads are listed beside it. | vs Zendesk: in the thread, not a side panel the agent opens. |
| 3 · Open & understand | 6 | Support agent | Human | Reads and moves to "Investigating" | Reads the summary, links similar threads, and sets the status so the queue shows where the work is. | |
| 4 · Investigate | 7 | Plain AI | AI · suggests | Agent asks Sidekick | "What should I do next?" "Should this be escalated?" Sidekick answers from the docs and the customer's history. | vs Zendesk: the agent asks for judgement, not just a draft. Gap: no order or courier data shown in Sidekick on Mobbin. |
| 4 · Investigate | 8 | Support agent | Human | Gathers the evidence | Checks the order and the courier's proof of delivery: scans, photo, GPS, OTP. | Not shown on Mobbin. Order and courier data would need customer cards via the API. |
| 4 · Investigate | 9 | Systems | System | Order and courier data | Store and courier systems, outside Plain. Could be shown as customer cards in the sidebar (via the API). | Not shown on Mobbin. |
| 5 · Decide | 10 | Plain AI | AI · suggests | Summary and next steps | The summary ends in a "Next steps" checklist linked to tasks. | vs Zendesk: the AI proposes the plan, not just the reply. |
| 5 · Decide | 11 | Support agent | Decision | Agent decides the outcome | Policy decides: wait 24–48 hours, reship, refund, courier claim or deny. The agent rates the summary ("Was this helpful?"). | Gap: no claim history or fraud signal in front of the agent. |
| 6 · Act & reply | 12 | Systems | System | Workflow action runs | "Run workflow" from the thread: label, assign, send a message. | Gap: a refund or reship action isn't shown on Mobbin. |
| 6 · Act & reply | 13 | Support agent | Human | Sends the reply | Writes or edits the reply and sends it. Can leave team notes in the thread. | |
| 6 · Act & reply | 14 | Customer | Customer | Gets the answer | Sees a reply from a person, after first hearing from the AI agent. | |
| 7 · Close | 15 | Support agent | Human | Moves to "Close the loop" | A separate status before Done: the agent owes the customer a final follow-up. | vs Zendesk: a built-in step between "replied" and "done". |
| 8 · After close | 16 | Customer | Customer | Waits for the money | The refund takes days to land. If it hasn't, the customer writes back and the thread returns to "Next response". | Gap: the refund is still tracked only to "issued", not "credited". |
| 8 · After close | 17 | Support agent | Human | Closes the loop, then Done | Confirms with the customer, then marks the thread Done. | |
| 8 · After close | 18 | Team lead / QA | System | Insights on people and AI | Ari's share of threads, handoffs split by reason (knowledge gap or other), SLA breaches that link to the threads. | vs Zendesk: the AI is measured as a teammate, and handoff reasons become the to-do list. |

## Compared with Zendesk

1. The AI is a teammate from step 2: the same workflows assign threads to it as to people, instead of it sitting in front of the queue as an add-on.
2. The queue and statuses describe the work left (Investigating, Close the loop), so a lead can see where each case is stuck.
3. The AI moves from writing help to judgement help ("What should I do next?", "Next steps"), but it still has no evidence to judge with.
4. The middle is the same as Zendesk: evidence gathering (steps 8–9), the refund decision without claim history (step 11) and refund tracking (step 16) are still open. That's our opening.
