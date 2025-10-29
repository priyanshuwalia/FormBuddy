"use client"
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ui/ModeToggle";
import Link from "next/link";


export default function Home() {
  return (
    <div className="m-3 gap-1.5">
    <div className=" absolute right-3">
     <ModeToggle />
     
    </div>
    {/* auth buttons */}
    <div className=" flex gap-3">
    <Link href="/signup"><Button variant="default" className="px-2.5 py-0.5">Sign Up</Button></Link>
    <Link href="/login"><Button variant="default" className="px-2.5 py-0.5">Login</Button></Link>
    </div>
    </div>
  );
}
