# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js, deployed on Vercel. Viewed by evaluators in Chrome on a Mac. Not scaffolded yet; `design-system/tokens.css` and `design-system/showcase.html` are the current static references.

## Users

- **Support executive** at a D2C fashion brand selling online. Picks up a ticket from the queue, investigates a "marked delivered but not received" claim, works towards a resolution (reship, refund, courier claim, wait, decline) and closes the ticket. Measured on response time; today rebuilds context across tools and tracks follow-ups by hand.
- **Team lead.** Watches how the support operation is performing from one dashboard: what needs attention, where to step in (refund approvals above the executive's limit, overdue courier replies, failed refunds, patterns across claims, suspected false claims).

See `research/personas.md` (executive persona from one interview plus desk research; team lead is an assumed proto-persona).

## Product Purpose

An AI-native support workspace for the "delivered but not received" problem. AI answers the customer first, gathers the evidence and suggests or takes actions; people decide anything involving money, stock or suspected fraud. Success: the executive resolves each case from facts in one place, nothing is lost between reply and outcome, and the team lead sees where to intervene while it can still help.

This is a product design assignment for Juspay: deliverables are the executive's end-to-end workflow and a single team-lead overview screen.

## Positioning

Evidence-first resolution with AI handling the routine:

- Courier proof (photo, GPS, OTP, scans), order data and payment data sit side by side, so decisions are made from facts, not labels.
- Refunds are tracked through the payment provider (the Juspay angle): success, failure and reference numbers are part of the case.
- AI closes clear-cut cases alone and hands people only what needs judgement.

## Operating Context

- Desktop, used all day by support executives working a queue; one team lead overseeing several executives.
- Customers write in by chat and email (sometimes both for the same issue) and sometimes in Hindi or another regional language.
- External dependencies: courier partners (proof of delivery, claims, reply delays), the store's order and stock systems, and the payment provider for refunds.
- Five agreed cases, simple to hard (`process/assignment-task.md`): delivered to the guard; scanned too early; evidence doesn't match plus duplicate complaint; high-value order with no stock and a failed refund; suspected false claim.

## Capabilities and Constraints

- Scope: only the "delivered but not received" scenario, explored through edge cases. Team lead is one dashboard listing what needs them, with no flows behind the items.
- AI acts alone only when evidence is clear and no money moves; the executive decides reships and refunds within a limit (₹5,000 in the cases); the team lead approves above it and reviews patterns and suspected fraud.
- AI flags possible fraud privately and never accuses or denies on its own. Matching proof of delivery is not proof the customer is lying.
- The ticket closes when the payment provider confirms the refund succeeded; a failed refund keeps it open; a "money never arrived" reply reopens it.
- Out of scope: multi-item orders, damaged or empty parcels, returns, cancellations, payment failures, admin setup (bot builder, policies, integrations).
- Decisions and their reasons are logged in `decisions/`; read them before changing a screen they cover.

## Brand Commitments

Binding choices already made (see `decisions/`):

- Working name **JusDesk**.
- Design language inspired by the Family wallet app, adapted for desktop.
- Purple is the brand colour; it also marks what the AI suggested or did.
- Inter, light theme only. Tokens in `design-system/tokens.css`, mirrored in Figma.
- References the user likes: Attio (round 1 of taste-building). The first sketch was judged generic ("AI slop"); restraint is expected.

## Evidence on Hand

- `research/competitors.md`: Zendesk, Sierra, Decagon.
- `research/user-pain-points.md`, `research/reddit-follow-up.md`: public, self-reported, mostly non-Indian.
- `research/interviews/p01-support-practitioner.md`: one support practitioner interview (B2B accounts, not consumer e-commerce).
- `research/personas.md`, `process/assignment-task.md`, `decisions/`.
- Absent, never fabricate: real customer data, real courier photos or GPS traces, real merchant policies, metrics, testimonials, or Juspay API behaviour beyond what is publicly described. The business, orders and people in the cases are fictional.

## Product Principles

1. Facts before suggestions: show the evidence the AI used, not just its conclusion.
2. A case isn't done until the customer has the outcome, not when a reply is sent.
3. AI takes the routine; people own money, stock and judgement on honesty.
4. Never treat the customer as a suspect in anything they can see.
5. The team lead's view leads to the case behind every number.
