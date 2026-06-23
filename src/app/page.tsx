import { AnimatedBackground } from "@/components/visuals/AnimatedBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Problems } from "@/components/sections/Problems";
import { Solutions } from "@/components/sections/Solutions";
import { Methodology } from "@/components/sections/Methodology";
import { Results } from "@/components/sections/Results";
import { Authority } from "@/components/sections/Authority";
import { SocialProof } from "@/components/sections/SocialProof";
import { DiagnosticForm } from "@/components/sections/DiagnosticForm";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Problems />
        <Solutions />
        <Methodology />
        <Results />
        <Authority />
        <SocialProof />
        <DiagnosticForm />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
