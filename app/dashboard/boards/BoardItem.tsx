"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  title: string;
  description: string | null;
};

function BoardItem({ id, title, description }: Props) {
  const router = useRouter()
const [openEdit, setOpenEdit] = useState(false);
const [editTitle, setEditTitle] = useState(title);
const [loading, setLoading] = useState(false);
const [openDelete, setOpenDelete] = useState(false);
    const handleDelete =async()=>{
        setLoading(true)
      const res = await fetch(`/api/boards/${id}`,{
        method:"DELETE" 
     })
      if(res.ok){
        toast.success("Board deleted successfully")
        router.refresh()
                setLoading(false)

      }else{
        toast.error("Something went wrong")
      }
    }

    const handleEdit = async()=>{
                setLoading(true)

        const res = await fetch(`/api/boards/${id}`,{
            method:"PUT" ,
            headers:{
             "Content-Type" :"application/json"
         },
         body: JSON.stringify({title:editTitle})
 })
 if(res.ok){
    setOpenEdit(false)
    toast.success("Title Updated successfully")
    router.refresh()
            setLoading(false)

 }else{
   const data = await res.json();
  toast.error(data.message || "Something went wrong");
 }
    }
 

  return (
    <>
    <Card className="relative w-72 hover:shadow-lg transition">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/dashboard/boards/${id}`}
            className="min-w-0 flex-1"
          >
            <h2 className="font-semibold text-lg">
              {title}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {description ?? "No description"}
            </p>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="cursor-pointer">
                <MoreHorizontal className="size-4" />
              </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=>setOpenEdit(true)}>
                <Pencil className="mr-2 size-4 " />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem variant="destructive"
               onClick={()=>setOpenDelete(true)}>
                <Trash2 className="mr-2 size-4 " />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
        </div>
      </CardContent>
    </Card>
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogContent>
                <DialogTitle>Edit Board</DialogTitle>
                <Input value={editTitle}
                onChange={(e)=>setEditTitle(e.target.value)}/>
                <Button className="cursor-pointer" onClick={handleEdit}>{loading ? "Editing..." : "Edit"}</Button>
            </DialogContent>
            
          </Dialog>
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogContent>
            <DialogTitle>Delete Board?</DialogTitle>
             <p className="text-sm text-muted-foreground">
      Are you sure you want to delete this board?
      
    </p>
 <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={() => setOpenDelete(false)}
        disabled={loading}
      >
        Cancel
      </Button>

      <Button
        variant="destructive"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </div>
  </DialogContent>
          </Dialog>
          </>
  );
}

export default BoardItem;