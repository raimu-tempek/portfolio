"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import BlurText from "./BlurText";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [startTitle, setStartTitle] = useState(false);
  const [startSubtitle, setStartSubtitle] = useState(false);
  const [startLocation, setStartLocation] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Timer 1: langsung trigger render/mulai judul di 0ms
          setStartTitle(true);

          // Timer 2: trigger subjudul setelah 50ms
          t2 = setTimeout(() => {
            setStartSubtitle(true);
          }, 50);

          // Timer 3: trigger teks Surabaya setelah 100ms
          t3 = setTimeout(() => {
            setStartLocation(true);
          }, 100);

          if (heroRef.current) {
            observer.unobserve(heroRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroRef.current);

    return () => {
      observer.disconnect();
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <motion.section
      ref={heroRef}
      id="home"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pt-32 md:pt-40 pb-16 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8"
    >
      {/* Open to work Badge with Pulsing Dot */}
      <div className="inline-flex max-w-full items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-borderSubtle bg-white text-[13px] leading-snug text-textPrimary font-medium shadow-sm mb-6 sm:mb-8 sm:gap-2.5 sm:px-4 sm:text-[14px] hover:border-gray-300 transition-colors">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
        </span>
        <span>Open to freelance & creative opportunities</span>
      </div>

      {/* Main Headline with BlurText */}
      <div className="max-w-[880px] mx-auto text-center font-satoshi font-bold tracking-tight text-[28px] sm:text-[34px] md:text-[42px] lg:text-[46px] leading-[1.35] text-textPrimary">
        {/* Line 1: Judul mulai di 0ms (langsung begitu masuk viewport) */}
        <BlurText
          text="Hi, I'm Muhammad Faishal Syarif"
          delay={100}
          animateBy="words"
          direction="bottom"
          className="justify-center items-center"
          start={startTitle}
        />

        {/* Line 2: Subjudul mulai di 50ms setelah judul mulai */}
        <BlurText
          text="Freelance Graphic Design & Video Editor"
          delay={100}
          animateBy="words"
          direction="bottom"
          className="mt-1 sm:mt-2 text-textPrimary justify-center items-center"
          start={startSubtitle}
        />

        {/* Line 3: Teks Surabaya mulai di 100ms setelah judul mulai */}
        <BlurText
          text="based in Surabaya, Indonesia"
          delay={100}
          animateBy="words"
          direction="bottom"
          className="mt-1 sm:mt-2 justify-center items-center"
          start={startLocation}
        />
      </div>

      {/* Dual CTA Buttons with hover scale & brightness */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="https://api.whatsapp.com/send/?phone=6289525365675&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-accent text-white font-bold text-[14px] px-7 py-3.5 rounded-full shadow-button hover:bg-blue-600 hover:brightness-105 hover:scale-105 active:scale-95 transition-all duration-200 sm:text-[15px] sm:px-8"
        >
          Let’s work together
        </a>
        <Link
          href="#works"
          className="inline-flex items-center justify-center gap-1.5 bg-white text-accent border-2 border-accent font-bold text-[14px] px-6 py-[13px] rounded-full hover:bg-accent/5 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm sm:text-[15px] sm:px-7"
        >
          <span>View my work</span>
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </Link>
      </div>
    </motion.section>
  );
}
