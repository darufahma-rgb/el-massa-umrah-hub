# El Massa Tour & Travel — Umrah Program Website

An Umrah travel website for El Massa Tour & Travel, built with React + Vite + TailwindCSS + shadcn/ui.

## Architecture

- **Frontend**: React 18 + Vite + TailwindCSS + shadcn/ui + Framer Motion
- **Backend**: Express.js API server (port 3001 in dev, port 5000 in production)
- **Database**: Replit built-in PostgreSQL via Drizzle ORM
- **Router**: React Router v6

## Project Structure

```
├── src/                   # React frontend
│   ├── components/        # Shared UI components (Navbar, Footer, PosterCard, etc.)
│   ├── pages/             # Route pages (Index, ProgramDetail, AboutPage, ContactPage)
│   ├── assets/            # Images (hero, posters)
│   └── App.tsx            # App entry
├── server/                # Express API server
│   ├── index.ts           # Main server (API routes + static serving in prod)
│   ├── db.ts              # Drizzle + pg connection
│   └── seed.ts            # Database seed script
├── shared/
│   └── schema.ts          # Drizzle schema (shared between server and frontend types)
└── public/                # Static assets (poster images, favicon)
```

## Running the App

```bash
npm run dev       # Runs Vite (port 5000) + API server (port 3001) concurrently
npm run db:push   # Push schema changes to database
```

## API Endpoints

- `GET /api/programs` — List all active Umrah programs (ordered by sort_order)
- `GET /api/programs/:slug` — Get a single program by slug

## Database

Uses Replit's built-in PostgreSQL. Schema is in `shared/schema.ts`.
Table: `umrah_programs` — stores all Umrah package details including prices, facilities, hotels, etc.

## Key Features

- Home page with hero section and program grid catalog
- Program detail pages with full info (hotels, prices, facilities, bank accounts, WhatsApp booking)
- Responsive design (mobile-first)
- WhatsApp floating button for quick contact
- Animated UI with Framer Motion
