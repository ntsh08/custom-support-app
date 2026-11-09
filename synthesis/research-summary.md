# Research summary

**In one line:** existing desks automate the edges of a "delivered, not received" ticket (sorting, summarising, drafting), but the middle, where the case is actually won or lost, is still manual: gathering evidence, deciding who gets money, and following through until the money lands.

Six insights, each with what we saw, why it matters and what it changed in JusDesk.

**Sources:**
- [Desk Research](../research/Desk%20Research.md) (§1–§6 below)
- [competitor analysis](../research/competitors.md)
- the [Zendesk](../research/workflow%20research/zendesk-swimlane.md) and [Plain](../research/workflow%20research/plain-swimlane.md) swimlanes
- one practitioner [interview](../research/Custom%20Support%20Interview%20Transcript.md)

## 1. The case turns on evidence, and the evidence is never in one place

**What we saw**
- In Zendesk, the courier's proof lives outside the desk: another tab, a courier portal, or a phone call. Answers often take 24–48 hours (Zendesk swimlane, steps 8–9).
- Agents who do this well check the delivery photo, the address history and past claims, not just the status (§2, Reddit).
- In India it's often the courier's word against the customer's, and agents just repeat the courier's status back: "it is auto generated message" (§2, Voxya).
- Even with a photo, marketplaces side with the customer: "Neither tracking nor photographs are considered proof of delivery" (§2, Amazon India sellers).

**Why it matters:** the step that decides the outcome is the one tools help least with, so decisions get made on the status label, or on gut.

**In JusDesk:**
- The AI pulls tracking, photo, GPS, OTP, stock and history before anyone opens the ticket.
- Delivery details puts them side by side.
- The AI flags mismatches ("GPS 600 m from the address") but doesn't decide what happened.

## 2. "Replied" and "resolved" are not the same, and the gap is where customers are lost

**What we saw**
- In the interview, sending a reply closes the task while the internal work is still open, so follow-ups live in a personal tracker: "There isn't really a follow-up system on the ticket."
- UPI refunds sit between "initiated" and "in my bank" for days, and agents can only say "check with your bank" (§5).
- Zendesk ends the ticket at Solved, while the customer's problem ends when the money arrives (Zendesk swimlane, step 18).
- Plain adds a "Close the loop" step, but still tracks refunds only to "issued".
- Customers notice: "a week later you realize everything you have been told was a lie" (§6).

**Why it matters:** every desk measures closure from its own side. The failure the customer feels, the money never arriving or a promise not kept, happens after the ticket looks done, and nobody owns it.

**In JusDesk:**
- Statuses say who has the ball (Waiting on customer, Waiting on others).
- The AI sets and owns follow-ups from the SLA.
- A refund closes the ticket only when the payment provider confirms it, and the customer gets the reference number (ARN/UTR).
- A reply after closing reopens the ticket.

## 3. The hand-off from AI to a person is the weakest moment

**What we saw**
- Customers reach a person angry and repeating themselves: "they don't seem to share the long complicated information I tell them with the human" (§3, §6).
- Bots take the easy tickets and "filter complexity towards the agents", often without the context (§3, CX Dive).
- In Zendesk, Copilot doesn't run on tickets that came from the AI agent (Zendesk swimlane, step 2).
- Plain's hand-off message is generic: no expected time, no reference (Plain swimlane, step 3).
- But customers are fine with a bot that knows its limits: "how quickly it knew its own limitations and handed me to an actual human" (§6).

**Why it matters:** the problem isn't that the AI hands over. It's that it hands over empty-handed, and often after sending a reply it couldn't stand behind.

**In JusDesk:**
- The AI investigates every ticket first.
- It replies only when it can answer with proof.
- Otherwise it sends nothing and hands over with its full investigation and suggested next steps, so the executive starts where the AI stopped.

## 4. AI help is only trusted when it shows its work and stays editable

**What we saw**
- Suggested replies take longer to trim than to write: "Using the template takes more time" (§3, arXiv study).
- Mood detection misfires, and trust goes quickly (§3).
- AI can feel like a boss, not a helper (§3, Scroll.in).
- The interviewee reads messages themself because "the bot is sometimes wrong".
- Across Zendesk, Sierra and Decagon, only Zendesk macros show a confidence label. No product explains why it suggests an action or what it checked (competitors, gap 3).

**Why it matters:** an AI that acts without showing its reasoning either gets ignored or gets blindly accepted. Neither is safe when money moves.

**In JusDesk:**
- Every AI step states what it found and the policy that decided it ("As per our policy…").
- Drafts appear only when asked for.
- Check reply suggests changes but never edits on its own.
- Sentiment is a hint, not a score.

## 5. Fraud suspicion and customer trust pull against each other, and the refund decision is made blind

**What we saw**
- Merchants assume fraud: "Should I just refund them or is it a scam?" (§2, Shopify).
- Customers are asked to prove something that didn't happen (§2).
- Repeat claimers are real, and platforms can swing to blanket refusal: "Meesho initially refunded for 15-20 orders and then … stopped refunding" (§2).
- In both Zendesk and Plain, the agent decides the outcome with no claim history or fraud signal on screen (step 11 in both swimlanes).
- Approvals are all-or-nothing; nobody offers tiers like "under ₹500 for clean customers, lead approval above ₹5,000" (competitors, gap 4).

**Why it matters:** without signals, teams either over-refund or treat every customer as a suspect. Without tiers, low-risk cases wait as long as risky ones. Payment data such as refund history and chargebacks is exactly what a payments company like Juspay has.

**In JusDesk:**
- Customer history opens with one private signal (good customer, low risk or potential fraud), and every signal names its source.
- The AI never denies or accuses.
- The executive decides up to ₹5,000; the team lead decides above that and reviews suspected fraud.

## 6. Leads see what went wrong last week, not where to step in now

**What we saw**
- Reports arrive too late to act on: "next week I get the report, how am I going to learn from it?" (§4).
- Dashboards used for policing push gaming and burnout, and speed can look good while customers come back (§1, §4).
- Zendesk's AutoQA and Plain's insights are after the fact (both swimlanes, last step).
- No product gives a live, ranked list of tickets the lead should step into, or one view of the AI and the people as one team (competitors, gaps 6–7).

**Why it matters:** the lead's leverage is in the next hour, through approvals, spikes and tickets about to breach, and current tools show the last week.

**In JusDesk:**
- The Team Lead overview opens on "Needs you now": approvals, fraud reviews, failed refunds and tickets about to breach.
- Next to it are "Patterns the AI spotted", such as one courier's claims spiking in one area.
- Every speed metric is paired with an outcome: reopens and repeat contacts.

## What we're less sure of

- **One interview,** with someone who supports business accounts, not consumer deliveries. It supports insight 2, not the rest.
- **No team lead was interviewed.** Insight 6 rests on desk research and competitor gaps.
- **The forum and Hacker News voices are mostly Western ex-agents,** and Indian complaint sites lean towards unresolved cases. They show the problems exist, not how often they happen.
- **Nothing here sets a refund rule, a fraud rate or a GPS cut-off.** The ₹5,000 limit and the 100 m flag are design assumptions to test.
