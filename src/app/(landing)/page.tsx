import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Divider } from "@/components/landing/divider";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { Stats } from "@/components/landing/stats";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="relative overflow-hidden bg-[#05050A]">
          {/* Perspective grid background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ perspective: "400px" }}
          >
            <div
              style={{
                position: "absolute",
                left: "-20%",
                right: "-20%",
                top: "0",
                bottom: "0",
                transformOrigin: "center bottom",
                transform: "rotateX(55deg)",
                backgroundImage: `
                  linear-gradient(to right, #7C3AED18 1px, transparent 1px),
                  linear-gradient(to bottom, #7C3AED18 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            />
          </div>
          <Divider />
          <HowItWorks />
          <Divider />
          <Features />
          <Divider />
          <Stats />
          <FinalCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
