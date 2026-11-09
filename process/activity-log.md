# Assignment activity log

What Nitish did on the assignment, what each step taught him, and where the evidence is. This records the process; the design decisions themselves live in [decisions/](../decisions/README.md).

Figma: [Juspay Assignment, Nitish Bhardwaj](https://www.figma.com/design/cfRDciFE94XNlCsyyshvrp/Juspay-Assignment---Nitish-Bhardwaj?node-id=1-27).

## 1. Research

| Activity | What it gave us | Evidence |
|---|---|---|
| Studied competitor products | Compared Zendesk with AI-native desks (Sierra, Decagon) and Plain. | [Competitors](../research/competitors.md); [competitor decision](../decisions/2026-11-04-competitor-set.md) |
| Mapped Zendesk and Plain as swimlanes | The same "delivered, not received" ticket in both desks, stage by stage. Showed that the investigation, the refund decision and refund tracking are weak in both. | [Zendesk swimlane](../research/workflow%20research/zendesk-swimlane.md); [Plain swimlane](../research/workflow%20research/plain-swimlane.md) |
| Desk research: public sources and Reddit | Pain points around gathering context, investigating deliveries, follow-ups and team oversight. Public anecdotes, not user validation. | [Desk Research](../research/Desk%20Research.md) |
| Studied AI support playbooks | Separated four AI roles: copilot help, AI-owned work, human approval and full handover. | [Playbooks](#playbooks-referenced) |
| Interviewed a support practitioner | Learned about manual follow-ups, personal tracking, internal tickets and response-time targets. The participant supports business accounts, so this informs the design but doesn't validate it for consumer delivery support. | [Interview transcript](../research/Custom%20Support%20Interview%20Transcript.md) |
| Mapped the participant's current workflow | Showed where records split, what blocks closure and what to ask next. | [Current workflow](../diagrams/current-support-workflow.md) |
| Mapped the general support lifecycle | Showed where the executive owns the work and where the AI does. | [Lifecycle maps](../diagrams/general-support-lifecycle.md) |
| Drafted personas | Support Executive from the interview and desk research. The Team Lead is assumed, because no lead was interviewed. | [Personas](../synthesis/personas.md) |

## 2. Scoping

| Activity | What it gave us | Evidence |
|---|---|---|
| Agreed the scope | One complaint ("marked delivered, not received"), five cases from simple to hard, and a dashboard-only Team Lead screen. | [Scoping the assignment](scoping-the-assignment.md); [decisions](../decisions/README.md) |

## 3. Design and prototype

| Activity | What it gave us | Evidence |
|---|---|---|
| Visual direction rounds | Compared type, structure, colour and icons against Linear, Attio and Plain. Settled on Linear's rules, Inter and a green accent. | [DESIGN.md](../DESIGN.md) |
| Executive workspace | Queue, conversation and details panel; ticket statuses; AI investigation and suggestion cards; Copilot; composer AI tools; AI follow-ups from the SLA; restrained motion. | [DESIGN.md](../DESIGN.md); [decisions](../decisions/README.md); [JusDesk workflow](../synthesis/jusdesk-workflow.md) |
| Team Lead overview | One screen: what needs the lead, patterns the AI spotted, team stats. | [/lead](https://jusdesk-theta.vercel.app/lead) |
| Figma cards for the submission | The workflow table, the AI features, the executive edge cases, the Team Lead overview and the design system. | Figma link above |

Prototype: [jusdesk-theta.vercel.app](https://jusdesk-theta.vercel.app).

## 4. Not done

- Testing the design with support executives or team leads.
- Interviewing a Team Lead.

## Playbooks referenced

- [Gorgias: control AI Agent with Guidance](https://www.gorgias.com/playbooks/chapters/automate-5)
- [Gorgias: When / If / Then guidance](https://www.gorgias.com/blog/how-to-write-guidance)
- [Aid Station: delivered but missing procedure](https://aid-station-helpcentre.gorgias.help/en-US/my-order-was-delivered-but-i-cant-find-it---what-to-do-next-1061240)
- [GitLab: manager escalation workflow](https://handbook.gitlab.com/handbook/support/workflows/escalations-support_manager/)

## How to keep this log

Add a row when work produces evidence: a file, a commit or a shared conversation. Link design choices to decisions/ instead of describing them here. Say what kind of evidence it is: desk research, interview, Nitish's interpretation or tested result. One interview is not validation.
