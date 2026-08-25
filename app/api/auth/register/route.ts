import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
try {
   const {name , email ,password} =await request.json()  

   if(!name || !email || !password){
    return NextResponse.json({message:"All fields are required"},{status:400})
   }
const existUser = await prisma.user.findUnique({
    where:{
        email
    }
})
if(existUser){
    return NextResponse.json({message:"Email already exists"},{status:400})
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
    name:newUser.name,
    email:newUser.email
    }, process.env.JWT_SECRET! ,{
    expiresIn:"7d"
   })

   const response = NextResponse.json(
  { message: "Registered in successfully" },
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
    
     return NextResponse.json({message:"Server error"},{status:500})
}

}