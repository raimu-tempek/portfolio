"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceItem {
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    title: "Graphic Design",
    description:
      "From brand identity to campaign visuals, I create clear designs that give brands something worth remembering.",
  },
  {
    title: "Video Editing",
    description:
      "I turn raw footage into content people actually want to watch through pacing, motion graphics, transitions, and sound.",
  },
  {
    title: "UI/UX Design",
    description:
      "I design simple, intuitive digital experiences built around what users actually need.",
  },
];

export default function WhatCanIDoSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Left Column: Heading & Description & Download CV */}
        <div className="md:col-span-5 flex flex-col items-start">
          <h2 className="font-satoshi font-bold text-[32px] md:text-[38px] text-textPrimary tracking-tight">
            What can I do?
          </h2>
          <p className="mt-4 text-textSecondary text-[15px] sm:text-[16px] leading-relaxed max-w-[360px]">
            My Digital Business background helps me see beyond the visuals — creating design and content that make sense for both the audience and the business.
          </p>
          <div className="mt-8">
            <a
              href="/cv/Muhammad_Faishal_Syarif_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-accent text-white font-bold text-[15px] px-8 py-3.5 rounded-full shadow-button hover:bg-blue-600 hover:brightness-105 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Right Column: 3 Services List */}
        <div className="md:col-span-7 flex flex-col gap-8 md:gap-9">
          {services.map((item, index) => (
            <div key={index} className="group">
              <h3 className="font-satoshi font-bold text-[20px] md:text-[22px] text-textPrimary group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="mt-1.5 text-textSecondary text-[14px] sm:text-[15px] leading-relaxed max-w-[500px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
