import { Button } from "@/components/ui/button";
import { Users, Share2 } from "lucide-react";

function BoardHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Project Alpha
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>12 Tasks</span>

          <div className="flex items-center gap-1">
            <Users className="size-4" />
            <span>4 Members</span>
          </div>
        </div>
      </div>

      <Button>
        <Share2 className="mr-2 size-4" />
        Share
      </Button>
    </div>
  );
}

export default BoardHeader;