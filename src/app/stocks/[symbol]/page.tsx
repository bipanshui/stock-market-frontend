'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useStock, useStockHistory, useMovingAverage, getDateRange, formatPrice, formatChange, calculateChangePercent } from '@/hooks/useStockData';
import { ChartCard } from '@/components/ChartCard';
import { ErrorState, ChartSkeleton } from '@/components/StockCard';
import { Loader } from '@/components/Loader';
import { useStockStore } from '@/store/stockStore';
import { TrendingUp, TrendingDown, Star, BookOpen, Volume2, Activity } from 'lucide-react';

type TimeRange = '7D' | '1M' | '3M' | '1Y';

export default function StockDetailPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1M');
  
  const { data: stockData, isLoading: isStockLoading, isError: isStockError, refetch: refetchStock } = useStock(symbol);
  const { from, to } = getDateRange(selectedRange);
  const { data: historyData, isLoading: isHistoryLoading, isError: isHistoryError, refetch: refetchHistory } = useStockHistory(symbol, from, to);
  const { data: movingAverageData, isLoading: isMALoading } = useMovingAverage(symbol, 20);
  
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStockStore();
  const isInWatchlist = watchlist.includes(symbol);

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  if (isStockLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (isStockError) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <ErrorState
          message={`Failed to load data for ${symbol}`}
          onRetry={() => refetchStock()}
        />
      </div>
    );
  }

  if (!stockData?.data) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <ErrorState message={`Stock ${symbol} not found`} />
      </div>
    );
  }

  const stock = stockData.data;
  const changePercent = calculateChangePercent(stock);
  const isPositive = changePercent >= 0;

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-50 mb-1">{symbol}</h1>
              <p className="text-slate-400">
                {new Date(stock.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <button
              onClick={handleToggleWatchlist}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isInWatchlist
                  ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Star className={`w-4 h-4 ${isInWatchlist ? 'fill-yellow-500' : ''}`} />
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Current Price</p>
                <p className="text-4xl font-bold text-slate-50 font-mono">
                  {formatPrice(stock.close)}
                </p>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                isPositive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">{formatChange(changePercent)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                  <BookOpen className="w-4 h-4" />
                  Open
                </div>
                <p className="text-slate-50 font-mono font-semibold">{formatPrice(stock.open)}</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                  <TrendingUp className="w-4 h-4" />
                  High
                </div>
                <p className="text-green-500 font-mono font-semibold">{formatPrice(stock.high)}</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                  <TrendingDown className="w-4 h-4" />
                  Low
                </div>
                <p className="text-red-500 font-mono font-semibold">{formatPrice(stock.low)}</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                  <Volume2 className="w-4 h-4" />
                  Volume
                </div>
                <p className="text-slate-50 font-mono font-semibold">{stock.volume.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
              <Activity className="w-4 h-4" />
              Moving Average (20D)
            </div>
            {isMALoading ? (
              <div className="animate-pulse h-10 bg-slate-700 rounded"></div>
            ) : movingAverageData ? (
              <div>
                <p className="text-3xl font-bold text-slate-50 font-mono mb-2">
                  {formatPrice(movingAverageData.movingAverage)}
                </p>
                <p className={`text-sm ${stock.close > movingAverageData.movingAverage ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.close > movingAverageData.movingAverage ? 'Above MA' : 'Below MA'}
                </p>
              </div>
            ) : (
              <p className="text-slate-500">N/A</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            {(['7D', '1M', '3M', '1Y'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {isHistoryLoading ? (
            <ChartSkeleton />
          ) : isHistoryError ? (
            <ErrorState
              message="Failed to load chart data"
              onRetry={() => refetchHistory()}
            />
          ) : historyData?.data ? (
            <ChartCard data={historyData.data} symbol={symbol} />
          ) : null}
        </div>
      </div>
    </div>
  );
}