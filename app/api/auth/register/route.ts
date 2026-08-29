import { badRequest, conflict, serverError } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { createRegisterSchema } from "@/lib/validations/register";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
try {
   const body =await request.json()  
   const result = createRegisterSchema.safeParse(body)

   if(!result.success){
    return badRequest(
        "Validation error",
        result.error.issues
    )
   }
const {name , email , password}= result.data
const existUser = await prisma.user.findUnique({
    where:{
        email
    }
})
if(existUser){
    return conflict("Email already exists")
}
const hashPassword =await bcrypt.hash(password, 10)
 const newUser = await prisma.user.create({
    data:{
        name,
        email,
        password:hashPassword
       
    }
})
   const token = jwt.sign({
    userId: newUser.id,
   
    }, process.env.JWT_SECRET! ,{
    expiresIn:"7d"
   })

   const response = NextResponse.json(
  { message: "Registered successfully" },
  { status: 201 }
);

response.cookies.set("token", token, {
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "lax",
});

return response;

   
} catch (error) {
    console.log(error);
    
     return serverError()
}

}