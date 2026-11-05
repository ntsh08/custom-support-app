// Fictional demo data for the five agreed cases (process/assignment-task.md).
// Names, orders, couriers and amounts are invented.

export type Group = "needs" | "waiting" | "lead" | "ai" | "closed";

export type Msg =
  | { kind: "customer"; channel: "chat" | "email"; time: string; text: string; gloss?: string }
  | { kind: "agent"; who: string; time: string; text: string; gloss?: string }
  | { kind: "event"; time: string; text: string; ai?: boolean };

export type Evidence =
  | { kind: "door"; title: string; note: string; door: string; parcel?: boolean; plate?: string }
  | { kind: "gate"; title: string; note: string }
  | { kind: "map"; title: string; note: string; metres: number }
  | { kind: "missing"; title: string; note: string };

export type Fact = { label: string; value: string; tone?: "bad" | "good" };

export type Option = {
  id: string;
  label: string;
  primary?: boolean;
  /** Lines shown in the inline confirm step. Omit for actions that need no confirm. */
  confirm?: { title: string; lines: [string, string][]; note: string; cta: string };
  /** State the case moves to after the action. */
  next: string;
};

export type Stage = {
  group: Group;
  nextStep: string;
  timeLeft?: string;
  urgent?: "warn" | "bad";
  /** Status line under the headline: who owns the next step and when. */
  status?: string;
  ai?: string;
  options: Option[];
  /** Messages appended to the thread when the case enters this stage. */
  adds?: Msg[];
  draft?: string;
  /** A simulated outside event (courier, lead, bank) the prototype can trigger. */
  simulate?: { label: string; next: string };
};

export type Case = {
  id: string;
  customer: string;
  initials: string;
  item: string;
  value: string;
  order: string;
  payment: string;
  courier: string;
  language?: string;
  headline: string;
  summary: string;
  thread: Msg[];
  evidence: Evidence[];
  facts: Fact[];
  signals?: string[];
  start: string;
  stages: Record<string, Stage>;
};

export const CASES: Case[] = [
  {
    id: "ananya",
    customer: "Ananya Mehta",
    initials: "AM",
    item: "Block-print kurta, M",
    value: "₹1,800",
    order: "FX-48213",
    payment: "Prepaid · UPI",
    courier: "Shadowfax",
    headline: "Delivered to the wrong door?",
    summary: "Marked delivered yesterday at 6:42 pm. Ananya says it never arrived and needs it before Saturday.",
    thread: [
      { kind: "event", time: "Yesterday 6:42 pm", text: "Shadowfax marked delivered" },
      { kind: "customer", channel: "chat", time: "8:52 am", text: "My order shows delivered but I didn't get anything." },
      { kind: "agent", who: "JusDesk assistant", time: "8:52 am", text: "Sorry about that. I'm checking with the courier and passing this to our team now." },
      { kind: "event", time: "8:53 am", text: "AI handed over with the courier photo and GPS attached", ai: true },
      { kind: "customer", channel: "email", time: "9:14 am", text: "I already told your chatbot this. The app says delivered but nothing came to my door. I need it before Saturday." },
      { kind: "event", time: "9:15 am", text: "AI merged this email into the chat case (same order, same customer)", ai: true },
    ],
    evidence: [
      { kind: "door", title: "Courier photo", note: "Green door, parcel on the step", door: "#2F6B4F", parcel: true },
      { kind: "door", title: "Last delivery here, 12 Oct", note: "White door, flat B-204", door: "#F4F2EE", plate: "B-204" },
      { kind: "map", title: "Rider's GPS", note: "600 m from the address", metres: 600 },
    ],
    facts: [
      { label: "Delivery OTP", value: "Not collected" },
      { label: "Ananya", value: "14 orders, no past claims", tone: "good" },
      { label: "560034 this week", value: "3 similar claims, all Shadowfax", tone: "bad" },
    ],
    start: "decide",
    stages: {
      decide: {
        group: "needs",
        nextStep: "Decide: evidence doesn't match",
        timeLeft: "40 min",
        urgent: "warn",
        ai: "Photo and GPS both point to another address. A reship and a courier claim are within your ₹5,000 limit, and size M is in stock.",
        draft: "Hi Ananya, you're right: the courier's photo shows a different door. I'm sending a new kurta today so it reaches you by Friday, and we'll take it up with Shadowfax. Nothing more needed from you.",
        options: [
          {
            id: "reship",
            label: "Reship and file claim",
            primary: true,
            confirm: {
              title: "Confirm for Ananya",
              lines: [
                ["Reship", "Block-print kurta, size M"],
                ["Arrives", "By Friday, before her Saturday"],
                ["Courier claim", "₹1,800 · Shadowfax"],
                ["Message", "The reply on the left, by email and chat"],
              ],
              note: "She gets the new tracking link once it ships. You can undo for 5 minutes.",
              cta: "Confirm",
            },
            next: "reshipped",
          },
          {
            id: "refund",
            label: "Refund ₹1,800",
            confirm: {
              title: "Refund Ananya instead",
              lines: [
                ["Refund", "₹1,800 to her UPI"],
                ["Arrives", "Usually 1–3 days"],
                ["Saturday", "No kurta in time"],
                ["Courier claim", "₹1,800 · Shadowfax"],
              ],
              note: "The ticket closes when the payment provider confirms the refund.",
              cta: "Refund",
            },
            next: "refunded",
          },
        ],
      },
      reshipped: {
        group: "waiting",
        nextStep: "Reship in transit, claim filed",
        status: "Waiting on Shadowfax · AI checks the claim on Monday",
        ai: "Replacement FX-48213-R is packed. Claim CLM-2291 is filed with Shadowfax. I'll close the case once Ananya's parcel is delivered with an OTP.",
        adds: [
          { kind: "agent", who: "You", time: "Now", text: "Hi Ananya, you're right: the courier's photo shows a different door. I'm sending a new kurta today so it reaches you by Friday, and we'll take it up with Shadowfax. Nothing more needed from you." },
          { kind: "event", time: "Now", text: "Reship FX-48213-R created · courier claim CLM-2291 filed", ai: true },
        ],
        options: [],
        simulate: { label: "Simulate: delivered with OTP on Thursday", next: "closed" },
      },
      refunded: {
        group: "waiting",
        nextStep: "Refund with payment provider",
        status: "Refund sent · closes when the payment provider confirms",
        options: [],
        adds: [{ kind: "event", time: "Now", text: "Refund of ₹1,800 sent to the payment provider", ai: true }],
        simulate: { label: "Simulate: provider confirms refund", next: "closed" },
      },
      closed: {
        group: "closed",
        nextStep: "Closed",
        status: "Closed · customer has the outcome",
        options: [],
        adds: [{ kind: "event", time: "Thu 2:10 pm", text: "Delivered with OTP. AI closed the case and the claim stays open with Shadowfax.", ai: true }],
      },
    },
  },
  {
    id: "rohan",
    customer: "Rohan Shah",
    initials: "RS",
    item: "Wool jacket, L",
    value: "₹6,500",
    order: "FX-47960",
    payment: "Prepaid · UPI",
    courier: "Shadowfax",
    headline: "Never arrived, and the size is gone",
    summary: "Marked delivered on Tuesday. Rohan wants a replacement, but size L is out of stock.",
    thread: [
      { kind: "event", time: "Tue 7:05 pm", text: "Shadowfax marked delivered" },
      { kind: "customer", channel: "email", time: "10:02 am", text: "Hi, my jacket shows as delivered on Tuesday but it never came. Can you send another one?" },
      { kind: "event", time: "10:03 am", text: "AI checked stock: size L is out of stock until December", ai: true },
    ],
    evidence: [
      { kind: "missing", title: "Courier photo", note: "Shadowfax didn't share one" },
      { kind: "map", title: "Rider's GPS", note: "1.1 km from the address", metres: 1100 },
    ],
    facts: [
      { label: "Delivery OTP", value: "Not collected" },
      { label: "Rohan", value: "9 orders, no past claims", tone: "good" },
      { label: "560034 this week", value: "4th similar claim, all Shadowfax", tone: "bad" },
      { label: "Size L", value: "Out of stock until December" },
    ],
    start: "decide",
    stages: {
      decide: {
        group: "needs",
        nextStep: "Refund needs your lead",
        timeLeft: "2 h",
        ai: "No proof of delivery and the GPS is 1.1 km off. A replacement isn't possible, so refund ₹6,500 to his UPI. That's above your ₹5,000 limit, so it needs Priya's approval.",
        draft: "Hi Rohan, I'm sorry, the jacket in size L is out of stock. I've asked for a full refund of ₹6,500 to your UPI and will confirm as soon as it's on its way.",
        options: [
          {
            id: "lead",
            label: "Send refund to Priya for approval",
            primary: true,
            confirm: {
              title: "Ask Priya to approve",
              lines: [
                ["Refund", "₹6,500 to Rohan's UPI"],
                ["Why", "No proof of delivery, GPS 1.1 km off, size L out of stock"],
                ["Your note", "4th Shadowfax claim in 560034 this week"],
                ["Rohan", "Gets the reply on the left now"],
              ],
              note: "Priya usually answers within an hour. You'll see it here.",
              cta: "Send to Priya",
            },
            next: "withLead",
          },
        ],
      },
      withLead: {
        group: "lead",
        nextStep: "With Priya for approval",
        status: "Waiting on Priya (team lead) · usually within 1 h",
        options: [],
        adds: [
          { kind: "agent", who: "You", time: "Now", text: "Hi Rohan, I'm sorry, the jacket in size L is out of stock. I've asked for a full refund of ₹6,500 to your UPI and will confirm as soon as it's on its way." },
          { kind: "event", time: "Now", text: "Refund sent to Priya for approval" },
        ],
        simulate: { label: "Simulate: Priya approves", next: "failed" },
      },
      failed: {
        group: "needs",
        nextStep: "Refund failed: fix and retry",
        timeLeft: "Now",
        urgent: "bad",
        status: "Refund failed at the bank · the ticket stays open",
        ai: "Priya approved, but the bank rejected the UPI refund: the UPI ID is no longer active. No money left our account, so retrying won't refund twice. Ask Rohan for a new UPI ID, or refund to the card ending 4417 he used last month.",
        draft: "Hi Rohan, your refund couldn't reach the UPI ID on this order. Could you reply with a UPI ID that works for you? Or we can send it to your card ending 4417.",
        adds: [
          { kind: "event", time: "11:20 am", text: "Priya approved the ₹6,500 refund" },
          { kind: "event", time: "11:21 am", text: "Payment provider: refund failed, UPI ID inactive (no money moved)", ai: true },
        ],
        options: [
          {
            id: "retry",
            label: "Retry to new UPI ID",
            primary: true,
            confirm: {
              title: "Retry the refund",
              lines: [
                ["Refund", "₹6,500"],
                ["To", "rohan.shah@okhdfc (from his reply)"],
                ["Earlier attempt", "Failed, no money moved"],
              ],
              note: "The ticket closes when the payment provider confirms.",
              cta: "Retry refund",
            },
            next: "retrying",
          },
        ],
      },
      retrying: {
        group: "waiting",
        nextStep: "Refund with payment provider",
        status: "Refund retried · closes when the payment provider confirms",
        options: [],
        adds: [
          { kind: "customer", channel: "email", time: "11:34 am", text: "Please use rohan.shah@okhdfc. Thanks." },
          { kind: "event", time: "Now", text: "Refund of ₹6,500 retried to rohan.shah@okhdfc", ai: true },
        ],
        simulate: { label: "Simulate: provider confirms refund", next: "closed" },
      },
      closed: {
        group: "closed",
        nextStep: "Closed",
        status: "Closed · refund confirmed, UTR 4290 8812 3301",
        options: [],
        adds: [
          { kind: "event", time: "11:36 am", text: "Payment provider confirmed the refund · UTR 4290 8812 3301", ai: true },
          { kind: "agent", who: "JusDesk assistant", time: "11:36 am", text: "Your refund of ₹6,500 is on its way (UTR 4290 8812 3301). It usually shows in your account within a day. If it doesn't, just reply here." },
        ],
      },
    },
  },
  {
    id: "meera",
    customer: "Meera Iyer",
    initials: "MI",
    item: "Linen dress, S",
    value: "₹4,500",
    order: "FX-48077",
    payment: "Prepaid · Card",
    courier: "Delhivery",
    headline: "Proof matches, but the pattern doesn't",
    summary: "Delivered with an OTP at her door. Meera says it never arrived. This account has made claims before.",
    thread: [
      { kind: "event", time: "Mon 1:15 pm", text: "Delhivery delivered with OTP" },
      { kind: "customer", channel: "chat", time: "9:40 am", text: "My dress never came. I want a refund." },
      { kind: "agent", who: "JusDesk assistant", time: "9:40 am", text: "I'm sorry to hear that. I've passed this to our team, who'll update you today." },
    ],
    evidence: [
      { kind: "door", title: "Courier photo", note: "Her door, flat 12C", door: "#7A5236", parcel: true, plate: "12C" },
      { kind: "map", title: "Rider's GPS", note: "8 m from the address", metres: 8 },
    ],
    facts: [
      { label: "Delivery OTP", value: "Verified at 1:15 pm", tone: "good" },
      { label: "Meera", value: "3rd claim in 2 months", tone: "bad" },
    ],
    signals: [
      "3rd \"not received\" claim on this account in 2 months",
      "Another account at the same address made 2 claims",
      "Card used here is linked to 1 chargeback (from payment data)",
    ],
    start: "decide",
    stages: {
      decide: {
        group: "needs",
        nextStep: "Review flagged claim",
        timeLeft: "15 min",
        urgent: "bad",
        ai: "The proof matches her address and the OTP was entered. The signals below are worth a second look, but they don't prove anything. This needs Priya's call.",
        draft: "Hi Meera, thanks for letting us know. We're checking the delivery with Delhivery and will update you by 6 pm tomorrow.",
        options: [
          {
            id: "lead",
            label: "Send to Priya with note",
            primary: true,
            confirm: {
              title: "Send to Priya",
              lines: [
                ["Claim", "₹4,500 linen dress"],
                ["Proof", "OTP verified, photo at her door"],
                ["Signals", "3 shared privately with Priya"],
                ["Meera", "Gets the neutral reply on the left"],
              ],
              note: "Meera never sees the signals.",
              cta: "Send to Priya",
            },
            next: "withLead",
          },
          { id: "ask", label: "Ask for more detail", next: "asked" },
        ],
      },
      withLead: {
        group: "lead",
        nextStep: "With Priya",
        status: "Waiting on Priya (team lead) · reply promised by 6 pm tomorrow",
        options: [],
        adds: [
          { kind: "agent", who: "You", time: "Now", text: "Hi Meera, thanks for letting us know. We're checking the delivery with Delhivery and will update you by 6 pm tomorrow." },
          { kind: "event", time: "Now", text: "Sent to Priya with 3 private signals" },
        ],
      },
      asked: {
        group: "waiting",
        nextStep: "Waiting on Meera",
        status: "Waiting on Meera · AI reminds her tomorrow at 10 am",
        options: [],
        adds: [{ kind: "agent", who: "You", time: "Now", text: "Hi Meera, could you check with your building's security or neighbours? The courier's record shows a delivery at 1:15 pm on Monday." }],
      },
    },
  },
  {
    id: "kavya",
    customer: "Kavya Pillai",
    initials: "KP",
    item: "Cotton kurta, L",
    value: "₹1,650",
    order: "FX-48302",
    payment: "Prepaid · UPI",
    courier: "Ekart",
    headline: "Scanned as delivered before it arrived",
    summary: "Ekart scanned it delivered at 10:12 am while the rider was 4.2 km away.",
    thread: [
      { kind: "event", time: "10:12 am", text: "Ekart marked delivered" },
      { kind: "customer", channel: "chat", time: "10:30 am", text: "It says delivered but nobody came?" },
      { kind: "agent", who: "JusDesk assistant", time: "10:31 am", text: "It looks like the courier scanned it early: the rider was still 4.2 km away. It should reach you by this evening. I've asked Ekart to confirm and I'll update you by 4 pm." },
      { kind: "event", time: "10:31 am", text: "AI asked Ekart to confirm the delivery time", ai: true },
    ],
    evidence: [
      { kind: "missing", title: "Courier photo", note: "None yet: not delivered" },
      { kind: "map", title: "Rider at the scan", note: "4.2 km away, on the route", metres: 4200 },
    ],
    facts: [
      { label: "Scan", value: "10:12 am, rider 4.2 km away", tone: "bad" },
      { label: "Route", value: "Your address is stop 14 of 22" },
    ],
    start: "waiting",
    stages: {
      waiting: {
        group: "waiting",
        nextStep: "Ekart reply due 4 pm",
        status: "Waiting on Ekart · AI checks at 4 pm, then hands to you",
        ai: "Early scan. I've told Kavya and asked Ekart. If Ekart doesn't confirm by 4 pm, it comes to you.",
        options: [{ id: "take", label: "Take over now", next: "taken" }],
        simulate: { label: "Simulate: delivered at 3:40 pm", next: "closed" },
      },
      taken: {
        group: "needs",
        nextStep: "You're chasing Ekart",
        status: "Yours · Ekart reply due 4 pm",
        options: [],
        adds: [{ kind: "event", time: "Now", text: "You took over from AI" }],
      },
      closed: {
        group: "closed",
        nextStep: "Closed",
        status: "Closed by AI · delivered at 3:40 pm",
        options: [],
        adds: [
          { kind: "event", time: "3:40 pm", text: "Ekart delivered with OTP", ai: true },
          { kind: "agent", who: "JusDesk assistant", time: "3:41 pm", text: "Your kurta was delivered at 3:40 pm. Sorry for the confusing update earlier!" },
        ],
      },
    },
  },
  {
    id: "vikram",
    customer: "Vikram Nair",
    initials: "VN",
    item: "Graphic tee, M",
    value: "₹1,200",
    order: "FX-48155",
    payment: "Cash on delivery",
    courier: "Delhivery",
    language: "Hindi",
    headline: "Left with the security guard",
    summary: "Delivered to the society gate. AI found the courier's note and photo and replied in Hindi.",
    thread: [
      { kind: "event", time: "Yesterday 5:20 pm", text: "Delhivery: handed to security guard" },
      { kind: "customer", channel: "chat", time: "9:05 am", text: "Mera order delivered dikha raha hai par mujhe nahi mila.", gloss: "My order shows delivered but I didn't get it." },
      { kind: "agent", who: "JusDesk assistant", time: "9:05 am", text: "Namaste Vikram ji, courier ne aapka parcel kal shaam 5:20 baje society gate par guard ko diya tha. Photo yahan hai. Kya aap guard se check kar sakte hain?", gloss: "The courier gave your parcel to the guard at the society gate yesterday at 5:20 pm. Here's the photo. Could you check with the guard?" },
      { kind: "customer", channel: "chat", time: "9:22 am", text: "Mil gaya, guard ke paas tha. Thank you!", gloss: "Got it, the guard had it. Thank you!" },
      { kind: "event", time: "9:22 am", text: "AI closed the case: customer confirmed", ai: true },
    ],
    evidence: [
      { kind: "gate", title: "Courier photo", note: "Society gate, guard's cabin" },
      { kind: "map", title: "Rider's GPS", note: "15 m from the gate", metres: 15 },
    ],
    facts: [
      { label: "Courier note", value: "Handed to security guard" },
      { label: "Payment", value: "Cash on delivery, collected", tone: "good" },
    ],
    start: "handled",
    stages: {
      handled: {
        group: "ai",
        nextStep: "AI closed · customer confirmed",
        status: "Closed by AI at 9:22 am · nothing for you to do",
        ai: "Evidence was clear and no money had to move, so I handled it in Hindi. Reopen if anything looks off.",
        options: [{ id: "reopen", label: "Reopen", next: "reopened" }],
      },
      reopened: {
        group: "needs",
        nextStep: "Reopened by you",
        status: "Yours · reopened",
        options: [],
        adds: [{ kind: "event", time: "Now", text: "You reopened the case" }],
      },
    },
  },
];

export const GROUPS: { id: Group; label: string }[] = [
  { id: "needs", label: "Needs you" },
  { id: "lead", label: "With your lead" },
  { id: "waiting", label: "Waiting" },
  { id: "ai", label: "Handled by AI" },
  { id: "closed", label: "Closed" },
];
