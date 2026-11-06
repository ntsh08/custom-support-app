import type { IconName } from "@/components/Icon";

// Fictional demo data for the five agreed cases (process/assignment-task.md).
// Names, orders, couriers and amounts are invented.

/** Ticket status: who has the ball. Reopened is a tag on "reply", not a status. */
export type Group = "first" | "reply" | "customer" | "others" | "escalated" | "closed";

export type Msg = (
  | { kind: "customer"; channel: "chat" | "email"; time: string; text: string; gloss?: string; /** Email only. */ subject?: string }
  | { kind: "agent"; who: string; time: string; text: string; gloss?: string; /** What the assistant did before replying (shown as a collapsed trace). */ steps?: string[]; /** What the executive should try next, from the investigation. */ next?: string[] }
  | { kind: "event"; time: string; text: string; ai?: boolean; /** A status change, shown as a line in the conversation. */ status?: Group }
  | { kind: "note"; who: string; time: string; text: string }
) & { /** Day label for the date separator. Defaults to "Today". */ day?: string };

export type Task = { id: string; text: string; due: string; ai?: boolean; done?: boolean };
export type Reason = { text: string; src: string };

export type Evidence =
  | { kind: "door"; title: string; note: string; door: string; parcel?: boolean; plate?: string }
  | { kind: "gate"; title: string; note: string }
  | { kind: "map"; title: string; note: string; metres: number }
  | { kind: "missing"; title: string; note: string };

export type Fact = { label: string; value: string; tone?: "bad" | "good"; icon?: IconName };

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
  /** The AI owns this step (follows up or closed it). */
  by?: "AI";
  /** The customer wrote after the ticket was closed. */
  reopened?: boolean;
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
  /** Linked work at this stage (courier request, reship, refund). Falls back to the case's. */
  linked?: [string, string][];
};

export type Case = {
  id: string;
  /** Ticket number. Demo data. */
  ticket: string;
  customer: string;
  /** Shown when the customer wrote by email. Demo addresses. */
  email?: string;
  initials: string;
  item: string;
  value: string;
  order: string;
  payment: string;
  courier: string;
  language?: string;
  /** The diagnosis. The ticket title is the same for every case (TITLE). */
  headline: string;
  /** One catchy line at the top of the AI summary. */
  hook: string;
  summary: string;
  thread: Msg[];
  evidence: Evidence[];
  facts: Fact[];
  /** What the bot already did, so the executive doesn't ask again. */
  handoff: string[];
  /** The AI recommendation on the first stage: title, reasons with sources, policy rule. */
  rec?: { title: string; confidence: "High" | "Medium" | "Low"; reasons: Reason[]; policy: string };
  /** Mood the AI read from the customer's messages. */
  sentiment: { label: "Angry" | "Frustrated" | "Neutral" | "Happy"; why: string };
  /** Free tags; several allowed. The AI suggests them, the executive can change them. */
  tags: string[];
  /** The customer's past with the store. */
  history: {
    since: string; orders: string; spent: string; claims: string;
    refunds: string; address: string;
    /** Private to staff. Signals, never a verdict; the AI never denies a claim. */
    risk: { level: "Low" | "Review"; checks: { text: string; src: string }[] };
    past: [string, string][];
  };
  followUp?: string;
  /** Contact reason tag. Missing means no due date gets set (interview finding). */
  reasonTag?: string;
  tasks: Task[];
  linked: [string, string][];
  asks?: { q: string; a: string }[];
  start: string;
  stages: Record<string, Stage>;
};

export const TITLE = "Marked delivered, but not received";

export const CASES: Case[] = [
  {
    id: "ananya",
    ticket: "#1042",
    customer: "Ananya Mehta",
    email: "ananya.mehta@example.com",
    initials: "AM",
    item: "Block-print kurta, M",
    value: "₹1,800",
    order: "FX-48213",
    payment: "Prepaid · UPI",
    courier: "Shadowfax",
    headline: "Likely delivered to the wrong flat",
    hook: "Nothing reached her door. She needs it by Saturday.",
    summary: "Marked delivered yesterday at 6:42 pm. Ananya says it never arrived and needs it before Saturday.",
    thread: [
      { kind: "event", time: "Yesterday 6:42 pm", text: "Shadowfax marked delivered" },
      { kind: "customer", channel: "chat", time: "8:52 am", text: "My order shows delivered but I didn't get anything." },
      { kind: "agent", who: "JusDesk assistant", time: "8:52 am", steps: ["Read her message: nothing reached her door", "Checked tracking: Shadowfax marked it delivered yesterday at 6:42 pm", "Pulled the courier photo and the rider's GPS", "The photo shows a different door, so passed it to the team instead of closing"], next: ["Compare the green door in the photo with her last delivery (white door, B-204)", "Ask Shadowfax which flat the rider left it at", "If it isn't found today, reship size M (in stock)"], text: "Sorry about that. I'm checking with the courier and passing this to our team now." },
      { kind: "event", time: "8:53 am", text: "AI handed over with the courier photo and GPS attached", ai: true },
      { kind: "event", time: "8:53 am", text: "AI set status to First response", ai: true, status: "first" },
      { kind: "customer", channel: "email", time: "9:14 am", subject: "Order FX-48213 marked delivered, but not received", text: "Hi,\n\nI already told your chatbot this. The app says delivered but nothing came to my door. I need it before Saturday.\n\nThanks,\nAnanya" },
      { kind: "event", time: "9:15 am", text: "AI merged this email into the chat case (same order, same customer)", ai: true },
      { kind: "note", who: "You", time: "9:20 am", text: "Last delivery to this address was to flat B-204 (white door). Today's photo shows a green door. Probably the wrong flat." },
    ],
    evidence: [
      { kind: "door", title: "Courier photo", note: "Green door, parcel on the step", door: "#2F6B4F", parcel: true },
      { kind: "door", title: "Last delivery, 12 Oct", note: "White door, flat B-204", door: "#F4F2EE", plate: "B-204" },
      { kind: "map", title: "Rider's GPS", note: "600 m from the address", metres: 600 },
    ],
    facts: [
      { icon: "key", label: "Delivery OTP", value: "Not collected" },
      { icon: "user", label: "Ananya", value: "14 orders, no past claims", tone: "good" },
      { icon: "alert", label: "560034 this week", value: "3 similar claims, all Shadowfax", tone: "bad" },
    ],
    handoff: [
      "She wrote twice (chat 8:52, email 9:14). Both are merged here.",
      "The assistant already showed her the tracking and pulled the courier photo and GPS. Don't ask her for them again.",
    ],
    rec: {
      title: "Reship the kurta and file a courier claim",
      confidence: "High",
      reasons: [
        { text: "Courier photo shows a green door. Her last delivery was a white door, B-204.", src: "Photo" },
        { text: "Rider's GPS was 600 m from her address.", src: "GPS" },
        { text: "14 orders, no past claims. Size M is in stock.", src: "Order history" },
      ],
      policy: "Wrong-address delivery under ₹5,000. You can approve this.",
    },
    followUp: "Today, 1 pm",
    sentiment: { label: "Frustrated", why: "Wrote twice in 20 minutes and needs it by Saturday" },
    tags: ["Order not received", "Courier dispute", "Urgent"],
    history: { since: "March 2024", orders: "14", spent: "₹31,400", claims: "None", refunds: "None", address: "Same since 2024 · 13 deliveries, no issues", risk: { level: "Low", checks: [{ text: "No earlier claims or refunds", src: "Order history" }, { text: "Only her account uses this address", src: "Address match" }, { text: "No chargebacks on her UPI", src: "Payment data" }] }, past: [["Size exchange, top", "Aug · solved"], ["Order status", "Jun · solved"]] },
    tasks: [
      { id: "a1", text: "Call Ananya if she doesn't reply", due: "Today, 1 pm" },
      { id: "a2", text: "Chase Shadowfax on the claim", due: "Mon", ai: true },
      { id: "a3", text: "Check the reship reached her", due: "Fri", ai: true },
    ],
    linked: [["Courier request", "Photo and GPS received, 8:53"], ["Reship", "Not created"], ["Refund", "None"]],
    asks: [
      { q: "Has she claimed before?", a: "No. 14 orders since 2024, no claims, no returns flagged." },
      { q: "When would a reship arrive?", a: "Packed today, delivered Friday by Shadowfax. That's before her Saturday deadline." },
    ],
    start: "decide",
    stages: {
      decide: {
        group: "first",
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
        linked: [["Courier claim", "CLM-2291 filed"], ["Reship", "FX-48213-R packed"], ["Refund", "None"]],
        group: "others",
        nextStep: "Reship in transit, claim filed",
        status: "Waiting on Shadowfax · AI checks the claim on Monday",
        ai: "Replacement FX-48213-R is packed. Claim CLM-2291 is filed with Shadowfax. I'll close the case once Ananya's parcel is delivered with an OTP.",
        adds: [
          { kind: "agent", who: "You", time: "Now", text: "Hi Ananya, you're right: the courier's photo shows a different door. I'm sending a new kurta today so it reaches you by Friday, and we'll take it up with Shadowfax. Nothing more needed from you." },
          { kind: "event", time: "Now", text: "Reship FX-48213-R created, claim CLM-2291 filed", ai: true },
        ],
        options: [],
        simulate: { label: "Simulate: delivered with OTP on Thursday", next: "closed" },
      },
      refunded: {
        linked: [["Courier claim", "Not filed"], ["Reship", "None"], ["Refund", "₹1,800 sent, waiting for provider"]],
        group: "others",
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
    ticket: "#1039",
    customer: "Rohan Shah",
    email: "rohan.shah@example.com",
    initials: "RS",
    item: "Wool jacket, L",
    value: "₹6,500",
    order: "FX-47960",
    payment: "Prepaid · UPI",
    courier: "Shadowfax",
    headline: "No proof of delivery, size L out of stock",
    hook: "No proof it reached him, and size L is gone till December.",
    summary: "Marked delivered on Tuesday. Rohan wants a replacement, but size L is out of stock.",
    thread: [
      { kind: "event", time: "Tue 7:05 pm", text: "Shadowfax marked delivered" },
      { kind: "customer", channel: "email", time: "10:02 am", subject: "Jacket never arrived", text: "Hi,\n\nMy jacket shows as delivered on Tuesday but it never came. Can you send another one?\n\nRohan" },
      { kind: "event", time: "10:03 am", text: "AI checked stock: size L is out of stock until December", ai: true },
      { kind: "event", time: "10:03 am", text: "AI set status to First response", ai: true, status: "first" },
    ],
    evidence: [
      { kind: "missing", title: "Courier photo", note: "Shadowfax didn't share one" },
      { kind: "map", title: "Rider's GPS", note: "1.1 km from the address", metres: 1100 },
    ],
    facts: [
      { icon: "key", label: "Delivery OTP", value: "Not collected" },
      { icon: "user", label: "Rohan", value: "9 orders, no past claims", tone: "good" },
      { icon: "alert", label: "560034 this week", value: "4th similar claim, all Shadowfax", tone: "bad" },
      { icon: "box", label: "Size L", value: "Out of stock until December" },
    ],
    handoff: [
      "Rohan wrote once, by email on Tuesday. He wants a replacement.",
      "Size L is out of stock until December, so a replacement isn't possible.",
      "The assistant hasn't promised him anything yet.",
    ],
    rec: {
      title: "Refund ₹6,500 to his UPI, with Priya's approval",
      confidence: "High",
      reasons: [
        { text: "No delivery OTP was collected.", src: "Courier record" },
        { text: "Rider's GPS was 1.1 km from his address.", src: "GPS" },
        { text: "Size L is out of stock until December.", src: "Stock" },
      ],
      policy: "Refunds above ₹5,000 need your lead's approval.",
    },
    followUp: "Today, 5 pm",
    reasonTag: "Lost in transit",
    sentiment: { label: "Neutral", why: "Calm email asking for a replacement" },
    tags: ["Order not received", "Replacement requested", "Out of stock"],
    history: { since: "January 2025", orders: "9", spent: "₹27,900", claims: "None", refunds: "1 · ₹2,100 for a return", address: "Same since 2025 · 8 deliveries, no issues", risk: { level: "Low", checks: [{ text: "No earlier claims; 1 refund was a normal return", src: "Order history" }, { text: "Only his account uses this address", src: "Address match" }, { text: "No chargebacks on his UPI", src: "Payment data" }] }, past: [["Refund for a return", "Sep · solved"]] },
    tasks: [
      { id: "r1", text: "Tell Rohan once Priya decides", due: "Today", ai: true },
      { id: "r2", text: "Check the refund reached him", due: "In 5 days", ai: true },
    ],
    linked: [["Courier request", "No photo, GPS 1.1 km off"], ["Replacement", "Size L out of stock"], ["Refund", "Not started"]],
    asks: [
      { q: "Can we offer size XL instead?", a: "XL is in stock, but he asked for L. Offer it only if he asks; the refund is the safe default." },
      { q: "How long will the refund take?", a: "UPI refunds usually land within a day once the provider confirms." },
    ],
    start: "decide",
    stages: {
      decide: {
        group: "first",
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
        linked: [["Courier request", "No photo, GPS 1.1 km off"], ["Replacement", "Size L out of stock"], ["Refund", "₹6,500 with Priya for approval"]],
        group: "escalated",
        nextStep: "With Priya for approval",
        status: "Waiting on Priya (team lead) · usually within 1 h",
        options: [],
        adds: [
          { kind: "agent", who: "You", time: "10:40 am", text: "Hi Rohan, I'm sorry, the jacket in size L is out of stock. I've asked for a full refund of ₹6,500 to your UPI and will confirm as soon as it's on its way." },
          { kind: "event", time: "10:41 am", text: "Refund sent to Priya for approval" },
        ],
        simulate: { label: "Simulate: Priya approves", next: "failed" },
      },
      failed: {
        linked: [["Courier request", "No photo, GPS 1.1 km off"], ["Replacement", "Size L out of stock"], ["Refund", "Failed: UPI ID inactive"]],
        group: "reply",
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
          {
            id: "card",
            label: "Refund to card ending 4417",
            confirm: {
              title: "Refund to card instead",
              lines: [
                ["Refund", "₹6,500"],
                ["To", "Card ending 4417 (used on his last order)"],
                ["Earlier attempt", "Failed, no money moved"],
                ["Arrives", "Usually 5–7 working days on cards"],
              ],
              note: "The ticket closes when the payment provider confirms.",
              cta: "Refund to card",
            },
            next: "toCard",
          },
        ],
      },
      toCard: {
        linked: [["Courier request", "No photo, GPS 1.1 km off"], ["Replacement", "Size L out of stock"], ["Refund", "Sent to card ending 4417"]],
        group: "others",
        nextStep: "Refund with payment provider",
        status: "Refund sent to card · closes when the payment provider confirms",
        options: [],
        adds: [{ kind: "event", time: "11:30 am", text: "Refund of ₹6,500 sent to the card ending 4417", ai: true }],
        simulate: { label: "Simulate: provider confirms refund", next: "closed" },
      },
      retrying: {
        linked: [["Courier request", "No photo, GPS 1.1 km off"], ["Replacement", "Size L out of stock"], ["Refund", "Retrying to new UPI ID"]],
        group: "others",
        nextStep: "Refund with payment provider",
        status: "Refund retried · closes when the payment provider confirms",
        options: [],
        adds: [
          { kind: "customer", channel: "email", time: "11:34 am", subject: "Re: Your refund", text: "Please use rohan.shah@okhdfc.\n\nThanks,\nRohan" },
          { kind: "event", time: "11:35 am", text: "Refund of ₹6,500 retried to rohan.shah@okhdfc", ai: true },
        ],
        simulate: { label: "Simulate: provider confirms refund", next: "closed" },
      },
      closed: {
        linked: [["Courier request", "No photo, GPS 1.1 km off"], ["Replacement", "Size L out of stock"], ["Refund", "Credited, ref 4290 8812 3301"]],
        group: "closed",
        nextStep: "Closed",
        status: "Closed · refund confirmed by the payment provider",
        options: [],
        adds: [
          { kind: "event", time: "11:37 am", text: "Payment provider confirmed the refund · ref 4290 8812 3301", ai: true },
          { kind: "agent", who: "JusDesk assistant", time: "11:37 am", steps: ["Read his reply with a new UPI ID", "Retried the ₹6,500 refund to rohan.shah@okhdfc", "Got the bank reference 4290 8812 3301"], text: "Your refund of ₹6,500 is on its way (ref 4290 8812 3301). It usually shows in your account within a day. If it doesn't, just reply here." },
        ],
      },
    },
  },
  {
    id: "meera",
    ticket: "#1044",
    customer: "Meera Iyer",
    initials: "MI",
    item: "Linen dress, S",
    value: "₹4,500",
    order: "FX-48077",
    payment: "Prepaid · Card",
    courier: "Delhivery",
    headline: "OTP verified, customer says not received",
    hook: "The OTP was entered at her door, yet she says nothing came.",
    summary: "Delivered with an OTP at her door. Meera says it never arrived. This account has made claims before.",
    thread: [
      { kind: "event", time: "Mon 1:15 pm", text: "Delhivery delivered with OTP" },
      { kind: "customer", channel: "chat", time: "9:40 am", text: "My dress never came. I want a refund." },
      { kind: "agent", who: "JusDesk assistant", time: "9:40 am", steps: ["Read her message: says the dress never came", "Checked tracking: OTP entered at her door at 1:15 pm", "A claim like this needs a person, so promised no refund or reship"], next: ["Ask Delhivery for the rider's call log at 1:15 pm", "Ask Meera if someone at home could have taken it", "Send to Priya with the signals; don't deny the claim yourself"], text: "I'm sorry to hear that. I've passed this to our team, who'll update you today." },
      { kind: "event", time: "9:40 am", text: "AI set status to First response", ai: true, status: "first" },
    ],
    evidence: [
      { kind: "door", title: "Courier photo", note: "Her door, flat 12C", door: "#7A5236", parcel: true, plate: "12C" },
      { kind: "map", title: "Rider's GPS", note: "8 m from the address", metres: 8 },
    ],
    facts: [
      { icon: "key", label: "Delivery OTP", value: "Verified at 1:15 pm", tone: "good" },
      { icon: "user", label: "Meera", value: "3rd claim in 2 months", tone: "bad" },
    ],
    handoff: [
      "Meera wrote once, on chat at 9:40 am.",
      "The OTP was entered at her door at 1:15 pm.",
      "The assistant hasn't promised a refund or a reship.",
    ],
    rec: {
      title: "Send to Priya with a note",
      confidence: "Medium",
      reasons: [
        { text: "The OTP was verified at her door.", src: "OTP" },
        { text: "The courier photo matches her address.", src: "Photo" },
        { text: "This is her 3rd claim in 2 months.", src: "Order history" },
      ],
      policy: "Suspected false claims go to your lead. Never deny the customer yourself.",
    },
    followUp: "Today, 6 pm",
    reasonTag: "Disputed delivery",
    sentiment: { label: "Angry", why: "Asks for a refund straight away" },
    tags: ["Order not received", "Refund requested", "Repeat claim"],
    history: { since: "May 2026", orders: "6", spent: "₹18,200", claims: "3 in 2 months", refunds: "2 · ₹7,300, none reversed", address: "Shared with 1 other account", risk: { level: "Review", checks: [{ text: "3rd “not received” claim on this account in 2 months", src: "Order history" }, { text: "Another account at the same address made 2 claims", src: "Address match" }, { text: "Card used here is linked to 1 chargeback", src: "Payment data" }] }, past: [["Not received, refunded", "Oct"], ["Not received, refunded", "Sep"]] },
    tasks: [{ id: "m1", text: "Update Meera by 6 pm", due: "Today, 6 pm", ai: true }],
    linked: [["Courier request", "Photo, GPS and OTP received"], ["Refund", "None"]],
    start: "decide",
    stages: {
      decide: {
        group: "first",
        nextStep: "Review flagged claim",
        timeLeft: "15 min",
        urgent: "bad",
        ai: "The proof matches her address and the OTP was entered. The signals in her customer history are worth a second look, but they don't prove anything. This needs Priya's call.",
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
        linked: [["Courier request", "Photo, GPS and OTP received"], ["Lead review", "With Priya"]],
        group: "escalated",
        nextStep: "With Priya",
        status: "Waiting on Priya (team lead) · reply promised by 6 pm tomorrow",
        options: [],
        adds: [
          { kind: "agent", who: "You", time: "Now", text: "Hi Meera, thanks for letting us know. We're checking the delivery with Delhivery and will update you by 6 pm tomorrow." },
          { kind: "event", time: "Now", text: "Sent to Priya with 3 private signals" },
        ],
      },
      asked: {
        group: "customer",
        nextStep: "Waiting on Meera",
        status: "Waiting on Meera · AI reminds her tomorrow at 10 am",
        options: [],
        adds: [{ kind: "agent", who: "You", time: "Now", text: "Hi Meera, could you check with your building's security or neighbours? The courier's record shows a delivery at 1:15 pm on Monday." }],
      },
    },
  },
  {
    id: "kavya",
    ticket: "#1045",
    customer: "Kavya Pillai",
    initials: "KP",
    item: "Cotton kurta, L",
    value: "₹1,650",
    order: "FX-48302",
    payment: "Prepaid · UPI",
    courier: "Ekart",
    headline: "Scanned delivered while the rider was 4.2 km away",
    hook: "Scanned delivered 4.2 km away. Ekart is checking.",
    summary: "Ekart scanned it delivered at 10:12 am while the rider was 4.2 km away.",
    thread: [
      { kind: "event", time: "10:12 am", text: "Ekart marked delivered" },
      { kind: "customer", channel: "chat", time: "10:30 am", text: "It says delivered but nobody came?" },
      { kind: "agent", who: "JusDesk assistant", time: "10:31 am", steps: ["Checked tracking: scanned delivered at 10:12 am", "Compared with the rider's GPS: 4.2 km away, stop 14 of 22", "Asked Ekart to confirm the delivery"], next: ["Wait for Ekart's confirmation, due 4 pm", "If Ekart hasn't confirmed by 4 pm, call the rider through the Ekart hub", "Update Kavya by 4 pm either way"], text: "It looks like the courier scanned it early: the rider was still 4.2 km away. It should reach you by this evening. I've asked Ekart to confirm and I'll update you by 4 pm." },
      { kind: "event", time: "10:31 am", text: "AI asked Ekart to confirm the delivery time", ai: true },
      { kind: "event", time: "10:31 am", text: "AI set status to Waiting on others (Ekart)", ai: true, status: "others" },
    ],
    evidence: [
      { kind: "missing", title: "Courier photo", note: "None yet: not delivered" },
      { kind: "map", title: "Rider at the scan", note: "4.2 km away, on the route", metres: 4200 },
    ],
    facts: [
      { icon: "clock", label: "Scan", value: "10:12 am, rider 4.2 km away", tone: "bad" },
      { icon: "pin", label: "Route", value: "Your address is stop 14 of 22" },
    ],
    handoff: [
      "Kavya wrote on chat at 10:30 am.",
      "The assistant already explained the early scan and asked Ekart to confirm.",
    ],
    followUp: "Today, 4 pm",
    reasonTag: "Early scan",
    sentiment: { label: "Neutral", why: "Asking, not complaining" },
    tags: ["Order not received", "Early scan"],
    history: { since: "July 2025", orders: "4", spent: "₹6,300", claims: "None", refunds: "None", address: "Same since 2025 · 3 deliveries, no issues", risk: { level: "Low", checks: [{ text: "No earlier claims or refunds", src: "Order history" }, { text: "Only her account uses this address", src: "Address match" }, { text: "No chargebacks on her UPI", src: "Payment data" }] }, past: [] },
    tasks: [{ id: "k1", text: "Take over if Ekart hasn't confirmed", due: "Today, 4 pm", ai: true }],
    linked: [["Courier request", "Asked Ekart to confirm"], ["Refund", "None"]],
    start: "waiting",
    stages: {
      waiting: {
        group: "others", by: "AI",
        nextStep: "Ekart reply due 4 pm",
        status: "Waiting on Ekart · AI checks at 4 pm, then hands to you",
        ai: "Early scan. I've told Kavya and asked Ekart. If Ekart doesn't confirm by 4 pm, it comes to you.",
        options: [{ id: "take", label: "Take over now", next: "taken" }],
        simulate: { label: "Simulate: delivered at 3:40 pm", next: "closed" },
      },
      taken: {
        group: "reply",
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
          { kind: "agent", who: "JusDesk assistant", time: "3:41 pm", steps: ["Got Ekart's confirmation: delivered at 3:40 pm", "Told Kavya and closed the follow-up"], text: "Your kurta was delivered at 3:40 pm. Sorry for the confusing update earlier!" },
        ],
      },
    },
  },
  {
    id: "vikram",
    ticket: "#1041",
    customer: "Vikram Nair",
    initials: "VN",
    item: "Graphic tee, M",
    value: "₹1,200",
    order: "FX-48155",
    payment: "Cash on delivery",
    courier: "Delhivery",
    language: "Hindi",
    headline: "Left with the society guard, customer confirmed",
    hook: "It was with the society guard. Vikram has it now.",
    summary: "Delivered to the society gate. AI found the courier's note and photo and replied in Hindi.",
    thread: [
      { kind: "event", time: "Yesterday 5:20 pm", text: "Delhivery: handed to security guard" },
      { kind: "customer", channel: "chat", time: "9:05 am", text: "Mera order delivered dikha raha hai par mujhe nahi mila.", gloss: "My order shows delivered but I didn't get it." },
      { kind: "agent", who: "JusDesk assistant", time: "9:05 am", steps: ["Read his message and replied in Hindi, the language he wrote in", "Checked tracking: delivered yesterday at 5:20 pm", "Read the courier's note: handed to the society guard", "Attached the courier's photo of the gate"], text: "Namaste Vikram ji, courier ne aapka parcel kal shaam 5:20 baje society gate par guard ko diya tha. Photo yahan hai. Kya aap guard se check kar sakte hain?", gloss: "The courier gave your parcel to the guard at the society gate yesterday at 5:20 pm. Here's the photo. Could you check with the guard?" },
      { kind: "customer", channel: "chat", time: "9:22 am", text: "Mil gaya, guard ke paas tha. Thank you!", gloss: "Got it, the guard had it. Thank you!" },
      { kind: "event", time: "9:22 am", text: "AI closed the ticket: customer confirmed", ai: true, status: "closed" },
    ],
    evidence: [
      { kind: "gate", title: "Courier photo", note: "Society gate, guard's cabin" },
      { kind: "map", title: "Rider's GPS", note: "15 m from the gate", metres: 15 },
    ],
    facts: [
      { icon: "truck", label: "Courier note", value: "Handed to security guard" },
      { icon: "card", label: "Payment", value: "Cash on delivery, collected", tone: "good" },
    ],
    handoff: [
      "Vikram wrote in Hindi on chat at 9:05 am.",
      "The AI replied in Hindi with the courier's note and photo. He confirmed at 9:22 am.",
    ],
    reasonTag: "Left with guard",
    sentiment: { label: "Happy", why: "Thanked the assistant once he had it" },
    tags: ["Order not received", "Cash on delivery"],
    history: { since: "December 2024", orders: "11", spent: "₹14,800", claims: "None", refunds: "None", address: "Same since 2024 · 10 deliveries, no issues", risk: { level: "Low", checks: [{ text: "No earlier claims or refunds", src: "Order history" }, { text: "Only his account uses this address", src: "Address match" }, { text: "Pays cash on delivery; no payment disputes", src: "Payment data" }] }, past: [["Payment issue, COD", "Jul · solved"]] },
    tasks: [],
    linked: [["Courier request", "Note and photo received"], ["Refund", "None"]],
    start: "handled",
    stages: {
      handled: {
        group: "closed", by: "AI",
        nextStep: "AI closed · customer confirmed",
        status: "Closed by AI at 9:22 am · nothing for you to do",
        ai: "Evidence was clear and no money had to move, so I handled it in Hindi. Reopen if anything looks off.",
        options: [{ id: "reopen", label: "Reopen", next: "reopened" }],
      },
      reopened: {
        group: "reply", reopened: true,
        nextStep: "Reopened by you",
        status: "Yours · reopened",
        options: [],
        adds: [{ kind: "event", time: "Now", text: "You reopened the case" }],
      },
    },
  },
];

export const STATUS: Record<Group, string> = {
  first: "First response",
  reply: "Needs reply",
  customer: "Waiting on customer",
  others: "Waiting on others",
  escalated: "Escalated",
  closed: "Closed",
};

