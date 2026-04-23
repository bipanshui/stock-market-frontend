import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StockState {
  selectedStock: string | null;
  watchlist: string[];
  setSelectedStock: (symbol: string | null) => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
}

export const useStockStore = create<StockState>()(
  persist(
    (set, get) => ({
      selectedStock: null,
      watchlist: [],
      setSelectedStock: (symbol) => set({ selectedStock: symbol }),
      addToWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.includes(symbol)
            ? state.watchlist
            : [...state.watchlist, symbol],
        })),
      removeFromWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.filter((s) => s !== symbol),
        })),
      isInWatchlist: (symbol) => get().watchlist.includes(symbol),
    }),
    {
      name: 'stock-storage',
    }
  )
);