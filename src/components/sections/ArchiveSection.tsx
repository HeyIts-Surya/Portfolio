"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Placeholder photo metadata (real images to be added by user)
const PHOTOS = [
  { id: 1, title: "Cloud Study I", category: "Photography", date: "2025", aspect: "landscape" },
  { id: 2, title: "Urban Sketch", category: "Sketch", date: "2025", aspect: "portrait" },
  { id: 3, title: "Morning Light", category: "Photography", date: "2026", aspect: "square" },
  { id: 4, title: "Plant Study", category: "Photography", date: "2025", aspect: "portrait" },
  { id: 5, title: "Character Doodle", category: "Illustration", date: "2025", aspect: "square" },
  { id: 6, title: "Cloud Study II", category: "Photography", date: "2026", aspect: "landscape" },
  { id: 7, title: "Anime Sketch", category: "Illustration", date: "2026", aspect: "portrait" },
  { id: 8, title: "Everyday Moment", category: "Photography", date: "2026", aspect: "square" },
  { id: 9, title: "Architecture", category: "Photography", date: "2025", aspect: "landscape" },
];

const ASPECT_CLASSES = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

export default function ArchiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filters = ["All", "Photography", "Sketch", "Illustration"];

  const filtered = activeFilter === "All"
    ? PHOTOS
    : PHOTOS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".archive-heading",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".archive-heading",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          ".archive-item",
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: ".archive-grid",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12 border-b border-border"
    >
      {/* Section heading */}
      <div className="archive-heading opacity-0 mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-amber tracking-[0.3em] uppercase">
            04 //
          </span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-parchment font-bold leading-tight mb-4">
          Things I Notice
        </h2>
        <p className="font-sans text-graphite text-sm max-w-md leading-relaxed mb-6">
          Not everything I make begins with a plan. Sometimes I see something worth keeping, and I capture it.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-all duration-200",
                activeFilter === filter
                  ? "border-amber text-amber"
                  : "border-border text-graphite hover:border-parchment/30 hover:text-parchment/60"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Contact sheet grid */}
      <div className="archive-grid columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((photo) => (
          <div
            key={photo.id}
            className="archive-item opacity-0 break-inside-avoid group cursor-pointer"
          >
            {/* Placeholder card */}
            <div
              className={cn(
                "relative w-full border border-border bg-surface overflow-hidden",
                ASPECT_CLASSES[photo.aspect as keyof typeof ASPECT_CLASSES]
              )}
            >
              {/* Placeholder noise pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Category color wash */}
              <div
                className={cn(
                  "absolute inset-0 opacity-5",
                  photo.category === "Photography"
                    ? "bg-blue-500"
                    : photo.category === "Illustration"
                    ? "bg-purple-500"
                    : "bg-amber"
                )}
              />

              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-[8px] text-graphite/60 tracking-widest uppercase">
                  {photo.category}
                </span>
                <span className="font-mono text-[9px] text-parchment/20 mt-1">
                  [ image placeholder ]
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-void/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="font-serif text-sm text-parchment font-medium leading-tight">
                  {photo.title}
                </p>
                <span className="font-mono text-[9px] text-graphite mt-1">
                  {photo.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload note */}
      <div className="mt-8 pt-6 border-t border-border">
        <p className="font-mono text-[10px] text-graphite/50 tracking-wider">
          {"//"} Photography, sketches &amp; doodles will be added as the archive grows
        </p>
      </div>
    </section>
  );
}
