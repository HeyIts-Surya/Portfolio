"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROJECTS } from "@/lib/data";

interface ProjectDrawerProps {
  project: (typeof PROJECTS)[0];
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 modal-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Drawer */}
        <motion.aside
          key="drawer"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-surface border-l border-border flex flex-col overflow-y-auto"
          role="dialog"
          aria-label={`${project.title} project details`}
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-5 border-b border-border sticky top-0 bg-surface z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[9px] text-graphite tracking-widest uppercase">
                  {project.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="font-mono text-[9px] text-amber tracking-wider">
                  [ {project.status} ]
                </span>
              </div>
              <h2 className="font-serif text-2xl text-parchment font-bold">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="font-mono text-[10px] text-graphite hover:text-parchment transition-colors duration-200 focus-visible:outline-amber mt-1 flex-shrink-0 ml-4"
              aria-label="Close project drawer"
            >
              [ Close ]
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-6 space-y-6">
            {/* Project placeholder visual */}
            <div className="aspect-video border border-border bg-void flex items-center justify-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="text-center">
                <span className="font-serif text-parchment/20 text-2xl font-bold block">
                  {project.title}
                </span>
                <span className="font-mono text-[9px] text-graphite/40 mt-2 block">
                  [ project preview ]
                </span>
              </div>
            </div>

            {/* Year + Tags */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[9px] text-graphite tracking-wider">
                  {project.year}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] text-graphite tracking-wider border border-border px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="font-mono text-[10px] text-amber tracking-[0.2em] uppercase block mb-3">
                {"//"} About This Project
              </span>
              <p className="font-sans text-parchment/80 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Links */}
            {(project.link || project.repo) && (
              <div className="flex gap-3 pt-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-4 py-2"
                  >
                    [ Live Project ]
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs px-4 py-2"
                  >
                    [ Repository ]
                  </a>
                )}
              </div>
            )}

            {!project.link && !project.repo && (
              <div className="border border-border/30 p-4">
                <p className="font-mono text-[9px] text-graphite/50 tracking-wider">
                  {"//"} Links will be added when the project is publicly available
                </p>
              </div>
            )}
          </div>
        </motion.aside>
      </>
    </AnimatePresence>
  );
}
