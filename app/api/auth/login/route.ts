import { badRequest, serverError, unauthorized } from "@/lib/api-response";
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
    return badRequest("Validation error" , 
        result.error.issues
    )
   }
   const {email , password} = result.data
    const existUser = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!existUser){
         return unauthorized("Email or password is invalid")
    }
    const verifyPassword =await bcrypt.compare(password , existUser.password)
    if(!verifyPassword){
                return unauthorized("Email or password is invalid")

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
    
     return serverError()
}    
}