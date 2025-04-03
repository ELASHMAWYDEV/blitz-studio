"use client";

import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import AnimatedImagesSection from "../components/AnimatedImagesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Animated Images Section */}
      <AnimatedImagesSection />
      <div className="h-[400px]" />
    </div>
  );
}
