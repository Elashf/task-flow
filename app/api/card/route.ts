import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
try {
    const {title , description , priority, listId}= await request.json()

 if (!title?.trim() || !priority || !listId) {
  return NextResponse.json(
    { message: "Title and boardId are required" },
    { status: 400 }
  )
}
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({message:"Unauthorized"},{status:400})
    }

    const list = await prisma.list.findFirst({
        where:{
            id: listId , 
            board:{
                ownerId:user.userId
            }
        }
    })
    if (!list) {
  return NextResponse.json(
    { message: "List not found" },
    { status: 404 }
  )
}

    const card = await prisma.card.create({
        data:{
            title , description , priority , listId
        }
    })
return NextResponse.json(
      {
        message: "Card created successfully",
        card,
      },
      { status: 201 }
    )

} catch (error) {
     console.log(error);
        
                return NextResponse.json({message:"Server error"},{status:500})
    
}
}