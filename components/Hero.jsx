import Image from "next/image";
import React from "react";
import placeholderDemo from "@/public/demo.png";
import Link from "next/link";

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
        <Link href="/signup">
          <p className=" w-fit text-white text-[13px] py-3 px-6 rounded-md bg-[#1c1d22] cursor-pointer hover:bg-[#24252a] mt-7 ">
            Get Started For Free
          </p>
        </Link>
        <p className=" w-fit text-white text-[13px] py-3 px-6 rounded-md bg-[#1c1d22] cursor-pointer hover:bg-[#24252a] mt-7 ">
          Learn More
        </p>
      </div>
      <Image
        src={placeholderDemo}
        alt="CritiqueDemoVid"
        className="w-[90%] m-auto my-10 rounded-md"
      />
    </div>
  );
};

export default Hero;
