"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const [email , setEmail] =useState("")
      const [password , setPassword] =useState("")
const router = useRouter()

const handleSubmit =async(e)=>{ 
  e.preventDefault();
  const res = await ("/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email,password})
        })
        if(res.ok){
          toast.success("Login successfully:))")
   router.push("/dashboard") 
}else{
  toast.error("Try again !")
}
}
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Welcome Back
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form 
        onSubmit={handleSubmit}
        className="space-y-5">

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="********"
            />
          </div>

          <Button
          type="submit"
          className="w-full cursor-pointer">
            Login
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>

        </form>
      </CardContent>
    </Card>
  );
}