"use client";
import React, { useState, useEffect } from "react";
import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = () => {
      const userData = localStorage.getItem("user");

      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        console.log("No user found in local storage");
      }
    };

    fetchUser();
  }, []);
  return (
    <div className={`${"bg-[#09090b] min-h-screen w-full"}`}>
      <main className=" min-h-screen w-full max-w-[1200px] m-auto  px-6 py-4">
        <div className="z-10 sticky">
          <Header user={user} />
        </div>
        <div>
          <Hero user={user} />
          <About />
          <Features />
          <Footer />
        </div>
      </main>
    </div>
  );
}
