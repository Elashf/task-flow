"use client"
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function AddBord() {
    const [title , setTitle]= useState("")
    const [description , setDescription]= useState("")
    const [open , setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const addBoard = async()=>{
      setLoading(true)
        const res = await fetch("/api/boards",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({title, description})
        })
        if(res.ok){
          toast.success("Board created")
          setOpen(false)
          setLoading(false)
          router.refresh()
        }else{
          toast.warning("Try again")
        }
    }

  return (
    <Dialog open={open}
    onOpenChange={setOpen}
    >
<DialogTrigger>
          <span className="
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
    ">
          <Plus className="mr-2 size-4" />
          New Board
        </span>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Add Board</DialogTitle>
          <div>
            <label>Title</label>
            <Input
            type='text'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <Input
            type='text'
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            />
          </div>
          <div>
            <Button
            disabled={loading}
            onClick={addBoard}
            variant={'outline'} className="cursor-pointer">
              {loading ? "Creating..."  : "Add Board"}
            </Button>
          </div>
        </DialogContent>

    </Dialog>
    
  )
}

export default AddBord