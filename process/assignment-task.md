# Assignment task: what we are designing

Agreed with Nitish on 5 November 2026. This is the working plan for the designs. It narrows [design-scope-proposal.md](design-scope-proposal.md) to the case set below.

## The brief

- **Business:** a fictional fashion brand selling clothes online (D2C).
- **Scenario:** "My order is marked delivered, but I haven't received it." Only this scenario, explored through edge cases.
- **Deliverables:**
  1. **Support Executive workflow:** pick up a ticket from the queue, investigate, resolve, close. Show how AI takes part throughout.
  2. **Team Lead overview:** a single screen showing how the operation is doing, what needs attention and where to step in.

## The 5 cases, simple to hard

| # | Case | AI does | People do |
|---|---|---|---|
| 1 | **Delivered to the guard.** ₹1,200 T-shirt. Customer writes in Hindi. | Finds "handed to security guard" + photo in courier tracking. Replies in Hindi with the proof. Follows up after 24h. Closes. | Nobody, unless the customer disputes it. |
| 2 | **Scanned too early.** Marked delivered 2h ago, no photo or GPS. | Spots the early scan. Asks the customer to wait until end of day. Queries the courier. Follows up. | Executive only if the courier doesn't reply within 24h. |
| 3 | **Evidence doesn't match.** ₹1,800 kurta. Photo shows a different door; GPS 600 m from the address. Customer complained on the chatbot, then by email. | Spots the duplicate (same person, same order) and suggests merging. Lays out the evidence side by side. Recommends a reship (size in stock). Drafts the courier claim. | Executive merges, reviews the evidence, approves the reship, replies. |
| 4 | **High value, no stock.** ₹6,500 prepaid jacket. Size out of stock, so it must be a refund. 4 similar claims in this pincode this week. | Recommends a refund to the original payment method. Points out the courier pattern. Notes the amount is above the executive's limit. Catches the failed refund and blocks a second one. | Executive proposes the refund. Team Lead approves. Executive retries after the failure and keeps the customer informed. |
| 5 | **Suspected false claim.** ₹4,500 dress. OTP verified, photo at the customer's door. 3rd claim in 2 months, a linked account at the same address, UPI ID tied to chargebacks. | Shows the signals privately to staff. Never accuses or denies on its own. | Executive replies neutrally. Team Lead decides: decline with proof, ask for more information, or approve once and flag the account. |

## Rules across all cases

- **Who acts:** AI acts alone when the evidence is clear and no money moves. The executive decides reships and refunds. The Team Lead handles amounts over the limit, patterns and suspected fraud.
- **Refund closing:** when the payment provider confirms the refund succeeded, AI sends the customer the amount, reference number (ARN/UTR) and expected date, then closes the ticket. A failed refund keeps the ticket open with the executive. If the customer later says the money never arrived, the ticket reopens with the reference number ready.
- **Fraud:** AI flags signals, people decide. Matching proof is not proof of lying: theft after a correct delivery is possible.

## Team Lead overview (one screen, fed by the same cases)

- Approvals waiting (Case 4)
- Courier spike: 4 claims in one pincode (Case 4)
- Suspected false claims to review (Case 5)
- Failed refunds (Case 4)
- Courier replies overdue and cases close to SLA (Cases 2–3)
- Enough performance context (volume, response time, AI vs human share) to judge how the operation is doing

Each item opens the case behind it.

## Annotations only (no separate flow)

- Cash on delivery: no refund, courier dispute only.
- Customer finds the parcel after the refund.
- AI agent promised something before handing over; the executive honours or corrects it.
- Gift orders: buyer and receiver differ.
- Festival or deadline orders: urgency in the queue.
- Doorstep theft after a correct delivery.

## Left out

- Multi-item orders with one parcel missing.
- Empty or damaged packages.
- Returns, cancellations, payment failures and other issue types.
- Admin setup: bot builder, policy editor, integrations.
