import { HeroSection } from "@/components/home/hero-section";
import { PopularHalls } from "@/components/home/popular-halls";
import { SdmeShowcase } from "@/components/home/sdme-showcase";
import { ReviewHighlight } from "@/components/home/review-highlight";
import { FeatureSection } from "@/components/home/feature-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularHalls />
      <SdmeShowcase />
      <FeatureSection />
      <ReviewHighlight />
    </>
  );
}
