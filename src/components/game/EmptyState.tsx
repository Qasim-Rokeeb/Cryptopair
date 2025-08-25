
"use client";

import { Database } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <Database className="h-12 w-12 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-headline font-semibold text-foreground">No game data available</h3>
        <p className="mt-2 text-sm text-muted-foreground">
            It looks like there are no levels to play. Try refreshing the page or contact support if the problem persists.
        </p>
    </div>
  );
}
