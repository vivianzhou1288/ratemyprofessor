import { Bot, Rocket } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* <Bot color="white" /> */}
        <p className="text-white font-medium text-lg">Critique</p>
      </div>
      <div
        className=" hidden sm:flex items-center justify-between gap-10 px-5 text-[13px]
      p-1 rounded-md text-[#868686]"
      >
        <p className="p-1 cursor-pointer hover:text-[#59a7ce]">Features</p>
        <p className="p-1 cursor-pointer hover:text-[#59a7ce]">About</p>
        <p className="p-1 cursor-pointer hover:text-[#59a7ce]">Contact</p>
      </div>
      <p className="text-white text-[12px] sm:text-[13px] py-1 px-4 rounded-md bg-[#262626] cursor-pointer hover:bg-[#404040]">
        Get Started ⚡️
      </p>
    </div>
  );
};

export default Header;
