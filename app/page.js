"use client";

import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className={`${"bg-[#09090b] min-h-screen w-full"}`}>
      <main className=" min-h-screen w-full max-w-[1200px] m-auto  px-6 py-4">
        <Header />
        <Hero />
        <About />
        <Features />
        <Footer />
      </main>
    </div>
  );
}
