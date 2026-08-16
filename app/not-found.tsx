import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page not found
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <Button className="mt-8">
        <Link href="/dashboard">
          Back to Dashboard
        </Link>
      </Button>
    </main>
  );
}