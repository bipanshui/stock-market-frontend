# Stock Analytics Dashboard - Frontend

A production-grade Next.js stock analytics dashboard that connects to a Node.js backend API with Marketstack integration.

## Features

- **Dashboard**: View top gainers and losers in the market
- **Stock Search**: Search for stocks with debounced input (300ms)
- **Stock Details**: View current price, OHLC data, volume, and moving averages
- **Charts**: Interactive price charts with Recharts (7D/1M/3M/1Y time ranges)
- **Watchlist**: Persisted to localStorage, add/remove stocks
- **Dark Theme**: Fintech-style UI with slate color palette
- **Responsive**: Works on mobile, tablet, and desktop

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Axios (HTTP client)
- Recharts (Charts)
- Zustand (State management)
- TanStack Query (React Query)
- Lucide React (Icons)

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── dashboard/        # Dashboard page
│   │   ├── stocks/[symbol]/  # Stock detail page
│   │   ├── watchlist/        # Watchlist page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home (redirects to dashboard)
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StockCard.tsx
│   │   ├── ChartCard.tsx
│   │   ├── Loader.tsx
│   │   └── Providers.tsx
│   ├── hooks/                # Custom hooks
│   │   └── useStockData.ts   # React Query hooks + utilities
│   ├── services/             # API services
│   │   └── api.ts            # Axios API client
│   ├── store/                # Zustand stores
│   │   └── stockStore.ts
│   └── utils/                # Utility functions
├── .env.local                # Environment variables
├── SPEC.md                   # Project specification
└── package.json
```

## Setup

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**:
   Create `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Start the backend**:
   See backend README for instructions.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open**: http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/stocks/:symbol` | Get single stock data |
| `GET /api/stocks/:symbol/history?from=...&to=...` | Get historical data |
| `GET /api/stocks/top-movers?symbols=...` | Get top gainers/losers |
| `GET /api/stocks/:symbol/moving-average?days=20` | Get moving average |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Market overview with top movers |
| `/stocks/:symbol` | Stock detail with chart |
| `/watchlist` | User's watchlist |

## Design System

- **Colors**: Slate palette (slate-900 primary background)
- **Typography**: Inter (sans), JetBrains Mono (numbers)
- **Accents**: Blue-500 primary, Green/Red for positive/negative changes
- **Border radius**: 8px cards, 6px buttons, 4px inputs
- **Animations**: 200ms transitions, hover effects