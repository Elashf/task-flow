import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <main className="flex gap-6 overflow-x-auto px-4 pb-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-85 shrink-0 rounded-xl border bg-muted/40"
        >
          {/* Column header */}
          <div className="flex justify-between border-b p-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-6" />
          </div>

          {/* Cards */}
          <div className="space-y-3 p-4">
            {Array.from({ length: 2 }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="space-y-4 rounded-xl border bg-card p-4"
              >
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

export default Loading;