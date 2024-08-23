import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg-[#09090b] min-h-screen w-full">
      <main className=" min-h-screen w-full max-w-[1200px] m-auto px-6 py-4">
        <Link href="/">
          <p className="text-white font-medium text-lg">Critique</p>
        </Link>
        <div className="min-h-screen flex justify-center items-center">
          <div>
            <p className="mt-10 text-[#b2b0b0] text-center text-[13px]">
              Professor Reviews | AI-Driven Insights
            </p>
            <h1 className="mt-3 text-white text-3xl text-center font-light">
              Sign Up And Start Making <br />{" "}
              <span className="gradient-blue"> Informed Choices</span>
            </h1>
            <div className=" m-auto max-w-[340px] mt-10 flex flex-col gap-3">
              <input
                placeholder="Full Name..."
                type="text"
                required
                className="w-full outline-none bg-transparent border-2 focus:bg-[#14141b] border border-[#28282e] text-white py-3 px-4 text-sm rounded-md"
              />
              <input
                placeholder="Email Address..."
                type="email"
                required
                className="w-full outline-none bg-transparent border-2 focus:bg-[#14141b] border border-[#28282e] text-white py-3 px-4 text-sm rounded-md"
              />
              <input
                placeholder="Password..."
                type="password"
                required
                className="w-full outline-none bg-transparent border-2 focus:bg-[#14141b] border border-[#28282e] text-white py-3 px-4 text-sm rounded-md"
              />
              <button className="flex items-center justify-center gap-2 w-full outline-none  bg-[#14141b] text-[#b2b0b0] hover:bg-[#21212a] py-3 px-4 text-sm rounded-md">
                Signup <ArrowRight size={15} />
              </button>

              <button className="flex items-center justify-center gap-2 w-full outline-none  bg-[#14141b] text-[#b2b0b0] hover:bg-[#21212a] py-3 px-4 text-sm rounded-md">
                Signup With Google
              </button>
              <h1 className="text-[#b2b0b0] text-center text-[12px] p-1 flex gap-1 justify-center mb-40">
                Already have an account?{" "}
                <Link href="/signin">
                  <p className="gradient-blue hover:underline">Sign In</p>
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
