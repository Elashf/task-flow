import Jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { prisma } from "./prisma";
export type JwtPayload={
    userId: string
   
}
export function verifyToken(token: string): JwtPayload | null {
  try {
    const payload = Jwt.verify(token, process.env.JWT_SECRET!);


    return payload as JwtPayload;
  } catch (error) {

    return null;
  }
}


export async function getCurrentUser(){
  const token = (await cookies()).get("token")?.value

  if(!token){
    return null
  }
  const payload = verifyToken(token)
   if (!payload) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where:{
      id:payload.userId
    }
    ,
    select: {
      id: true,
      name: true,
      email: true,
    },
  })
   return user;
}