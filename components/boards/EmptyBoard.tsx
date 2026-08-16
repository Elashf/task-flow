import { ClipboardList } from "lucide-react";
import { Button } from "../ui/button";

function EmptyBoard() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
      <ClipboardList className="mb-4 size-12 text-muted-foreground" />

      <h3 className="text-lg font-semibold">
        No tasks yet
      </h3>

      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Create your first task to start organizing your work.
      </p>

      <Button className="mt-6">
        + Add Task
      </Button>
    </div>
  );
}

export default EmptyBoard;