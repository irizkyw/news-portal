import React from "react";
import { HeroSection } from "@/components/news/HeroSection";
import { TrendingSection } from "@/components/news/TrendingSection";
import { LatestNews } from "@/components/news/LatestNews";
import { Newsletter } from "@/components/news/Newsletter";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrendingSection />
      <LatestNews />
      <Newsletter />
    </main>
  );
}
