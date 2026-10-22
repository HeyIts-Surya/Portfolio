"use client";

import { HIGHLIGHTS } from "@/lib/data";
import { ArrowUpRight, Award, Zap, Code, ShieldCheck, Sparkles } from "lucide-react";

export default function HighlightsSection() {
  const getIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "national hackathon":
      case "national sih":
        return <Award className="w-4 h-4 text-amber" />;
      case "leadership":
        return <ShieldCheck className="w-4 h-4 text-amber" />;
      case "build in public":
        return <Code className="w-4 h-4 text-amber" />;
      case "ai engineering":
        return <Sparkles className="w-4 h-4 text-amber" />;
      default:
        return <Zap className="w-4 h-4 text-amber" />;
    }
  };

  // Duplicate items array for seamless infinite marquee scroll
  const marqueeItems = [...HIGHLIGHTS, ...HIGHLIGHTS];

  return (
    <section
      id="highlights"
      className="relative py-12 border-b border-border bg-void/50 overflow-hidden"
    >
      <div className="px-6 lg:px-12 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-amber tracking-[0.25em] uppercase border border-amber/30 px-2 py-0.5 rounded">
            02 // HIGHLIGHTS
          </span>
          <span className="w-6 h-px bg-border" />
          <h2 className="font-serif text-xl sm:text-2xl text-parchment font-bold">
            Key Milestones &amp; Honors
          </h2>
        </div>
        <p className="font-mono text-[11px] text-graphite tracking-wider">
          {"//"} Click card to open verified LinkedIn announcement ↗
        </p>
      </div>

      <div className="highlights-marquee">
        <div className="highlights-marquee__track">
          {marqueeItems.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="highlights-marquee__card group"
              aria-label={`View highlight: ${item.title}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="highlights-marquee__icon-box">
                    {getIcon(item.tag)}
                  </div>
                  <span className="font-mono text-[9px] text-graphite tracking-wider flex items-center gap-1 group-hover:text-amber transition-colors">
                    <span>{item.date}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <div className="mb-2">
                  <span className="font-mono text-[9px] text-amber uppercase tracking-widest block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-sans text-sm font-semibold text-parchment leading-snug group-hover:text-amber transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-[11px] text-graphite leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
