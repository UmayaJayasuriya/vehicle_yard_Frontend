# VEHICLE_YARD Deploy (Render)

This repo is configured to deploy both backend and frontend on Render via a single blueprint.

## Services
- Backend: Node + Express + Prisma (PostgreSQL)
- Frontend: React + Vite (static site)

## One-Click Deploy
1. Push this repo to GitHub.
2. In Render, choose "New +" → "Blueprint" → connect the repo.
3. When prompted, add secrets:
   - `DATABASE_URL`: your Postgres connection string (e.g., from Aiven/Neon/Railway).
   - `VITE_API_URL`: the backend URL (set after backend deploy, e.g., `https://vehicle-yard-backend.onrender.com`).
4. Deploy. Backend builds, runs migrations, then starts; Frontend builds and serves `dist/`.

## Manual Deploy (without blueprint)
### Backend (Web Service)
- Root Directory: `backend`
- Build Command: `npm install --include=dev && npx prisma generate`
- Pre-Deploy Command: `npx prisma migrate deploy`
- Start Command: `node src/server.js`
- Env Vars:
  - `DATABASE_URL`: Postgres URL
  - `PORT`: 4000 (Render also sets `PORT`, the app reads it)

### Frontend (Static Site)
- Root Directory: `frontend`
- Build Command: `npm run build`
- Publish Directory: `dist`
- Env Vars:
  - `VITE_API_URL`: set to your backend URL (e.g., `https://vehicle-yard-backend.onrender.com`)

## Verify
- Backend health: `/api/health`
- List vehicles: `/api/vehicles`
- Frontend should load vehicles and persist changes through the API.

## Notes
- The backend uses Prisma with PostgreSQL. Run migrations automatically via `preDeployCommand`.
- If you change the schema, redeploy to apply migrations.
- Locally, set `VITE_API_URL=http://localhost:4000` to develop the frontend against the backend.
