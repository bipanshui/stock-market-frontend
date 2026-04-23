'use client';

import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { StockData } from '@/services/api';
import { calculateChangePercent, formatPrice, formatChange } from '@/hooks/useStockData';
import Link from 'next/link';

interface StockCardProps {
  stock: StockData;
  showDetails?: boolean;
}

export function StockCard({ stock, showDetails = true }: StockCardProps) {
  const changePercent = calculateChangePercent(stock);
  const isPositive = changePercent >= 0;

  return (
    <Link href={`/stocks/${stock.symbol}`}>
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 cursor-pointer group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-slate-50 group-hover:text-blue-400 transition-colors">
            {stock.symbol}
          </span>
          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {formatChange(changePercent)}
          </span>
        </div>
        
        <div className="text-2xl font-bold text-slate-50 mb-1 font-mono">
          {formatPrice(stock.close)}
        </div>

        {showDetails && (
          <div className="text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Open:</span>
              <span className="font-mono">{formatPrice(stock.open)}</span>
            </div>
            <div className="flex justify-between">
              <span>High:</span>
              <span className="font-mono">{formatPrice(stock.high)}</span>
            </div>
            <div className="flex justify-between">
              <span>Low:</span>
              <span className="font-mono">{formatPrice(stock.low)}</span>
            </div>
            <div className="flex justify-between">
              <span>Volume:</span>
              <span className="font-mono">{stock.volume.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-red-500/30 text-center">
      <div className="text-red-500 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <p className="text-slate-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
      <div className="text-slate-500 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-slate-300 font-medium mb-1">{title}</h3>
      {description && <p className="text-slate-500 text-sm">{description}</p>}
    </div>
  );
}

export function StockCardSkeleton() {
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-6 w-12 bg-slate-700 rounded"></div>
        <div className="h-5 w-16 bg-slate-700 rounded"></div>
      </div>
      <div className="h-8 w-20 bg-slate-700 rounded mb-2"></div>
      <div className="h-4 w-full bg-slate-700 rounded"></div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 animate-pulse">
      <div className="h-6 w-32 bg-slate-700 rounded mb-4"></div>
      <div className="h-64 bg-slate-700 rounded"></div>
    </div>
  );
}