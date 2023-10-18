"use client";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleGoBack = () => {
    console.log("click button");
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen  ">
      <div className="bg-slate-700 p-4 rounded-lg text-white flex flex-col gap-4 w-2/3 md:w-1/2 lg:w-1/4 xl:w-1/5 items-center">
        <FaExclamationTriangle size={64} className="fill-red-500" />

        <h1>WebSocket Connection Error</h1>
        <p>There was an error with the WebSocket connection.</p>
        <button
          onClick={handleGoBack}
          type="submit"
          className="bg-slate-400 p-2 rounded-md"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Page;
