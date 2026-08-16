import { Skeleton } from "../ui/skeleton";

function BoardCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-4">

      <Skeleton className="h-5 w-16 rounded-full" />

      <Skeleton className="h-5 w-3/4" />

      <Skeleton className="h-4 w-full" />

      <Skeleton className="h-4 w-2/3" />

      <div className="flex items-center justify-between">

        <Skeleton className="h-4 w-20" />

        <Skeleton className="size-8 rounded-full" />

      </div>

    </div>
  );
}

export default BoardCardSkeleton;