# P01: customer support practitioner interview

Transcript shared: 5 November 2026. Interview date: not stated.

Source: `/Users/nitish/Downloads/Customer Support Interview.md`, an English translation with unclear passages and inconsistent speaker attribution near the introduction. This synthesis uses the substantive question-and-answer section. No timestamps or screen recording were provided.

Participant is referred to as P01 here. Personal conversation, account names and unrelated details are omitted. The raw transcript has not been copied into this repository. Review participant consent and identifying details before including quotations or screenshots in a recruiter-facing artifact.

## Context and limits

P01 describes support for business accounts, including catalog changes, bugs and feature requests. They communicate with a key account manager. This differs from the assignment's consumer e-commerce delivery dispute. The interview is evidence about one reported workflow; it does not establish industry-wide behavior or refund policies.

Reported tools include HubSpot for email/chatbot queries, a WhatsApp/chat platform with Periscope AI, Atlas for internal tickets, Slack for escalation alerts, and a personal tracker. Tool names and configurations are participant-reported, not independently checked. Some features described were previously used and are no longer active.

## Findings grounded in the transcript

| Finding | Participant report | Interpretation / relevance |
|---|---|---|
| Communication work and internal resolution work are separate | Customer requests generate tasks automatically. P01 manually creates and assigns internal tickets when investigation is needed. | A conversation, assigned task and internal ticket should not automatically be treated as the same record. |
| AI already assists before the human response | AI provides a private suggestion or checks and sends a customer acknowledgment. P01 sometimes reads and replies directly because suggestions can be wrong. | Acknowledgment, suggested diagnosis and verified resolution are distinct events. |
| Classification remains reviewable | AI adds a label; P01 verifies or changes it. They describe roughly four or five categories without listing all of them. | Preserve correction. Do not invent a complete category list from this interview. |
| Deadline creation can depend on metadata | P01 says labels can populate a due date; a missing required tag can result in a missing due date. Manual entry is possible. | Missing deadline data may itself require attention; a blank deadline does not necessarily mean low urgency. |
| Assignment differs by record type | Incoming tasks can be allocated by bandwidth during working hours. P01 assigns internal tickets when creating them. | Separate automatic queue distribution from ownership of internal dependencies. |
| Replying can close the communication task before dependent work ends | P01 says replying closes the task, while internal work still requires follow-up and a later client update. | Test the distinction between response sent, internal work complete and customer informed. |
| Personal tracking compensates for fragmented visibility | P01 tracks account, work, status, point of contact and ticket reference to avoid missed follow-ups. | This is the clearest concrete workaround in the interview. Investigate what the existing views fail to show. |
| Automated follow-ups are not currently reliable/available in this account | A previous ClickUp/Claude follow-up mechanism stopped; P01 now uses the tracker. | Do not diagram the old automation as a current capability. |
| Metrics distinguish acknowledgment from human response | P01 describes P90 response time after the bot acknowledgment and escalation for late FRT. | Define exactly when clocks start and stop; bot response time is not interchangeable with human response time. |
| Sentiment analysis is not a customer rating | Chats are exported to Claude for sentiment analysis; a previous five-star feedback mechanism is no longer used. | Do not call model-inferred sentiment CSAT or treat it as direct customer feedback. |
| Customer hostility was not a reported problem here | P01 says clients are not particularly rude and communication occurs through a key account manager. | Do not claim this interview validates the emotional-abuse hypothesis from secondary research. |

## Useful excerpts

Participant-reported text as translated; verify against the original conversation before presenting as verbatim speech.

> “There isn't really a follow-up system on the ticket either.”

> “That's why I maintain my tracker, so I can follow up if the assignee misses something.”

> “The process isn't streamlined. Separate tickets come into Periscope, separate tickets are created internally, and I'm doing the follow-ups too.”

## Ambiguities to resolve

- Is the 30-minute alert triggered by an unplanned/unaccepted task, a missing human response, or an unresolved ticket? The participant first describes planning; interviewer paraphrases it as SLA completion, followed by agreement. A further alert is reported at 90 minutes. Do not turn these into confirmed resolution SLAs.
- What is the precise relationship between the chat platform, automatic task creation and Atlas? The terminology switches between task and ticket.
- Does closure-on-reply apply only to WhatsApp tasks? Email closure is described differently and the final wording is unclear.
- What begins the P90 measurement: request arrival, bot acknowledgment, assignment or another event?
- Can internal ticket completion notify the executive or customer, and which events are currently manual?
- What fields are actually missing from the existing centralized views? The interview establishes a workaround, but not an exact interface specification.

## Implications to explore, not approved decisions

1. Maintain visibility of unresolved dependencies after a reply is sent.
2. Link customer communication to the internal work, owner and next follow-up.
3. Distinguish acknowledgment, substantive response, action completion and customer notification.
4. Surface missing required metadata before it silently prevents a deadline.
5. Let executives inspect and correct AI classifications and suggestions.

Current workflow map: [diagram and evidence notes](../diagrams/current-support-workflow.md).
