
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
try {
    const {title , description} =await request.json()
    const user = await getCurrentUser()
    if(!user){
             return NextResponse.json({message:"Unauthorized!"},{status:401})
   
    }
    if(!title.trim()){
        return NextResponse.json({message:"Empty fields!"},{status:400})
    }
const board =await prisma.board.create({
    data:{
        title , description , 
        owner:{
            connect:{
                id:user.userId
            }
        }
    }
})
        return NextResponse.json({message:"Board created successfully" ,board},{status:201})



} catch (error) {
    console.log(error);
            return NextResponse.json({message:"Server error"},{status:500})

    
}    
}


export async function GET(request:Request) {
try {
    const user = await getCurrentUser()
    if(!user){
         return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
              );
    }

    const boards = await prisma.board.findMany({
        where:{
            ownerId:user.userId
        },
        orderBy:{
            createdAt:"desc"
        }
    })
 return NextResponse.json(boards);
} catch (error) {
    console.log(error);
            return NextResponse.json({message:"Server error"},{status:500})

}    
}