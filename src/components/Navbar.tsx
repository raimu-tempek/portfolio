"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Works", href: "#works" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
] as const;

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=6289525365675&text&type=phone_number&app_absent=0";

function Logo() {
  return (
    <Link href="#home" className="relative z-20 flex shrink-0 items-center gap-2 group">
      <div className="relative flex h-8 w-8 items-center justify-center transition-transform duration-200 group-hover:rotate-12">
        <Image
          src="/assets/logo header.png"
          alt="Logo"
          width={26}
          height={26}
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}

function HireButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative z-20 inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-[13px] font-bold text-accent shadow-sm transition-all hover:bg-white/90 active:scale-95 sm:px-5 sm:py-2 sm:text-[14px] ${className}`}
    >
      Let’s work
    </a>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6">
      {/* Static pill navbar — always full, never changes on scroll */}
      <nav className="pointer-events-auto relative flex w-full max-w-[560px] items-center justify-between gap-2 rounded-full bg-accent px-4 py-2.5 shadow-xl shadow-accent/20 sm:px-5 md:max-w-[620px]">
        <Logo />

        {/* Menu — desktop only (mobile uses the dropdown below) */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-white transition-opacity hover:opacity-80"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* "Let's work" CTA — rendered at every breakpoint (compact on phones) so the
            primary action is always one tap away. */}
        <div className="relative z-20 shrink-0">
          <HireButton />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="p-1 text-white focus:outline-none md:hidden"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="pointer-events-auto fixed left-4 right-4 top-20 z-50 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-accent/95 p-5 text-white shadow-2xl backdrop-blur-md md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[15px] font-medium hover:opacity-80"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full rounded-full bg-white px-5 py-2.5 text-center text-[14px] font-bold text-accent shadow-sm hover:bg-white/90"
          >
            Let’s work
          </a>
        </div>
      )}
    </header>
  );
}
