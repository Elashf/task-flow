import { prisma } from "@/lib/prisma";
import { createLoginSchema } from "@/lib/validations/login";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
try {
    const body =await request.json()
    const result = createLoginSchema.safeParse(body)
      if(!result.success){
    return NextResponse.json({message:"validation error" ,
        errors: result.error.issues
    },{status:400})
   }
   const {email , password} = result.data
    const existUser = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!existUser){
         return NextResponse.json({message:"User not found"},{status:401})
    }
    const verifyPassword =await bcrypt.compare(password , existUser.password)
    if(!verifyPassword){
         return NextResponse.json({message:"Email or password is invalid"},{status:401})
    }
    const token = jwt.sign({ userId:existUser.id } , process.env.JWT_SECRET! ,{
        expiresIn:"7d"
    })


     const response= NextResponse.json({message:"Logged in successfully"},{status:200})
    
     response.cookies.set("token" , token ,{
         httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          sameSite:"lax"
     })
return response;
} catch (error) {
     console.log(error);
    
     return NextResponse.json({message:"Server error"},{status:500})
}    
}