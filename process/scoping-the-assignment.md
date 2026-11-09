# Scoping the assignment

Scope agreed with Nitish on 5 November 2026.

## 1. The brief

- **Business:** a fictional fashion brand that sells clothes online (D2C).
- **Complaint:** "My order is marked delivered, but I haven't received it." Only this complaint, explored through five cases.
- **What we deliver:**
  1. **Executive workspace:** pick up a ticket, investigate, resolve and close it, with the AI taking part at every step.
  2. **Team Lead overview:** one screen showing how the team is doing, what needs the lead and where to step in.

Prototype: [jusdesk-theta.vercel.app](https://jusdesk-theta.vercel.app) (executive) and [/lead](https://jusdesk-theta.vercel.app/lead) (Team Lead).

## 2. The five cases, simple to hard

| # | Case | What the AI does | What people do |
|---|---|---|---|
| 1 | **Vikram: delivered to the guard.** ₹1,200 tee, cash on delivery. He writes in Hindi. | Finds the courier's note and photo ("handed to the society guard"), replies in Hindi with the proof, and closes the ticket once he confirms. | Nobody, unless he reopens it. |
| 2 | **Kavya: scanned too early.** ₹1,650 kurta. Ekart scanned it delivered while the rider was 4.2 km away. | Spots the early scan, tells Kavya it should arrive by evening, asks Ekart to confirm and sets a follow-up for 4 pm. | The executive steps in only if Ekart hasn't confirmed by 4 pm. |
| 3 | **Ananya: evidence doesn't match.** ₹1,800 kurta. The photo shows a different door and the GPS is 600 m off. She wrote on chat, then by email. | Merges the email into the chat ticket, lays out the photo and GPS side by side, and recommends a reship (size in stock, within the executive's ₹5,000 limit) plus a courier claim. | The executive reviews the evidence and approves the reship, or refunds instead. |
| 4 | **Rohan: high value, no stock.** ₹6,500 jacket. Size out of stock, so it must be a refund. 4th Shadowfax claim in his area this week. | Recommends a refund, flags the courier pattern and notes the amount is above the executive's limit. When the refund fails at the bank, keeps the ticket open and offers a retry or a refund to card. | The executive asks the Team Lead (Priya) to approve, then handles the failed refund. |
| 5 | **Meera: suspected false claim.** ₹4,500 dress. OTP entered at her door and the photo matches her flat. 3rd claim in 2 months. | Shows the signals to staff only. Never accuses her or denies the claim on its own. | The executive replies neutrally and sends the case to Priya with a note. Priya decides. |

## 3. Rules across all cases

- **Who decides:** the AI acts alone when the evidence is clear and no money moves. The executive decides reships and refunds up to ₹5,000. The Team Lead approves anything above that, and reviews patterns and suspected false claims.
- **Follow-ups:** whenever a ticket starts waiting (on a courier, the customer or the lead), the AI sets a follow-up task based on the SLA and says so in a toast.
- **Closing a refund:** the ticket closes only when the payment provider confirms the refund. A failed refund keeps the ticket open with the executive.
- **Suspected fraud:** the AI flags signals; people decide. Matching proof doesn't prove the customer is lying, because a parcel can be stolen after a correct delivery.

## 4. Team Lead overview

One screen, fed by the same cases. It's a list of what needs the lead, with no flows behind the items ([decision](../decisions/2026-11-05-team-lead-dashboard-only.md)).

- **Needs you now:** Rohan's refund approval, Meera's review, a failed refund, Ekart's reply due at 4 pm, tickets close to the first-reply deadline.
- **Patterns the AI spotted:** the Shadowfax claim spike, and OTP-verified claims from linked accounts.
- **How the team is doing:** open tickets, first-reply time, tickets resolved, the share the AI resolved alone, and a per-person table.

Items show the ticket number, but nothing opens on click in the prototype.

## 5. Edge cases considered but not designed

These are real situations for this complaint. We thought them through, but they have no screens in the prototype.

- Cash on delivery: there is nothing to refund, so the only path is a dispute with the courier.
- The customer finds the parcel after the refund has been sent.
- The chatbot promised something before handing over; the executive honours or corrects it.
- Gift orders, where the buyer and the receiver are different people.
- Festival or deadline orders that need to move up the queue.
- The parcel is stolen from the doorstep after a correct delivery.

## 6. Out of scope

Not part of this assignment:

- Multi-item orders where one parcel is missing.
- Empty or damaged packages.
- Other complaint types: returns, cancellations, payment failures.
- Admin setup: chatbot builder, policy editor, integrations.
