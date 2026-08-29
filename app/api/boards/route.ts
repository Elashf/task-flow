
import { badRequest, serverError, unauthorized } from "@/lib/api-response"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createBoardSchema } from "@/lib/validations/board"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
try {
    const body =await request.json()
    const result= createBoardSchema.safeParse(body)

    if(!result.success){
        return badRequest("Validation error" ,
            result.error.issues
        )
    }
    const {title , description} = result.data
    const user = await getCurrentUser()
    if(!user){
             return unauthorized("Email or password is invalid")
   
    }
   
const board =await prisma.board.create({
    data:{
        title , description , 
        owner:{
            connect:{
                id:user.id
            }
        }
    }
})
        return NextResponse.json({message:"Board created successfully" ,board},{status:201})



} catch (error) {
    console.log(error);
            return serverError()

    
}    
}


export async function GET(request:Request) {
try {
    const user = await getCurrentUser()
    if(!user){
         return  unauthorized("Email or password is invalid")
    }

    const boards = await prisma.board.findMany({
        where:{
            ownerId:user.id
        },
        orderBy:{
            createdAt:"desc"
        }
    })
 return NextResponse.json(boards);
} catch (error) {
    console.log(error);
            return serverError()

}    
}