"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ServiceSectionProps {
  imageUrl: string;
  services: string[];
  title: string;
}

export default function ServiceSection({
  imageUrl,
  services,
  title,
}: ServiceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Fade in effect for the content
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Parallax effect for the image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Parallax effect for the title (slower movement)
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Parallax effect for the services list (medium movement)
  const servicesY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-16">
      <motion.div style={{ opacity }} className="w-full">
        {/* Title */}
        <motion.div
          style={{ y: titleY }}
          className="mx-auto px-4 sm:px-6 lg:px-8 mb-0 w-full flex justify-start items-center"
        >
          <h1 className="text-4xl lg:text-6xl xl:text-[120px] font-arial font-black italic text-black">
            {title}
          </h1>
        </motion.div>

        {/* Full Width Image with Parallax */}
        <div className="relative w-full h-[15vh] md:h-[30vh] lg:h-[40vh] mb-16 overflow-hidden">
          <motion.div style={{ y: imageY }} className="w-full h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain object-center w-screen h-auto"
              priority
            />
          </motion.div>
        </div>

        {/* Services List with Glitch Effect */}
        <motion.div
          style={{ y: servicesY }}
          className="mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  textShadow: [
                    "0 0 0 transparent",
                    "2px 0 0 #ff0000, -2px 0 0 #00ffff",
                    "0 0 0 transparent",
                    "1px 0 0 #ff0000, -1px 0 0 #00ffff",
                    "0 0 0 transparent",
                  ],
                  x: [0, 2, -2, 1, 0],
                  transition: {
                    duration: 0.3,
                    times: [0, 0.25, 0.5, 0.75, 1],
                  },
                }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl lg:text-3xl xl:text-4xl font-arial text-black cursor-pointer select-none w-full"
                style={{
                  filter: "contrast(1.2)",
                }}
              >
                {service.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={i % 2 === 0 ? "font-black" : "font-normal"}
                  >
                    {word}
                    {i < service.split(" ").length - 1 ? " " : ""}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes glitch {
          0%,
          100% {
            text-shadow: 0 0 0 transparent;
            transform: translateX(0);
          }
          20% {
            text-shadow: 2px 0 0 #ff0000, -2px 0 0 #00ffff;
            transform: translateX(2px);
          }
          40% {
            text-shadow: -1px 0 0 #ff0000, 1px 0 0 #00ffff;
            transform: translateX(-2px);
          }
          60% {
            text-shadow: 1px 0 0 #ff0000, -1px 0 0 #00ffff;
            transform: translateX(1px);
          }
          80% {
            text-shadow: 0 0 0 transparent;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
