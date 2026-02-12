import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Tokenomics } from "@/components/landing/tokenomics";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Tokenomics />
      </main>
      <Footer />
    </>
  );
}
