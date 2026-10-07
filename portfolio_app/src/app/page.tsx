import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
