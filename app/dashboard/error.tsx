"use client";

import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({
  reset,
}: Props) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">
          Something went wrong
        </h1>

        <p className="text-muted-foreground">
          We couldn't load your dashboard. Please try again.
        </p>

        <Button onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </main>
  );
}