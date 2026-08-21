"use client"

import { useRouter } from "next/navigation";

type Props={
  name:string ,
  email:string
}

function HeaderUserInfo({name, email}:Props) {
const router= useRouter()
  const handleLogout = async()=>{
   const res =await fetch("/api/auth/logout",{
    method:"POST"
   })
   if(res.ok){
    router.push("/login")
   }
  }
  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium">{name}</p>
      <br/>
      <p className="text-xs text-muted-foreground">{email}</p>
      <br/>
      <button onClick={handleLogout} className="text-md cursor-pointer">Logout</button>
      
    </div>
  );
}

export default HeaderUserInfo;
