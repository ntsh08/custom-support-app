# Assignment activity log

What Nitish did on the assignment, what each step taught him, and where the evidence is. This records the process; the design decisions themselves live in [decisions/](../decisions/README.md).

Figma: [Juspay Assignment, Nitish Bhardwaj](https://www.figma.com/design/cfRDciFE94XNlCsyyshvrp/Juspay-Assignment---Nitish-Bhardwaj?node-id=1-27).

The assignment window was three days, 4–6 November 2026.

## 1. Research (4–5 Nov)

| Activity | Date | What it gave us | Evidence |
|---|---|---|---|
| Talked through the brief options with ChatGPT and Claude | 4 Nov | Compared the assignment options and picked the support desk. AI was a thinking aid; the choice was Nitish's. | [Scope decision](../decisions/2026-11-04-support-desk-over-finance-app.md) |
| Studied competitor products | 4 Nov | Compared Zendesk with AI-native desks (Sierra, Decagon) and Plain. | [Competitors](../research/competitors.md); [competitor decision](../decisions/2026-11-04-competitor-set.md) |
| Desk research: public sources and Reddit | 4 Nov | Pain points around gathering context, investigating deliveries, follow-ups and team oversight. Public anecdotes, not user validation. | [Desk Research](../research/Desk%20Research.md) |
| Studied AI support playbooks | Before 5 Nov | Separated four AI roles: copilot help, AI-owned work, human approval and full handover. | [Playbooks](#playbooks-referenced) |
| Interviewed a support practitioner | Transcript shared 5 Nov | Learned about manual follow-ups, personal tracking, internal tickets and response-time targets. The participant supports business accounts, so this informs the design but doesn't validate it for consumer delivery support. | [Interview transcript](../research/Custom%20Support%20Interview%20Transcript.md) |
| Mapped the participant's current workflow | 5 Nov | Showed where records split, what blocks closure and what to ask next. | [Current workflow](../diagrams/current-support-workflow.md) |
| Mapped the general support lifecycle | 5 Nov | Showed where the executive owns the work and where the AI does. | [Lifecycle maps](../diagrams/general-support-lifecycle.md) |
| Drafted personas | 5 Nov | Support Executive from the interview and desk research. The Team Lead is assumed, because no lead was interviewed. | [Personas](../research/personas.md) |

## 2. Scoping (5 Nov)

| Activity | Date | What it gave us | Evidence |
|---|---|---|---|
| Agreed the scope | 5 Nov | One complaint ("marked delivered, not received"), five cases from simple to hard, and a dashboard-only Team Lead screen. | [Scoping the assignment](scoping-the-assignment.md); six decisions dated 5 Nov |

## 3. Design and prototype

| Activity | What it gave us | Evidence |
|---|---|---|
| First visual direction and prototype | A Family-inspired, purple first version and a working Next.js prototype of all five cases. Later replaced. | Decisions marked Superseded |
| Visual direction rounds | Compared type, structure, colour and icons against Linear, Attio and Plain. Settled on Linear's rules, Inter and a green accent. | [DESIGN.md](../DESIGN.md) |
| Executive workspace | Queue, conversation and details panel; ticket statuses; AI investigation and suggestion cards; Copilot; composer AI tools; AI follow-ups from the SLA; restrained motion. | [DESIGN.md](../DESIGN.md); [decisions](../decisions/README.md); [JusDesk workflow](../decisions/jusdesk-workflow.png) |
| Team Lead overview | One screen: what needs the lead, patterns the AI spotted, team stats. | [/lead](https://jusdesk-theta.vercel.app/lead) |
| Figma cards for the submission | The workflow table, the AI features, the executive edge cases, the Team Lead overview and the design system. | Figma link above |

Prototype: [jusdesk-theta.vercel.app](https://jusdesk-theta.vercel.app).

## 4. Not done

- Testing the design with support executives or team leads.
- Interviewing a Team Lead.
- Designing the edge cases listed in [Scoping the assignment](scoping-the-assignment.md#5-edge-cases-considered-but-not-designed).

## Playbooks referenced

- [Gorgias: control AI Agent with Guidance](https://www.gorgias.com/playbooks/chapters/automate-5)
- [Gorgias: When / If / Then guidance](https://www.gorgias.com/blog/how-to-write-guidance)
- [Aid Station: delivered but missing procedure](https://aid-station-helpcentre.gorgias.help/en-US/my-order-was-delivered-but-i-cant-find-it---what-to-do-next-1061240)
- [GitLab: manager escalation workflow](https://handbook.gitlab.com/handbook/support/workflows/escalations-support_manager/)

## How to keep this log

Add a row when work produces evidence: a file, a commit or a shared conversation. Link design choices to decisions/ instead of describing them here. Say what kind of evidence it is: desk research, interview, Nitish's interpretation or tested result. One interview is not validation.
