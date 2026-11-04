# Competitor research: Zendesk, Sierra, Decagon

For: Juspay design assignment (AI support workspace + Team Lead overview). Researched 2026-11-04.
Legend: **[U]** = unverified (third-party/competitor source only, or not found on official pages). Competitor blogs (eesel, Macha, Quiq, myaskai, etc.) sell alternatives, so treat them as biased.

---

## 1. Zendesk (incumbent)

### Positioning
Helpdesk-first "Resolution Platform": ticketing + AI agents + Copilot for human agents + QA + analytics, launched at Relate 2025 ([Zendesk newsroom](https://www.zendesk.com/in/newsroom/articles/relate-2025-resolution-platform/)). Relate 2026 (May 2026) reframed it as the "Autonomous Service Workforce" ([pressat release](https://pressat.co.uk/releases/zendesk-introduces-the-autonomous-service-workforce-44294f3f4645de958045db92c5fc4dad/); feature list not retrievable [U]). For: SMB to enterprise teams that already live in a ticket queue.

### Human agent workspace, end to end
- **Queue/routing.** Intelligent triage tags every ticket with topic (intent), sentiment, language and entities ([Zendesk help](https://support.zendesk.com/hc/en-us/articles/4550640560538-Automatically-detecting-customer-intent-language-and-sentiment)). Those tags feed omnichannel routing (push: availability, capacity, skills, priority) or skills-based routing (pull) ([Zendesk help](https://support.zendesk.com/hc/en-us/articles/4973607684506-Choosing-a-routing-method-for-automatically-triaged-tickets)). Prebuilt retail/e-commerce intents exist and can be customised ([Zendesk announcement](https://support.zendesk.com/hc/en-us/articles/7582082099738-Announcing-improvements-to-the-intent-model-for-intelligent-triage-and-AI-agents), [custom intents](https://support.zendesk.com/hc/en-us/articles/9882930657050-Announcing-custom-intent-categories-for-intelligent-triage)). Gotcha: in triggers and skill rules, triage values show only in English ([Zendesk help](https://support.zendesk.com/hc/en-us/articles/4766535251610-Routing-automatically-triaged-tickets-using-omnichannel-routing)).
- **Context panel.** Holds triage predictions, ticket summary, suggested macros (with confidence indicators), similar resolved tickets, merge suggestions and suggested assignees ([About agent copilot](https://support.zendesk.com/hc/en-us/articles/7908817636378-About-agent-copilot)). A newer unified "Related tickets" panel merges similar tickets and merge suggestions behind one count badge ([Zendesk help](https://support.zendesk.com/hc/en-us/articles/9038832092570)). Entity detection highlights values such as order numbers inline ([About agent copilot](https://support.zendesk.com/hc/en-us/articles/7908817636378-About-agent-copilot)).
- **AI summaries.** On-demand recap of public comments ([About agent copilot](https://support.zendesk.com/hc/en-us/articles/7908817636378-About-agent-copilot)). The ~100-word limit and optional internal notes come from a third party [U] ([eesel](https://www.eesel.ai/blog/zendesk-copilot-side-panel-and-summaries)).
- **Suggested replies.** "Suggested first reply" drafts from macros and help-centre articles. Writing tools: expand, simplify, friendlier, more formal, your tone, custom prompt ([About agent copilot](https://support.zendesk.com/hc/en-us/articles/7908817636378-About-agent-copilot)).
- **Suggested actions/procedures (auto assist).** Admins write procedures, plain-language steps that can link to actions, action flows, macros and articles. Auto assist matches the ticket to a procedure on its own, with no topic mapping needed. It suggests a reply plus actions in place of the composer. It only suggests actions that a procedure defines, except "set to Solved" ([About auto assist](https://support.zendesk.com/hc/en-us/articles/9945148867866-About-auto-assist)).
- **Approvals.** Every suggested reply and action needs the agent's approval and goes out under the agent's name. Customers aren't told AI was involved ([About auto assist](https://support.zendesk.com/hc/en-us/articles/9945148867866-About-auto-assist)). Admins can mark actions "pre-approved" so they run without asking. Those runs are logged in ticket events and the conversation log ([About auto assist](https://support.zendesk.com/hc/en-us/articles/9945148867866-About-auto-assist)). Zendesk warns that pre-approval carries risk ([announcement, search snippet](https://support.zendesk.com/hc/en-us/articles/10346778260378-Announcing-pre-approved-actions-in-Copilot-auto-assist); page now 404).
- **Acting in other systems.** The official Shopify sidebar app lets agents issue refunds and cancellations without leaving the ticket ([Zendesk Shopify](https://zendesk.co.uk/shopify)). Third parties say only unfulfilled orders can be cancelled and partial refunds are supported [U] ([Richpanel](https://www.richpanel.com/learn/connect-zendesk-to-shopify)). Action flows also let AI agents call Shopify steps such as Cancel order and Create refund (full refund only) [U] ([Macha](https://www.getmacha.com/blog/help-desk-ai-agents-that-take-actions-matrix)).
- **AI-to-human handoff.** A voice AI agent posts the transcript and summary to the ticket before escalating, and the human sees the summary and detected intent in the Agent Workspace ([Zendesk help](https://support.zendesk.com/hc/en-us/articles/10169333291290-About-voice-AI-agents)). Auto assist doesn't run on AI-agent tickets ([About auto assist](https://support.zendesk.com/hc/en-us/articles/9945148867866-About-auto-assist)), so there's a seam at the moment of handoff.
- **Close/wrap-up.** Auto assist can suggest status = Solved ([About auto assist](https://support.zendesk.com/hc/en-us/articles/9945148867866-About-auto-assist)). I found no AI-generated wrap-up or disposition notes [U].

### Autonomy, guardrails, audit
- Copilot: human-in-the-loop by default, with opt-in pre-approved actions (above).
- AI agents: "AI Reasoning Controls" show how the agent read the request and why it chose a response ([Zendesk newsroom](https://www.zendesk.com/in/newsroom/articles/relate-2025-resolution-platform/)).
- Outcome pricing: you pay per resolution (from $1.50) ([Geekflare](https://geekflare.com/news/zendesk-new-pricing-model-will-eliminate-your-wasted-ai-spend)). In 2026 an independent AI evaluation verifies each resolution ([TechRadar](https://www.techradar.com/pro/zendesk-links-ai-pricing-to-verified-resolution-outcomes)).
- I found no explicit confidence score on auto-assist suggestions. Confidence only shows on suggested macros ([About agent copilot](https://support.zendesk.com/hc/en-us/articles/7908817636378-About-agent-copilot)).

### Supervisor / Team Lead views
- **Copilot "Agent productivity" dashboard** ([Zendesk help](https://support.zendesk.com/hc/en-us/articles/9308443151258-Analyzing-your-Copilot-activity)):
  - Auto assist tab: acceptance rate, actions executed, auto assists applied by week and procedure, procedure adoption and performance, usage by agent.
  - AI suggestions tab: accepted vs ignored.
  - AI tools tab: requester wait time and full resolution time split by AI-tool usage.
- **Zendesk QA.** AutoQA scores 100% of conversations, human and AI ([Zendesk QA](https://www.zendesk.com/quality-assurance)). It ships stock categories (Empathy, Solution, Tone) plus custom prompt categories. Spotlight flags churn risk, escalations, knowledge gaps, stuck loops, dead air and custom risks. AI agent QA compares AI and human scores side by side and flags abandoned or unresolved AI tickets. Coaching assignments are built in.
- **AI Insights Hub.** One view of active AI features, with AI suggestions on what to automate and how to change routing ([Zendesk newsroom](https://www.zendesk.com/in/newsroom/articles/relate-2025-resolution-platform/)).

### E-commerce specifics
- Intelligent Triage launched in 2022 aimed first at retail and e-commerce ([destinationCRM](https://www.destinationcrm.com/Articles/CRM-News/CRM-Across-the-Wire/Zendesk-Launches-Intelligent-Triage-and-Smart-Assist-154919.aspx)).
- Shopify sidebar refunds and cancels (above).
- I found no native "delivered but not received" flow. You would build one as a procedure plus action flow [U].

### Patterns worth stealing
1. **Suggestion replaces the composer.** The AI draft sits where you'd type, with Approve / Edit ([screenshot](https://zen-marketing-documentation.s3.amazonaws.com/docs/en/ai_auto_assist_approve.png)).
2. **Procedures as the contract.** The AI can only suggest actions an admin wrote into a procedure, so the action surface is bounded and auditable.
3. **"View sources" on each suggestion** ([screenshot](https://zen-marketing-documentation.s3.amazonaws.com/docs/en/copilot_auto_assist_suggestion_sources.png)).
4. **Per-procedure acceptance analytics.** The lead sees which playbooks agents trust or override.
5. **Merge/related-ticket badge.** This catches the same customer complaining on email and chat about one missing parcel.

### Weaknesses / complaints
- Auto-assist irritations: double signatures, another agent's signature inserted, and "Macros are unusable in auto-assist" ([Zendesk community](https://community.zendesk.com/ideas/copilot-feedback-6310)).
- Add-on sprawl and cost: Copilot +$50/agent/month and QA ~$35/agent/month on top of the Suite [U on exact figures] ([eesel](https://www.eesel.ai/blog/zendesk-ai-copilot-review), [eesel QA](https://www.eesel.ai/blog/zendesk-qa-quality-assurance)). Complexity and learning curve come up repeatedly ([eesel review](https://eesel.ai/blog/zendesk-review)).
- AI is scattered across many surfaces (context panel, composer, Explore dashboards, QA product, Insights Hub), and auto assist is switched off on AI-agent tickets.

---

## 2. Sierra (sierra.ai), AI-native

### Positioning
An enterprise "Agent OS" for customer-facing AI agents across chat, voice, email, WhatsApp and ChatGPT, in 59 languages ([Sierra product](https://sierra.ai/product)). Priced on outcomes ([Sierra product](https://sierra.ai/product)). For: large consumer brands. It claims 40% of the Fortune 50 ([Sierra product](https://sierra.ai/product)). Retail logos include Gap, The North Face, Wayfair, ASOS, Casper, Sonos and Chubbies ([Sierra retail](https://sierra.ai/industries/retail)).

### Human agent workspace
- Sierra has **no ticket queue or agent inbox of its own** and plugs into the customer's existing helpdesk [U] ([myaskai comparison](https://myaskai.com/blog/zendesk-ai-sierra-ai-comparison-2026)).
- **Live Assist** is its copilot for human reps ([Sierra blog](https://sierra.ai/blog/live-assist)). It:
  - embeds guidance in the rep's screen
  - shows highlights of past interactions and customer details
  - captures details automatically as the customer speaks
  - searches the same knowledge bases the AI agent uses
  - drafts "grounded" replies
  - offers **one-click actions such as a return or refund**
  - feeds each conversation back into the AI agent, so it shares one foundation with it
- Handoff mechanics (summary format, warm transfer) are not publicly documented [U] ([myaskai](https://myaskai.com/blog/zendesk-ai-sierra-ai-comparison-2026)).
- I found no documented wrap-up or close features [U].

### Autonomy, guardrails, audit
- **Supervisors ("Jiminy Crickets")** run alongside every conversation ([Sierra blog](https://sierra.ai/blog/enterprise-grade-agents)):
  - input filtering for jailbreaks and context poisoning
  - output interception, which audits every action and response
  - underspecification detection, which flags ambiguous, sensitive cases
  - autonomy that shifts from observe to intercept on high-risk topics
  - the option to correct, escalate to a human or end the conversation ([Sierra blog](https://sierra.ai/blog/confidence-in-every-conversation))
- Tolerance is tiered: lowest for fraud and prompt injection, looser for tone. The goal is "bounded error rates", with no claim of perfection. Their example: one hallucination in 10,000 becomes a daily event at scale ([Sierra blog](https://sierra.ai/blog/enterprise-grade-agents)).
- Testing: simulations plus τ-Bench before an agent goes live ([Sierra blog](https://sierra.ai/blog/enterprise-grade-agents)).

### Supervisor / Team Lead views
- **Monitors** use an LLM-as-judge on 100% of conversations ([Sierra blog](https://sierra.ai/blog/confidence-in-every-conversation), [agent monitoring](https://sierra.ai/jp/blog/agent-monitoring)). Defaults: coherence, repetitiveness, grounding, sentiment. Stock monitors also catch looping, rising frustration and false transfers. Custom monitors are written in natural language. **Every flag shows its rationale** and links to the transcript.
- **Explorer** is deep research over conversations, answering questions like "why did X go up?" ([Sierra product](https://sierra.ai/product), [Agent OS 2.0](https://sierra.ai/blog/agent-os-2-0)). **Expert Answers** turns contact-centre know-how into articles the AI can use ([Agent OS 2.0](https://sierra.ai/blog/agent-os-2-0)).
- **Experience Manager** tracks performance and emerging issues, with auto-tagging by topic and sentiment ([search snippet from Sierra voice post](https://sierra.ai/blog/confidence-in-every-conversation)) [partly U].
- The loop: build (Ghostwriter) → observe (Monitors) → understand (Explorer) → improve ([agent monitoring](https://sierra.ai/jp/blog/agent-monitoring)).

### E-commerce specifics
- The retail page lists order tracking, warranty claims, instant refunds and **turning returns into exchanges** ([Sierra retail](https://sierra.ai/industries/retail)). It doesn't mention WISMO, delivery disputes or fraud.
- Their retail monitor example detects subtle frustration (polite wording, sarcasm, a pivot to asking for a return) ([agent monitoring](https://sierra.ai/jp/blog/agent-monitoring)).
- Their guidance says asking a frustrated customer for an order number in a rigid way can backfire ([Sierra blog](https://sierra.ai/blog/enterprise-grade-agents)).
- Casper: more than 50% of all inquiries resolved, about 70% of product questions resolved without a human, 74% during a Labor Day sale when traffic doubled. CX staff review conversations and update knowledge ([Sierra Casper](https://sierra.ai/customers/casper)).
- Multi-item returns with partial refunds confused Sierra at an unnamed home-goods store [U] ([agentatlas](https://agentatlas.pages.dev/case-study-ecommerce-support-automation.html)).

### Patterns worth stealing
1. **A supervisor agent watching the agent.** It shows the lead *why* the AI was stopped, corrected or escalated.
2. **Monitors with a rationale on each flag, one click to the transcript.** This makes a strong "needs attention" list.
3. **Frustration-trajectory detection.** It reads tone over time, not keywords. Useful for "delivered but not received" anger.
4. **Returns → exchange as a save play,** which turns a refund into retained revenue.
5. **The same brain for AI and human (Live Assist).** One knowledge source and one set of actions, so a handoff loses no context.

### Weaknesses / complaints
- Opaque, sales-led pricing with six-figure entry and hard-to-predict outcome billing [U, competitor sources] ([Quiq](https://quiq.com/blog/sierra-ai-pricing/), [eesel](https://www.eesel.ai/blog/sierra-reviews)).
- No native agent desk, so the human experience depends on integration work [U] ([myaskai](https://myaskai.com/blog/zendesk-ai-sierra-ai-comparison-2026)).
- Thin public detail on handoff and human tooling. The Live Assist claims ("shorter handle times") carry no numbers ([Sierra blog](https://sierra.ai/blog/live-assist)).

---

## 3. Decagon (decagon.ai), AI-native

### Positioning
AI agents (chat, email, voice) run by "Agent Operating Procedures", plus a copilot for human reps and always-on QA. For: high-growth consumer and fintech brands such as Notion, Chime, ClassPass, Curology, Hunter Douglas and Rippling ([casestudies.com index](https://www.casestudies.com/company/decagon/case-study/curology-customer-case-study)).

### Human agent workspace
- **Decagon Assist** (blog dated 19 Aug 2026) runs inside Salesforce, Zendesk and Front ([Decagon blog](https://decagon.ai/blog/decagon-assist)). G2-sourced complaints that Assist works only in Zendesk are probably outdated [U] ([sitegpt](https://sitegpt.ai/resources/decagon-review)). It offers ([Decagon blog](https://decagon.ai/blog/decagon-assist)):
  - a **summary of the customer's earlier conversation with the AI agent**, so the rep doesn't rebuild context
  - **workflow detection**: it spots when the conversation matches a known workflow and offers the next step as a one-click action, pulling tools from several systems into one console
  - suggested replies in brand voice
  - **Ask AI** over internal-only knowledge bases
  - live transcription and next-step guidance on voice calls
  - real-time translation in chat
- **Approvals.** In co-pilot mode the human gets an "extra layer of review and approval" before messages or actions go out. Refund and credit guardrails are set per customer [U, third-party writeup] ([ZenML](https://www.zenml.io/llmops-database/building-a-production-ai-agent-system-for-customer-support)).
- **Handoff.** Escalation rules (legal, emotionally sensitive, high-stakes account actions) pass a conversation summary to the human ([Decagon guardrails](https://decagon.ai/blog/designing-layered-guardrails-for-reliable-ai-agents)). CRM templates for Salesforce and Zendesk carry the full context across ([Decagon templates](https://decagon.ai/resources/templates)).

### Autonomy, guardrails, audit
- **AOPs** are natural-language procedures "backed by code", each with entry conditions, conditional blocks, tools (API calls, lookups, calculations) and customer metadata. They come "equipped with guardrails" for sensitive operations such as refunds ([Decagon AOPs](https://decagon.ai/modules/aops)). AOP Copilot drafts an AOP from an existing SOP ([Decagon blog](https://decagon.ai/blog/aop-copilot)).
- **Layered guardrails** ([Decagon blog](https://decagon.ai/blog/designing-layered-guardrails-for-reliable-ai-agents)):
  - before go-live: regression suites that replay historical conversations against new logic
  - during the conversation: bad-actor intent detection, escalation rules, brand-voice constraints, and a **supervisor model that checks every message before it's sent**, revising it or escalating if it suspects hallucination
  - after: Watchtower
- Autonomous actions do happen. One example: cancelling a subscription with no escalation ([Stripe customer story](https://stripe.com/en-cn/customers/decagon)).

### Supervisor / Team Lead views
- **Watchtower** (launched 26 Jun 2025): natural-language criteria such as "mentions of frustration" or "data privacy violations", plus scored rubrics ([Decagon Watchtower](https://decagon.ai/product/watchtower), [launch blog](https://decagon.ai/blog/decagon-watchtower)). Flags cluster into categories and feed real-time trend dashboards that drill down to transcripts. Filters: CSAT, channel, user metadata, resolution status. "View flagged conversations" shows why each was flagged and what to do next. "Test Watchtower" tries criteria on a sample first. It can run on historical data or continuously.
- **Faire** (wholesale marketplace): rubric for resolution quality, tone and flow, applied to tens of thousands of conversations a week. It caught sentiment around a tariff announcement and pushed KB updates within days. It routes checkout bottlenecks and SKU requests to product teams ([Decagon blog](https://decagon.ai/blog/qa-breakthrough)).
- **Assist analytics hub**: views by team, rep and workflow, including **which next-step actions fire and which never fire**, adoption by queue, CSAT and latency ([Decagon blog](https://decagon.ai/blog/decagon-assist)).
- **Generative Analytics** (18 Sep 2026): Duet builds charts from prompts such as "What changed last week?" and "Why did a metric move?" ([Decagon blog](https://decagon.ai/blog/generative-analytics)). **Action Trackers** log events at trigger points inside a conversation, such as a payment-flow drop-off. Example: at retailer Power, the agent couldn't find a suitable product for 26% of customers.

### E-commerce specifics
- AOPs cite refunds as the canonical guarded action ([Decagon AOPs](https://decagon.ai/modules/aops)).
- Hunter Douglas: 40% of inbound volume deflected; headline claims $1M in AI-driven revenue ([casestudies.com](https://www.casestudies.com/company/decagon/case-study/hunter-douglas-group-unlocks-1m-in-ai-powered-revenue-with-decagon)).
- Curology: support costs down 65% ([casestudies.com](https://www.casestudies.com/company/decagon/case-study/curology-customer-case-study)).
- Rituals cleared its peak-season backlog across 19 countries (title only) [U details] ([casestudies.com](https://www.casestudies.com/company/decagon/case-study/rituals-eliminates-peak-season-backlog-across-19-countries-with-decagon)).
- I found no specific "delivered but not received" or fraud playbook [U].

### Patterns worth stealing
1. **Workflow detection → one-click next step** for the human, with an analytics view of steps that *never fire* (dead playbooks).
2. **A pre-send supervisor check** on each AI message.
3. **Test a QA criterion on a sample before turning it on.** The lead can try a new "watch for X" rule safely.
4. **Action Trackers:** instrument the steps inside a resolution, so the lead sees where it fails as well as whether it was resolved.
5. **Ask-the-data analytics** ("why did this metric move?") as a Team Lead entry point.

### Weaknesses / complaints
- "Black box": hard to see why the agent acted as it did. Audit logs lack depth and user roles are rudimentary [U, competitor-sourced] ([Quiq](https://quiq.com/blog/decagon-reviews/), [myaskai](https://myaskai.com/blog/decagon-ai-complete-guide-2026)).
- Implementation takes about 2 months and needs engineering time even for "low-code" integrations [U] ([Quiq](https://quiq.com/blog/decagon-reviews/)).
- There is little independent feedback. G2 has only about 18–30 reviews ([G2 compare](https://www.g2.com/compare/decagon-vs-kustomer-vs-gladly)).

---

## Patterns across all three
- **Written procedures as the control surface** (Zendesk procedures, Decagon AOPs, Sierra Journeys/Ghostwriter). The AI's allowed actions are whatever ops wrote down, in plain language.
- **Human copilot = summary + drafted reply + one-click action, all from the same knowledge as the AI agent.** All three converge here (Copilot auto assist, Live Assist, Decagon Assist).
- **AI checks AI.** A supervisor model reviews responses in real time (Sierra, Decagon), and LLM-as-judge QA covers 100% of conversations (Zendesk AutoQA, Sierra Monitors, Decagon Watchtower).
- **QA written in natural language.** Leads write "flag when…" criteria themselves, without an analyst.
- **Outcome-based pricing,** paying per resolution (Zendesk, Sierra). This makes "what counts as resolved" a real metric to design for.
- **Ask-your-data analytics** (Sierra Explorer, Decagon Duet/Generative Analytics, Zendesk Insights Hub).

## Gaps none of them solve well (design opportunities)
1. **An investigation workspace for disputed deliveries.** Nobody shows evidence side by side: carrier scan timeline, GPS/photo proof-of-delivery, customer's past "not received" claims, address-change history, payment method. Today agents get order status and a refund button. A "delivered but not received" case needs an *evidence board* and a recommended decision (reship / refund / carrier claim / deny), with the reasoning shown.
2. **Fraud and abuse signals inside the agent flow.** Sierra and Decagon do bad-actor detection to protect the *AI*. None surface "this customer has 4 INR claims in 6 months" as a factor in a refund decision. Juspay's payments data (refund velocity, chargebacks, card/UPI reuse) is a natural edge here.
3. **Confidence that means something.** Only Zendesk macros show a confidence badge. No product explains *why* the AI suggests an action, what it checked, or what it's unsure of before the agent approves. Decagon's "black box" complaint confirms the gap.
4. **Risk-tiered approvals.** It's binary today: approve everything (Copilot) or pre-approve an action type globally. Nobody does thresholds such as "auto-refund under ₹500 for customers with clean history, lead approval above ₹5,000".
5. **Wrap-up/close.** None document AI-generated resolution notes, disposition codes or a "what we promised the customer" follow-up (e.g., re-check the carrier claim in 48h).
6. **"Where to intervene" for the Team Lead.** Dashboards report adoption, QA scores and trends. None give a live, ranked list of tickets the lead should step into *now*: SLA at risk, refund above threshold awaiting approval, AI stuck in a loop, angry repeat customer. Monitors and Watchtower are after-the-fact QA, not live triage of the floor.
7. **Human vs AI as one team view.** Zendesk compares AI and human QA scores, but nobody shows the lead one capacity picture: what the AI is handling, what it's escalating and why, and which agents are overloaded by those escalations.
8. **The handoff seam.** Zendesk auto assist doesn't work on AI-agent tickets, and Sierra's handoff isn't documented. A ticket that moves from AI to human mid-investigation is the weakest moment in all three.

---

## Public product screenshots (official)
1. Zendesk auto assist (suggested reply + actions, approve): https://zen-marketing-documentation.s3.amazonaws.com/docs/en/ai_auto_assist_approve.png
2. Zendesk auto assist suggestion sources: https://zen-marketing-documentation.s3.amazonaws.com/docs/en/copilot_auto_assist_suggestion_sources.png
3. Zendesk Copilot dashboard, auto assist KPIs: https://zen-marketing-documentation.s3.amazonaws.com/docs/en/explore_auto_assist_KPIs.png
4. Sierra Live Assist (human copilot): https://sierra.ai/-/cdn/image?src=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fca4jck6w%2Fproduction%2Fee37c756cd596755ed20b61f48504fd8813b949e-2661x2187.png&width=3840&quality=75
5. Sierra Monitors (flagged conversations): https://sierra.ai/-/cdn/image?src=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fca4jck6w%2Fproduction%2F1f52e56aef92ad14fe7f4de98679e5d71a6d4fce-1920x1404.png&width=3840&quality=75
6. Decagon Watchtower dashboards: https://cdn.prod.website-files.com/683e5da0b6d8a19de4875ae7/6a230a540f7468b9850cdcf1_product-watchtower-accordion-image-3.avif
