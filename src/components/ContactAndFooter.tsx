"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactAndFooter() {
  return (
    <div id="contact" className="pt-16">
      {/* Contact Me CTA Area */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28"
      >
        {/* Giant Headline - Centered */}
        <h2 className="font-satoshi font-black text-accent text-[56px] sm:text-[80px] md:text-[100px] lg:text-[112px] tracking-tight leading-none select-none text-center w-full">
          Let’s turn your vision into visuals.
        </h2>

        {/* Subtitle & WhatsApp Button */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-[960px] mx-auto">
          <p className="font-satoshi text-textPrimary text-[16px] sm:text-[18px] md:text-[19px] leading-relaxed max-w-[480px] text-center md:text-left">
            Whether you&apos;re looking for a designer, a product thinker, or
            someone who can bridge creative and business — let&apos;s talk.
          </p>

          {/* WhatsApp Button with slight scale & brightness on hover */}
          <a
            href="https://wa.me/6289525365675"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3.5 bg-accent hover:bg-blue-600 hover:brightness-105 hover:scale-105 active:scale-95 text-white px-6 py-3.5 rounded-2xl shadow-button transition-all duration-200 sm:px-7 sm:py-4"
          >
            <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/assets/Whatsapp.svg"
                alt="WhatsApp"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-satoshi font-bold text-[18px] sm:text-[22px] tracking-tight">
              +6289525365675
            </span>
          </a>
        </div>
      </motion.section>

      {/* Full-bleed Blue Footer (Clean without watermark logo) */}
      <footer className="w-full bg-accent text-white relative overflow-hidden pt-16 pb-8">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-16 md:mb-20">
            {/* Nav Menu */}
            <div className="md:col-span-6 flex flex-wrap gap-8 sm:gap-12">
              <Link
                href="#home"
                className="text-[17px] sm:text-[20px] font-medium text-white hover:opacity-80 transition-opacity"
              >
                Home
              </Link>
              <Link
                href="#works"
                className="text-[17px] sm:text-[20px] font-medium text-white hover:opacity-80 transition-opacity"
              >
                Works
              </Link>
              <Link
                href="#about"
                className="text-[17px] sm:text-[20px] font-medium text-white hover:opacity-80 transition-opacity"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-[17px] sm:text-[20px] font-medium text-white hover:opacity-80 transition-opacity"
              >
                Contact
              </Link>
            </div>

            {/* Social Media Column with Specific URLs */}
            <div className="md:col-span-6 flex flex-col items-start md:items-end">
              <div className="flex flex-col items-start">
                <span className="text-[15px] sm:text-[17px] font-medium text-white/90 mb-3">
                  Social Media
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.linkedin.com/in/faishaal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[16px] sm:text-[18px] font-medium text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href="https://www.instagram.com/faishaalsyy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[16px] sm:text-[18px] font-medium text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href="https://www.threads.com/@ngapainedit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[16px] sm:text-[18px] font-medium text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    <span>Threads</span>
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href="https://x.com/shialss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[16px] sm:text-[18px] font-medium text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    <span>Twitter</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Giant Display Name */}
          <div className="mb-4">
            <h1 className="font-satoshi font-black text-[46px] sm:text-[82px] md:text-[110px] lg:text-[124px] tracking-tight text-white leading-none select-none">
              M Faishal Syarif
            </h1>
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1.5px] bg-white/40 mb-4" />

          {/* Bottom Legal & Copyright Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] sm:text-[13px] text-white/80 font-normal">
            <p>© 2026 Muhammad Faishal Syarif. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Link href="#contact" className="hover:underline">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="#contact" className="hover:underline">
                Terms and Condition
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
