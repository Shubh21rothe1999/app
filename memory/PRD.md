# Shubham Rothe — Data Engineer Portfolio (PRD)

## Original Problem Statement
Build a multi-page Data Engineer portfolio for Shubham Rothe (4+ yrs) targeted at recruiters / hiring managers. Free-tier deployable. Must include: live experience counter, dark/light theme, AI chatbot (Gemini 3 Flash, resume-only answers), 3 detailed projects, resume download + preview, contact form, recruiter-friendly premium UI.

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn/ui + framer-motion. Single-page React Router app with 6 routes.
- **Backend (Emergent dev)**: FastAPI + emergentintegrations + Gemini 3 Flash + MongoDB (contact messages only).
- **Vercel deploy stack**: Static React build + `api/chat.js` (Node.js serverless function calling Gemini directly via Google AI Studio key) + mailto contact form. No DB on production.

## Personas
- **Recruiter / Hiring manager**: scans portfolio in <2 min, expects resume + chatbot Q&A + clear project depth.
- **Senior engineer reviewer**: drills into Experience page bullets and tech stack.

## Core requirements (static)
1. Hero with name, title, live experience counter (years/months/days since 2022-07-04).
2. Dark + Light theme toggle (persisted).
3. AI chatbot ("DE Career Assistant") restricted to resume content.
4. 3 detailed projects: Servicer Data Onboarding/Medallion, US Banking, Mutual Fund Automation.
5. Resume PDF preview + download.
6. Contact form (mailto-based, no DB on prod).
7. Mobile responsive, animated, recruiter-friendly aesthetic.
8. 100% free deploy (Vercel + Google AI Studio Gemini key + mailto).

## Implemented (2025-12)
- All 6 pages (Home, About, Experience, Projects, Resume, Contact).
- FastAPI backend with `/api/health`, `/api/chat` (Gemini 3 Flash), `/api/contact`.
- Vercel serverless function `/api/chat.js` (Node.js, Gemini direct API).
- `vercel.json` + `DEPLOYMENT.md` deployment guide.
- Live experience counter, dark/light toggle, framer-motion animations.
- Chatbot with floating widget, suggestions, out-of-scope detection → Contact CTA.
- Testing: 100% backend (8/8 pytest), 100% frontend (11/11 Playwright scenarios).

## Backlog
- P1: Set up actual Vercel deployment (user action).
- P2: Add Google Analytics / Plausible for visitor tracking.
- P2: Add a downloadable PDF certificate showcase (DP-203 etc).
- P3: Add testimonials section.
