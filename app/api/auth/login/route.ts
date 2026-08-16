import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import  JWT  from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
try {
    const {email , password} =await request.json()
     if( !email || !password){
    return Response.json({message:"All fields are required"},{status:400})
   }
    const existUser = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!existUser){
         return Response.json({message:"User not found"},{status:400})
    }
    const verifyPassword =await bcrypt.compare(password , existUser.password)
    if(!verifyPassword){
         return Response.json({message:"Email or password is invalid"},{status:404})
    }
    const token = JWT.sign({email:existUser.email , userId:existUser.id } , process.env.JWT_SECRET! ,{
        expiresIn:"7d"
    })


     const response= NextResponse.json({message:"Logged in successfully"},{status:200})
    
     response.cookies.set("token" , token ,{
         httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
     })
return response;
} catch (error) {
     console.log(error);
    
     return Response.json({message:"Server error"},{status:500})
}    
}