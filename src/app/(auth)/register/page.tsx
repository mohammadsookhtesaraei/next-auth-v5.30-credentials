"use client";

import { useState } from "react";

interface FormT {
  email: string;
  password: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormT>({
    email: "",
    password: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value}=e.target;
    setFormData((prevFormDat)=>({...prevFormDat,[name]:value}))
  };

  const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
    console.log(formData);
    e.preventDefault();
    try{

    }catch(error:unknown){

    }
  }



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
            type="text"
            id="password"
            name="password"
            value={formData.password}
            placeholder="password"
            onChange={changeHandler}
          />
        </div>
        <button className="mt-5 cursor-pointer bg-blue-500 w-6/12 self-center py-1.5 rounded-md text-white hover:scale-105 active:scale-95 transition-transform duration-200 ease-out" type="submit">submit</button>
      </form>
    </div>
  );
};

export default Register;
