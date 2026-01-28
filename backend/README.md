# Backend (Express + Prisma)

This service provides a REST API for vehicles, backed by PostgreSQL via Prisma.

## Tech
- Express (Node.js)
- Prisma ORM
- PostgreSQL

## Configure
1) Create a PostgreSQL database (Neon, Railway, Render, Supabase, local, etc.)
2) Set `DATABASE_URL` in `.env` in this format:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
PORT=4000
```

## Install
```
npm install
npx prisma generate
```

## Migrate
Run after `DATABASE_URL` points to your Postgres instance:
```
# Create and apply the initial migration
npx prisma migrate dev --name init
```
To apply in CI/prod:
```
npx prisma migrate deploy
```

## Seed
Optional: populate some sample data
```
node src/seed.js
```

## Run
```
node src/server.js
```
Server default: http://localhost:4000

## API
- GET `/api/health`
- GET `/api/vehicles`
- GET `/api/vehicles/:id`
- POST `/api/vehicles`
- PUT `/api/vehicles/:id`
- DELETE `/api/vehicles/:id`
- POST `/api/vehicles/:id/maintenance`
- DELETE `/api/vehicles/:id/maintenance/:mid`

## Notes
- After switching from SQLite to Postgres, run `migrate dev` against the new DB to create tables.
- If you previously had data in SQLite, you can re-run `src/seed.js` to quickly repopulate.
