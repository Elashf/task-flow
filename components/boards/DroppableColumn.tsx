"use client"

import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  id: string;
  children: React.ReactNode;
};
function DroppableColumn({id ,children}:Props) {
  const router= useRouter()

    const handleDragOver =(e:React.DragEvent<HTMLDivElement>)=>{
e.preventDefault()
    }

    const handleDrop =async(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
        const cardId = e.dataTransfer.getData("cardId")

        const res = await fetch(`/api/card/${cardId}` ,{
          method:"PATCH",
          headers:{
            "Content-Type" :"application/json"
          },
          body: JSON.stringify({listId:id})
        })
      if(res.ok){
        toast.success("card moved successfully")
        router.refresh()
      }else{
      toast.error("Something went wrong, try again")
    }
    }

  return (
    <div className="min-h-52"
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    >
    {children}    
    </div>
  )
}

export default DroppableColumn