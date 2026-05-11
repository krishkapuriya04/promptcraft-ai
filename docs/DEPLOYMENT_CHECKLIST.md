# Production deployment checklist

Use this before pointing a public domain at PromptCraft AI.

## Environment

- [ ] Set `NODE_ENV=production` on the API host.
- [ ] Generate a strong `JWT_SECRET` (32+ characters) and rotate it if compromised.
- [ ] Set `CLIENT_URL` to the exact browser origin of the SPA (scheme + host + port if non-default).
- [ ] Set `MONGODB_URI` to a managed cluster with auth and TLS.
- [ ] Set `OPENAI_API_KEY` and review `OPENAI_MODEL` for cost and capability.
- [ ] Set `TRUST_PROXY=1` when the API sits behind a reverse proxy (needed for accurate rate limiting and IPs).

## Frontend build

- [ ] `VITE_API_BASE_URL` points to the public API base (e.g. `https://api.example.com/api`).
- [ ] Run `npm run build` in `frontend/` and host the `dist/` folder over HTTPS.
- [ ] Replace placeholder URLs in `frontend/public/robots.txt` and `frontend/public/sitemap.xml`.
- [ ] Confirm `SEOHeadManager` titles and Open Graph previews for main routes.

## Backend build

- [ ] Run `npm start` (or your process manager) with validated env; confirm `/health` returns 200.
- [ ] Confirm CORS only allows your SPA origin.
- [ ] Upload routes: confirm max body size and screenshot MIME allowlist meet product needs.

## Security & operations

- [ ] Enable HTTPS everywhere; never ship JWTs over plain HTTP in production.
- [ ] Restrict MongoDB network access to the API subnet.
- [ ] Set up log aggregation; avoid logging tokens, cookies, or full request bodies.
- [ ] Backups and restore drills for MongoDB.

## Smoke tests

- [ ] Sign up, log in, create project, open editor, export ZIP.
- [ ] Offline banner appears when disconnecting network; recovery after reconnect.
- [ ] Modal Escape closes and focus returns to the triggering control.
