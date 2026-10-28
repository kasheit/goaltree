# Goal Tree

A personal dependency-chain / goal-tree app: one top-level goal broken into
sub-goals and tasks, each with a status (done / in-progress / blocked /
to-do), connected by curved parent-child lines, with the branch currently
being worked traced in orange from the goal down to the active task.

Single-user, local-first prototype — no auth, state lives in `localStorage`.

## Design

Visual direction is the "Branching Canopy" layout: a vertical tree, root
goal at top, branches below, their tasks below that. Dark theme
(near-black `#121110` background, `#1c1a18` cards), burnt-orange accent
(`#e07b3f`) tracing the active path, soft green/red for done/blocked,
Hanken Grotesk for titles, IBM Plex Mono for status labels. Deliberately
decluttered — no grid texture, no glow effects, flat outlined `+`
add-node buttons.

## Stack

- Vite + React + TypeScript
- [React Flow](https://reactflow.dev) (`@xyflow/react`) for the node/edge
  graph — pan, zoom, click-to-add-child
- Tailwind CSS for layout utilities, custom CSS variables for the design
  tokens
- Zustand for state, persisted to `localStorage`
- PWA (`vite-plugin-pwa`) — installable, degrades to a normal tab where
  service workers aren't available

## Running it

```bash
npm install
npm run dev      # dev server
npm run build    # production build + service worker
npm run preview  # serve the production build locally
```

## Interactions

- Click a node's title to cycle its status (to-do → in-progress → done →
  blocked → …).
- Click the outlined `+` button under any node to add a child (a branch
  under the root, a task under a branch or task).
- The view re-fits automatically as nodes are added.

## Seed data

Ships pre-populated with the example from the mockup: **Launch founder
podcast**, broken into producing the pilot episode, lining up guests,
building distribution, and setting up the recording rig.

## Roadmap

Not needed for this prototype, but planned: deploy (Vercel/Netlify) with a
Supabase backend for cross-device sync, using plain HTTPS request/response
rather than WebSocket realtime so it still works on filtered school/IT
networks.
