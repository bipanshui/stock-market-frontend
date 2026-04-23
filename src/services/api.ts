import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export interface StockData {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjusted_close?: number;
}

export interface StockHistoryResponse {
  status: string;
  count: number;
  data: StockData[];
}

export interface StockResponse {
  status: string;
  data: StockData;
}

export interface TopMoversResponse {
  status: string;
  data: {
    gainers: StockData[];
    losers: StockData[];
  };
}

export interface MovingAverageResponse {
  symbol: string;
  period: number;
  movingAverage: number;
  calculatedAt: string;
}

export interface QuotaResponse {
  status: string;
  data: {
    used: number;
    remaining: number;
    limit: number;
  };
  message: string;
}

export const stockApi = {
  getStock: async (symbol: string): Promise<StockResponse> => {
    const { data } = await api.get<StockResponse>(`/api/stocks/${symbol}`);
    return data;
  },

  getStockHistory: async (symbol: string, from: string, to: string): Promise<StockHistoryResponse> => {
    const { data } = await api.get<StockHistoryResponse>(`/api/stocks/${symbol}/history`, {
      params: { from, to },
    });
    return data;
  },

  getTopMovers: async (symbols?: string): Promise<TopMoversResponse> => {
    const { data } = await api.get<TopMoversResponse>('/api/stocks/top-movers', {
      params: { symbols },
    });
    return data;
  },

  getMovingAverage: async (symbol: string, days: number = 20): Promise<MovingAverageResponse> => {
    const { data } = await api.get<MovingAverageResponse>(`/api/stocks/${symbol}/moving-average`, {
      params: { days },
    });
    return data;
  },

  getMultipleMovingAverages: async (symbol: string): Promise<{ data: MovingAverageResponse[] }> => {
    const { data } = await api.get(`/api/stocks/${symbol}/moving-averages`);
    return data;
  },

  getQuota: async (): Promise<QuotaResponse> => {
    const { data } = await api.get<QuotaResponse>('/api/quota');
    return data;
  },
};

export default api;