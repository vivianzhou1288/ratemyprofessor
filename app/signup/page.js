"use client";
import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/logo.png";

const Page = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          fullName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sign-up successful:", data);
      // Redirect user after successful sign-up
      router.push("/signin");
    } catch (error) {
      console.error("Sign-up error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-[#09090b] min-h-screen w-full">
      <main className="min-h-screen w-full max-w-[1200px] m-auto px-6 py-4">
        <div className="">
          {/* <Bot color="white" /> */}
          <Link className="flex gap-3 items-center" href="/">
            <Image
              src={Logo}
              alt=""
              width={30}
              className="bg-[#90C5DF] rounded-md"
            />
            <p className="text-white font-medium text-lg">Critique</p>
          </Link>
        </div>
        <div className="min-h-screen flex justify-center items-center">
          <div>
            <p className="mt-10 text-[#b2b0b0] text-center text-[13px]">
              Professor Reviews | AI-Driven Insights
            </p>
            <h1 className="mt-3 text-white text-3xl text-center font-light">
              Sign Up And Start Making <br />{" "}
              <span className="gradient-blue"> Informed Choices</span>
            </h1>
            <div className="m-auto max-w-[340px] mt-10 flex flex-col gap-3">
              <input
                placeholder="Full Name..."
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full outline-none bg-transparent border-2 focus:bg-[#14141b] border border-[#28282e] text-white py-3 px-4 text-sm rounded-md"
              />
              <input
                placeholder="Email Address..."
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent border-2 focus:bg-[#14141b] border border-[#28282e] text-white py-3 px-4 text-sm rounded-md"
              />
              <input
                placeholder="Password..."
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent border-2 focus:bg-[#14141b] border border-[#28282e] text-white py-3 px-4 text-sm rounded-md"
              />
              <button
                onClick={handleSignUp} // Attach handleSignUp function
                className="flex items-center justify-center gap-2 w-full outline-none bg-[#14141b] text-[#b2b0b0] hover:bg-[#21212a] py-3 px-4 text-sm rounded-md"
              >
                Signup <ArrowRight size={15} />
              </button>

              <button className="flex items-center justify-center gap-2 w-full outline-none bg-[#14141b] text-[#b2b0b0] hover:bg-[#21212a] py-3 px-4 text-sm rounded-md">
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

export default Page;
