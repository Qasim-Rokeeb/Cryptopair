
'use client';
import { Coins } from 'lucide-react';
import React, { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const CryptoIcon = React.lazy(() => import('./CryptoIcon'));

const Icon = ({ name, className }: { name: string, className?: string }) => {
  return (
    <Suspense fallback={<Skeleton className={cn("w-16 h-16 rounded-full blur-sm", className)} />}>
      <CryptoIcon iconName={name} className={className} />
    </Suspense>
  );
};

Icon.displayName = 'Icon';

export { Icon };
