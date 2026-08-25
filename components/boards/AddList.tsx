"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props={
  boardId :string
}


 function AddList({boardId}:Props) {

  const [title, setTitle] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const addToList = async()=>{
    setLoading(true)
    const res = await fetch("/api/lists" ,{
        method:"POST",
        headers:{
            "Content-Type" :"application/json"
        },
        body: JSON.stringify({title , boardId})
    })
    if(res.ok){
        toast.success("List created")
        setOpen(false)
        setLoading(false)
        router.refresh()
        setTitle("")
    }else{
      toast.error("Something went wrong, try again")
    }
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <span
            className="
      inline-flex
      h-9
      items-center
      justify-center
      rounded-md
      bg-primary
      px-4
      py-2
      text-sm
      font-medium
      text-primary-foreground
      cursor-pointer
      hover:bg-primary/90
    "
          >
            <Plus className="size-4 mr-2" />
            Add List
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add List</DialogTitle>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={addToList}>{loading ? "Craeting... " : "Add To List"}</Button>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}

export default AddList;
