"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS, type NavItemId } from "@/lib/data";

import LenisProvider from "@/components/providers/LenisProvider";
import GrainOverlay from "@/components/ui/GrainOverlay";
import GlobalMarquee from "@/components/ui/GlobalMarquee";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SideIndex from "@/components/navigation/SideIndex";
import BottomNav from "@/components/navigation/BottomNav";

import HeroSection from "@/components/sections/HeroSection";
import HighlightsSection from "@/components/sections/HighlightsSection";
import WorkSection from "@/components/sections/WorkSection";
import JourneySection from "@/components/sections/JourneySection";
import ArchiveSection from "@/components/sections/ArchiveSection";
import ProfileSection from "@/components/sections/ProfileSection";

export default function ClientLayout() {
  const [activeSection, setActiveSection] = useState<NavItemId>("home");

  // Intersection Observer to track active section
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as NavItemId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <LenisProvider>
      {/* Global overlays */}
      <GrainOverlay />
      <ScrollProgress />

      {/* Top marquee */}
      <GlobalMarquee />

      {/* Main split layout */}
      <div className="flex min-h-screen">
        {/* Left: Main scrolling content (75%) */}
        <main
          className="flex-1 lg:w-3/4"
          id="main-content"
          tabIndex={-1}
        >
          <HeroSection />
          <HighlightsSection />
          <WorkSection />
          <JourneySection />
          <ArchiveSection />
          <ProfileSection />
        </main>

        {/* Right: Sticky index sidebar (25%) */}
        <aside className="hidden lg:block lg:w-1/4 sticky top-0 h-screen overflow-hidden border-l border-border">
          <SideIndex activeSection={activeSection} />
        </aside>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav activeSection={activeSection} />
    </LenisProvider>
  );
}
