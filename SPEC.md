# Stock Analytics Dashboard - Frontend Specification

## 1. Project Overview

**Project Name:** Stock Analytics Dashboard  
**Project Type:** Web Application (Next.js App Router)  
**Core Functionality:** Real-time stock data visualization dashboard with search, charts, and market analysis  
**Target Users:** Retail investors, traders, and financial analysts

---

## 2. UI/UX Specification

### Layout Structure

**Pages:**
- `/` - Landing/Home with dashboard preview
- `/dashboard` - Main dashboard with market overview, top gainers, losers
- `/stocks/[symbol]` - Stock detail page with chart and metrics
- `/search` - Stock search page

**Page Sections:**
- **Navbar** - Fixed top, logo, search bar, navigation links
- **Sidebar** - Left side, watchlist, quick links (desktop only)
- **Main Content** - Grid-based card layout
- **Footer** - Minimal, copyright info

**Responsive Breakpoints:**
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

### Visual Design

**Color Palette:**
- Background Primary: `#0f172a` (slate-900)
- Background Secondary: `#1e293b` (slate-800)
- Background Card: `#334155` (slate-700)
- Text Primary: `#f8fafc` (slate-50)
- Text Secondary: `#94a3b8` (slate-400)
- Accent Primary: `#3b82f6` (blue-500)
- Accent Secondary: `#8b5cf6` (violet-500)
- Success/Positive: `#22c55e` (green-500)
- Danger/Negative: `#ef4444` (red-500)
- Border: `#475569` (slate-600)

**Typography:**
- Font Family: `Inter` (Google Fonts)
- Headings: 
  - H1: 2.5rem/700
  - H2: 1.875rem/600
  - H3: 1.25rem/600
- Body: 1rem/400
- Small: 0.875rem/400
- Monospace (numbers): `JetBrains Mono`

**Spacing System:**
- Base unit: 4px
- Padding: 16px (cards), 24px (sections)
- Gap: 16px (grid), 8px (inline)
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)

**Visual Effects:**
- Card shadows: `0 4px 6px -1px rgba(0, 0, 0, 0.3)`
- Hover transitions: 200ms ease
- Hover scale: 1.02 (cards)
- Gradient accents: linear-gradient(135deg, #3b82f6, #8b5cf6)

### Components

**Navbar:**
- Logo with gradient text
- Search bar (debounced, 300ms)
- Nav links: Dashboard, Stocks, Watchlist
- Mobile: hamburger menu

**StockCard:**
- Symbol (bold, large)
- Company name (secondary text)
- Current price (monospace)
- Change % (colored badge)
- Hover: slight lift, border glow

**ChartCard:**
- Title with time range toggle (7D/1M/3M/1Y)
- Recharts LineChart
- Tooltip with date and price
- Grid lines (subtle)
- Smooth curve interpolation

**SearchBar:**
- Input with search icon
- Loading spinner during search
- Dropdown results with symbols
- Keyboard navigation support

**Loader:**
- Skeleton cards with shimmer effect
- Pulsing animation

**ErrorState:**
- Error icon
- Message text
- Retry button

---

## 3. Functionality Specification

### Core Features

**1. Dashboard (`/dashboard`)**
- Fetch and display top gainers/losers
- Market overview summary cards
- Quick stats: total stocks tracked, market status
- Auto-refresh every 60 seconds

**2. Stock Search**
- Debounced search (300ms delay)
- API call to `/api/stocks/:symbol`
- Results dropdown with symbol and price
- Click navigates to stock detail

**3. Stock Detail Page (`/stocks/[symbol]`)**
- Current price display (large)
- OHLC data: Open, High, Low, Close
- Volume
- Moving average display
- Price chart with time range toggle
- Add to watchlist button

**4. Chart Visualization**
- Recharts LineChart
- X-axis: dates
- Y-axis: prices
- Tooltip: date, open, high, low, close, volume
- Grid lines enabled
- Smooth curve type
- Responsive container

**5. API Integration**
- Axios with baseURL from env
- Endpoints:
  - `GET /api/stocks/:symbol` - Single stock
  - `GET /api/stocks/:symbol/history?from=...&to=...` - Historical
  - `GET /api/stocks/top-movers?symbols=...` - Top gainers/losers

**6. State Management (Zustand)**
- `useStockStore`: selected stock, watchlist
- `useSearchStore`: search query, results

**7. Data Fetching (React Query)**
- Cache: 5 minutes
- Refetch on window focus
- Stale time: 1 minute
- Loading/error states

**8. Watchlist**
- Persist to localStorage
- Add/remove stocks
- Quick access from sidebar

**9. Time Range Toggle**
- 7D, 1M, 3M, 1Y options
- Affects historical data fetch
- Persists selection in URL params

### User Interactions

- Click stock card → navigate to detail
- Type in search → debounced API call
- Click time range → fetch new data, update chart
- Click add to watchlist → toggle in localStorage
- Click retry on error → refetch data
- Hover on chart → show tooltip

### Edge Cases

- No search results: "No stocks found" message
- API error: error state with retry
- Invalid symbol: "Stock not found" page
- Network offline: offline indicator
- Empty watchlist: "Add stocks to watchlist" prompt
- Loading states: skeleton loaders

---

## 4. Acceptance Criteria

### Visual Checkpoints

- [ ] Dark theme applied throughout
- [ ] Cards have proper shadows and borders
- [ ] Green/red colors for positive/negative changes
- [ ] Smooth hover animations on interactive elements
- [ ] Responsive layout at all breakpoints
- [ ] Charts render with proper styling
- [ ] Typography matches spec (Inter, JetBrains Mono)

### Functional Checkpoints

- [ ] Dashboard loads top gainers/losers
- [ ] Search returns results after 300ms debounce
- [ ] Stock detail page shows all metrics
- [ ] Chart updates on time range change
- [ ] Watchlist persists across sessions
- [ ] Error states display with retry option
- [ ] Loading skeletons show during fetch

### Performance Checkpoints

- [ ] Initial load under 3 seconds
- [ ] No unnecessary re-renders
- [ ] Proper React Query caching
- [ ] Optimized bundle size

---

## 5. Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Charts:** Recharts
- **State:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Icons:** Lucide React

---

## 6. Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 7. API Response Formats

### Stock Data
```json
{
  "status": "success",
  "data": {
    "symbol": "AAPL",
    "date": "2024-01-15",
    "open": 185.50,
    "high": 187.20,
    "low": 184.80,
    "close": 186.50,
    "volume": 45000000
  }
}
```

### History Data
```json
{
  "status": "success",
  "count": 30,
  "data": [...]
}
```

### Top Movers
```json
{
  "status": "success",
  "data": {
    "gainers": [...],
    "losers": [...]
  }
}
```