# Desk Research

What support executives, team leads and customers say about support work, with a focus on e-commerce and "marked delivered, but not received". Gathered 4 November 2026 for the Juspay assignment.

## How it was gathered

- **Sources:** Hacker News, Zendesk Community, Shopify Community, Amazon Seller Forums (UK, India), TechEnclave, Voxya and ConsumerComplaints.in, Rest of World via Scroll.in, Reuters via the Irish Times, CX Dive, an arXiv interview study of call-centre reps, two vendor or seller blogs (labelled), and seven Reddit discussions.
- **Quotes:** HN quotes are exact (copied from the HN API). Other quotes were copied word for word by a page-fetch tool. Reddit quotes come from search-engine copies; Reddit itself was blocked by a CAPTCHA. Spot-check a quote before it goes on a slide.
- **Limits:** HN commenters are mostly Western, often ex-agents, so treat them as signal, not Indian data. Indian complaint sites lean toward unresolved cases. The Reddit pass is a small, hand-picked sample of self-reported stories, not a prevalence study. None of this proves a refund rule, a fraud rate or a GPS cutoff.

## Key insights for the design

1. **Agents rebuild context across tools on every ticket** (§1, §3). Put order, payment, courier proof and the conversation on one screen when the ticket opens, with an AI brief so nobody scrolls back for an address.
2. **"Delivered but not received" turns on evidence** (§2). One proof card: photo, GPS distance from the address, time, OTP and rider history. The AI flags mismatches like "GPS 600 m from address" but doesn't decide what happened.
3. **Policy, not gut, decides refund, reship or courier claim** (§2, §5). The AI recommends with the rule and the reasons visible (value, claim history, proof strength). The agent accepts or overrides.
4. **AI drafts only help if they're quick to edit and easy to trust** (§3). Short, editable, sourced, never auto-sent. Mood shown as a hint, not a score.
5. **Customers reach a person angry and repeating themselves** (§3, §6). Every handover starts with what the bot tried and what the customer said, with a mood cue.
6. **Fraud suspicion and customer trust pull against each other** (§2). Show repeat-claim risk privately as a neutral signal, never in customer-facing text, and give low-risk customers a fast path.
7. **A UPI refund doesn't end at "refund"** (§5, §6). Track it: initiated, reference number (ARN/UTR), credited. Give the agent a ready message with the reference and date, and reopen if the money doesn't arrive.
8. **Metrics push agents toward bad behaviour** (§1, §4). Keep a raw handle-time timer out of the agent's way. Pair speed with outcomes on the lead's screen: reopens, repeat contacts, refunds reversed.
9. **Team leads need early warnings and coaching, not policing** (§4). Spike detection (one courier, one area), SLA-breach warnings, load and burnout signals, each linked to the actual tickets.
10. **India means vernacular, OTP, COD and wallets** (§5). Show language and payment mode up front, draft in the customer's language, and match refund options to the payment mode.

## What we found

### 1. The executive's day

- **Handle-time targets punish agents for things they don't control.** "Call center metrics are all about average call length. However, the slowness of the software is largely ignored, in my experience." ([HN](https://news.ycombinator.com/item?id=28258300))
- **Metrics conflict.** "If you spend too much time in wrap, you're in trouble. If you don't collect all the information you need to after a call, you're in trouble." ([HN](https://news.ycombinator.com/item?id=19514622))
- **Pressure leads to gaming: transfers, deflection, needling.** "the most logical thing to do is find some within-the-rules way to transfer the customer to someone else" ([HN](https://news.ycombinator.com/item?id=15241494), also [here](https://news.ycombinator.com/item?id=16893036))
- **Context is scattered.** "So I scroll up to see the address they mentioned earlier." ([arXiv study](https://arxiv.org/html/2507.00513), also [Zendesk](https://community.zendesk.com/fid-8/tid-15292))
- **Small layout choices cost time across hundreds of tickets.** "they hate having to scroll down to the bottom of the page to get to the reply section." ([Zendesk](https://community.zendesk.com/fid-0/tid-5222))
- **The emotional load is constant.** "pretending that people aren't mean is a one-way ticket to burnout" ([HN](https://news.ycombinator.com/item?id=41751624), also [here](https://news.ycombinator.com/item?id=48036886))

### 2. "Delivered but not received"

- **The playbook: proof first, refund later.** Photo, GPS, time and OTP, then neighbours, then a courier investigation. "Do not refund immediately in most cases—wait for the POD and investigation result first." ([seller blog, vendor source](https://www.shipmozo.com/blog/order-marked-delivered-but-not-received))
- **Agents check more than the status:** delivery photos, account and address history, and they escalate repeat claims. "We do some research and look for things like photos of the delivery (some carriers take them) to see if they delivered to the correct address" ([r/CustomerService](https://www.reddit.com/r/CustomerService/comments/101okr3))
- **Proof often doesn't settle it.** Marketplaces side with the customer even with a photo or GPS. "Neither tracking nor photographs are considered proof of delivery. Only Signature constitutes proof." ([Amazon India sellers](https://sellercentral.amazon.in/seller-forums/discussions/t/82299b3d-8e74-479c-a60c-27ced7832b9b), also [UK](https://sellercentral.amazon.co.uk/seller-forums/discussions/t/abe7fe33-a681-4a25-97e4-193b2244d590))
- **A "delivered" label can hide a different handover:** reception, a neighbour, a wrong address, or a status picked to protect a driver's score. ([r/AmazonDSPDrivers](https://www.reddit.com/r/AmazonDSPDrivers/comments/17r5jee))
- **Location evidence conflicts, and a closed courier case isn't a resolved customer.** A house delivery marked "front desk/mail room", the carrier's case closed without explanation, the claim denied. ([r/smallbusiness](https://www.reddit.com/r/smallbusiness/comments/1hcnjwe))
- **Merchants assume fraud; customers get treated as suspects.** "Should I just refund them or is it a scam?" ([Shopify](https://community.shopify.com/c/payments-shipping-and/are-you-getting-scammers-claiming-packages-not-delivered/m-p/1920808))
- **In India it's often the courier's word against the customer's,** and agents repeat the courier's status back. "i called to customer care they r telling it is my mistake and it is auto generated message." ([Voxya](https://voxya.com/consumer-complaints/package-not-delivered-but-in-the-status-it-showing-delivered/33769), also [here](https://voxya.com/consumer-complaints/missing-product-inside-packaging-but-flipkart-refusing-refund-request-again-and-again/182877))
- **Rigid windows shut out real cases.** "They wouldn't file our complain as it's above * days" ([Voxya](https://voxya.com/consumer-complaints/prepaid-order-not-delivered-/215571))
- **Customers are asked to prove an absence,** sometimes with a police report. "How can I add proof of something that didn't happen." ([r/Aliexpress](https://www.reddit.com/r/Aliexpress/comments/1hrpouh), also [HN](https://news.ycombinator.com/item?id=36425896))
- **Repeat claimers exist, and platforms can swing to blanket refusal.** "Meesho initially refunded for 15-20 orders and then said return rates are very high and stopped refunding" ([TechEnclave](https://techenclave.com/t/meesho-and-shadowfax-are-scammers-stay-away/263320))

### 3. AI in support, from the agent's side

- **Suggested replies need trimming and checking.** "Using the template takes more time—we have to trim it, cut unnecessary parts," ([arXiv study](https://arxiv.org/html/2507.00513))
- **Mood detection misfires, and trust goes fast.** "it merely judges by volume level, often misinterpreting normal volume as attitude problems." ([arXiv study](https://arxiv.org/html/2507.00513))
- **AI can feel like a boss, not a helper.** "AI is supposed to make our lives easier, but I just see it as my boss," ([Scroll.in](https://scroll.in/article/1076373))
- **Bots take the easy tickets, so people get only the hard ones, often without context.** "filter complexity towards the agents instead of eliminating it." ([CX Dive](https://www.customerexperiencedive.com/news/agents-are-overloaded-ai-often-makes-it-worse-experts-say/819123/), also [Irish Times](https://www.irishtimes.com/business/work/2025/10/20/artificial-intelligence-chatbots-replacing-indias-call-centre-workers))
- **What the customer told the bot often doesn't reach the person.** "And they don't seem to share the long complicated information I tell them with the human either." ([r/CustomerService](https://www.reddit.com/r/CustomerService/comments/1m43j4i/ai_in_customer_support/))
- **Fear of replacement is real in Indian support jobs.** "I was told I am the first one who has been replaced by AI," ([Irish Times](https://www.irishtimes.com/business/work/2025/10/20/artificial-intelligence-chatbots-replacing-indias-call-centre-workers))
- **Agents value AI that helps them understand the customer; glitches cost trust.** "I have used ChatGPT to tell me what the customer is actually asking of me, when I didn't understand their emails." ([HN](https://news.ycombinator.com/item?id=36824725), glitches: [Zendesk](https://community.zendesk.com/fid-0/tid-6310))

### 4. Team leads

- **Dashboards used for policing push gaming and burnout.** "Lead with the questions. Use the numbers as context, not as ammunition." ([vendor blog](https://vicistack.com/blog/call-center-agent-burnout/))
- **Live handle-time micromanagement hurts morale, not quality.** "Then he will publicly berate you for 15 minutes if your average handle time deviates from the last hour." ([HN](https://news.ycombinator.com/item?id=14108525))
- **Fast closure can mean closed without a fix.** "it's very easy to measure cost ... and very hard to measure any outcome the customer actually cares about." ([HN](https://news.ycombinator.com/item?id=44975160), also [here](https://news.ycombinator.com/item?id=24694706))
- **Nudges written as accusations make agents defensive.** ([HN](https://news.ycombinator.com/item?id=19492608))
- **Late feedback can't be acted on.** "If I deliver for four days, and then next week I get the report, how am I going to learn from it?" ([r/AmazonDSPDrivers](https://www.reddit.com/r/AmazonDSPDrivers/comments/16h15ra))
- **When AI scores every interaction, leads drift from coaching.** "Managers would keep reminding us to finish. It was never-ending." ([Scroll.in](https://scroll.in/article/1076373))

### 5. Refunds and India

- **UPI refunds leave a gap between "initiated" and "in my bank",** and agents can only say "check with your bank". "Everytime they say it will be refunded within 2, 5, 7 days and nothing has changed" ([ConsumerComplaints.in](https://www.consumercomplaints.in/swiggy-didnt-receive-refund-of-a-failed-transaction-c1812624))
- **Merchant and bank both say "not our problem";** the customer needs a reference number agents rarely show. ([Jupiter community](https://community.jupiter.money/t/upi-refund-not-credited/49827))
- **Refunds cross teams and people:** purchaser and requester can differ, back-office follow-ups stall, and the wrong person gets contacted. ([r/talesfromcallcenters](https://www.reddit.com/r/talesfromcallcenters/comments/103gqsb))
- **Wallet credits instead of cash, and promises that never land.** "I was told that the amount would be credited to Flipkart wallet after 15 days and that didn't happen." ([TechEnclave](https://techenclave.com/t/flipkart-feedback-thread/194222?page=17))
- **L1 support feels like a dead end:** re-explaining to many agents, issues closed without a fix. ([TechEnclave](https://techenclave.com/t/i-have-been-scammed-by-flipkart-and-amd/256259))
- **OTP is both proof and friction.** "the delivery person kept pressing for OTP" ([TechEnclave](https://techenclave.com/t/flipkart-feedback-thread/194222?page=17))
- **Vernacular users and AI-plus-human setups are normal.** "high use of vernacular language has been detected on both buyer and seller sides" ([Business Today on Meesho](https://www.businesstoday.in/amp/technology/news/story/heres-how-e-commerce-unicorn-meesho-is-deploying-ai-for-ease-of-business-432051-2024-06-04))

### 6. The customer's side

- **Bot loops make customers angry before a person joins.** "the quickest way to get out of the loop and talk to a real human was to become insulting." ([HN](https://news.ycombinator.com/item?id=39442677), also [here](https://news.ycombinator.com/item?id=39141338) and [here](https://news.ycombinator.com/item?id=44675045))
- **They want the history carried over.** ([HN](https://news.ycombinator.com/item?id=39376552))
- **A bot that knows its limits and hands over fast is fine.** "I was surprised by how quickly it knew its own limitations and handed me to an actual human who helped me out." ([HN](https://news.ycombinator.com/item?id=40935870))
- **"Resolved" for the survey breaks trust when the promise fails.** "a week later you realize everything you have been told was a lie." ([HN](https://news.ycombinator.com/item?id=39405589))
- **Refund dates keep moving and nobody owns the follow-up.** "It's been more than 30 bloody business days and they still haven't received my refund." ([ConsumerComplaints.in](https://www.consumercomplaints.in/swiggy-didnt-receive-refund-of-a-failed-transaction-c1812624))
