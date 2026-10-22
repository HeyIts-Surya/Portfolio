"use client";

import { useEffect, useRef, useState } from "react";
import { TIMELINE_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Sparkles } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  origin: "text-graphite border-graphite",
  education: "text-parchment border-parchment",
  milestone: "text-amber border-amber",
  hackathon: "text-amber border-amber",
  certification: "text-parchment/70 border-parchment/40",
  challenge: "text-amber border-amber",
  role: "text-amber border-amber",
};

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSnapshotIndex, setActiveSnapshotIndex] = useState(0);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Observe each timeline node to sync active snapshot
        const items = document.querySelectorAll(".timeline-node-track");
        items.forEach((item, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => setActiveSnapshotIndex(index),
            onEnterBack: () => setActiveSnapshotIndex(index),
          });
        });

        // Vertical line reveal
        gsap.fromTo(
          ".timeline-line-reveal",
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          }
        );
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  const currentSnapshot = TIMELINE_ITEMS[activeSnapshotIndex]?.snapshot || TIMELINE_ITEMS[0].snapshot;
  const currentItem = TIMELINE_ITEMS[activeSnapshotIndex] || TIMELINE_ITEMS[0];

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12 border-b border-border"
    >
      {/* Section Heading */}
      <div className="mb-14">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-amber tracking-[0.3em] uppercase border border-amber/30 px-2 py-0.5 rounded">
            04 //
          </span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-parchment font-bold leading-tight mb-3">
          An Ongoing Process
        </h2>
        <p className="font-sans text-graphite text-sm max-w-lg leading-relaxed">
          Chronological chapters of growth, late-night debugging, hackathon sprints, and engineering milestones.
        </p>
      </div>

      <div className="journey-layout">
        {/* Left Column: Timeline Items */}
        <div className="timeline-container relative pl-8 md:pl-12">
          {/* Vertical Track Line */}
          <div
            className="timeline-line-reveal absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber/60 to-transparent"
            style={{ transformOrigin: "top" }}
          />

          <div className="flex flex-col gap-0">
            {TIMELINE_ITEMS.map((item, index) => {
              const isActive = activeSnapshotIndex === index;
              const isLast = index === TIMELINE_ITEMS.length - 1;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "timeline-node-track relative pb-12 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-90",
                    isLast && "pb-4"
                  )}
                  onMouseEnter={() => setActiveSnapshotIndex(index)}
                >
                  {/* Anchor Point Icon */}
                  <div className="absolute -left-8 md:-left-12 -top-0.5 w-6 flex items-center justify-center">
                    <span
                      className={cn(
                        "w-3 h-3 rounded-full border-2 flex items-center justify-center text-[8px] transition-all duration-300",
                        isActive
                          ? "bg-amber border-amber shadow-[0_0_12px_rgba(217,119,66,0.8)] scale-110"
                          : "bg-surface border-border"
                      )}
                    />
                  </div>

                  {/* Node Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] text-graphite tracking-[0.2em] uppercase">
                        {item.date}
                      </span>
                      {isActive && (
                        <span className="font-mono text-[9px] text-amber tracking-wider bg-amber/10 px-1.5 py-0.2 rounded border border-amber/30">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <h3
                      className={cn(
                        "font-serif text-lg md:text-xl font-bold mb-2 transition-colors duration-200",
                        isActive ? "text-amber" : "text-parchment"
                      )}
                    >
                      {item.title}
                    </h3>

                    <p className="font-sans text-graphite text-xs sm:text-sm leading-relaxed max-w-lg mb-3">
                      {item.description}
                    </p>

                    <span
                      className={cn(
                        "inline-block font-mono text-[9px] tracking-wider border px-2 py-0.5 rounded",
                        TYPE_COLORS[item.type] || "text-graphite border-graphite"
                      )}
                    >
                      {item.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Context-Synced Sticky Photo & Media Snapshot */}
        <div className="journey-layout__snapshots-sticky">
          <div className="journey-layout__snapshot-card">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/50">
              <span className="font-mono text-[10px] text-amber tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber" />
                Snapshot Archive
              </span>
              <span className="font-mono text-[10px] text-graphite flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {currentSnapshot.year}
              </span>
            </div>

            {/* Dynamic Snapshot Graphic Box with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="journey-layout__snapshot-image-box flex flex-col items-center justify-center p-6 text-center"
              >
                {/* Visual Ambient Glow based on active theme */}
                <div
                  className="absolute inset-0 opacity-15 blur-2xl pointer-events-none"
                  style={{ backgroundColor: currentSnapshot.themeColor }}
                />

                <span className="text-5xl mb-4 select-none filter drop-shadow">
                  {currentSnapshot.symbol}
                </span>

                <h4 className="font-serif text-lg font-bold text-parchment mb-2">
                  {currentItem.title}
                </h4>

                <p className="font-mono text-xs text-graphite leading-relaxed max-w-xs">
                  {currentSnapshot.caption}
                </p>

                <div className="mt-4 pt-3 border-t border-border/40 w-full flex items-center justify-between font-mono text-[10px] text-graphite/70">
                  <span>LOG #{activeSnapshotIndex + 1}</span>
                  <span className="text-amber uppercase">{currentItem.type}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
