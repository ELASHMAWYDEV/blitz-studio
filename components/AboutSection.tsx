"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const canY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <>
      <style jsx global>{`
        @keyframes gentleBounce {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes shadowBounce {
          0%,
          100% {
            transform: translateX(-50%) scaleX(1) scaleY(1);
            opacity: 0.15;
          }
          50% {
            transform: translateX(-50%) scaleX(0.8) scaleY(0.7);
            opacity: 0.08;
          }
        }

        .can-container {
          position: relative;
        }

        .can-image {
          animation: gentleBounce 3s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .can-container:hover .can-image {
          transform: translateY(-10px) rotate(2deg);
        }

        .can-shadow {
          position: absolute;
          bottom: -25px;
          left: 60%;
          transform: translateX(-50%);
          width: 50%;
          height: 20px;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 1) 0%,
            transparent 80%
          );
          border-radius: 50%;
          z-index: -1;
          animation: shadowBounce 3s ease-in-out infinite;
          transform-origin: center;
        }

        .can-container:hover .can-shadow {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .can-shadow {
            bottom: -15px;
            width: 50%;
            height: 20px;
          }

          @keyframes gentleBounce {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full bg-white py-20 lg:py-32"
      >
        <motion.div
          style={{ opacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
            {/* Text Content */}
            <motion.div style={{ y: textY }} className="space-y-6">
              <div className="text-lg lg:text-xl xl:text-2xl font-arial font-normal text-black leading-relaxed italic">
                <p className="mb-6 max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
              </div>
            </motion.div>

            {/* Can Image with Shadow */}
            <motion.div
              style={{ y: canY }}
              className="relative flex justify-center lg:justify-end items-center"
            >
              <div className="can-container">
                <Image
                  src="/blitz-can.png"
                  alt="Blitz Can"
                  width={400}
                  height={600}
                  className="can-image object-contain w-full h-auto max-w-[300px] lg:max-w-[400px]"
                  priority
                />
                <div className="can-shadow" />
              </div>
            </motion.div>
          </div>

          {/* "Reel it in." Text */}
          <motion.div
            style={{ y: textY }}
            className="text-center mt-10 lg:mt-16"
          >
            <h2 className="text-3xl lg:text-4xl xl:text-2xl font-arial font-extrabold text-black">
              Reel <span className="font-thin text-md">it in</span>.
            </h2>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
