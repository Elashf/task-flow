"use client";
import { Priority } from "@/src/generated/prisma/enums";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
type Props = {
  id: string;
  title: string;
  description: string | null;
  priority: Priority;
};
function ButtonDetailCard({ id, title, description, priority }: Props) {
  const router = useRouter();
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority,setEditPriority ] = useState(priority);
    const [loading, setLoading] = useState(false);
  const [ open , setOpen]= useState(false)
  const [ openDelete , setOpenDelete]= useState(false)
  const handleDelete = async () => {
    setLoading(true)
    const res = await fetch(`/api/card/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted");
      router.refresh();
      setLoading(false)
    }else{
      toast.error("Something went wrong, try again")
    }
  };

  const handleEdit=async()=>{
    setLoading(true)
  const res = await fetch(`/api/card/${id}`, {
      method: "PUT",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({title:editTitle, description:editDescription ,priority: editPriority})
  })
    if (res.ok) {
    toast.success("Updated");

    setOpen(false);

    router.refresh();
  } else{
      toast.error("Something went wrong, try again")
    }

  setLoading(false);
  }

  return (
    <div className="flex justify-end gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger >
          <span className="border border-muted-bg rounded px-4 cursor-pointer py-1">
            Edit
          </span>
        </DialogTrigger>
        <DialogContent className="bg-gray-100">
          <DialogTitle>Edit</DialogTitle>
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <Input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <Select value={editPriority} onValueChange={setEditPriority}>
            <SelectTrigger>
              <SelectValue placeholder="select priority" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">medium</SelectItem>
            <SelectItem value="high">high</SelectItem>
            </SelectContent>
          </Select>
          <Button className="cursor-pointer" onClick={handleEdit}>
            {loading ? "Editing... " : "Edit card"}
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
<DialogContent>
  <DialogTitle>Delete Card?</DialogTitle>
 <p className="text-sm text-muted-foreground">
      Are you sure you want to delete this board?
    </p>
        <div className="flex justify-end gap-2">
      <Button
      className="cursor-pointer"
        variant="outline"
        onClick={() => setOpenDelete(false)}
        disabled={loading}
      >
        Cancel
      </Button>

      <Button
      className="cursor-pointer"
        variant="destructive"
        onClick={handleDelete}
        disabled={loading}
      >{loading ? "Deleting..." : "Delete"}</Button>
      </div>
</DialogContent>
      </Dialog>
      <Button
      disabled={loading}
        className="cursor-pointer"
        onClick={()=>setOpenDelete(true)}
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
}

export default ButtonDetailCard;
