'use client';

import { useTopMovers, STOCK_SYMBOLS } from '@/hooks/useStockData';
import { StockCard, ErrorState, StockCardSkeleton } from '@/components/StockCard';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function DashboardPage() {
  const symbols = STOCK_SYMBOLS.join(',');
  const { data, isLoading, isError, refetch } = useTopMovers(symbols);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Market Overview</h1>
          <p className="text-slate-400">Track top gainers and losers in the market</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <StockCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            message="Failed to load market data"
            onRetry={() => refetch()}
          />
        ) : data?.data ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-slate-400 text-sm">Top Gainers</span>
                </div>
                <p className="text-2xl font-bold text-slate-50">
                  {data.data.gainers.length}
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <span className="text-slate-400 text-sm">Top Losers</span>
                </div>
                <p className="text-2xl font-bold text-slate-50">
                  {data.data.losers.length}
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-400 text-sm">Stocks Tracked</span>
                </div>
                <p className="text-2xl font-bold text-slate-50">
                  {STOCK_SYMBOLS.length}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Top Gainers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.data.gainers.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                Top Losers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.data.losers.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}