# API overview

Base path: `/api` (see `backend/src/routes/index.js`).

## Auth

| Method | Path | Notes |
|--------|------|--------|
| POST | `/api/auth/signup` | Creates user, returns token payload per controller |
| POST | `/api/auth/login` | Issues JWT |
| GET | `/api/auth/profile` | Bearer required |

## Projects & workspace

| Method | Path | Notes |
|--------|------|--------|
| POST | `/api/projects` | Create |
| GET | `/api/projects` | List with filters |
| GET | `/api/projects/:id` | Detail |

Additional nested routes cover preview assets, editor file payloads, exports, optimizations, versioning, screenshots, and mock deployments — each grouped under `backend/src/routes/`.

## Analytics

| Method | Path | Notes |
|--------|------|--------|
| GET | `/api/analytics/summary` | Aggregated activity (authenticated) |

## Health

| Method | Path | Notes |
|--------|------|--------|
| GET | `/health` | Liveness probe (no `/api` prefix) |

Errors return JSON: `{ success: false, code, message }`. In production, `message` is sanitized for unexpected failures.
