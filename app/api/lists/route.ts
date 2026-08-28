import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createListSchema } from "@/lib/validations/list"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
try {
    const body= await request.json()
    const result = createListSchema.safeParse(body)
    if(!result.success){
      return NextResponse.json({error:"validation error",
        details: result.error.issues
      },{status:400})
    }
    const {title ,boardId} = result.data
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }

    const board = await prisma.board.findFirst({
        where:{
id:boardId,
ownerId:user.id
        }
    })
if (!board) {
  return NextResponse.json(
    { message: "Board not found" },
    { status: 404 }
  )
}

const list = await prisma.list.create({
    data:{
        title, boardId
    }
})
 return NextResponse.json(
      {
        message: "List created successfully",
        list,
      },
      { status: 201 }
    )

} catch (error) {
    console.log(error);
    
            return NextResponse.json({message:"Server error"},{status:500})

}    
}