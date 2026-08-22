import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <main className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border p-6 space-y-4"
        >
          <Skeleton className="h-30 w-full" />
        </div>
      ))}
    </main>
  );
}

export default Loading;