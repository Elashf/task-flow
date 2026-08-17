
import { ClipboardList } from "lucide-react";

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

    
    </div>
  );
}

export default EmptyBoard;