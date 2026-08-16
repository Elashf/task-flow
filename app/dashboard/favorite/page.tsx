import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Star className="size-14 text-yellow-500" />

      <h1 className="mt-6 text-3xl font-bold">
        Favorite Boards
      </h1>

      <p className="mt-3 max-w-md text-muted-foreground">
        You don't have any favorite boards yet.
        Mark your most important boards as favorites to access them quickly.
      </p>

      <Button className="mt-8">
        <Link href="/dashboard/boards">
          Browse Boards
        </Link>
      </Button>
    </main>
  );
}