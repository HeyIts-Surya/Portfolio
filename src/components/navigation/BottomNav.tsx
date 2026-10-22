"use client";

import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface BottomNavProps {
  activeSection: string;
}

export default function BottomNav({ activeSection }: BottomNavProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bottom-nav"
      aria-label="Mobile section navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-2 rounded transition-colors duration-200 min-w-0",
                isActive ? "text-amber" : "text-graphite"
              )}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="font-mono text-[8px] tracking-widest">
                {item.number}
              </span>
              <span className="font-mono text-[7px] tracking-wider truncate">
                {item.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-indicator"
                  className="w-1 h-1 rounded-full bg-amber"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
