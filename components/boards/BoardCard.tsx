import { Calendar} from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";

import { Dialog, DialogTrigger } from "../ui/dialog";
import TaskDetailsDialog from "./TaskDetailsDialog";
import { Priority } from "@/src/generated/prisma/enums";
import { getCurrentUser } from "@/lib/auth";
import DraggableCard from "./DraggableCard";


type BoardCardProps = {
  id:string,
  title: string;
  description: string | null;
  priority: Priority,
  createdAt : Date
};

async function BoardCard({id, title, description, priority , createdAt }: BoardCardProps) {
  const priorityVariant = {
    low: "secondary",
    medium: "default",
    high: "destructive",
  } as const;

  const user = await getCurrentUser()
  return (
    <DraggableCard id={id}>
    <Dialog>
    
      <DialogTrigger >
        
        <article
       
      className="
      min-h-52
    rounded-xl
    border
    bg-card
    p-4
    
    shadow-sm
    transition-all
    duration-200
    hover:-translate-y-1
    hover:shadow-lg
    cursor-pointer
    flex
    flex-col
  "
    >
      <div className="mb-3 flex items-start justify-between">
  <Badge variant={priorityVariant[priority]}>
    {priority}
  </Badge>

 
</div>

      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description ?? "No description"}</p>
<div className="mt-5 flex gap-2 items-center justify-between">
  <div className="flex items-center gap-1 text-xs text-muted-foreground">
    <Calendar className="size-4" />
    <span>{createdAt.toLocaleDateString()}</span>
  </div>

  <Avatar className="size-7">
    <AvatarFallback>{user?.name}</AvatarFallback>
  </Avatar>
  
</div>
      
    </article>
    
      </DialogTrigger>
      
    <TaskDetailsDialog id={id} title={title} description={description} priority={priority}/>
   
</Dialog>
</DraggableCard>
  );
}
export default BoardCard;
