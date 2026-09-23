"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";

interface ExperienceItem {
  role: string;
  meta: string;
  isPast?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    role: "Freelance Creative",
    meta: "2026 | Remote | Self-Employed",
    isPast: false,
  },
  {
    role: "UI/UX Practicum Assistant",
    meta: "2026 | On-Site | Contract",
    isPast: true,
  },
  {
    role: "Graphic Designer — Simetriee",
    meta: "2025–2026 | On-Site | Internship",
    isPast: true,
  },
  {
    role: "Video Editor — Jeville Samael",
    meta: "2023–2024 | Remote | Freelance",
    isPast: true,
  },
];

export default function ExperienceStatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: My Experience Card */}
        <div className="md:col-span-4 bg-[#F5F5F7] rounded-4xl p-6 sm:p-7 flex flex-col justify-between border border-borderSubtle/60 shadow-sm hover:scale-[1.01] transition-transform duration-300">
          <div>
            {/* Pill Badge */}
            <div className="inline-block max-w-full bg-white text-textPrimary text-[13px] font-bold px-4 py-1.5 rounded-full shadow-sm mb-6">
              Experience that goes beyond the brief
            </div>

            {/* Timeline List */}
            <div className="relative pl-5 space-y-6 before:content-[''] before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-borderSubtle">
              {experiences.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <span
                    className={`absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                      index === 0 ? "bg-textSecondary" : "bg-textPrimary"
                    }`}
                  />
                  <h4 className="font-bold text-[15px] leading-snug text-textPrimary">
                    {exp.role}
                  </h4>
                  <p className="text-[12px] text-textSecondary mt-0.5 font-normal">
                    {exp.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Education */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Top Card: Stats with CountUp */}
          <div className="bg-white rounded-4xl p-7 sm:p-9 border border-borderSubtle shadow-sm flex flex-col justify-center hover:scale-[1.01] transition-transform duration-300">
            {/* One column on phones so the numbers never crowd, three across from tablet up. */}
            <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:gap-3 md:gap-6">
              {/* Stat 1 */}
              <div>
                <div className="font-satoshi font-black text-accent text-[38px] sm:text-[50px] lg:text-[56px] leading-none tracking-tight">
                  <CountUp
                    end={2}
                    duration={1.8}
                    enableScrollSpy
                    scrollSpyOnce
                    suffix="+"
                  />
                </div>
                <div className="text-[13px] sm:text-[15px] text-textSecondary mt-2 font-normal">
                  Years creating
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="font-satoshi font-black text-accent text-[38px] sm:text-[50px] lg:text-[56px] leading-none tracking-tight">
                  <CountUp
                    end={150}
                    duration={1.8}
                    enableScrollSpy
                    scrollSpyOnce
                    suffix="+"
                  />
                </div>
                <div className="text-[13px] sm:text-[15px] text-textSecondary mt-2 font-normal">
                  Designs delivered
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="font-satoshi font-black text-accent text-[38px] sm:text-[50px] lg:text-[56px] leading-none tracking-tight">
                  <CountUp
                    end={6}
                    duration={1.8}
                    enableScrollSpy
                    scrollSpyOnce
                    suffix="+"
                  />
                </div>
                <div className="text-[13px] sm:text-[15px] text-textSecondary mt-2 font-normal">
                  Clients & projects
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Education with Stamp / Dashed Yellow Avatar */}
          <div className="relative bg-white rounded-4xl p-6 sm:p-7 border border-borderSubtle shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-visible hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/assets/logo telkom.png"
                  alt="Telkom University"
                  width={46}
                  height={46}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-[16px] sm:text-[18px] text-textPrimary leading-tight">
                  Telkom University Surabaya — Digital Business
                </h3>
                <p className="text-[13px] sm:text-[14px] text-textSecondary mt-1">
                  2022–2026 | 3.77 / 4.00 | Cum Laude
                </p>
              </div>
            </div>

            {/* Avatar - Pure & Natural without frame, border, shadow, or rotation */}
            <div className="self-end sm:self-center flex-shrink-0 relative">
              <img
                src="/assets/muka-animasi.png"
                alt="Muhammad Faishal Syarif Animated Avatar"
                className="hero-photo-muka-animasi"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
