export default function GlobalMarquee() {
  const items = [
    "MERN STACK",
    "AI WORKFLOW AUTOMATION",
    "UI/UX DESIGN",
    "BUILD IN PUBLIC",
    "NEXT.JS",
    "N8N AUTOMATION",
    "FIGMA",
    "PYTHON",
    "CANVAS API",
    "100 DAYS OF DEV",
  ];

  const text = items.join("  ·  ") + "  ·  ";

  return (
    <div
      className="w-full overflow-hidden border-b border-border py-2 bg-void"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {/* Duplicate for seamless loop */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-mono text-[10px] text-graphite tracking-[0.3em] uppercase whitespace-nowrap px-4"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
