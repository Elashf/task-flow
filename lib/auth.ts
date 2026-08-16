import Jwt from "jsonwebtoken"
import { cookies } from "next/headers";
export type JwtPayload={
    userId: string
    name : string
    email:string
    
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
  return verifyToken(token)
}