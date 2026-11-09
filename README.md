# JusDesk

An AI-native support desk, designed for the Juspay product design assignment. It's built around one complaint from an online fashion brand's customers: **"Marked delivered, but not received."**

- **Prototype:** [jusdesk-theta.vercel.app](https://jusdesk-theta.vercel.app) (executive workspace) and [/lead](https://jusdesk-theta.vercel.app/lead) (Team Lead overview)
- **Figma:** [Juspay Assignment, Nitish Bhardwaj](https://www.figma.com/design/cfRDciFE94XNlCsyyshvrp/Juspay-Assignment---Nitish-Bhardwaj?node-id=1-27)

## The idea

The AI investigates every ticket first: tracking, delivery photo, rider's GPS, OTP, stock and the customer's history. It closes the simple tickets on its own and hands the rest to an executive with its evidence and suggested next steps. The executive decides, the team lead approves anything over ₹5,000 or anything that looks like fraud, and the AI keeps following up until the customer knows the outcome.

Why this shape: existing desks automate the edges of a ticket (sorting, summarising, drafting), but the middle, where the case is won or lost, is still manual: gathering evidence, deciding who gets money, and following through until the money lands. See the [research summary](synthesis/research-summary.md).

## Start here

1. [Scoping the assignment](process/scoping-the-assignment.md): the brief, the five cases and what's out of scope
2. [Research summary](synthesis/research-summary.md): six insights and what each changed in the design
3. [JusDesk swimlane](synthesis/jusdesk-swimlane.md) and [JusDesk workflow](synthesis/jusdesk-workflow.md): how a ticket moves, and the features at each stage
4. The [prototype](https://jusdesk-theta.vercel.app)

## What's in the repo

The folders follow the order the work was done in.

| Folder | What's in it |
|---|---|
| [research/](research/) | [Desk Research](research/Desk%20Research.md) (forums, Reddit, Indian complaint sites); [competitor analysis](research/competitors.md) (Zendesk, Sierra, Decagon); [Zendesk](research/workflow%20research/zendesk-swimlane.md) and [Plain](research/workflow%20research/plain-swimlane.md) workflows as swimlanes; a practitioner [interview](research/Custom%20Support%20Interview%20Transcript.md) |
| [synthesis/](synthesis/) | [Research summary](synthesis/research-summary.md); [personas](synthesis/personas.md); the [JusDesk swimlane](synthesis/jusdesk-swimlane.md); the [JusDesk workflow](synthesis/jusdesk-workflow.md); [how JusDesk uses AI](synthesis/how-jusdesk-uses-ai.md) |
| [process/](process/) | [Scoping the assignment](process/scoping-the-assignment.md); the [activity log](process/activity-log.md): what was done and the evidence for each step |
| [decisions/](decisions/README.md) | The design decision log: why things are the way they are, with the reasons and rejected options |
| [DESIGN.md](DESIGN.md) | The design rules the app follows: colour, type, spacing, components, AI patterns, motion |
| [jusdesk/](jusdesk/) | The Next.js prototype ([how to run it](jusdesk/README.md)) |

## Limits

- One interview, with someone who supports business accounts, not consumer deliveries. No team lead was interviewed.
- The design hasn't been tested with support executives or team leads.
- All customers, orders and numbers in the prototype are fictional. The ₹5,000 limit and the 100 m GPS flag are assumptions to test.
