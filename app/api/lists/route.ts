import { badRequest, notFound, serverError, unauthorized } from "@/lib/api-response"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createListSchema } from "@/lib/validations/list"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
try {
    const body= await request.json()
    const result = createListSchema.safeParse(body)
    if(!result.success){
      return badRequest("Validation error",
        result.error.issues
      )
    }
    const {title ,boardId} = result.data
    const user = await getCurrentUser()
    if(!user){
        return unauthorized()
    }

    const board = await prisma.board.findFirst({
        where:{
id:boardId,
ownerId:user.id
        }
    })
if (!board) {
  return notFound("Board not found")
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
    
            return serverError()

}    
}