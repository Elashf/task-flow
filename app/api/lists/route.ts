import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
try {
    const {title , boardId}= await request.json()
    if (!title?.trim() || !boardId) {
  return NextResponse.json(
    { message: "Title and boardId are required" },
    { status: 400 }
  )
}
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }

    const board = await prisma.board.findFirst({
        where:{
id:boardId,
ownerId:user.userId
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