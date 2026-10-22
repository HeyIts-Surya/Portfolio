"use client";

import { useEffect, useState } from "react";
import {
  SKILL_CATEGORIES_DATA,
  CERTIFICATIONS,
  CONTACT,
} from "@/lib/data";
import {
  Code,
  Server,
  Layout,
  Cloud,
  Cpu,
  Award,
  Terminal,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Activity,
  AlertCircle,
} from "lucide-react";

interface GitHubData {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  totalContributions: number;
  currentStreak: number;
  recentDays: Array<{ date: string; count: number; level: number }>;
}

interface LeetCodeData {
  username: string;
  profileUrl: string;
  ranking: string | null;
  contestRating: number | null;
  totalSolved: number;
  totalQuestions: number;
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
  acceptanceRate: string | null;
  contributionPoints: number;
}

export default function ProfileSection() {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState(false);

  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [leetcodeError, setLeetcodeError] = useState(false);

  useEffect(() => {
    // 1. Fetch genuine GitHub statistics
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("GitHub fetch error");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setGithub(data);
        } else {
          setGithubError(true);
        }
      })
      .catch(() => setGithubError(true))
      .finally(() => setGithubLoading(false));

    // 2. Fetch genuine LeetCode statistics
    fetch("/api/leetcode")
      .then((res) => {
        if (!res.ok) throw new Error("LeetCode fetch error");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setLeetcode(data);
        } else {
          setLeetcodeError(true);
        }
      })
      .catch(() => setLeetcodeError(true))
      .finally(() => setLeetcodeLoading(false));
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="skills-grid__icon" />;
      case "server":
        return <Server className="skills-grid__icon" />;
      case "layout":
        return <Layout className="skills-grid__icon" />;
      case "cloud":
        return <Cloud className="skills-grid__icon" />;
      case "cpu":
        return <Cpu className="skills-grid__icon" />;
      default:
        return <Terminal className="skills-grid__icon" />;
    }
  };

  return (
    <section id="profile" className="relative py-24 px-6 lg:px-12">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-4 mb-3">
          <span className="font-mono text-[10px] text-amber tracking-[0.3em] uppercase border border-amber/30 px-2 py-0.5 rounded">
            05 // SKILLS &amp; ACCOUNTS
          </span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-parchment font-bold leading-tight mb-3">
          Technical Arsenal &amp; Metrics
        </h2>
        <p className="font-sans text-graphite text-sm max-w-lg leading-relaxed">
          Production frameworks, verified credentials, and real-time activity metrics.
        </p>
      </div>

      {/* Skills Matrix: Badges & Pills Layout */}
      <div className="mb-16">
        <h3 className="font-mono text-xs text-amber tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
          <span>{"//"}</span> Categorized Tooling &amp; Frameworks
        </h3>

        <div className="skills-grid">
          {SKILL_CATEGORIES_DATA.map((cat) => (
            <div key={cat.id} className="skills-grid__category">
              <div className="skills-grid__header">
                {getCategoryIcon(cat.icon)}
                <h4 className="skills-grid__title">{cat.title}</h4>
              </div>
              <div className="skills-grid__pills">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skills-grid__pill">
                    <CheckCircle2 className="w-3 h-3 text-amber/80" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Developer Analytics & Problem Solving Panels */}
      <div className="mb-16">
        <h3 className="font-mono text-xs text-amber tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
          <span>{"//"}</span> Real Account Metrics &amp; Algorithms
        </h3>

        <div className="dev-metrics">
          {/* 1. Real GitHub Activity Card */}
          <div className="dev-metrics__card">
            <div className="dev-metrics__header">
              <div className="dev-metrics__title-group">
                <GitBranch className="w-5 h-5 text-amber" />
                <div>
                  <h4 className="font-sans text-sm font-semibold text-parchment">
                    GitHub Activity
                  </h4>
                  <span className="font-mono text-[10px] text-graphite">
                    @Suryansh-CodeFramer
                    {github && !githubLoading && ` · ${github.totalContributions} Contributions (Last Year)`}
                  </span>
                </div>
              </div>
              <a
                href={github?.profileUrl || "https://github.com/Suryansh-CodeFramer"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-amber hover:underline flex items-center gap-1"
                aria-label="View Suryansh-CodeFramer on GitHub"
              >
                Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Grid State Handling */}
            {githubLoading ? (
              <div className="dev-metrics__skeleton" />
            ) : githubError || !github ? (
              <div className="py-8 text-center border border-border/40 rounded flex flex-col items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5 text-graphite" />
                <p className="font-mono text-xs text-graphite">Unable to load contribution calendar</p>
                <a
                  href="https://github.com/Suryansh-CodeFramer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-amber hover:underline"
                >
                  View live on GitHub →
                </a>
              </div>
            ) : (
              <div className="dev-metrics__github-grid">
                {github.recentDays.map((d, i) => {
                  let levelClass = "";
                  if (d.level === 4) levelClass = "dev-metrics__github-cell--l4";
                  else if (d.level === 3) levelClass = "dev-metrics__github-cell--l3";
                  else if (d.level === 2) levelClass = "dev-metrics__github-cell--l2";
                  else if (d.level === 1) levelClass = "dev-metrics__github-cell--l1";

                  return (
                    <div
                      key={i}
                      className={`dev-metrics__github-cell ${levelClass}`}
                      title={`${d.date}: ${d.count} contribution${d.count === 1 ? "" : "s"}`}
                    />
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between font-mono text-[10px] text-graphite mt-3 pt-3 border-t border-border-subtle">
              <span>
                {githubLoading
                  ? "Loading statistics..."
                  : `${github?.publicRepos ?? 21} Repositories${github?.currentStreak ? ` · ${github.currentStreak} Day streak 🔥` : ""}`}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px]">Less</span>
                <span className="w-2 h-2 rounded-sm bg-border" />
                <span className="w-2 h-2 rounded-sm bg-amber/30" />
                <span className="w-2 h-2 rounded-sm bg-amber/70" />
                <span className="w-2 h-2 rounded-sm bg-amber" />
                <span className="text-[9px]">More</span>
              </div>
            </div>
          </div>

          {/* 2. Real LeetCode Stats Card */}
          <div className="dev-metrics__card">
            <div className="dev-metrics__header">
              <div className="dev-metrics__title-group">
                <Activity className="w-5 h-5 text-amber" />
                <div>
                  <h4 className="font-sans text-sm font-semibold text-parchment">
                    LeetCode Problem Solving
                  </h4>
                  <span className="font-mono text-[10px] text-graphite">
                    @4Kob0E01xg
                    {leetcode?.ranking ? ` · Ranking ${leetcode.ranking}` : " · Active Solver"}
                  </span>
                </div>
              </div>
              <a
                href="https://leetcode.com/u/4Kob0E01xg/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-amber hover:underline flex items-center gap-1"
                aria-label="View 4Kob0E01xg on LeetCode"
              >
                Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {leetcodeLoading ? (
              <div className="dev-metrics__skeleton" />
            ) : leetcodeError || !leetcode ? (
              <div className="py-8 text-center border border-border/40 rounded flex flex-col items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5 text-graphite" />
                <p className="font-mono text-xs text-graphite">Unable to load LeetCode statistics</p>
                <a
                  href="https://leetcode.com/u/4Kob0E01xg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-amber hover:underline"
                >
                  View live on LeetCode →
                </a>
              </div>
            ) : (
              <div className="dev-metrics__lc-stats">
                {/* Easy */}
                <div className="dev-metrics__lc-stat-box">
                  <span className="font-mono text-[9px] text-green-400 block uppercase">
                    Easy
                  </span>
                  <span className="font-mono text-sm font-bold text-parchment">
                    {leetcode.easy.solved}
                  </span>
                  <span className="font-mono text-[9px] text-graphite block">
                    / {leetcode.easy.total}
                  </span>
                  <div className="dev-metrics__bar-track">
                    <div
                      className="h-full bg-green-500 rounded-sm"
                      style={{
                        width: `${Math.max(
                          (leetcode.easy.solved / Math.max(leetcode.easy.total, 1)) * 100,
                          leetcode.easy.solved > 0 ? 4 : 0
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div className="dev-metrics__lc-stat-box">
                  <span className="font-mono text-[9px] text-amber block uppercase">
                    Medium
                  </span>
                  <span className="font-mono text-sm font-bold text-parchment">
                    {leetcode.medium.solved}
                  </span>
                  <span className="font-mono text-[9px] text-graphite block">
                    / {leetcode.medium.total}
                  </span>
                  <div className="dev-metrics__bar-track">
                    <div
                      className="h-full bg-amber rounded-sm"
                      style={{
                        width: `${(leetcode.medium.solved / Math.max(leetcode.medium.total, 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div className="dev-metrics__lc-stat-box">
                  <span className="font-mono text-[9px] text-red-400 block uppercase">
                    Hard
                  </span>
                  <span className="font-mono text-sm font-bold text-parchment">
                    {leetcode.hard.solved}
                  </span>
                  <span className="font-mono text-[9px] text-graphite block">
                    / {leetcode.hard.total}
                  </span>
                  <div className="dev-metrics__bar-track">
                    <div
                      className="h-full bg-red-500 rounded-sm"
                      style={{
                        width: `${(leetcode.hard.solved / Math.max(leetcode.hard.total, 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between font-mono text-[10px] text-graphite mt-3 pt-3 border-t border-border-subtle">
              <span>
                {leetcodeLoading
                  ? "Loading statistics..."
                  : `Total Solved: ${leetcode?.totalSolved ?? 0} Problems`}
              </span>
              <span className="text-parchment">
                {leetcode?.acceptanceRate
                  ? `Acceptance: ${leetcode.acceptanceRate}%`
                  : leetcode?.contestRating
                  ? `Rating: ${leetcode.contestRating}`
                  : "Contest: Unrated"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Direct Contact Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-mono text-xs text-amber tracking-[0.2em] uppercase mb-4">
            {"//"} Verified Accreditations
          </h3>
          <div className="space-y-2">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-border p-3.5 rounded bg-surface/50 hover:border-amber/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-amber" />
                  <div>
                    <p className="font-sans text-xs font-semibold text-parchment">
                      {cert.title}
                    </p>
                    <p className="font-mono text-[9px] text-graphite">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[9px] text-graphite border border-border px-2 py-0.5 rounded">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border p-6 rounded bg-surface/50">
          <h3 className="font-mono text-xs text-amber tracking-[0.2em] uppercase mb-2">
            {"//"} Have Something Worth Building?
          </h3>
          <p className="font-sans text-graphite text-xs leading-relaxed mb-6">
            Open to developer roles, open-source engineering, and impactful collaborations.
          </p>

          <div className="space-y-2">
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center justify-between p-3 border border-border rounded hover:border-amber transition-colors group"
            >
              <span className="font-mono text-xs text-graphite group-hover:text-amber">
                EMAIL
              </span>
              <span className="font-mono text-xs text-parchment">
                {CONTACT.email}
              </span>
            </a>

            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-border rounded hover:border-amber transition-colors group"
            >
              <span className="font-mono text-xs text-graphite group-hover:text-amber">
                GITHUB
              </span>
              <span className="font-mono text-xs text-parchment">
                github.com/Suryansh-CodeFramer
              </span>
            </a>

            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-border rounded hover:border-amber transition-colors group"
            >
              <span className="font-mono text-xs text-graphite group-hover:text-amber">
                LINKEDIN
              </span>
              <span className="font-mono text-xs text-parchment">
                linkedin.com/in/suryanshyadav
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Editorial Footer */}
      <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-graphite">
        <span>Suryansh Yadav © 2026 · Architected with Next.js &amp; SCSS</span>
        <span className="text-graphite/60">Built for precision and fluid performance.</span>
      </div>
    </section>
  );
}
