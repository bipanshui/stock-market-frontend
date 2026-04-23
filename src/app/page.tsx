'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="flex items-center gap-2 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
}