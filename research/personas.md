# Personas: Support Executive and Team Lead

Drafted 5 November 2026. Working personas for the Juspay assignment, not validated archetypes.

Every line carries its source:

- **[Interview]**: what Nitish's interviewee, a customer support executive, reported ([interview notes](interviews/p01-support-practitioner.md)). One person, B2B accounts, not consumer e-commerce.
- **[Desk]**: public research ([pain points](user-pain-points.md), [Reddit follow-up](reddit-follow-up.md), [competitors](competitors.md)). Self-reported, unverified, mostly non-Indian.
- **[Hypothesis]**: what the design needs to assume for the missing-delivery scenario. To be tested.

The personas are named by role. The interviewee is not named here.

---

## 1. Support Executive

**Evidence level:** one interview plus desk research. Directionally useful; not saturated.

**Role:** Handles incoming customer requests, investigates, gets things fixed through other teams and tells the customer when it's done.

### A day in the work
- Requests arrive over email, WhatsApp and a chatbot, in more than one tool. **[Interview]**
- Before they reply, AI has drafted a private suggestion (sometimes with "three checks you can perform") and sent the customer an acknowledgement. **[Interview]**
- AI labels each request; they verify or changes the label. **[Interview]**
- If other teams need to act, they create an internal ticket by hand and assigns it. **[Interview]**
- After the internal work is finished, they go back and tells the customer. **[Interview]**
- For a missing delivery they would need order, payment and courier proof, which usually live in different systems. **[Desk]**

### Measured on
- P90 first response time, counted from after the bot's acknowledgement. **[Interview]**
- Escalations: late first response, or the customer escalating. **[Interview]**
- Sentiment inferred by AI from exported chats. The customer star rating was dropped. **[Interview]**

### How they use AI today
- Reads the AI suggestion, but often reads the message themselves and replies directly: "The bot is sometimes wrong too." **[Interview]**
- Asks the chat AI to find things: which client asked for what, and whether they have sent it yet. **[Interview]**
- Uses AI to fix grammar and rephrase. **[Interview]**

### Goals
- Respond fast enough to protect first response time. **[Interview]**
- Never lose a follow-up on work that other people own. **[Interview]**
- Close the loop with the customer, not just the task. **[Interview]**
- In a delivery dispute: decide fairly from evidence, without treating the customer as a suspect. **[Desk]**

### Frustrations
- "The process isn't streamlined. Separate tickets come into Periscope, separate tickets are created internally, and I'm doing the follow-ups too." **[Interview]**
- Keeps a personal tracker (account, task, status, owner, ticket reference) because no tool shows all the open work in one place. **[Interview]**
- Replying closes the communication task even while internal work is still open. **[Interview]**
- If they miss a required tag, the due date is never set. **[Interview]**
- No follow-up reminders since an earlier automation stopped. **[Interview]**
- Rebuilding context across tools on every ticket; customers repeating what they told the bot. **[Desk]**

### Quotes (translated; verify against the original before using in the final presentation)
> "There isn't really a follow-up system on the ticket either."

> "That's why I maintain my tracker, so I can follow up if the assignee misses something."

### What this means for the design (hypotheses)
1. A case stays open, with an owner and a next follow-up, until the customer is told the outcome. Sending a reply doesn't close it.
2. One case links the conversation, the internal or courier request and the refund action.
3. AI suggestions and labels can be checked and corrected. Show why AI suggests something, so they can trust it or skip it quickly.
4. Show missing required data, such as a missing tag or missing courier proof, instead of failing silently.
5. Response time counts from the human reply. The acknowledgement doesn't count.

### Not supported by the interview
- Hostile customers: the interviewee said clients aren't rude (they talk through a key account manager). The desk research says otherwise for consumer support.
- Refund rules, fraud handling, Indian payment specifics (UPI, COD).

---

## 2. Team Lead (assumed, not interviewed)

**Evidence level:** **No team lead was interviewed.** Built from what the interviewee said reaches their lead, plus desk research. Validate with 1–2 team leads before relying on it.

**Role:** Runs a team of executives. Keeps response times on track, steps in on escalations and exceptions, coaches.

### What reaches them today
- A Slack alert if an executive hasn't planned a task within 30 minutes, and another at 90 minutes. It shows category, brand and SLA breach. **[Interview]**
- Escalations when first response time is late, or when a client escalates. **[Interview]**
- Previously, low star ratings were escalated to a lead. **[Interview]**
- Sentiment from exporting chats to an AI tool. **[Interview]**

### Goals
- Catch problems while they can still be fixed, not in next week's report. **[Desk]**
- Know which cases need them now: approvals, overdue dependencies, failed actions. **[Hypothesis]**
- See humans and AI as one team: what AI handled, what it handed off and why. **[Desk]**
- Coach from specific cases, not from scores alone. **[Desk]**

### Frustrations
- Alerts fire on time thresholds, but don't say what's blocking or who owns the next step. **[Hypothesis]**, based on the alert contents in **[Interview]**
- Feedback that arrives days later is hard to act on. **[Desk]**
- Speed metrics can be gamed; closure looks good while customers come back. **[Desk]**
- Existing tools give after-the-fact QA and reports, not a live "step in here" list. **[Desk]**
- Sentiment from AI is not the same as a customer rating. **[Interview]**

### Decisions they own in our scenario
- Approves refunds above a threshold, or outside policy. **[Hypothesis]**
- Spots a pattern, such as many "not received" claims from one courier or area, and raises it with the courier. **[Desk]**

### What this means for the design (hypotheses)
1. The overview leads with what needs them now: approvals waiting, overdue courier responses, failed refunds, cases near SLA.
2. Every alert opens the case, its owner and its evidence, not just a number.
3. Pair speed with outcome: response time next to reopen rate and repeat contacts.
4. Patterns are shown as leads to investigate. They are never verdicts on customers or agents.

### Questions to validate with a real team lead
1. What do you check first each shift, and where?
2. Which alerts do you act on, and which do you ignore?
3. Which refunds or exceptions need your approval today? What do you need to see to approve one?
4. How do you find out a courier or area has a problem?
5. When did a metric look good while the team was struggling?
6. How do you coach someone: from scores, or from specific tickets?
