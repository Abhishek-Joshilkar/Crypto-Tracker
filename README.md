# Crypto-Tracker

A modern crypto tracker built with React, Vite, and Supabase Auth. Track live prices, search coins, save a watchlist, and view detailed charts — with secure login.

## Roadmap (step by step)

| Step | Feature | Status |
|------|---------|--------|
| 1 | Secure auth (Supabase JWT) | Done |
| 2 | Demo buy & sell | Planned |
| 3 | User data in Supabase + tracker highlights | Planned |
| 4 | Full backend | Planned |
| 5 | Innovative CSS polish | Planned |

## Features

- **Secure auth** — email/password sign up & sign in (JWT via Supabase)
- Protected dashboard, watchlist, and coin details
- Live market data from CoinGecko
- Search, charts, per-user watchlist

## Setup

### 1. Install

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
```

### 2. CoinGecko API key

Get a free Demo key at [coingecko.com/en/api](https://www.coingecko.com/en/api):

```env
VITE_COINGECKO_API_KEY=your_api_key_here
VITE_COINGECKO_API_PLAN=demo
```

### 3. Supabase Auth (Step 1)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → API**
3. Copy **Project URL** and **anon public** key into `.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

4. In Supabase dashboard: **Authentication → Providers → Email** — keep Email enabled
5. For local dev, you can disable **Confirm email** under **Authentication → Providers → Email** so sign-up works instantly without email verification

Restart the dev server after editing `.env`:

```bash
npm run dev
```

## Auth routes

| Route | Access |
|-------|--------|
| `/` | Public (home) |
| `/login` | Guests only |
| `/signup` | Guests only |
| `/dashboard` | Signed in only |
| `/watchlist` | Signed in only |
| `/coin/:id` | Signed in only |

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Security notes

- Never commit `.env` — it is gitignored
- Only the Supabase **anon** key goes in the frontend; never expose the **service_role** key
- Supabase handles JWT creation, refresh, and session storage securely
