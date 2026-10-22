export const NAV_ITEMS = [
  { id: "home", label: "HOME", number: "01" },
  { id: "highlights", label: "HIGHLIGHTS", number: "02" },
  { id: "work", label: "WORK", number: "03" },
  { id: "journey", label: "JOURNEY", number: "04" },
  { id: "profile", label: "SKILLS & CONTACT", number: "05" },
] as const;

export type NavItemId = (typeof NAV_ITEMS)[number]["id"];

export const PROJECTS = [
  {
    id: "chalkdraw",
    title: "Chalkdraw",
    category: "Canvas Engineering",
    tags: ["JavaScript", "Canvas API", "WebGL"],
    status: "Built",
    description:
      "A native JavaScript canvas interaction project featuring real-time multi-layer drawing, 3D chalk texture effects, and custom brush physics. Demonstrates low-level DOM graphics mastery without any drawing library.",
    highlight: true,
    year: "2025",
    link: null,
    repo: null,
  },
  {
    id: "nutriscan",
    title: "Nutri-Scan",
    category: "Hackathon — UI/UX",
    tags: ["Figma", "React", "UI/UX"],
    status: "Semi-Finalist",
    description:
      "Eat Right Youth Hackathon 2026 semi-finalist project built with Team PeakCoders. Designed comprehensive wireframes and UI flows for a nutrition scanning mobile app. Led wireframing, prototyping, and design system creation.",
    highlight: true,
    year: "2026",
    link: null,
    repo: null,
  },
  {
    id: "personal-assistant",
    title: "Personal Assistant AI",
    category: "AI & Automation",
    tags: ["n8n", "Streamlit", "Google Workspace", "Gemini"],
    status: "Built",
    description:
      "A personal productivity assistant integrating n8n automation workflows with a Streamlit frontend, connected to Google Workspace APIs (Gmail, Calendar, Drive). Handles email triage, schedule management, and document processing via AI.",
    highlight: true,
    year: "2026",
    link: null,
    repo: null,
  },
  {
    id: "anvaya",
    title: "ANVAYA",
    category: "Hackathon — Concept",
    tags: ["React", "Node.js", "MongoDB"],
    status: "SIH 2025 — Stage 1",
    description:
      "Smart India Hackathon 2025 concept built with Team Liquid8. A platform for connecting rural artisans with urban markets through AI-powered product discovery and multilingual support.",
    highlight: false,
    year: "2025",
    link: null,
    repo: null,
  },
  {
    id: "creatorOS",
    title: "CreatorOS",
    category: "Product Concept",
    tags: ["Next.js", "Tailwind", "Notion API"],
    status: "Concept",
    description:
      "A unified creator workspace combining content calendar, analytics dashboard, and AI writing assistant. Designed for independent creators managing multi-platform content operations.",
    highlight: false,
    year: "2025",
    link: null,
    repo: null,
  },
  {
    id: "saas-dashboard",
    title: "Next-Gen SaaS",
    category: "Interface Engineering",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    status: "Built",
    description:
      "A high-fidelity SaaS dashboard interface with complex data visualization, dark theme, and polished micro-interactions. Focus on frontend architecture and component design systems.",
    highlight: false,
    year: "2025",
    link: null,
    repo: null,
  },
  {
    id: "recreations",
    title: "Interface Recreations",
    category: "Frontend Practice",
    tags: ["HTML/CSS", "JavaScript", "Figma"],
    status: "Built",
    description:
      "Precision recreations of Apple product pages, Lay's campaign landing page, and a fully functional Tic-Tac-Toe game. Practice in pixel-accurate translation from design to code.",
    highlight: false,
    year: "2024–2025",
    link: null,
    repo: null,
  },
];

export const TIMELINE_ITEMS = [
  {
    id: "curiosity",
    date: "2019–2023",
    title: "The Curiosity Phase",
    description:
      "First encounters with computers. Started tinkering with HTML, exploring how websites were made. The seed of developer curiosity planted during secondary school.",
    type: "origin",
    icon: "◎",
    snapshot: {
      year: "2019–2023",
      caption: "Early explorations: HTML, CSS, inspect element curiosity.",
      themeColor: "#8a8f98",
      symbol: "💻",
    },
  },
  {
    id: "hnbgu",
    date: "July 2024",
    title: "B.Tech IT @ HNBGU",
    description:
      "Enrolled in B.Tech Information Technology at Hemwati Nandan Bahuguna Garhwal University. The formal journey begins — data structures, algorithms, and serious programming fundamentals.",
    type: "education",
    icon: "◉",
    snapshot: {
      year: "2024",
      caption: "Campus & computer lab sessions. Diving deep into C, DSA, & architecture.",
      themeColor: "#e6e4d9",
      symbol: "🏛️",
    },
  },
  {
    id: "ecell",
    date: "October 2025",
    title: "E-Cell IIT Bombay Exposure",
    description:
      "Participated in E-Cell IIT Bombay programs, gaining firsthand exposure to startup ecosystems, product thinking, and the intersection of technology and entrepreneurship.",
    type: "milestone",
    icon: "◈",
    snapshot: {
      year: "2025",
      caption: "IIT Bombay E-Cell Bootcamp — Ideation, MVP strategies, and pitch decks.",
      themeColor: "#d97742",
      symbol: "🚀",
    },
  },
  {
    id: "sih",
    date: "November 2025",
    title: "Smart India Hackathon 2025",
    description:
      "Cleared Stage 1 of SIH 2025 with Team Liquid8 for project ANVAYA — a platform connecting rural artisans with digital markets. First serious hackathon experience.",
    type: "hackathon",
    icon: "◆",
    snapshot: {
      year: "Late 2025",
      caption: "SIH Stage 1 qualification. Team Liquid8 sprint whiteboard sessions.",
      themeColor: "#d97742",
      symbol: "🏆",
    },
  },
  {
    id: "prompt",
    date: "December 2025",
    title: "Prompt to Prototype Certification",
    description:
      "Completed the 'Prompt to Prototype' certification, mastering the workflow from ideation prompts to working prototypes using AI-assisted development tools.",
    type: "certification",
    icon: "◉",
    snapshot: {
      year: "Dec 2025",
      caption: "AI workflow prototyping — Google for Startups certification.",
      themeColor: "#8a8f98",
      symbol: "⚡",
    },
  },
  {
    id: "100days",
    date: "June 2026",
    title: "100 Days of Development",
    description:
      "Launched the 100 Days of Development challenge — a daily discipline of building, learning, and shipping. Simultaneously completing Cisco Python Essentials 1.",
    type: "challenge",
    icon: "◈",
    snapshot: {
      year: "Mid 2026",
      caption: "100 Days of Code streak & Cisco Python Essentials 1 certification.",
      themeColor: "#d97742",
      symbol: "🔥",
    },
  },
  {
    id: "sheryians",
    date: "June 2026",
    title: "Sheryians Coding School",
    description:
      "Enrolled in structured MERN stack training at Sheryians Coding School — deepening expertise in MongoDB, Express, React, and Node.js with industry-grade projects.",
    type: "education",
    icon: "◉",
    snapshot: {
      year: "2026",
      caption: "Full stack engineering drills — auth, database relations, and state machines.",
      themeColor: "#ededed",
      symbol: "⚙️",
    },
  },
  {
    id: "tpic",
    date: "July 2026",
    title: "TPIC, HNBGU — Technology & Development",
    description:
      "Stepped into a role in Technology & Development at the Technology & Placement and Incubation Cell, HNBGU. Contributing to institutional tech infrastructure and developer programs.",
    type: "role",
    icon: "★",
    snapshot: {
      year: "Present",
      caption: "TPIC HNBGU Tech Cell — Internal web platforms and hackathon mentorship.",
      themeColor: "#d97742",
      symbol: "💼",
    },
  },
  {
    id: "eatright",
    date: "July 2026",
    title: "Eat Right Hackathon — Semi-Finalist",
    description:
      "Team PeakCoders placed as semi-finalist at the Eat Right Youth Hackathon 2026 with Nutri-Scan. Led UI/UX design and wireframing across the full submission.",
    type: "hackathon",
    icon: "◆",
    snapshot: {
      year: "2026",
      caption: "National Semi-Finalist — Figma design system and interactive prototype.",
      themeColor: "#22c55e",
      symbol: "🎖️",
    },
  },
];

export const SKILL_CATEGORIES_DATA = [
  {
    id: "languages",
    title: "Languages",
    icon: "code",
    skills: ["Python", "JavaScript (ES6+)", "TypeScript", "C / C++", "HTML5", "CSS3 / SCSS", "SQL"],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    icon: "server",
    skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "PostgreSQL Basics", "JWT Auth", "System Design Fundamentals"],
  },
  {
    id: "frontend",
    title: "Frontend & Mobile",
    icon: "layout",
    skills: ["React.js", "Next.js 15 (App Router)", "Tailwind CSS", "GSAP & ScrollTrigger", "Lenis", "Framer Motion", "Figma to Code"],
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    icon: "cloud",
    skills: ["Git & GitHub", "Docker Basics", "Vercel", "Postman", "Linux / Bash", "CI/CD Workflows"],
  },
  {
    id: "ai_ml",
    title: "AI & Automation",
    icon: "cpu",
    skills: ["n8n Workflows", "Google Gemini API", "Streamlit", "LLM Prompt Engineering", "AI Agent Pipelines"],
  },
];

export const HIGHLIGHTS = [
  {
    id: "hl-1",
    title: "Semi-Finalist @ Eat Right Youth Hackathon 2026",
    tag: "National Hackathon",
    date: "July 2026",
    description: "Built Nutri-Scan with Team PeakCoders. Led comprehensive wireframing, UI/UX systems & mobile prototypes.",
    linkedinUrl: "https://linkedin.com/in/suryanshyadav",
  },
  {
    id: "hl-2",
    title: "Technology & Dev Lead @ TPIC HNBGU",
    tag: "Leadership",
    date: "July 2026",
    description: "Appointed to institutional development team driving digital placements portal and student tech initiatives.",
    linkedinUrl: "https://linkedin.com/in/suryanshyadav",
  },
  {
    id: "hl-3",
    title: "Smart India Hackathon 2025 Stage 1 Cleared",
    tag: "National SIH",
    date: "Nov 2025",
    description: "Project ANVAYA selected in preliminary round connecting rural crafts with modern e-commerce channels.",
    linkedinUrl: "https://linkedin.com/in/suryanshyadav",
  },
  {
    id: "hl-4",
    title: "100 Days of Code Sprint",
    tag: "Build In Public",
    date: "June 2026",
    description: "Committed to daily shipping, open-source code logging, and architectural deep-dives across MERN & Python.",
    linkedinUrl: "https://linkedin.com/in/suryanshyadav",
  },
  {
    id: "hl-5",
    title: "E-Cell IIT Bombay Entrepreneurship Bootcamp",
    tag: "Innovation",
    date: "Oct 2025",
    description: "Completed intensive workshop on product market fit, scalable systems, and rapid MVP engineering.",
    linkedinUrl: "https://linkedin.com/in/suryanshyadav",
  },
  {
    id: "hl-6",
    title: "Prompt to Prototype Certification",
    tag: "AI Engineering",
    date: "Dec 2025",
    description: "Google for Startups program: Built generative AI workflows and functional applications in days.",
    linkedinUrl: "https://linkedin.com/in/suryanshyadav",
  },
];

export const CERTIFICATIONS = [
  {
    title: "Python Essentials 1",
    issuer: "Cisco",
    date: "June 2026",
    type: "Technical",
  },
  {
    title: "Prompt to Prototype",
    issuer: "Google for Startups",
    date: "December 2025",
    type: "AI/Product",
  },
  {
    title: "E-Cell Bootcamp",
    issuer: "IIT Bombay",
    date: "October 2025",
    type: "Entrepreneurship",
  },
];

export const CONTACT = {
  email: "hey.its.surya.code@gmail.com",
  github: "https://github.com/Suryansh-CodeFramer",
  linkedin: "https://linkedin.com/in/suryanshyadav",
  location: "Uttarakhand, India",
};
