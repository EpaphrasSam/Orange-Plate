import LoginCard from "@/components/pages/login/LoginCard";
import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div className="relative flex flex-col md:flex-row h-screen w-screen">
      <div className="relative bg-white w-full md:w-[40%] flex items-center justify-center">
        <LoginCard />
      </div>
      <div className="relative hidden md:block w-full md:w-[60%] h-full">
        <Image
          src="/Dashboard.png"
          alt="Dashboard background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
    </div>
  );
}
