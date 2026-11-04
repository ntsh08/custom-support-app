# Design scope proposal

Status: agent recommendation for Nitish to review; not an approved design decision. Created 5 November 2026.

## Product direction

A desktop workspace that helps an executive investigate, resolve and follow up on customer issues while AI gathers context and performs permitted work. The general lifecycle supports several issue types, but the assignment's detailed demonstration remains the required delivered-but-not-received scenario.

Recommended design emphasis: one coherent executive-owned experience, with AI assistance and a contextual handoff from prior automation. Map the AI-owned model to understand the system, without designing a second complete product or configuration interface.

Why proposed: the brief asks an executive to pick up, investigate, resolve and close a ticket. The practitioner interview suggests that continuity across communication, internal work and follow-up is worth exploring. It does not validate consumer refund rules.

## One scenario to design in depth

Proposed fictional case: a single prepaid domestic order is marked delivered. The customer says it is missing, and the delivery photo appears inconsistent with their entrance. AI has gathered the order, conversation and available delivery evidence but cannot settle the contradiction. An executive takes the case, investigates, requests missing courier information, and proposes a permitted refund to the original payment method. A lead reviews the exception if the assumed merchant policy requires it.

The design should show pending execution and a confirmed action result as distinct states. Do not show money credited to a bank unless the system actually has evidence of credit. The case's closure criteria must specify which outcome the merchant can verify and how remaining payment follow-up stays owned.

This is a fictional design fixture, not a reported interview incident. Country, payment rail, order value, policy thresholds, integration access and courier timing are assumptions to specify before high-fidelity copy. Do not imply every courier exposes photo, GPS or OTP evidence.

## Branches and level of detail

| Branch | Treatment | What it demonstrates |
|---|---|---|
| Contradictory evidence and missing courier information | Main investigation path | Facts vs customer report vs AI interpretation; next action and persistent ownership |
| Resolution permitted after investigation | Main completion path | Visible policy basis, executive review, verified execution and customer update |
| Approval required | One review state plus the lead's intervention | Permission boundary, reason for decision, return to the executive |
| Action fails or result is unknown | One recovery state | Check whether the refund was already created before retrying; preserve case context and follow-up |
| Customer prefers replacement | Annotated alternative only | Same resolution framework can support another action without adding a second full flow |
| Duplicate contact or customer returns | Annotation only | Find existing case and retain unresolved work; no full merge interface |
| Customer supplies new conflicting evidence | Annotation only | Reassess the plan and supersede stale recommendations |

## Other missing-delivery cases considered

| Case | Scope recommendation |
|---|---|
| Premature delivery scan; item arrives later | Acknowledge as a possible explanation, no separate designed journey |
| Delivered to neighbour/reception or wrong address | Cover through evidence interpretation, not additional complete scenarios |
| Theft after a correct delivery | Mention as a policy-dependent branch; do not resolve by assumption |
| OTP/signature dispute | Indicate contradictory evidence could exist; no separate OTP investigation flow |
| Multi-parcel order or partial delivery | Exclude from detailed design |
| Repeat claims or suspected fraud | Do not design a fraud classifier, automatic denial or account-ban flow |
| COD, wallet and cross-border refund differences | Note dependencies on payment mode and jurisdiction; exclude full alternate flows |
| Courier unavailable or investigation delayed | Covered by the main waiting/follow-up state |

These are scenario categories to consider, not estimates of frequency or validated merchant policies.

## Screens and states to start with

1. **Executive queue:** assigned cases, priority, next action, ownership and waiting state. A few other issue labels can demonstrate the broader product, without detailed flows.
2. **Case workspace:** conversation, order/payment context, source evidence, AI summary and proposed next action. Show the handoff from automation as context in this workspace.
3. **Investigation pending state:** courier/internal dependency, owner, requested information, next update and customer communication.
4. **Resolution review:** proposed action, reason/policy, amount/destination when relevant, and any approval requirement.
5. **Action result:** pending, verified success and one failure/unknown variant; then customer update and closure criteria.
6. **Team Lead overview:** operation health plus actionable cases: approval requests, overdue dependencies and failed AI/workflow actions. Include enough volume/response-time context to explain performance, and access to the relevant case for intervention.

These are six design surfaces/states, not necessarily six routes or separate full screens. Reuse the case workspace for investigation, approvals and execution results. Resolve the layout in low fidelity before committing to a panel structure.

## Explicitly excluded from detailed design

- Full flows for cancellations, returns, damaged goods, payment failures and product questions.
- Separate full AI-owned and executive-owned workspaces.
- Bot builder, prompt editor, policy authoring, integration setup or knowledge-base administration.
- Workforce scheduling, deep analytics, automated agent performance ratings or sentiment-based scoring.
- Customer-facing mobile app, full chat experience, courier portal and accounting dashboard.
- Backend architecture, fraud engine or claim that every external system is connected.

These can appear as context or dependencies where necessary; the assignment does not need their complete interfaces.

## Next work

1. Nitish reviews this proposal and chooses any scope adjustments.
2. Set explicit fictional merchant assumptions: evidence availability, resolution policy, approval authority and what counts as verified completion.
3. Create a short scene-by-scene storyboard and low-fidelity executive queue/workspace.
4. Add the waiting, approval and action-failure variants before visual polish.
5. Build the Team Lead overview around the same cases and events.
6. Walk through the flow to check whether the executive can find evidence, choose an action, recover and close responsibly.

## Proposed decision summary for review

Proposed choice: design the executive-owned missing-delivery journey in depth; map both AI ownership models; include evidence/waiting, one approval branch and one action-failure recovery; annotate other variants.

Proposed rationale (agent recommendation): meet the given executive-workflow brief and leave time for interaction and visual quality while addressing continuity and follow-up risks suggested by research. Nitish's own rationale and acceptance have not yet been recorded. This proposal does not supersede the active choice of the support-desk brief.
