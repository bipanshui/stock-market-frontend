'use client';

import { useStockStore } from '@/store/stockStore';
import { useStock } from '@/hooks/useStockData';
import { StockCard, StockCardSkeleton, ErrorState, EmptyState } from '@/components/StockCard';
import { Bookmark } from 'lucide-react';

function WatchlistItem({ symbol }: { symbol: string }) {
  const { data, isLoading, isError } = useStock(symbol);

  if (isLoading) return <StockCardSkeleton />;
  if (isError) return <ErrorState message={`Failed to load ${symbol}`} />;
  if (data?.data) return <StockCard stock={data.data} />;
  return null;
}

export default function WatchlistPage() {
  const { watchlist } = useStockStore();

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2 flex items-center gap-3">
            <Bookmark className="w-8 h-8 text-yellow-500" />
            Watchlist
          </h1>
          <p className="text-slate-400">Stocks you&apos;re tracking</p>
        </div>

        {watchlist.length === 0 ? (
          <EmptyState
            title="No stocks in watchlist"
            description="Add stocks from the dashboard to track them here"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlist.map((symbol) => (
              <WatchlistItem key={symbol} symbol={symbol} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}