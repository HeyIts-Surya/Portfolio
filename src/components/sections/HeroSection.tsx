"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CONTACT } from "@/lib/data";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.fromTo(
          ".hero-meta",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );

        tl.fromTo(
          ".hero-name",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
          "-=0.2"
        );

        tl.fromTo(
          ".hero-tagline",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );

        tl.fromTo(
          ".hero-description",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.2"
        );

        tl.fromTo(
          ".hero-actions",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.2"
        );

        tl.fromTo(
          ".hero-photo-container",
          { opacity: 0, scale: 0.94, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        );
      }, containerRef);
    };

    initGSAP();

    return () => {
      ctx?.revert();
    };
  }, []);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToJourney = () => {
    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center py-16 px-6 lg:px-12 border-b border-border"
    >
      <div className="hero-two-col w-full">
        {/* Left Column: Bio & Identity */}
        <div className="hero-two-col__content">
          {/* Metadata pill */}
          <div className="hero-meta opacity-0 mb-6 flex items-center gap-3">
            <span className="font-mono text-[10px] text-amber tracking-[0.25em] uppercase px-2 py-0.5 border border-amber/30 rounded">
              01 // DEVELOPER &amp; ARCHITECT
            </span>
            <span className="w-8 h-px bg-border" />
            <span className="font-mono text-[10px] text-graphite tracking-[0.15em]">
              B.TECH IT · HNBGU
            </span>
          </div>

          {/* Name */}
          <div className="hero-name opacity-0 mb-5">
            <h1
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-parchment leading-[1.05] tracking-tight chroma-hover"
              data-text="Suryansh Yadav"
            >
              Suryansh
              <br />
              <span className="text-parchment/75">Yadav</span>
            </h1>
          </div>

          {/* Tagline */}
          <div className="hero-tagline opacity-0 mb-5">
            <p className="font-sans text-base sm:text-lg text-parchment/80 max-w-xl leading-relaxed">
              Full-Stack Developer, AI workflow builder, and UI/UX craftsman.
              Specialized in scalable MERN architectures, automation engineering, and polished,
              motion-first web interfaces.
            </p>
          </div>

          {/* Subline */}
          <div className="hero-description opacity-0 mb-8">
            <p className="font-mono text-xs sm:text-sm text-graphite tracking-wide">
              {"//"} Part developer&apos;s workspace · Part creative laboratory · Always shipping.
            </p>
          </div>

          {/* Actions */}
          <div className="hero-actions opacity-0 flex flex-wrap items-center gap-4">
            <button onClick={scrollToWork} className="btn-primary">
              [ Explore Work ]
            </button>
            <button onClick={scrollToJourney} className="btn-secondary">
              [ Journey Timeline ]
            </button>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-mono text-xs text-graphite hover:text-amber transition-colors duration-200 ml-2"
            >
              Get in touch →
            </a>
          </div>
        </div>

        {/* Right Column: Transparent Cutout Photo Card */}
        <div className="hero-two-col__media hero-photo-container opacity-0">
          <div className="hero-two-col__photo-frame group">
            {/* Ambient Background Gradient Orbs */}
            <div className="absolute top-12 -left-8 w-44 h-44 rounded-full bg-amber/15 blur-3xl pointer-events-none" />
            <div className="absolute top-24 -right-8 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            {/* Cutout Photo */}
            <div className="relative w-full h-full flex items-end justify-center z-10 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
              <Image
                src="/images/suryansh-cutout.svg"
                alt="Suryansh Yadav — Full Stack Developer & UI Engineer"
                width={360}
                height={480}
                priority
                className="w-auto h-[92%] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)] select-none"
              />
            </div>

            {/* Floating Live Status Pill */}
            <div className="hero-two-col__badge-pill">
              <span className="status-dot" />
              <span>Available for opportunities</span>
            </div>

            {/* Corner Decorative Tech Coordinate */}
            <div className="absolute top-4 right-4 z-20 font-mono text-[9px] text-graphite/40 tracking-widest uppercase pointer-events-none">
              30.13° N, 78.78° E
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
