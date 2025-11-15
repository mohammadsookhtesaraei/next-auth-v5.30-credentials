"use client";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';

interface FormT {
  email: string;
  password: string;
}

const Login = () => {
    //  یوز روتر 
 const router=useRouter();
//  تعریف استیت برای مدیریت فرم ها
  const [formData, setFormData] = useState<FormT>({
    email: "",
    password: "",
  });

  
// انچینج و ست استیت 
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value}=e.target;
    setFormData((prevFormDat)=>({...prevFormDat,[name]:value}))
  };

//   فرم هندلر

  const submitHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
 
    e.preventDefault();

     const res=await signIn("credentials",{
        email:formData.email,
        password:formData.password,
        redirect:false
     });
     if(res.error){
        toast.error(res.error)
     }else {
        router.push("/")
     }
  };



  return (
    <div className="max-w-7xl mx-auto  flex items-center justify-center h-dvh">
      <form onSubmit={submitHandler} className="w-6/12 p-8 flex flex-col rounded-md border border-gray-200 shadow-md">
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="email">E-mail</label>
          <input
            className="border border-gray-200/75 rounded-md focus:outline-none focus:border-dashed focus:border-blue-400 ps-5 text-gray-400 py-1"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            placeholder="email"
            onChange={changeHandler}
          />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="password">Password</label>
          <input
            className="border border-gray-200/75 rounded-md focus:outline-none focus:border-dashed focus:border-blue-400 ps-5 text-gray-400 py-1"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="password"
            onChange={changeHandler}
          />
        </div>
        <button className="mt-5 cursor-pointer bg-blue-500 w-6/12 self-center py-1.5 rounded-md text-white hover:scale-105 active:scale-95 transition-transform duration-200 ease-out" type="submit">Login</button>
      </form>
      <Toaster/>
    </div>
  );
};

export default Login;
