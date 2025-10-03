# Cryptowatch

A comprehensive cryptocurrency tracking application that provides real-time price data, detailed analytics, and portfolio tracking for 200+ cryptocurrencies. Built with React 18, TypeScript, Vite, Redux Toolkit (RTK Query), Tailwind CSS, and Lightweight Charts.

## Features
- Real-time price tracking (CoinGecko)
- Market list with search, loading skeletons, and Trending fallback on errors
- Coin Details with advanced chart (Lightweight Charts) and metrics
- Markets tab with sortable columns (Price, Spread, 24h Volume, Trust)
- News tab powered by NewsAPI (with fallback to CoinGecko Status Updates if key missing)
- Responsive design for mobile, tablet, and desktop
- Theme-aware header logo (light/dark) with graceful fallback
- Dark/Light mode
- Portfolio tracking with profit/loss
- Price alerts
- Popular cryptocurrencies section
- Detailed currency views with advanced charts

## Tech Stack
- React 18 + TypeScript
- Redux Toolkit + RTK Query
- Vite
- Tailwind CSS
- Lightweight Charts (TradingView)
- Jest + React Testing Library

## Getting Started

### Prerequisites
- Node.js 18+
- npm (or pnpm/yarn)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` in the project root and adjust as needed:
```env
# API base (defaults to CoinGecko public API)
VITE_API_BASE_URL=https://api.coingecko.com/api/v3

# Optional: WebSocket provider (if/when enabled)
VITE_WS_URL=wss://example.socket.provider/top

# Default currency for price display
VITE_DEFAULT_CURRENCY=usd

# NewsAPI.org key (required for News tab headlines)
# Sign up at https://newsapi.org and paste your key below
VITE_NEWS_API_KEY=YOUR_NEWSAPI_KEY

# Optional: CoinGecko Pro key (leave blank if you don't have one)
# If set, the app may use it via server/proxy; client calls use public endpoints.
VITE_COINGECKO_API_KEY=
```
Notes:
- Vite exposes only environment variables prefixed with `VITE_` to the client.
- After changing `.env`, restart the dev server so Vite picks up new values.

### Scripts
```bash
# Start dev server (Vite)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## Usage Tips
- Market page: If the market API is rate-limited or returns an error, you will see a "Trending coins (fallback)" grid you can still use to open details.
- Coin Details:
  - Use the time range buttons (24h, 7d, 1m, 3m, 1y, All) above the chart.
  - Tabs (Overview, Markets, News) persist in the URL for easy sharing.
  - Markets tab headers are clickable to sort; an arrow indicates sort direction.
  - News tab requires `VITE_NEWS_API_KEY`; without it, project status updates are shown instead.
- Header: Theme toggle switches light/dark; mobile devices use a hamburger menu.

## Responsive Design
- Header: Mobile hamburger menu, desktop inline navigation.
- Lists: Responsive grid (1/2/3/4 columns at `sm`/`lg`/`xl`).
- Details: Stacks on mobile; two-column layout on `md+`. Long descriptions are clamped on mobile with a "Show more" toggle.
- Tables: Safe horizontal scrolling on small screens with compact paddings.

## Project Structure
```
cryptowatch/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── crypto/
│   │   └── layout/
│   ├── features/
│   │   ├── crypto/
│   │   ├── portfolio/
│   │   └── alerts/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── jest.config.js
```

## Troubleshooting
- Port already in use:
  - Vite will choose another port automatically (e.g., 5174). Use the printed URL.
- News tab shows: "Add your NewsAPI key...":
  - Ensure `.env` exists with `VITE_NEWS_API_KEY=...` and restart `npm run dev`.
- Home page shows: "Error loading market data":
  - Click Retry. If it persists, the Trending fallback should appear.
  - Open DevTools → Network and check `/coins/markets` status. If it is `429/5xx`, wait and retry; if `400`, ensure the request URL hasn’t been modified locally.
- After editing `.env`, always restart the dev server.

## Notes
- API: CoinGecko free API is used; no key required for basic endpoints.
- RTK Query handles caching and request lifecycle with automatic retries for transient errors.
- Charts are powered by Lightweight Charts; data is mapped from CoinGecko market history.
- Path alias `@` points to `src` and is configured in both `tsconfig.json` and `vite.config.ts`.

## Roadmap
- Virtualized list for improved performance
- Real WebSocket price streaming for top coins
- Advanced portfolio analytics and allocation views
- Code splitting with React.lazy for pages
- Source filters and pagination in News tab
- Exchange filtering and pagination in Markets tab

## License
MIT
