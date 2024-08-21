"use client";

import Dashboard from "@/components/Dashboard";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  let user = true;
  return (
    <div
      className={`${
        user
          ? "bg-[#1e1f24] min-h-screen w-full fixed"
          : "bg-[#09090b] min-h-screen w-full"
      }`}
    >
      {user ? (
        <Dashboard />
      ) : (
        <main className=" min-h-screen w-full max-w-[1200px] m-auto  px-6 py-4">
          <Header />
          <Hero />
          <Features />
          <Footer />
        </main>
      )}
    </div>
  );
}
