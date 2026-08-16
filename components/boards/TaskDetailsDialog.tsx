import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { Priority } from "@/src/generated/prisma/enums";
import { getCurrentUser } from "@/lib/auth";
import ButtonDetailCard from "../card/ButtonDetailCard";

type TaskDetailsDialogProps = {
  title: string;
  description: string | null;
  priority:Priority
};

async function TaskDetailsDialog({
  title,
  description,
  priority,
}: TaskDetailsDialogProps) {
  const priorityVariant = {
    low: "secondary",
    medium: "default",
    high: "destructive",
  } as const;

  const user = await getCurrentUser()


  return (
    <DialogContent className="
    w-[95vw]
    max-w-lg
    max-h-[85vh]
    overflow-y-auto
    rounded-xl
  ">

      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">

        <div>
          <h3 className="mb-2 font-medium">
            Description
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-medium">
            Priority
          </h3>

          <Badge variant={priorityVariant[priority]}>
            {priority}
          </Badge>
        </div>
<div className="space-y-2">

  <h3 className="font-medium">
    Due Date
  </h3>

  <div className="flex items-center gap-2 text-sm text-muted-foreground">

    <Calendar className="size-4" />

    <span>{new Date().toLocaleDateString()}</span>

  </div>

</div>
      </div>
<div className="space-y-2">

  <h3 className="font-medium">
    Assignee
  </h3>

  <div className="flex items-center gap-2">

    <User className="size-4" />

    <span>{user?.name}</span>

  </div>
<div className="space-y-2">

  <h3 className="font-medium">
    Comments
  </h3>

  <p className="text-sm text-muted-foreground">
    No comments yet.
  </p>

</div>
<ButtonDetailCard />
</div>
    </DialogContent>
  );
}

export default TaskDetailsDialog;