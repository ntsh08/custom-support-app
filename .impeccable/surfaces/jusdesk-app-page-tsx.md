---
version: 1
slug: "jusdesk-app-page-tsx"
primary_target: "jusdesk/app/page.tsx"
related_targets: []
---

# Executive workspace

Scope: the support executive's working screen in JusDesk (queue, case, decision, after-states) for "delivered, not received" cases. Mode: Operate. Team lead dashboard is a separate surface.

Audience and job: a support executive working a queue all day; decide from evidence in about a minute and keep each case moving until the customer has the outcome. Must not feel like a generic helpdesk skin, AI as decoration, or a dashboard of tiles.

Content: the five agreed cases (process/assignment-task.md) with fictional, labelled data; evidence images are drawn illustrations labelled as such.

## Direction contract

THESIS: Every case is read as one contradiction and resolved from evidence: the courier's story beside the customer's, the deciding proof in between. Refuses the helpdesk default of ticket fields, a side panel of AI cards and badges on every row.

OWN-WORLD: White work surface on a cool grey queue column; a deep ink-purple rail (#1B1235) as the shell; purple #7040F5 only on the one primary action, selection and a small "AI" tag. Inter throughout, tabular numerals, hairline dividers, pills for actions, 14-20px radii, no cards inside cards, no eyebrow labels.

STORY: The executive sees what needs them first, opens a case, reads the customer in their own words on the left and the evidence on the right, takes the action AI proposes or another, confirms it inline, and sees who owns the next step and when it gets checked.

FIRST VIEWPORT: Rail 64px; queue list 300px always visible, grouped Needs me / Waiting / With lead / Handled by AI, each row naming the next step and time left; case header across the work area with the contradiction as the headline; conversation left (merged chat and email, bot handover marked, AI-drafted reply in the composer); evidence right (two door photos and the GPS map as one strip, then facts, one AI line, decision bar at the foot).

FORM: Conversation beside evidence, position 7 of 7 on the ordered list, with the queue made a permanent left list on the user's steer. seed:ee7c8906c7c5b954

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
