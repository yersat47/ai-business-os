import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { PillarsSection } from "@/components/landing/PillarsSection";
import { DemoHealthWidget } from "@/components/landing/DemoHealthWidget";
import { CTASection } from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <HeroSection />
      <ProblemSection />
      <PillarsSection />
      <DemoHealthWidget />
      <CTASection />
    </div>
  );
}
