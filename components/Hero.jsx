import Image from "next/image";
import React from "react";
import placeholderDemo from "@/public/placeholder.jpg";

const Hero = () => {
  return (
    <div className="mt-20">
      <h1 className="text-white text-3xl text-center">
        Discover The Perfect{" "}
        <span className="font-semibold rounded-md gradient-blue">
          Professor
        </span>{" "}
        For You
      </h1>
      <p className="text-[12px] sm:text-base text-white text-center mt-3">
        Your AI-Powered Guide to Smarter Course Choices
      </p>
      <div className="flex gap-5 justify-center">
        <p className=" w-fit text-white text-[13px] py-2 px-6 rounded-md bg-[#262626] cursor-pointer hover:bg-[#404040] mt-7">
          Get Started ⚡️
        </p>
        <p className=" w-fit text-white text-[13px] py-2 px-6 rounded-md bg-[#262626] cursor-pointer hover:bg-[#404040] mt-7">
          Learn More
        </p>
      </div>
      <Image
        src={placeholderDemo}
        alt="CritiqueDemoVid"
        className="w-[70%] m-auto my-10 rounded-md"
      />
    </div>
  );
};

export default Hero;
