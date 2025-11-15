"use client"

import { signOut } from "next-auth/react";

const BtnLogOut = () => {
  return (
    <button
    className="bg-blue-700 text-white rounded-md px-8 py-1"
      onClick={async () => {
        await signOut({ redirectTo: "/" });
      }}
    >
      BtnLogOut
    </button>
  );
};

export default BtnLogOut;
