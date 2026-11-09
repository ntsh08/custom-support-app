# Zendesk swimlane: "Delivered, but I didn't get it"

How Zendesk handles this ticket today: an agent picks it from the queue, investigates, acts and closes it, using Zendesk with Copilot (auto assist) and the Shopify app.

- **Read it as:** 8 stages, left to right. Step numbers give the order.
- **Lanes:** Customer, Zendesk AI, Support agent, Systems, Team lead / QA.
- **Step types:** Customer, AI · automatic, AI · suggests, Human, Decision, System.
- **Gaps:** places where the agent works around the tool.
- **Source:** the Zendesk help centre ("About auto assist", "About agent copilot", the routing docs). Steps marked "usually" are typical setups, not documented features.

Compare with the [Plain swimlane](plain-swimlane.md), which uses the same stages and lanes.

## Steps

| Stage | # | Lane | Type | Step | What happens | Gap |
|---|---|---|---|---|---|---|
| 1 · Intake | 1 | Customer | Customer | Writes in | "Order #4821 says delivered yesterday. I never got it." By chat, email or messaging. | |
| 1 · Intake | 2 | Zendesk AI | AI · automatic | AI agent answers first | If an AI agent is live, it checks the order status and sees "Delivered". It can't settle a dispute, so it escalates with a transcript and a summary. | Handoff seam: Copilot auto assist doesn't run on tickets that came from the AI agent. |
| 2 · Queue & pick up | 3 | Zendesk AI | AI · automatic | Intelligent triage | Tags intent (e.g. order not received), sentiment, language and entities such as the order number. The tags drive routing. | |
| 2 · Queue & pick up | 4 | Support agent | Human | Ticket reaches the agent | Pushed by omnichannel routing (availability, capacity, skills, priority) or pulled from a view. The agent accepts it. | |
| 3 · Open & understand | 5 | Zendesk AI | AI · suggests | Context panel loads | Ticket summary, suggested macros with confidence, related tickets with a merge badge, the order number highlighted inline. | |
| 3 · Open & understand | 6 | Support agent | Human | Reads and de-duplicates | Reads the summary, merges the same complaint sent by email and chat, checks the customer's past tickets. | |
| 4 · Investigate | 7 | Zendesk AI | AI · suggests | Auto assist matches a procedure | Matches the ticket to an admin-written procedure (e.g. "Order not received") and lines up its next steps. | Zendesk has no built-in "delivered but not received" flow. An admin must write the procedure. |
| 4 · Investigate | 8 | Support agent | Human | Gathers the evidence | Opens the order in the Shopify sidebar (fulfilment, tracking number). Checks the courier's proof of delivery: scans, photo, GPS, OTP. | The courier's proof usually lives outside Zendesk: another tab, or a call to the courier. |
| 4 · Investigate | 9 | Systems | System | Order and courier data | Shopify: order, payment, fulfilment, tracking. Courier portal: scan history, delivery photo, rider notes. Answers often take 24–48 hours. | |
| 5 · Decide | 10 | Zendesk AI | AI · suggests | Suggests a reply and actions | Replaces the composer with a drafted reply plus actions from the procedure. "View sources" shows where it came from. | No confidence score or reasoning on the suggested actions. |
| 5 · Decide | 11 | Support agent | Decision | Agent decides the outcome | Policy decides: wait 24–48 hours, ask the neighbours, reship, refund, courier claim or deny. The agent approves, edits or rejects the suggestion. | No claim history or fraud signal in front of the agent at this moment. |
| 6 · Act & reply | 12 | Systems | System | Action runs | Refund or cancel through the Shopify sidebar, or a reship order. Pre-approved actions run without a click and are logged in ticket events. | |
| 6 · Act & reply | 13 | Support agent | Human | Sends the reply | Adjusts the tone with writing tools (friendlier, simpler) and sends. It goes out under the agent's name. | |
| 6 · Act & reply | 14 | Customer | Customer | Gets the answer | Sees a reply from a person, and isn't told that AI drafted it. | |
| 7 · Close | 15 | Zendesk AI | AI · suggests | Suggests "Solved" | Auto assist can propose setting the status to Solved. | |
| 7 · Close | 16 | Support agent | Human | Marks Solved | Adds tags, an internal note and any follow-up reminder by hand, then picks up the next ticket. | No AI wrap-up: notes, disposition and "what we promised" are manual. |
| 8 · After close | 17 | Systems | System | Auto-close or reopen | Solved becomes Closed after a set number of days. A customer reply reopens it. | |
| 8 · After close | 18 | Customer | Customer | Waits for the money | A UPI or card refund takes days to land. If it hasn't, the customer writes back and the ticket reopens. | The refund is tracked only to "refund issued", not to "money credited". |
| 8 · After close | 19 | Team lead / QA | System | QA and reporting | AutoQA scores the conversation (empathy, solution, tone) and Spotlight flags risks. The Copilot dashboard logs accepted and ignored suggestions. | The lead sees this after the fact, not live. |

## What this tells us

1. Zendesk's AI is strong at the edges (triage, summary, drafting), but the middle, the investigation, is still the agent switching tabs.
2. The decision in step 11 is made without the evidence or the customer's claim history in one place. That's the moment to redesign.
3. AI and human help don't meet: auto assist is off on AI-agent tickets (step 2), so the handoff is the weakest point.
4. The ticket "ends" at Solved, but the customer's problem ends when the money lands (step 18). Juspay owns that part of the journey.
