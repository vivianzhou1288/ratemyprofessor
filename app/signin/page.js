// ./app/signin/page.js

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignIn() {
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error text if not JSON
        console.error("Server error:", errorText);
        setError(errorText); // Set error state for display
        return;
      }

      const data = await response.json();
      console.log("Sign-in successful:", data);

      // Save user data and token in local storage or session storage
      localStorage.setItem("user", JSON.stringify(data.userData));

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("An unexpected error occurred."); // Set a generic error message
    }
  }

  return (
    <div className="bg-[#09090b] min-h-screen w-full">
      <main className="min-h-screen w-full max-w-[1200px] m-auto px-6 py-4">
        <Link href="/">
          <p className="text-white font-medium text-lg">Critique</p>
        </Link>
        <div className="min-h-screen flex justify-center items-center">
          <div>
            <p className="mt-10 text-[#b2b0b0] text-center text-[13px]">
              Professor Reviews | AI-Driven Insights
            </p>
            <h1 className="mt-3 text-white text-3xl text-center font-light">
              Sign In To Continue Making <br />
              <span className="gradient-blue">Informed Choices</span>
            </h1>
            <div className="m-auto max-w-[340px] mt-10 flex flex-col gap-3">
              <input
                placeholder="Email Address..."
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full outline-none bg-transparent border-2 focus:bg-[#14141b] border border-[#28282e] text-white py-3 px-4 text-sm rounded-md"
              />
              <input
                placeholder="Password..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full outline-none bg-transparent border-2 focus:bg-[#14141b] border border-[#28282e] text-white py-3 px-4 text-sm rounded-md"
              />
              {error && <p className="text-red-500 text-center">{error}</p>}
              <button
                onClick={handleSignIn}
                className="flex items-center justify-center gap-2 w-full outline-none bg-[#14141b] text-[#b2b0b0] hover:bg-[#21212a] py-3 px-4 text-sm rounded-md"
              >
                Sign In <ArrowRight size={15} />
              </button>
              <button className="flex items-center justify-center gap-2 w-full outline-none bg-[#14141b] text-[#b2b0b0] hover:bg-[#21212a] py-3 px-4 text-sm rounded-md">
                Sign In With Google
              </button>
              <h1 className="text-[#b2b0b0] text-center text-[12px] p-1 flex gap-1 justify-center mb-40">
                Don&apos;t have an account?{" "}
                <Link href="/signup">
                  <p className="gradient-blue hover:underline">Signup</p>
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
