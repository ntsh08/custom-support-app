# JusDesk prototype

Next.js 15 prototype of the executive workspace (`/`) and the Team Lead overview (`/lead`). All data is fictional and lives in `lib/cases.ts`. Design rules: [../DESIGN.md](../DESIGN.md).

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things are

- `components/Workspace.tsx`: queue, conversation, composer and right panel
- `components/Lead.tsx`: Team Lead overview
- `lib/cases.ts`: the five cases
- `app/globals.css`: all styles and tokens

Live: [jusdesk-theta.vercel.app](https://jusdesk-theta.vercel.app)
