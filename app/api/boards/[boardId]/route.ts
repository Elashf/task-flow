import { badRequest, notFound, serverError, unauthorized } from "@/lib/api-response"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { boardIdSchema, updateBoardSchema } from "@/lib/validations/board"
import { NextResponse } from "next/server"

export async function DELETE(request:Request ,{params}:{params :Promise <{boardId:string}>}) {
try {
    const user = await getCurrentUser()
    if(!user){
           return unauthorized()
    }
    const body = await params
    const result = boardIdSchema.safeParse(body)
    if(!result.success){
             return badRequest("Validation error" ,
                result.error.issues
             )
        }
        const {boardId} = result.data
    const board=await prisma.board.findFirst({
        where:{
            id:boardId ,
            ownerId: user.id
        }
    })
    if(!board){
         return notFound("Board not found")
    }

    await prisma.board.delete({
        where:{
          id:boardId 
        }
    })
    return NextResponse.json({message:"Deleted successfully"},{status:200})

} catch (error) {
    console.log(error);
    
     return serverError()
}
    
}


export async function PUT(request:Request , {params}:{params : Promise<{boardId:string}>}) {
try {
     const user = await getCurrentUser()
    if(!user){
          return unauthorized()
    }
        const paramsData =await params
        const body = await request.json()
        const boardIdResult = boardIdSchema.safeParse(paramsData)
        if(!boardIdResult.success){
             return badRequest("Validation error" ,
                boardIdResult.error.issues
             )
        }
        const {boardId} = boardIdResult.data
        const result = updateBoardSchema.safeParse(body)

        if(!result.success){
             return badRequest("Validation error" ,
                result.error.issues
             )
        }
        const {title} = result.data
        const board = await prisma.board.findFirst({
            where:{
                id:boardId,
                ownerId:user.id
            }
        })
         if(!board){
         return notFound("Board not found")
    }

    await prisma.board.update({
        where:{
            id:boardId
        },
            data :{
                title
            }
        
    })
    return NextResponse.json({message:"Updated successfully"},{status:200})

} catch (error) {
     console.log(error);
    
     return serverError()
}
    
    
}
