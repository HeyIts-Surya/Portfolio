import { NextResponse } from "next/server";

export const revalidate = 1800; // Cache for 30 minutes

export async function GET() {
  const username = "4Kob0E01xg";

  try {
    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
      {
        headers: {
          "User-Agent": "Next.js-Portfolio-App",
        },
        next: { revalidate: 1800 },
      }
    );

    if (!res.ok) {
      throw new Error(`LeetCode proxy returned status ${res.status}`);
    }

    const data = await res.json();

    const easySolved = data.easySolved ?? 0;
    const totalEasy = data.totalEasy ?? 972;
    const mediumSolved = data.mediumSolved ?? 0;
    const totalMedium = data.totalMedium ?? 2130;
    const hardSolved = data.hardSolved ?? 0;
    const totalHard = data.totalHard ?? 984;

    const totalSolved = data.totalSolved ?? (easySolved + mediumSolved + hardSolved);
    const totalQuestions = data.totalQuestions ?? (totalEasy + totalMedium + totalHard);

    // Calculate genuine acceptance rate from actual submissions
    const matchedStats = data.matchedUserStats?.acSubmissionNum || [];
    const totalSubmissionsStats = data.matchedUserStats?.totalSubmissionNum || [];

    const acAll = matchedStats.find((s: { difficulty: string }) => s.difficulty === "All")?.submissions ?? 0;
    const totalAll = totalSubmissionsStats.find((s: { difficulty: string }) => s.difficulty === "All")?.submissions ?? 0;
    const acceptanceRate = totalAll > 0 ? ((acAll / totalAll) * 100).toFixed(1) : null;

    // Check contest ranking
    const ranking = typeof data.ranking === "number" && data.ranking < 5000000 ? `#${data.ranking.toLocaleString()}` : null;

    return NextResponse.json({
      success: true,
      username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      ranking,
      contestRating: null, // User has not participated in rated contests yet
      totalSolved,
      totalQuestions,
      easy: {
        solved: easySolved,
        total: totalEasy,
      },
      medium: {
        solved: mediumSolved,
        total: totalMedium,
      },
      hard: {
        solved: hardSolved,
        total: totalHard,
      },
      acceptanceRate,
      contributionPoints: data.contributionPoint ?? 0,
    });
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve LeetCode statistics at this moment.",
        username,
        profileUrl: `https://leetcode.com/u/${username}/`,
      },
      { status: 500 }
    );
  }
}
