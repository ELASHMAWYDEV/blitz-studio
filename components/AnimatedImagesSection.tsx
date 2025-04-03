"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function AnimatedImagesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // First image: Animate from right to left
  const x1 = useTransform(scrollYProgress, [0, 0.3], ["100%", "0%"]);

  // Second image: Animate from bottom to top with trim effect
  const y2 = useTransform(scrollYProgress, [0.1, 0.4], ["100%", "12%"]);

  // Third image: Animate from right to left
  const x3 = useTransform(scrollYProgress, [0.4, 0.5], ["100%", "0%"]);

  // Swallow Bird Sticker animations
  const birdX = useTransform(scrollYProgress, [0.3, 0.5], ["100%", "0%"]);
  const birdY = useTransform(scrollYProgress, [0.2, 0.4], ["300%", "0%"]);
  const birdRotate = useTransform(scrollYProgress, [0.3, 0.5], [-45, 0]);
  const birdScale = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Blitz sticker animations
  const blitzY = useTransform(scrollYProgress, [0.4, 0.6], ["-300%", "0%"]);
  const blitzRotate = useTransform(scrollYProgress, [0.5, 0.7], [45, 0]);
  const blitzScale = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  // Overall opacity for the section
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      <div className="sticky top-0 min-h-screen w-full">
        <motion.div
          style={{ opacity }}
          className="relative w-full min-h-screen flex flex-col items-center justify-center"
        >
          {/* Top Text - Animate from right to left */}
          <motion.div style={{ x: x1 }} className="w-full z-[3] h-[30vh]">
            <Image
              src="/this-is-the-face.png"
              alt="This is the face"
              width={1200}
              height={140}
              className="w-full object-contain h-[50vh]"
              priority
            />
          </motion.div>

          {/* Center Portrait - Animate from bottom to top with trim effect */}
          <motion.div style={{ y: y2 }} className="w-full z-[2]">
            <Image
              src="/girl-portrait-bw.png"
              alt="Portrait"
              width={1200}
              height={200}
              className="object-contain object-center w-full"
              priority
            />
            {/* Yellow Circle with Bird */}
          </motion.div>

          {/* Bottom Text - Animate from right to left */}
          <motion.div style={{ x: x3 }} className="w-full z-[3] mt-[-3vh]">
            <Image
              src="/of-hard-work.png"
              alt="Of hard work"
              width={1200}
              height={200}
              className="w-full object-contain h-[50vh]"
              priority
            />
          </motion.div>

          {/* Swallow Bird Sticker */}
          <motion.div
            style={{
              y: birdY,
              rotate: birdRotate,
              scale: birdScale,
              x: birdX,
            }}
            className="absolute top-[15vh] left-[20%] w-[200px] h-[200px] z-[4]"
          >
            <Image
              src="/swallow-bird-sticker.png"
              alt="Swallow Bird Sticker"
              width={200}
              height={200}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>

          {/* Blitz Sticker */}
          <motion.div
            style={{
              y: blitzY,
              rotate: blitzRotate,
              scale: blitzScale,
            }}
            className="absolute bottom-[10vh] left-[45%] translate-x-[50%] w-[200px] h-[200px] z-[4]"
          >
            <Image
              src="/blitz-ford-sticker.png"
              alt="Blitz Sticker"
              width={200}
              height={200}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
