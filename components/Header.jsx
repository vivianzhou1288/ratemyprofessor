import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* <Bot color="white" /> */}
        <Image
          src={Logo}
          alt=""
          width={30}
          className="bg-[#90C5DF] rounded-md"
        />
        <p className="text-white font-medium text-lg">Critique</p>
      </div>
      <div
        className=" hidden sm:flex items-center justify-between gap-10 px-5 text-[13px]
      p-1 rounded-md text-[#868686]"
      >
        <a href="#features">
          <p className="p-1 cursor-pointer hover:text-[#59a7ce]">Features</p>
        </a>
        <a href="#about">
          <p className="p-1 cursor-pointer hover:text-[#59a7ce]">About</p>
        </a>
      </div>
        {/* <p className="text-white text-[12px] sm:text-[13px] py-2 px-6 rounded-md bg-[#1c1d22] cursor-pointer hover:bg-[#24252a]">
          Get Started ⚡️
        </p> */}
        <div className = "flex ">
          <Link href="/signup">
            <p className="text-white text-[12px] sm:text-[13px] py-2 px-6 rounded-md bg-[#1c1d22] cursor-pointer hover:bg-[#24252a] mr-3">
              Sign Up
            </p>
          </Link>
          <Link href="/signin">
            <p className="text-white text-[12px] sm:text-[13px] py-2 px-6 rounded-md bg-[#1c1d22] cursor-pointer hover:bg-[#24252a]">
            Login
            </p>
          </Link>
        </div>
    </div>
  );
};

export default Header;
