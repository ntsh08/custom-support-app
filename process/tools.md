# Tools and AI skills used

What Nitish used to research, design, build and document JusDesk, and what each tool was for.

## Main tools

| Tool | What it was used for |
|---|---|
| **Claude Code** (Claude desktop app, Code tab) | The main working partner: research, writing, building the prototype, editing Figma through its connector, and keeping this repo. Nitish directed the work and made every design call; Claude Code proposed options and did the execution. |
| **Figma** | The submission file: research boards, swimlanes, personas, the JusDesk workflow, the AI callout cards, the executive and Team Lead screens, and the design system card. |
| **Wispr Flow** | Voice dictation: most instructions to Claude were spoken, not typed. |
| **Mobbin** | Screens and flows from real products (Zendesk, Plain, Linear, Intercom, Gorgias, Family and others) used as references. |
| **GitHub** | This repository: the docs, the decision log and the prototype's code. |
| **Vercel** | Hosting for the prototype at [jusdesk-theta.vercel.app](https://jusdesk-theta.vercel.app). |

## How Claude Code connected to them

| Connector or tool | Used for |
|---|---|
| Figma connector (MCP) | Reading and editing the Figma file directly: building the swimlanes, the workflow and AI tables and the callout cards, uploading screenshots, and exporting the diagrams in this repo as images. |
| Mobbin connector (MCP) | Searching Mobbin screens and flows while picking references, such as Linear's modals and Plain's queue. |
| Built-in browser | Checking the prototype while it was built: layout, motion, and screenshots for review. |
| Headless Chrome | Clean screenshots of the prototype for the Figma cards. |
| Web search | Desk research: forums, Reddit, Hacker News, Indian complaint sites and product documentation. |
| Subagents | Running research tasks in parallel, such as competitor documentation and the Reddit pass. |
| Vercel CLI and git | Deploying the prototype, and committing and pushing every change. |

## Skills

Skills are packaged instructions Claude Code loads for a specific kind of task.

| Skill | What it did here |
|---|---|
| **design-decisions** (this project's own skill, in `.claude/skills/`) | Kept the [decision log](../decisions/README.md): one entry per decision, Nitish's reasons in his words, "Not stated" when no reason was given, never an invented one. |
| **figma-use** | The rules for editing Figma through the connector: fonts, auto layout, variables and safe edits. |
| **figma-generate-design** | Building the screens and cards in Figma from the JusDesk variables and text styles instead of hard-coded values. |
| **figma-generate-library** | Setting up the JusDesk variables and text styles in Figma for the design system card. |
| **find-animation-opportunities** (from Emil Kowalski's motion skills) | Finding where the prototype should animate: menus, button presses, the Reply / Internal note switch, the AI tools appearing. |
| **dataviz** | The "not received tickets per hour" chart on the Team Lead page. |
| **impeccable** | An early polish review of the first prototype. Removed afterwards, along with the design notes it wrote. |

## The prototype's stack

- Next.js 15, React 19 and TypeScript
- Plain CSS, with design tokens in `jusdesk/app/globals.css`
- Inter for type and Hugeicons for icons

## What the AI didn't do

The AI didn't make the design decisions: Nitish chose the scope, the cases, the directions and every trade-off, and his reasons are recorded in the decision log. It also wasn't used as a research participant: the interview was with a real support practitioner, and the desk research quotes real public posts.
