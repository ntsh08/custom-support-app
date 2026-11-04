# Support lifecycle explorer

Open `index.html` in a browser. Expand a stage to see its underlying questions and switch between executive-owned and AI-owned work. The page is a conceptual research explainer, not the support application's proposed interface.

- `source.html`: editable content, styles and interactions.
- `index.html`: standalone browser page generated from the source.

To regenerate after editing, use the installed visualization renderer:

```sh
python3 /Users/nitish/.codex/plugins/cache/openai-bundled/visualize/1.0.66/skills/visualize/scripts/render.py source.html index.html --title 'Support lifecycle explorer' --force
```

Run this command from this directory. The renderer supplies standalone styles and fallback interaction-state handling. The page makes no application API calls; optional shared UI libraries reference public CDNs.

Verified: stage expansion and ownership switching in a browser on 5 November 2026. Conceptual statements and interview-derived findings remain labeled separately. No approved product decision is implied.
