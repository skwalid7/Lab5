<img width="1109" height="577" alt="Server" src="https://github.com/user-attachments/assets/321bc593-0500-438c-8d00-9b849c4c5e8c" />

# TaskFlow

A modern, responsive todo list dashboard — organize your day, one task at a time.

TaskFlow is a client-side task manager built with React and Vite. It keeps your data in the browser, works offline after the first load, and adapts from a 320px phone to a wide desktop screen.

<!-- Replace with your own screenshots if you want to show them here -->

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Data & persistence](#data--persistence)
- [Design system](#design-system)
- [Accessibility](#accessibility)
- [Verification](#verification)
- [Deploying](#deploying)
- [Troubleshooting](#troubleshooting)

---

## Features

### Task management

| Action | How it works |
| --- | --- |
| **Add** | Type in the field and press `Enter` or click **Add Task**. Empty/whitespace-only input is rejected with an error toast. The input clears automatically after a successful add. |
| **Complete / reactivate** | Click the checkbox. Completed tasks get a checkmark, a line-through title, muted text and an emerald-tinted row. Click again to reactivate. |
| **Edit** | Click the pencil icon to edit in place. Press `Enter` or **Save** to commit, `Escape` or **Cancel** to discard. Empty titles are rejected. |
| **Delete** | Click the trash icon — the task disappears immediately and the statistics update. |
| **Clear completed** | The footer button removes every completed task at once. It is disabled (and dimmed) when there is nothing to clear. |

### Dashboard

- **Three live statistic cards** — Total Tasks, Completed Tasks and Remaining Tasks. Every number is derived from the task list with `useMemo`, so nothing can drift out of sync.
- **Three filters** — `All`, `Active` and `Completed`, each with its own live count badge. The active filter is highlighted with a dark pill.
- **Empty states** — a distinct message for "no tasks yet", "all caught up" and "nothing completed yet".
- **Timestamps** — every task shows when it was created (e.g. `Today, 09:52 AM`, `Yesterday, 18:04`, `Mar 3, 08:15`).

### Notifications

React Toastify powers the feedback layer — `top-right` position, 2500 ms auto-close, light theme, dismiss on click, pause on hover, draggable.

| Event | Toast |
| --- | --- |
| Task added | Success |
| Task updated | Success |
| Task completed | Success |
| Task marked as active | Info |
| Task deleted | Info |
| Completed tasks cleared | Success |
| Empty task title | Error |
| Nothing to clear | Warning |

### Persistence & resilience

- Tasks are written to `localStorage` on every change and restored on page load.
- Missing, malformed or corrupted `localStorage` payloads are validated field-by-field and safely discarded instead of crashing the app.
- If the browser blocks storage (private mode, quota exceeded), the app keeps working in memory.

---

## Tech stack

| Package | Version | Purpose |
| --- | --- | --- |
| `react` / `react-dom` | 19.3 | UI runtime (hooks only, no class components) |
| `vite` | 8.3 | Dev server, bundler and build tooling |
| `@vitejs/plugin-react` | 6.1 | Fast Refresh + JSX transform |
| `tailwindcss` | 4.3 | Utility-first styling via the `@tailwindcss/vite` plugin |
| `react-icons` | 5.7 | Lucide icon set |
| `react-toastify` | 11.2 | Toast notifications |
| `eslint` | 10.13 | Linting (flat config, `eslint-plugin-react-hooks`) |

JavaScript (ES6+) with JSX only — **no TypeScript**, no state-management library, no UI framework, no backend.

---

## Quick start

Requires Node.js 20.19+ (or 22.12+) and npm 10+.

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`) and hot-reloads on every change.

---

## Available scripts

```bash
npm run dev      # start the Vite dev server with hot module reloading
npm run build    # type-check-free production build into dist/
npm run preview  # serve the production build locally to verify it
npm run lint     # run ESLint across the project
```

---

## Project structure

```text
todo-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                 # static assets bundled by Vite
│   ├── components/
│   │   ├── Header.jsx          # logo, name, tagline, today's date
│   │   ├── TodoStats.jsx       # total / completed / remaining cards
│   │   ├── TodoForm.jsx        # input + Add Task button (Enter to submit)
│   │   ├── TodoFilters.jsx     # All / Active / Completed with counts
│   │   ├── TodoList.jsx        # maps tasks, falls back to the empty state
│   │   ├── TodoItem.jsx        # checkbox, inline edit, delete, timestamp
│   │   ├── TodoFooter.jsx      # remaining count, Clear Completed, motivation
│   │   └── EmptyState.jsx      # per-filter empty messaging
│   ├── hooks/
│   │   └── useTodos.jsx        # task state, actions, derived stats
│   ├── utils/
│   │   ├── storage.js          # localStorage read/write + validation
│   │   ├── date.js             # "Today, 09:52 AM" formatting helpers
│   │   └── tasks.js            # filter constants + filtering logic
│   ├── App.jsx                 # layout composition + ToastContainer
│   ├── main.jsx                # React entry point (StrictMode)
│   └── index.css               # Tailwind import, theme tokens, base styles
├── index.html                  # fonts, meta tags, page title
├── eslint.config.js
├── vite.config.js
└── package.json
```

---

## How it works

### The `useTodos` hook

`src/hooks/useTodos.jsx` is the single source of truth for task data. It owns the state and exposes a stable set of actions:

```js
const { tasks, stats, addTask, toggleTask, updateTask, deleteTask, clearCompleted } = useTodos();
```

- The state is initialised lazily from `localStorage` (`useState(() => loadTasks())`), so the storage read happens once, not on every render.
- A `useEffect` mirrors every state change back to `localStorage`.
- A ref keeps the latest tasks available to the callbacks, which means `addTask`, `toggleTask`, `updateTask`, `deleteTask` and `clearCompleted` keep a **stable identity** across renders and never re-create their dependents.
- Mutations use the functional `setTasks(previous => …)` form, so rapid updates never read stale state.
- `stats` is computed with `useMemo` from the task array — there is no duplicated counter state that could get out of sync.
- Every action returns a boolean (`true` on success, `false` on validation failure) so the UI can react, e.g. the edit form only closes when the save succeeded.

### Component flow

```text
App
├── Header
├── main
│   ├── TodoStats      ← stats
│   ├── TodoForm       ← onAdd
│   ├── TodoFilters    ← filter, counts
│   ├── TodoList       ← visible tasks
│   │   ├── TodoItem
│   │   └── EmptyState
│   └── TodoFooter     ← onClearCompleted
└── ToastContainer
```

`App.jsx` holds only presentational state (the current filter). Everything task-related lives in the hook, so the components stay reusable and dumb.

### Filtering

`src/utils/tasks.js` exports the `FILTERS` constants and a pure `filterTasks(tasks, filter)` function. The visible list is memoized in `App.jsx`:

```js
const visibleTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
```

---

## Data & persistence

- **Storage key:** `taskflow.todos`
- **Format:** a JSON array of task objects

```json
[
  {
    "id": "b2f6d0f4-2a0e-4b25-9a2e-6a1c0f9b7f31",
    "title": "Design the dashboard layout",
    "completed": true,
    "createdAt": 1793290320000
  }
]
```

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | `crypto.randomUUID()` with a timestamp/random fallback. Used as the React key. |
| `title` | `string` | Trimmed, non-empty, max 200 characters. |
| `completed` | `boolean` | `false` for new tasks. |
| `createdAt` | `number` | Unix timestamp in milliseconds. |

`loadTasks()` parses the payload defensively: anything that is not an array, and any entry that is not a valid task object, is filtered out. A parse error returns an empty list rather than throwing, so a corrupted entry can never white-screen the app.

To reset your data, clear the site data for `localhost` in the browser, or run this in DevTools:

```js
localStorage.removeItem("taskflow.todos");
location.reload();
```

---

## Design system

- **Palette** — slate neutrals for surfaces, an indigo → violet → fuchsia gradient for accents, emerald for completion, amber for pending work.
- **Typography** — `Plus Jakarta Sans` for display headings and numbers, `Inter` for body text. Both load from Google Fonts with a system-font fallback, so the app still renders correctly offline.
- **Shape** — 16–24px radii, layered soft shadows, blurred gradient blobs behind the glassy main card.
- **Motion** — subtle hover lifts, a fade-up entrance on list items, and smooth colour transitions on every interactive element.

Tailwind v4 theme tokens live in `src/index.css` under `@theme`:

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, …;
  --font-display: "Plus Jakarta Sans", "Inter", …;
  --color-brand-50 … --color-brand-700;
  --animate-fade-up: fade-up 0.35s ease-out both;
}
```

---

## Accessibility

- Every control has an accessible name (`aria-label` on icon-only buttons, labelled inputs).
- The filter buttons expose `aria-pressed` to communicate the selected state.
- The task list uses real `<input type="checkbox">` elements (visually hidden, restyled) instead of clickable divs.
- Visible focus rings are preserved on all interactive elements via `focus-visible:` utilities.
- Decorative icons are hidden from assistive technology where they duplicate adjacent text.

---

## Verification

The project was verified end-to-end with headless Chrome driven over the DevTools Protocol — 44 automated checks covering the initial render, adding tasks (including whitespace-only rejection), completing and reactivating, inline editing and empty-title rejection, deleting, all three filters and their counts, clearing completed tasks, persistence across a refresh, recovery from corrupted `localStorage`, toast presence for every scenario, zero console errors, and responsive layout at 390px and 1440px with no horizontal overflow.

The same suite passes against both the dev server and the production preview build:

```bash
npm run lint
npm run build
npm run preview
```

---

## Deploying

The build output in `dist/` is fully static — any static host works (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, nginx).

```bash
npm run build
# publish the dist/ directory
```

Because there is no backend, everything runs in the visitor's browser and data never leaves the device. Note that `localStorage` is scoped per origin, so a task list created on one domain will not appear on another.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm run dev` fails with a port error | Another process owns the port — run `npm run dev -- --port 5174`. |
| Styles look unstyled | Tailwind is loaded through the Vite plugin; make sure `@tailwindcss/vite` is in `vite.config.js` and `@import "tailwindcss"` is the first line of `src/index.css`. |
| Tasks disappear after clearing site data | Expected — the list lives only in `localStorage`. |
| Fonts fall back to a system font | Google Fonts is unreachable; the app is designed to degrade gracefully. |
| `npm run build` fails on JSX in a `.js` file | JSX is only allowed in `.jsx` files — this is why the hook is `useTodos.jsx`. |

---

<div align="center">

**TaskFlow** — organize your day, one task at a time.

</div>
=======
# Lab5
>>>>>>> 75320ad6e92693d0511e1c2ab803c76974fec768
