"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ModeToggle from "@/components/ui/ModeToggle"
import Link from "next/link"
import { FormEvent, useState } from "react"

import { loginUser } from "@/services/auth.service"
import { useRouter } from "next/navigation"




export default function LoginPage() {
      const [email, setEmail]= useState("");
    const [password,setPassword]= useState("");
   
    const [error, setError]= useState("");
    const router = useRouter();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if(err instanceof Error){
        setError(err.message);
      } else{
        setError(`Caught an Unknown Error: ${err}`);
      }
    }
  };




  return (
    <div>
        <div className="m-3 absolute right-1">
     <ModeToggle />
    </div>
    <div className="flex items-center min-h-screen justify-center ">
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Welcome back</CardTitle>
        <CardDescription className="font-semibold text-md">
          Continue building forms with Formium.
        </CardDescription>
       
          
        
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required onChange={((e)=>setPassword(e.target.value) )} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
      
        <img src="google.svg" className="w-5" alt="" />
        </Button>
        <div className="border-b w-full py-1"></div>
        <div >Don`t have an account? <Button variant="link" className="m-0 p-0 gap-0"><Link href="/signup">Sign up</Link></Button> </div>
      </CardFooter>
    </Card>
    </div>
    </div>
  )
}