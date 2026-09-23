import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceStatsSection from "@/components/ExperienceStatsSection";
import WhatCanIDoSection from "@/components/WhatCanIDoSection";
import ProjectGallerySection from "@/components/ProjectGallerySection";
import ContactAndFooter from "@/components/ContactAndFooter";
import Ribbons from "@/components/Ribbons";

export default function Home() {
  return (
    <main className="relative min-h-screen text-textPrimary selection:bg-accent selection:text-white">
      {/* Ribbons background — fixed, full-viewport, behind all content */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Ribbons colors={["#017BFC"]} />
      </div>

      {/* All page content — sits above the ribbon background */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Floating Pill Navbar */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Experience & Stats Section */}
        <ExperienceStatsSection />

        {/* What Can I Do Section */}
        <WhatCanIDoSection />

        {/* Project Gallery Section */}
        <ProjectGallerySection />

        {/* Contact Me & Full-bleed Blue Footer */}
        <ContactAndFooter />
      </div>
    </main>
  );
}
