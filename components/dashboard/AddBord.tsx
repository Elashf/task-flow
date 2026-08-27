"use client"
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createBoardSchema } from '@/lib/validations/board'

function AddBord() {
    const [title , setTitle]= useState("")
    const [description , setDescription]= useState("")
    const [open , setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    

    const router = useRouter()
    const addBoard = async()=>{

      const result = createBoardSchema.safeParse({title, description})
      if(!result.success){
        toast.error(result.error.issues[0].message)
        return
      }

      setLoading(true)
      try {
        const res = await fetch("/api/boards",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(result.data)
        })
            const data = await res.json();
           if(!res.ok){
                    toast.error(data.details?.[0]?.message || data.message || "failed to create board")
               return
           }
            toast.success("Board created")
          setOpen(false)
          router.refresh()
      } catch {
        toast.error("Something went wrong, try again")
      }finally{
        setLoading(false)
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