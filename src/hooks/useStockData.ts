import { useQuery } from '@tanstack/react-query';
import { stockApi, StockData, TopMoversResponse, MovingAverageResponse, QuotaResponse } from '@/services/api';

export const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX'];

export const useStock = (symbol: string | null) => {
  return useQuery({
    queryKey: ['stock', symbol],
    queryFn: () => stockApi.getStock(symbol!),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useStockHistory = (symbol: string | null, from: string, to: string) => {
  return useQuery({
    queryKey: ['stockHistory', symbol, from, to],
    queryFn: () => stockApi.getStockHistory(symbol!, from, to),
    enabled: !!symbol && !!from && !!to,
    staleTime: 5 * 60 * 1000,
  });
};

export const useTopMovers = (symbols?: string) => {
  return useQuery<TopMoversResponse>({
    queryKey: ['topMovers', symbols],
    queryFn: () => stockApi.getTopMovers(symbols),
    staleTime: 5 * 60 * 1000,
    refetchInterval: false,
  });
};

export const useMovingAverage = (symbol: string | null, days: number = 20) => {
  return useQuery<MovingAverageResponse>({
    queryKey: ['movingAverage', symbol, days],
    queryFn: () => stockApi.getMovingAverage(symbol!, days),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000,
  });
};

export const useMultipleMovingAverages = (symbol: string | null) => {
  return useQuery({
    queryKey: ['multipleMovingAverages', symbol],
    queryFn: () => stockApi.getMultipleMovingAverages(symbol!),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000,
  });
};

export const getDateRange = (range: string): { from: string; to: string } => {
  const to = new Date();
  const from = new Date();

  switch (range) {
    case '7D':
      from.setDate(from.getDate() - 7);
      break;
    case '1M':
      from.setMonth(from.getMonth() - 1);
      break;
    case '3M':
      from.setMonth(from.getMonth() - 3);
      break;
    case '1Y':
      from.setFullYear(from.getFullYear() - 1);
      break;
    default:
      from.setDate(from.getDate() - 30);
  }

  return {
    from: from.toISOString().split('T')[0],
    to: to.toISOString().split('T')[0],
  };
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatChange = (change: number): string => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};

export const formatVolume = (volume: number): string => {
  if (volume >= 1_000_000_000) {
    return `${(volume / 1_000_000_000).toFixed(2)}B`;
  }
  if (volume >= 1_000_000) {
    return `${(volume / 1_000_000).toFixed(2)}M`;
  }
  if (volume >= 1_000) {
    return `${(volume / 1_000).toFixed(2)}K`;
  }
  return volume.toString();
};

export const calculateChangePercent = (stock: StockData): number => {
  return ((stock.close - stock.open) / stock.open) * 100;
};

export const useQuota = () => {
  return useQuery<QuotaResponse>({
    queryKey: ['quota'],
    queryFn: () => stockApi.getQuota(),
    refetchInterval: 30 * 1000,
  });
};