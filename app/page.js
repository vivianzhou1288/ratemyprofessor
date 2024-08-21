import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-4">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
