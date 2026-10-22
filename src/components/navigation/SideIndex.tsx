"use client";

import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface SideIndexProps {
  activeSection: string;
}

export default function SideIndex({ activeSection }: SideIndexProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="hidden lg:flex flex-col justify-center gap-1 h-full py-8 px-6"
      aria-label="Section index"
    >
      {/* Editorial logo / identity */}
      <div className="mb-10">
        <p className="font-mono text-[10px] text-graphite tracking-[0.25em] uppercase mb-1">
          Portfolio
        </p>
        <p className="font-mono text-[10px] text-graphite tracking-[0.15em] uppercase">
          v2026.10
        </p>
      </div>

      {/* Navigation items */}
      <div className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "group flex items-center gap-3 py-3 px-0 text-left transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber",
                isActive ? "text-parchment" : "text-graphite hover:text-parchment"
              )}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Active indicator line */}
              <span className="relative flex items-center w-5 flex-shrink-0">
                <motion.span
                  className="absolute left-0 h-px bg-amber"
                  initial={false}
                  animate={{ width: isActive ? 20 : 8, opacity: isActive ? 1 : 0.3 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>

              {/* Number */}
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.2em] transition-colors duration-200",
                  isActive ? "text-amber" : "text-graphite group-hover:text-graphite"
                )}
              >
                {item.number}
              </span>

              {/* Label */}
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.2em] transition-colors duration-200",
                  isActive ? "text-parchment" : ""
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom metadata */}
      <div className="mt-auto pt-8 border-t border-border">
        <p className="font-mono text-[9px] text-graphite tracking-[0.1em] leading-relaxed">
          Suryansh Yadav<br />
          HNBGU, India<br />
          B.Tech IT — 2024–2028
        </p>
      </div>
    </nav>
  );
}
