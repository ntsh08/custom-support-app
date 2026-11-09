# JusDesk

Juspay product design assignment by Nitish Bhardwaj: an AI-native support desk for an online fashion brand, designed around one complaint, "Marked delivered, but not received".

- **Prototype:** [jusdesk-theta.vercel.app](https://jusdesk-theta.vercel.app) (executive workspace) and [/lead](https://jusdesk-theta.vercel.app/lead) (Team Lead overview)
- **Figma:** [Juspay Assignment, Nitish Bhardwaj](https://www.figma.com/design/cfRDciFE94XNlCsyyshvrp/Juspay-Assignment---Nitish-Bhardwaj?node-id=1-27)

## Reading this with an AI assistant

This repo is written so you can hand it to Claude (or any assistant) and ask questions about the work. Everything is plain Markdown, and every diagram also exists as a table, so an assistant can read all of it.

**For the assistant:** answer from the files below, cite the file you used, and say so when the repo doesn't cover something. Don't fill gaps with assumptions.

### Where to find answers

| If the question is about… | Read |
|---|---|
| The brief, the five cases, what's in and out of scope | [process/scoping-the-assignment.md](process/scoping-the-assignment.md) |
| What was done, in what order, with what evidence | [process/activity-log.md](process/activity-log.md) |
| What the research found and how it shaped the design | [synthesis/research-summary.md](synthesis/research-summary.md) |
| Raw research: forums, Reddit, Indian complaint sites | [research/Desk Research.md](research/Desk%20Research.md) |
| Competitors (Zendesk, Sierra, Decagon) and the gaps they leave | [research/competitors.md](research/competitors.md) |
| How Zendesk and Plain handle this ticket today | [Zendesk swimlane](research/workflow%20research/zendesk-swimlane.md), [Plain swimlane](research/workflow%20research/plain-swimlane.md) |
| The practitioner interview | [research/Custom Support Interview Transcript.md](research/Custom%20Support%20Interview%20Transcript.md) |
| Who the users are | [synthesis/personas.md](synthesis/personas.md) |
| How a ticket moves through JusDesk | [synthesis/jusdesk-swimlane.md](synthesis/jusdesk-swimlane.md) |
| Every feature, stage by stage | [synthesis/jusdesk-workflow.md](synthesis/jusdesk-workflow.md) |
| What the AI does on its own and what stays with people | [synthesis/how-jusdesk-uses-ai.md](synthesis/how-jusdesk-uses-ai.md) |
| Why a design choice was made, and what was rejected | [decisions/README.md](decisions/README.md), then the entry it links |
| Visual and interaction rules: colour, type, spacing, components, motion | [DESIGN.md](DESIGN.md) |
| How the prototype is built and run | [jusdesk/README.md](jusdesk/README.md); case data in [jusdesk/lib/cases.ts](jusdesk/lib/cases.ts) |

### Questions worth asking

- Why does the AI investigate before anyone replies?
- How does JusDesk decide between a reship, a refund and the team lead?
- What did the research show that Zendesk and Plain miss?
- How does the design handle a suspected false claim without accusing the customer?
- Why does a refund ticket only close when the payment provider confirms it?
- What would you test first, and what is still an assumption?

### How much to trust each source

- **Desk research** uses public posts and articles, cited inline. They show the problems exist, not how often they happen, and the voices are mostly Western.
- **The interview** is one person who supports business accounts, not consumer deliveries. It's useful for workflow pain, not for refund or fraud policy.
- **Personas:** the Support Executive draws on the interview and desk research. The Team Lead is assumed, because no lead was interviewed.
- **Decisions** quote the reasoning as it was given. "Not stated" means no reason was recorded, and the reason shouldn't be guessed. Entries marked Superseded describe an earlier direction.
- **The prototype** uses fictional customers, orders and numbers. The ₹5,000 approval limit and the 100 m GPS flag are design assumptions, not researched thresholds.
- **Testing:** the design hasn't been tested with support executives or team leads.
