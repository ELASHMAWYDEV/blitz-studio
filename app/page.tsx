"use client";

import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import AnimatedImagesSection from "../components/AnimatedImagesSection";
import ServiceSection from "../components/ServiceSection";
import BackgroundMusic from "../components/BackgroundMusic";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white max-w-screen overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Animated Images Section */}
      <AnimatedImagesSection />

      {/* Branding Services Section */}
      <ServiceSection
        imageUrl="/branding-services.png"
        title="branding services"
        services={[
          "Visual Identity & Branding Design",
          "Brand Guidelines",
          "Social Media Design",
          "Brand Strategy",
          "Website Design",
        ]}
      />

      {/* Photo Services Section */}
      <ServiceSection
        imageUrl="/photo-services.png"
        title="photo services"
        services={[
          "Portrait Photography",
          "Product Photography",
          "Commercial Photography",
          "Event Photography",
          "Studio Photography",
        ]}
      />

      {/* Video Services Section */}
      <ServiceSection
        imageUrl="/video-services.png"
        title="video services"
        services={[
          "Commercial Videos",
          "Music Videos",
          "Documentary Production",
          "Event Videography",
          "Motion Graphics",
        ]}
      />

      {/* Background Music Player */}
      <BackgroundMusic />

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
