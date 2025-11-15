"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";





const Header = () => {
    const {data,status}=useSession();
    
  return (
    <div className="bg-blue-950 py-8 flex items-center px-2.5 mb-8 text-white h-15">
       <div>
         {data && <Link href="/dashboard">Dashboard</Link>}
         {!data && status !== "loading" && <Link href="/login">Login</Link>}
       </div>
    </div>
  )
}

export default Header