'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { StockData } from '@/services/api';
import { formatPrice } from '@/hooks/useStockData';

interface ChartCardProps {
  data: StockData[];
  symbol: string;
}

type TimeRange = '7D' | '1M' | '3M' | '1Y';

const timeRanges: TimeRange[] = ['7D', '1M', '3M', '1Y'];

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: StockData;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload as StockData;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
      <p className="text-slate-400 text-xs mb-2">
        {new Date(data.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Open:</span>
          <span className="text-slate-50 font-mono">{formatPrice(data.open)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">High:</span>
          <span className="text-green-500 font-mono">{formatPrice(data.high)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Low:</span>
          <span className="text-red-500 font-mono">{formatPrice(data.low)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Close:</span>
          <span className="text-slate-50 font-mono">{formatPrice(data.close)}</span>
        </div>
        <div className="flex justify-between gap-4 border-t border-slate-700 pt-1 mt-1">
          <span className="text-slate-500">Volume:</span>
          <span className="text-slate-50 font-mono">{data.volume.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export function ChartCard({ data, symbol }: ChartCardProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1M');

  const chartData = [...data].reverse().map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  const minPrice = Math.min(...data.map((d) => d.low)) * 0.98;
  const maxPrice = Math.max(...data.map((d) => d.high)) * 1.02;

  const gradientColor = data.length > 1 && data[data.length - 1].close >= data[0].close
    ? '#22c55e'
    : '#ef4444';

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-50">{symbol} Price Chart</h3>
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={gradientColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#475569' }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#475569' }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="close"
              stroke={gradientColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: gradientColor, stroke: '#0f172a', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}