import { Loader2 } from 'lucide-react';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ className = '', size = 'md' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500`} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <Loader size="lg" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-20 bg-slate-700 rounded"></div>
        <div className="h-4 w-16 bg-slate-700 rounded"></div>
      </div>
      <div className="h-8 w-24 bg-slate-700 rounded mb-2"></div>
      <div className="h-4 w-32 bg-slate-700 rounded"></div>
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