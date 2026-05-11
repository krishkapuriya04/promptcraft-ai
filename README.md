# PromptCraft AI

**PromptCraft AI** is a production-style, full-stack **AI website builder** SaaS. It ships with a React (Vite) dashboard, Express API, MongoDB persistence, JWT authentication, AI-powered layout generation, screenshot-to-code flows, Monaco editing, exports, versioning, mock deployments, analytics, and **demo AI fallbacks** when OpenAI is not configured.

---

## Screenshots

> Add your own screenshots here after deployment (recommended: dashboard, editor, preview, analytics).

| Area | Placeholder |
|------|-------------|
| Landing / marketing | _Coming soon_ |
| AI workspace & preview | _Coming soon_ |
| Monaco editor | _Coming soon_ |
| Analytics | _Coming soon_ |

---

## Tech stack

| Layer | Technology |
|--------|------------|
| **Frontend** | React 19, Vite 8, Tailwind CSS, React Router, Framer Motion, Monaco Editor, Recharts |
| **Backend** | Node.js, Express 5, Mongoose (MongoDB), Helmet, CORS, express-rate-limit |
| **Auth** | JWT (Bearer), bcrypt password hashing |
| **AI** | OpenAI (optional); **demo templates** for website + screenshot generation when no valid key |
| **Assets** | Multer + Sharp for uploads; JSZip for exports |

---

## Features

- **JWT authentication** — Sign up, sign in, forgot-password UI, protected routes, session handling.
- **AI website generator** — Prompt + category + theme → React + Tailwind component string, live iframe preview.
- **Demo AI fallback** — Missing or invalid `OPENAI_API_KEY` uses curated templates (gym, SaaS, restaurant, portfolio, ecommerce).
- **Screenshot to code** — Upload UI screenshot; vision API when configured, **demo screenshot inference** otherwise (filename + dimensions → template).
- **Monaco editor** — Multi-file workspace, checkpoints, optimization hooks, export.
- **Project management** — CRUD, filters, favorites, duplicate, grid/table views.
- **Analytics dashboard** — Activity aggregation and charts.
- **Responsive preview** — Device modes, isolated iframe preview with Babel + Tailwind CDN.
- **Production hardening** — Env validation, safe errors in prod, upload sanitization, CORS dev allowances, SEO helpers, error boundary, offline banner (see `docs/`).

---

## Repository layout

```text
promptcraft-ai/
├── frontend/          # Vite + React + Tailwind SPA
├── backend/           # Express API + Mongoose models
├── docs/              # Architecture, API overview, deployment checklist
├── README.md
└── .gitignore
```

---

## Prerequisites

- **Node.js** 20+ (recommended)
- **MongoDB** 6+ (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **OpenAI API key** (optional — enables live AI; omit for **demo mode**)

---

## Environment variables

Copy examples and adjust **never commit** real `.env` files.

### Backend (`backend/.env` from `backend/.env.example`)

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | `development` or `production` |
| `PORT` | API port (default `5000`) |
| `CLIENT_URL` | Exact SPA origin for CORS (e.g. `http://localhost:5173`) |
| `MONGODB_URI` | Mongo connection string |
| `JWT_SECRET` | Strong secret; **32+ chars** required in production |
| `JWT_EXPIRES_IN` | e.g. `7d` |
| `OPENAI_API_KEY` | Optional — demo generation if missing/invalid |
| `OPENAI_MODEL` | e.g. `gpt-4.1-mini` |
| `TRUST_PROXY` | Set `1` behind a reverse proxy |

### Frontend (`frontend/.env` from `frontend/.env.example`)

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API base including `/api`, e.g. `http://localhost:5000/api` |

---

## Local setup

```bash
git clone https://github.com/krishkapuriya04/promptcraft-ai.git
cd promptcraft-ai

# Backend
cd backend
npm install
cp .env.example .env
# Edit .env — set MONGODB_URI, JWT_SECRET, CLIENT_URL, optional OPENAI_API_KEY

# Frontend
cd ../frontend
npm install
cp .env.example .env
# Set VITE_API_BASE_URL to match your API (e.g. http://localhost:5000/api)
```

Start MongoDB, then:

```bash
# Terminal 1 — API
cd backend && npm run dev

# Terminal 2 — SPA
cd frontend && npm run dev
```

- **API health:** `GET http://localhost:5000/health`  
- **API root:** `http://localhost:5000/api`  
- **SPA:** `http://localhost:5173` (or your Vite port)

### Quality checks

```bash
cd frontend && npm run lint && npm run build
```

---

## Deployment

### Backend

1. Set production environment variables on your host (or platform secret store).
2. Run `npm install` and `npm start` (or use **PM2**, **systemd**, or your PaaS start command).
3. Ensure `CLIENT_URL` matches the deployed SPA URL; set `TRUST_PROXY=1` if behind nginx/ALB.
4. Use MongoDB Atlas or a managed cluster; restrict network access to the API.

### Frontend

1. Set `VITE_API_BASE_URL` to your public API URL (e.g. `https://api.yourdomain.com/api`).
2. `npm run build` → deploy the `frontend/dist` folder to **Vercel**, **Netlify**, **S3+CloudFront**, or any static host over **HTTPS**.
3. Update `frontend/public/robots.txt` and `sitemap.xml` with your production domain when going public.

See **`docs/DEPLOYMENT_CHECKLIST.md`** for a full go-live checklist.

---

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [API overview](docs/API_OVERVIEW.md)
- [Deployment checklist](docs/DEPLOYMENT_CHECKLIST.md)

---

## License

See repository license file if present; otherwise default to project terms you define for public use.

---

## Author

Maintained by **[@krishkapuriya04](https://github.com/krishkapuriya04)** — [promptcraft-ai](https://github.com/krishkapuriya04/promptcraft-ai).
