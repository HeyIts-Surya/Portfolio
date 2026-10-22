import { NextResponse } from "next/server";

export const revalidate = 1800; // Cache for 30 minutes

export async function GET() {
  const username = "Suryansh-CodeFramer";

  try {
    const [userRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          "User-Agent": "Next.js-Portfolio-App",
        },
        next: { revalidate: 1800 },
      }).then((r) => (r.ok ? r.json() : null)),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        {
          next: { revalidate: 1800 },
        }
      ).then((r) => (r.ok ? r.json() : null)),
    ]);

    const contributions = contribRes?.contributions || [];
    const totalCount =
      typeof contribRes?.total?.lastYear === "number"
        ? contribRes.total.lastYear
        : contributions.reduce((acc: number, d: { count: number }) => acc + (d.count || 0), 0);

    // Calculate current streak reliably from real contribution calendar
    let currentStreak = 0;
    if (contributions.length > 0) {
      // Look back starting from most recent day
      let started = false;
      for (let i = contributions.length - 1; i >= 0; i--) {
        const c = contributions[i].count;
        if (c > 0) {
          started = true;
          currentStreak++;
        } else {
          // If the most recent day (today) is 0, give grace for 1 day before breaking
          if (!started && i === contributions.length - 1) {
            continue;
          }
          if (started) {
            break;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      username,
      profileUrl: `https://github.com/${username}`,
      publicRepos: userRes?.public_repos ?? 21,
      followers: userRes?.followers ?? 2,
      totalContributions: totalCount,
      currentStreak,
      // Provide the recent 112 days (16 weeks x 7 days) for the visual grid
      recentDays: contributions.slice(-112).map((d: { date: string; count: number; level: number }) => ({
        date: d.date,
        count: d.count,
        level: d.level, // 0, 1, 2, 3, 4
      })),
    });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve GitHub statistics at this moment.",
        username,
        profileUrl: `https://github.com/${username}`,
      },
      { status: 500 }
    );
  }
}
