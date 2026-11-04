# Reddit follow-up: support and disputed deliveries

Researched 4 November 2026 for the Juspay assignment. Supplements [user-pain-points.md](user-pain-points.md).

## Access and evidence limits

Web search returned indexed post and comment text, sometimes substantial discussion excerpts. These are search-provider copies, not live verification of complete threads. Direct page fetches failed; opening Reddit in the browser showed a CAPTCHA, which was not completed. Indexed content can be incomplete or stale. Quotes below are exact text returned by search, pending a live-page check before presentation use.

This is a purposive sample of seven discussions, not an exhaustive subreddit review or a prevalence study. Contributors' jobs, identities and accounts of events are unverified. Several discussions concern US/Western services; they do not establish Indian workflows, legal requirements, platform policies or the prevalence of fraud. Product implications below are hypotheses, not approved design decisions. r/FlipkartSeller yielded no useful verified discussion in this pass; do not count it as covered.

## 1. Executives investigate more than delivery status

Source: [“delivered but not received”, r/CustomerService](https://www.reddit.com/r/CustomerService/comments/101okr3), post 2 January 2023; relevant reply 5 January 2023.

A respondent describes checking delivery photos, package weight when an empty package is alleged, and account/address history before deciding how to assist. Another reports internal escalation of repeated claims and says leadership follows up with carriers. These are different self-reported workflows, not one standard policy.

> “We do some research and look for things like photos of the delivery (some carriers take them) to see if they delivered to the correct address”

Hypothesis to test: assemble evidence with provenance and missing-data states. Repeated claims should prompt investigation, not become an automatic fraud verdict. Package weight is relevant to an empty-package branch, not necessarily the assignment's missing-package scenario.

## 2. A delivery label may hide a different handover

Source: [Why does package get marked as delivered to resident when it's not?, r/AmazonDSPDrivers](https://www.reddit.com/r/AmazonDSPDrivers/comments/17r5jee), 9 November 2023.

Comments propose several possible explanations: handover to reception or another person, a wrong address, or selection of a status that protects a driver's score. These explanations were not verified against the delivery in question.

Hypothesis to test: keep the recorded status, actual available proof, and customer's account distinct. Show contradictions for investigation rather than letting AI assert what happened.

## 3. Delayed metrics are hard to act on

Source: [Customer Feedback, r/AmazonDSPDrivers](https://www.reddit.com/r/AmazonDSPDrivers/comments/16h15ra), post 12 September 2023; relevant reply 13 September 2023.

A commenter says feedback arrives after multiple delivery days and asks to see the delivery instructions and their photo. They also distinguish negative non-receipt feedback from an official DNR metric. Other comments disagree on metric thresholds.

> “If I deliver for four days, and then next week I get the report, how am I going to learn from it?”

Hypothesis to test: a Team Lead alert should link to specific cases, dates and evidence. Validate metric definitions rather than borrowing Reddit's thresholds or treating a complaint as a confirmed loss.

## 4. Bot friction can make the human's job harder

Source: [AI in Customer Support, r/CustomerService](https://www.reddit.com/r/CustomerService/comments/1m43j4i/ai_in_customer_support/), discussion beginning 19 July 2025.

Comments describe repeated requests to reach a human, context not carrying over, and AI QA marking agents down incorrectly. There are also favorable views about narrow automation and reviewing more interactions. The original poster discloses their company is experimenting with AI support; some replies promote tools, so vendor recommendations were not used as evidence.

> “And they don't seem to share the long complicated information I tell them with the human either.”

Hypothesis to test: the executive should see what the customer already explained and what automation attempted. Evaluate handoff accuracy and correction effort. Do not infer universal opposition to AI from this self-selected discussion.

## 5. Refund workflows involve identity and cross-team handoffs

Source: [In-Store Credit refund request from Hell, r/talesfromcallcenters](https://www.reddit.com/r/talesfromcallcenters/comments/103gqsb), 4 January 2023.

A self-described former Team Lead recounts back-office follow-ups, accounting requests, an original-purchaser versus requester mismatch, and an agent contacting the wrong party. The author explicitly says some details are secondhand. A legal assertion in the post is disputed in the comments and must not be treated as law.

Hypothesis to test: distinguish requester, purchaser, contact recipient and refund beneficiary. Show the responsible team and pending handoff rather than allowing a click to imply that accounting has completed a refund.

## 6. Conflicting location evidence leaves merchants unsure

Source: [Customer saying package wasn't delivered, USPS not helpful, should I ignore or just refund them?, r/smallbusiness](https://www.reddit.com/r/smallbusiness/comments/1hcnjwe), 12 December 2024.

The merchant reports a delivery location of front desk/mail room for a customer living in a house, a service request closed without an explanation, and an insurance claim denied. The writer also suspects the customer; neither suspicion nor the delivery account is independently established.

Hypothesis to test: surface address/location mismatches and investigation outcomes. A courier case being closed should not silently mean the customer's issue is resolved.

## 7. Customers cannot easily prove an absence

Source: [Proof of something not delivered, r/Aliexpress](https://www.reddit.com/r/Aliexpress/comments/1hrpouh), 2 January 2025.

The customer reports a refused refund, a demand for non-receipt evidence, and no identifiable last-mile carrier. Replies suggest evidence options but cannot establish what the platform actually accepts.

> “How can I add proof of something that didn't happen.”

Hypothesis to test: request specific obtainable evidence and explain what it helps establish. Track information the business must obtain itself instead of repeatedly asking the customer to prove non-receipt.

## What this adds to the existing research

- Supports further investigation of evidence gathering, bot-to-human context transfer, and unresolved follow-ups.
- Adds specific workflow risks: wrong contact recipient, ambiguous delivery-location labels, delayed metric feedback, and a closed courier case without a customer resolution.
- Does not validate any universal refund rule, fraud classifier, GPS cutoff or AI confidence score. The existing ranked design insights remain proposals to test.

## Questions for interviews

1. Which proof-of-delivery fields are visible to the executive, which require a courier request, and which are never available?
2. What happens when the delivery label, photo, address and customer account contradict each other?
3. Who owns a pending courier investigation or accounting request, and what event actually resolves the customer ticket?
4. Can you distinguish purchaser, requester, contact recipient and refund beneficiary in the current tool?
5. Which bot history is reliably transferred, and what do you still have to ask again?
6. Can a lead trace an alert to a specific ticket and event, or is it only an aggregate score?
