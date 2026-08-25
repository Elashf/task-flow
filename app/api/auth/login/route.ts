import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
try {
    const {email , password} =await request.json()
     if( !email || !password){
    return NextResponse.json({message:"All fields are required"},{status:400})
   }
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
    const token = jwt.sign({email:existUser.email , userId:existUser.id ,name:existUser.name} , process.env.JWT_SECRET! ,{
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