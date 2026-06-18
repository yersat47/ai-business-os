# AI Business OS

AI-powered Decision Intelligence Platform for SMB companies. Next.js 15 (App Router) + TypeScript + Tailwind frontend.

## Cursor Cloud specific instructions

### Repository layout caveat (important)
- The `main` branch is essentially empty (only `.gitattributes`). The actual application lives on `cursor/*` feature branches. If `/workspace` has no `package.json`, you are on `main` (or a stale branch) — check out a feature branch with the app before doing setup/run work.
- Because of this, the startup update script guards on `package.json` existing before running `npm install`.

### Stack & how to run
- Standard Next.js 15 app using **npm** (`package-lock.json`). Node 22 / npm 10 work fine.
- This is a **self-contained frontend with mock data** (Zustand stores) — no database, backend services, or environment variables are required to run or demo it.
- Commands are the standard ones in `README.md` / `package.json` scripts: `npm run dev` (dev server on port 3000), `npm run build`, `npm run start`, `npm run lint`.
- Routing is locale-prefixed via `next-intl` middleware: `/` redirects (HTTP 307) to a locale. Use `/en`, `/ru`, or `/kk` directly (e.g. `http://localhost:3000/en`).

### Optional AI chat
- Some branches add an AI chat / Claude integration that reads `ANTHROPIC_API_KEY` from `.env.local`. It is optional — without the key those routes return 503 and the rest of the app (mock data) works normally. `.env*` is gitignored.

### Demo flow (hello-world)
- Landing (`/en`) → Create account (any email/password) → Create company → complete the onboarding wizard → Dashboard. No invite/credentials needed; everything is mock data.
