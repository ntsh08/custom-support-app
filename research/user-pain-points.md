# User pain points: AI support workspace (Juspay assignment)

Desk research, Nov 2026. Covers support executives, team leads, and customers, with a focus on e-commerce and the "marked delivered, not received" case.

## How this was gathered (read first)

- **Blocked sources:** Reddit, Quora, Glassdoor, AmbitionBox, Indeed and Medium all refused automated access (403 or a safety block). None of the quotes below come from them. Read the subreddits listed in the brief by hand before your interviews, especially r/talesfromcallcenters, r/CustomerService, r/AmazonDSPDrivers and r/FlipkartSeller.
- **Sources used:** Hacker News comments, Zendesk Community, Shopify Community, Amazon Seller Forums (UK and India), TechEnclave (an Indian tech forum), Voxya and ConsumerComplaints.in (Indian complaint sites), Rest of World via Scroll.in, Reuters via the Irish Times, an arXiv interview study of call-centre reps, CX Dive, and two vendor or seller blogs, which are labelled.
- **How quotes were checked:** HN quotes were copied from the raw comment text through the HN API, so they are exact. All other quotes were pulled with a page-fetch tool that was told to copy text word for word. Spot-check any quote before you put it on a slide.
- **Bias warning:** the HN commenters are mostly Western and often former agents, so treat their quotes as signal, not as Indian data. Indian complaint sites lean toward cases that were never resolved.

---

## A. Support executive's daily pain

**A1. Handle-time targets punish agents for problems they don't cause, like slow tools and complex cases.**
> "Call center metrics are all about average call length. However, the slowness of the software is largely ignored, in my experience." (LocalH)

https://news.ycombinator.com/item?id=28258300

**A2. Agents are measured on several conflicting metrics at once. Handle time, wrap (after-call) time and data capture pull against each other.**
> "If you spend too much time in wrap, you're in trouble. If you don't collect all the information you need to after a call, you're in trouble." (reificator)

https://news.ycombinator.com/item?id=19514622

**A3. Metric pressure makes agents game the system by transferring, needling or deflecting hard cases. The KPI looks fine while the customer suffers.**
> "deliberately upset the customers so that they would demand a supervisor and you could transfer them." (HN, ex call-centre agent)

https://news.ycombinator.com/item?id=16893036

> "the most logical thing to do is find some within-the-rules way to transfer the customer to someone else" (HN, ex call-centre agent)

https://news.ycombinator.com/item?id=15241494

**A4. Context lives in different places. Agents scroll and click to rebuild the history, such as an address the customer gave earlier or the customer panel.**
> "So I scroll up to see the address they mentioned earlier." (P4, call-centre rep)

https://arxiv.org/html/2507.00513

> "Is there a way to default that back to Customer Information when opening a ticket?" (Victor19, Zendesk agent)

https://community.zendesk.com/fid-8/tid-15292

**A5. Small layout decisions cost real time across hundreds of tickets, for example where the reply box sits.**
> "they hate having to scroll down to the bottom of the page to get to the reply section." (Geran, Zendesk admin)

https://community.zendesk.com/fid-0/tid-5222

**A6. The emotional load is constant, and denying it leads to burnout.**
> "pretending that people aren't mean is a one-way ticket to burnout" (dqv, support worker)

https://news.ycombinator.com/item?id=41751624

> "You quickly develop an emotional rhino hide or you won’t make it." (HN, ex call-centre agent)

https://news.ycombinator.com/item?id=48036886

## B. "Delivered but not received"

**B1. The standard playbook is to get proof of delivery first and refund later. Proof means photo, GPS, time and OTP. Then check neighbours, then raise a courier investigation using the AWB number.** (Indian seller-logistics blog, vendor source)
> "Request the POD—this should include delivery photo, GPS coordinates, delivery time, and OTP/signature confirmation."

> "Do not refund immediately in most cases—wait for the POD and investigation result first."

https://www.shipmozo.com/blog/order-marked-delivered-but-not-received

**B2. Proof of delivery is often not enough to settle it. Marketplaces side with the customer even when there is a photo, GPS or a signature, and sellers resent it.**
> "does not matter if you hand deliver the item yourself, if the customer claims non-delivery you don't stand a chance." (Amazon UK seller)

https://sellercentral.amazon.co.uk/seller-forums/discussions/t/abe7fe33-a681-4a25-97e4-193b2244d590

> "Neither tracking nor photographs are considered proof of delivery. Only Signature constitutes proof." (Amazon India seller)

https://sellercentral.amazon.in/seller-forums/discussions/t/82299b3d-8e74-479c-a60c-27ced7832b9b

**B3. Merchants assume fraud by default ("refund or scam?"). Customers, on the other side, get treated as suspects.**
> "Should I just refund them or is it a scam?" (Allison_Dow, Shopify merchant)

> "I would not recommend refunding the order" (Victor_5, Shopify community)

https://community.shopify.com/c/payments-shipping-and/are-you-getting-scammers-claiming-packages-not-delivered/m-p/1920808

**B4. In India, "delivered" is often the courier's word against the customer's. Agents repeat the courier's status back to the customer, which feels like blame.**
> "i called to customer care they r telling it is my mistake and it is auto generated message." (Voxya complaint, 2019)

https://voxya.com/consumer-complaints/package-not-delivered-but-in-the-status-it-showing-delivered/33769

> "the seller confirmed with the courier partner that order was intact" (Flipkart refund cancelled repeatedly, Voxya 2023)

https://voxya.com/consumer-complaints/missing-product-inside-packaging-but-flipkart-refusing-refund-request-again-and-again/182877

**B5. Rigid time windows shut out real cases. A complaint gets refused because it arrived after N days, even when the customer never got an OTP.**
> "we never received the order, any delivery message, call or otp from their end." (Meesho, Voxya 2023)

> "They wouldn't file our complain as it's above * days" (same complaint)

https://voxya.com/consumer-complaints/prepaid-order-not-delivered-/215571

**B6. Customers get asked for heavy proof, such as police reports, and agents rarely get the authority to judge.**
> "My item was marked as “delivered” but isn’t actually here, contacted Amazon and they’re asking for a police report" (quoted on HN)

https://news.ycombinator.com/item?id=36425896

**B7. Repeat claimers exist, and the platform's response can swing to blanket refusal.**
> "Meesho initially refunded for 15-20 orders and then said return rates are very high and stopped refunding" (mehtaarjun, TechEnclave)

https://techenclave.com/t/meesho-and-shadowfax-are-scammers-stay-away/263320

## C. AI in support, from the agent's side

**C1. Copilot suggestions need editing before they can be sent. If the agent has to trim a draft, it can take longer than writing the reply.**
> "Using the template takes more time—we have to trim it, cut unnecessary parts," (P2, call-centre rep)

> "If we don't manually verify and adjust it, and just go with the system's default suggestion, there will be many errors," (P2)

https://arxiv.org/html/2507.00513

**C2. Sentiment and emotion alerts misfire, and agents lose trust in the AI quickly.**
> "it merely judges by volume level, often misinterpreting normal volume as attitude problems." (P3, call-centre rep)

https://arxiv.org/html/2507.00513

**C3. AI can work as a boss that watches the agent instead of a helper. Real-time scoring adds pressure.**
> "AI is supposed to make our lives easier, but I just see it as my boss," (Renzo Bahala, Concentrix agent)

> "I have to please the AI." (same agent)

https://scroll.in/article/1076373

**C4. Bots take the easy tickets, so humans get only the hard and angry ones, often without the context they need.**
> "There are no easy calls anymore," (Jeannie Walters, CX consultant)

> "filter complexity towards the agents instead of eliminating it." (Jonathan Schmidt, Gartner)

https://www.customerexperiencedive.com/news/agents-are-overloaded-ai-often-makes-it-worse-experts-say/819123/

> "You need a very small number of people to just handle negative experiences." (Nikhil Gupta, LimeChat co-founder)

https://www.irishtimes.com/business/work/2025/10/20/artificial-intelligence-chatbots-replacing-indias-call-centre-workers

**C5. Fear of replacement is real in Indian support jobs.**
> "I was told I am the first one who has been replaced by AI," (Megha, former Bengaluru support worker)

https://www.irishtimes.com/business/work/2025/10/20/artificial-intelligence-chatbots-replacing-indias-call-centre-workers

**C6. Agents value AI that helps them understand the customer. AI glitches inside the tool, like wrong signatures or broken macros, cost trust.**
> "I have used ChatGPT to tell me what the customer is actually asking of me, when I didn't understand their emails." (LoveMortuus, support agent)

https://news.ycombinator.com/item?id=36824725

> "we sometimes noticed the signature from the auto-assist adding another agent's signature from previous interactions" (Premium11, Zendesk admin)

https://community.zendesk.com/fid-0/tid-6310

## D. Team lead and supervisor pain

**D1. Dashboards used for policing push agents to game the numbers and burn out. Leads need a way to coach.** (vendor blog)
> "Real-time dashboards used exclusively for policing, never for support"

> "Lead with the questions. Use the numbers as context, not as ammunition."

https://vicistack.com/blog/call-center-agent-burnout/

**D2. Real-time micromanagement by handle time hurts morale and does nothing for quality.**
> "Then he will publicly berate you for 15 minutes if your average handle time deviates from the last hour." (devopsproject, ex agent)

https://news.ycombinator.com/item?id=14108525

**D3. Metrics mislead. Tickets closed fast can mean tickets closed without a fix, and pay tied to closure speed makes it worse.**
> "there are a bunch of incentives in the support contract around how quickly support can close out tickets" (HN, enterprise user)

https://news.ycombinator.com/item?id=24694706

> "it's very easy to measure cost ... and very hard to measure any outcome the customer actually cares about." (HN)

https://news.ycombinator.com/item?id=44975160

**D4. Supervisor nudges written as accusations make agents defensive. Coaching prompts should be neutral and carry context.**
> "Hey, I see that you closed out Ticket #XYZ without any resolution or response sent to the requester." ... "it would make me furious" (ex tech-support agent)

https://news.ycombinator.com/item?id=19492608

**D5. When AI auto-scores every interaction, leads drift away from coaching, and agents feel judged by a machine.**
> "tells me if I need to slow down, speed up, or deliver a statement with empathy" (Concentrix employee, on AI co-pilot)

> "Managers would keep reminding us to finish. It was never-ending." (Manila BPO employee)

https://scroll.in/article/1076373

## E. India-specific

**E1. Refund-to-source on UPI leaves a gap between "refund initiated" and "money in my bank". Agents can only say "check with your bank".**
> "Your team have given me a standard reply to check with the bank." (Swiggy customer)

> "Everytime they say it will be refunded within 2, 5, 7 days and nothing has changed" (Swiggy customer)

https://www.consumercomplaints.in/swiggy-didnt-receive-refund-of-a-failed-transaction-c1812624

**E2. The merchant and the bank both say "not our problem". The customer needs a UTR or reference number to chase the refund, and agents often don't show it.**
> "as per swiggy the refund has already done on 26th jan." (Jupiter user)

> "they are saying that transaction was made using different bank account in Jupiter" (same)

https://community.jupiter.money/t/upi-refund-not-credited/49827

**E3. Wallet credits instead of cash refunds, and wallet promises that never land, cause disputes. Escalation teams repeat policy instead of solving.**
> "I was told that the amount would be credited to Flipkart wallet after 15 days and that didn't happen." (sama, TechEnclave)

> "their escalation team just called to again give the same drab reply on it being non-refundable" (sama)

https://techenclave.com/t/flipkart-feedback-thread/194222?page=17

**E4. L1 support is seen as a dead end. Customers re-explain the problem to many agents, and issues get closed without a fix.**
> "after about a dozen attempts repeating the same issue to multiple persons" (logistopath, TechEnclave)

> "they casually closed all issues opened by me and rejected the return." (Santy, TechEnclave)

https://techenclave.com/t/i-have-been-scammed-by-flipkart-and-amd/256259

**E5. OTP-based delivery is both proof and a point of friction. Pushy delivery partners and missing OTPs muddy the evidence.**
> "the delivery person kept pressing for OTP" (sama, TechEnclave, Flipkart)

https://techenclave.com/t/flipkart-feedback-thread/194222?page=17

**E6. Vernacular, mostly tier-2 users and AI-plus-human setups are the norm at Meesho.**
> "high use of vernacular language has been detected on both buyer and seller sides" (Business Today on Meesho)

> "humans are working hand-in-hand with AI-enabled bots wherever need for human intervention is felt."

https://www.businesstoday.in/amp/technology/news/story/heres-how-e-commerce-unicorn-meesho-is-deploying-ai-for-ease-of-business-432051-2024-06-04

## F. Customer side

**F1. Bot loops and walls make customers angry before a human ever joins, so the human starts at a disadvantage.**
> "I can act ruder when talking to a customer service agent after frustratingly trying to get through a dumb chat bot" (AznHisoka)

https://news.ycombinator.com/item?id=39141338

> "the quickest way to get out of the loop and talk to a real human was to become insulting." (almatabata)

https://news.ycombinator.com/item?id=39442677

**F2. Customers swear at bots on purpose to get a human. A vendor saw this in real chat logs.**
> "people will straight up say slurs in chats because they know it's the quickest way of escalating to an actual human" (employee at a support-software company)

https://news.ycombinator.com/item?id=44675045

**F3. Customers have to repeat everything after a bot-to-human handoff. They want the history carried over.**
> "It remains important to eventually escalate to humans - including the history from all of these interactions to avoid frustrations" (HN)

https://news.ycombinator.com/item?id=39376552

**F4. A bot that knows its limits and hands off fast is acceptable. A bot that pretends to help is not.**
> "I was surprised by how quickly it knew its own limitations and handed me to an actual human who helped me out." (ex support worker)

https://news.ycombinator.com/item?id=40935870

**F5. Agents who "resolve" a case to please the survey break trust when the promise fails a week later.**
> "a week later you realize everything you have been told was a lie." (HN, on CSAT-driven agents)

https://news.ycombinator.com/item?id=39405589

**F6. Refund timelines keep moving and nobody owns the follow-up.**
> "It's been more than 30 bloody business days and they still haven't received my refund." (Swiggy customer)

https://www.consumercomplaints.in/swiggy-didnt-receive-refund-of-a-failed-transaction-c1812624

---

## Top 10 insights for the design (ranked)

1. **Agents rebuild context across tools for every ticket** (A4, A5, C4). The design should put order, payment, courier proof of delivery and conversation history on one screen when the ticket opens. AI pre-assembles a case brief, so the agent never scrolls back to find an address or a reference number.
2. **For delivered-not-received, the case turns on evidence** (B1, B2, B4). The design should show a single proof-of-delivery card with the photo, GPS distance from the address, delivery time, OTP status and the rider's history. AI flags any mismatch, for example "GPS 600 m from address".
3. **Policy, not the agent's gut, decides refund vs. replacement vs. courier claim** (B1, B5, E3). The design should have AI recommend a resolution with the policy rule and the reasoning visible, such as order value, customer's claim history and POD strength. The agent stays the decision-maker, with one-click accept or override.
4. **AI drafts are only useful if they're quick to edit and easy to trust** (C1, C2, C6). The design should keep drafts short and editable, cite their sources, never auto-send, and show a confidence level. Sentiment cues should be shown as hints, not as scores.
5. **Customers arrive angry and repeating themselves after the bot** (F1, F2, F3, C4). The design should start each human handoff with a summary of what the bot already tried and what the customer said, including a mood cue, so the agent's first line acknowledges it.
6. **Fraud suspicion and customer trust are in tension** (B3, B6, B7). The design should surface repeat-claim risk to the agent privately, as a neutral risk signal, and never in customer-facing text. Low-risk customers should get a fast path.
7. **UPI refunds don't end when the agent clicks "refund"** (E1, E2, F6). The design should treat the refund as tracked status: initiated, then the bank's reference number (ARN/UTR), then credited. It should give the agent a ready-to-send message with the reference number and an SLA date, and reopen the ticket automatically if the money isn't credited.
8. **Metrics push agents toward bad behaviour** (A1, A2, A3, D3). The design should keep a raw handle-time timer out of the agent's way. The team-lead screen should pair speed metrics with outcome metrics: reopen rate, repeat contacts, refunds reversed.
9. **Team leads need early warnings and coaching material, not a policing view** (D1, D2, D4, D5). The design should give the TL screen spike detection, such as a surge of "delivered not received" tickets from one courier hub or pincode. It should add an SLA-breach forecast and agent load and burnout signals, with coaching prompts that carry context.
10. **India means vernacular, OTP, COD and wallets** (E4, E5, E6). The design should show the customer's language and payment mode (COD, UPI, card, wallet) up front. AI translates and drafts in the customer's language. Refund options should reflect the payment mode: bank details for COD, source for UPI, wallet as opt-in only.

## Questions to ask real support agents in interviews

1. Walk me through the last "delivered but not received" ticket you handled. Which screens or tabs did you open, and in what order?
2. What proof of delivery can you actually see today (photo, GPS, OTP, rider notes)? How long does it take to get it from the courier?
3. Who decides between refund, replacement and courier claim? When do you need a TL's approval?
4. How do you tell a genuine customer from a repeat claimer? What signals do you trust?
5. Which metrics are you measured on (AHT, FCR, CSAT, QA)? Which one changes how you behave on a call or chat?
6. What happens after you close a ticket? How much after-call work is there, such as notes, tags and dispositions?
7. When a refund goes to UPI or a wallet and the customer says it hasn't arrived, what can you tell them? What can you see?
8. If you use AI or macros today, when do you trust a suggested reply, and when do you rewrite it?
9. What does a bot handoff look like when a chat reaches you? What do you wish you knew in the first 10 seconds?
10. Which languages do your customers use? What do you do when you can't speak a customer's language?
11. (For TLs) How do you notice a spike or a problem agent today? What do you check first thing each shift?
12. (For TLs) Tell me about the last time a metric looked good but the team was actually struggling.
