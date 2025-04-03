"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ScatterText from "./ScatterText";

// Linear interpolation function for smooth transitions
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

export default function HeroSection() {
  const circleRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const targetRotationRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const baseRotationRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate target rotation based on scroll position
      const scrollPosition = window.scrollY;
      targetRotationRef.current = scrollPosition * 0.2; // Adjust this multiplier to control rotation speed
    };

    const animate = () => {
      // Update base rotation (slow continuous rotation)
      baseRotationRef.current = (baseRotationRef.current + 0.1) % 360;

      // Smoothly interpolate between current rotation and target rotation
      const currentRotation = rotation;
      const targetRotation =
        targetRotationRef.current + baseRotationRef.current;

      // Use a small factor for smoother transitions (0.05 = 5% of the way to target per frame)
      const newRotation = lerp(currentRotation, targetRotation, 0.05);

      setRotation(newRotation);

      if (circleRef.current) {
        circleRef.current.style.transform = `rotate(${newRotation}deg)`;
      }

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [rotation]);

  return (
    <main className="pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center">
        {/* Circular Text and Bird Image */}
        <div className="fixed w-[32rem] h-[32rem] mb-12 mix-blend-difference z-[100]">
          <div ref={circleRef} className="absolute inset-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="textPath"
                d="M50,10 A40,40 0 1,1 49.9999,10"
                fill="none"
                className="text-white"
              />
              <text className="text-[8px]">
                <textPath
                  href="#textPath"
                  startOffset="0%"
                  className="font-arial font-black fill-white mix-blend-difference"
                >
                  Redefining creativity, one frame at a time
                </textPath>
              </text>
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80">
            <Image
              src="/swallow-bird.png"
              alt="Swallow Bird"
              className="absolute inset-0 w-full h-full invert"
              width={300}
              height={300}
            />
            <Image
              src="/swallow-bird.png"
              alt="Swallow Bird"
              className="absolute inset-0 w-full h-full invert"
              width={300}
              height={300}
            />
            <Image
              src="/swallow-bird.png"
              alt="Swallow Bird"
              className="absolute inset-0 w-full h-full invert"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="w-[32rem] h-[32rem] mb-12" />

        {/* Tagline */}
        <div className="space-y-4 max-w-2xl mt-12">
          <h1 className="text-lg font-arial font-bold">
            <ScatterText
              text="Beyond the surface, we deliver into the depths of creativity."
              className="font-bold"
            />
            <ScatterText
              text="Join us on this extraordinary journey"
              className="font-bold"
            />
          </h1>
          <p className="text-sm font-arial-narrow font-light">
            Started at <span className="font-bold">Cairo, Egypt</span>
          </p>
        </div>
      </div>
    </main>
  );
}
