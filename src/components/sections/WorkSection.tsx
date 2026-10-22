"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import ProjectDrawer from "@/components/ui/ProjectDrawer";

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Section heading reveal
        gsap.fromTo(
          ".work-heading",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".work-heading",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Staggered card reveals
        gsap.fromTo(
          ".project-card-animated",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".projects-grid",
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

  const highlighted = PROJECTS.filter((p) => p.highlight);
  const others = PROJECTS.filter((p) => !p.highlight);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12 border-b border-border"
    >
      {/* Section heading */}
      <div className="work-heading opacity-0 mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-amber tracking-[0.3em] uppercase">
            02 //
          </span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-parchment font-bold leading-tight mb-4">
          Things I&apos;ve Tried to
          <br />
          <span className="text-parchment/60">Bring to Life</span>
        </h2>
        <p className="font-sans text-graphite max-w-lg text-sm leading-relaxed">
          Projects, prototypes, experiments, and ideas that taught me something along the way.
        </p>
      </div>

      {/* Projects grid */}
      <div className="projects-grid">
        {/* Highlighted row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {highlighted.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Other projects row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              compact
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project drawer */}
      {selectedProject && (
        <ProjectDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
  compact?: boolean;
  onClick: () => void;
}

function ProjectCard({ project, compact = false, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "project-card-animated opacity-0 project-card group text-left w-full rounded-none bg-surface p-6 transition-all duration-300 ease-premium",
        compact ? "p-4" : "p-6"
      )}
      aria-label={`View ${project.title} project details`}
    >
      {/* Top row: category + status */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[9px] text-graphite tracking-[0.2em] uppercase">
          {project.category}
        </span>
        <span
          className={cn(
            "font-mono text-[9px] tracking-wider px-2 py-0.5 border",
            project.status.includes("Built")
              ? "border-parchment/20 text-parchment/60"
              : project.status.includes("Semi-Finalist") || project.status.includes("★")
              ? "border-amber/30 text-amber"
              : "border-graphite/20 text-graphite"
          )}
        >
          [ {project.status} ]
        </span>
      </div>

      {/* Title */}
      <h3
        className={cn(
          "font-serif text-parchment font-bold leading-tight mb-3 group-hover:text-amber transition-colors duration-200",
          compact ? "text-lg" : "text-2xl"
        )}
      >
        {project.title}
      </h3>

      {/* Description (hidden on compact) */}
      {!compact && (
        <p className="font-sans text-graphite text-xs leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.slice(0, compact ? 2 : 4).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] text-graphite tracking-wider border border-border px-1.5 py-0.5"
          >
            {tag}
          </span>
        ))}
        {compact && project.tags.length > 2 && (
          <span className="font-mono text-[9px] text-graphite tracking-wider">
            +{project.tags.length - 2}
          </span>
        )}
      </div>

      {/* Arrow indicator */}
      <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="font-mono text-[10px] text-amber tracking-wider">
          View Details →
        </span>
      </div>

      {/* Year */}
      <div className="mt-2">
        <span className="font-mono text-[9px] text-graphite/50 tracking-wider">
          {project.year}
        </span>
      </div>
    </button>
  );
}
