import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request:Request ,{params}:{params :Promise <{boardId:string}>}) {
try {
    const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const {boardId} = await params

    const board=await prisma.board.findFirst({
        where:{
            id:boardId ,
            ownerId: user.userId
        }
    })
    if(!board){
         return NextResponse.json({message:"Board not found"},{status:404})
    }

    await prisma.board.delete({
        where:{
          id:boardId 
        }
    })
    return NextResponse.json({message:"Deleted successfully"},{status:200})

} catch (error) {
    console.log(error);
    
     return NextResponse.json({message:"Server error"},{status:500})
}
    
}


export async function PUT(request:Request , {params}:{params : Promise<{boardId:string}>}) {
try {
     const user = await getCurrentUser()
    if(!user){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
        const {boardId} =await params
        const body = await request.json()
        
        const board = await prisma.board.findFirst({
            where:{
                id:boardId,
                ownerId:user.userId
            }
        })
         if(!board){
         return NextResponse.json({message:"Board not found"},{status:404})
    }

    await prisma.board.update({
        where:{
            id:boardId
        },
            data :{
                title: body.title
            }
        
    })
    return NextResponse.json({message:"Updated successfully"},{status:200})

} catch (error) {
     console.log(error);
    
     return NextResponse.json({message:"Server error"},{status:500})
}
    
    
}
