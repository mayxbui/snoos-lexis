import { redis } from "@devvit/web/server";
import type { LeaderboardEntry } from "../../shared/types/types";

/**
 * Add or update a player's score for the day
 */
const DAY_TTL = 60 * 60 * 24;

export async function addScore(
  dayId: string,
  username: string,
  score: number
): Promise<void> {
  const leaderboardKey = `leaderboard:${dayId}`;

  // Increment cumulative score
  await redis.zIncrBy(leaderboardKey, username, score);

  // Ensure leaderboard expires
  await redis.expire(leaderboardKey, DAY_TTL);

  // Store metadata
  // await redis.hSet(`${leaderboardKey}:${username}`, {
  //   wordCount: wordCount.toString(),
  // });
}
export async function getTopScores(
  dayId: string,
  limit: number = 100
): Promise<LeaderboardEntry[]> {
  const leaderboardKey = `leaderboard:${dayId}`;

  const members = await redis.zRange(
    leaderboardKey,
    -limit,
    -1,
  );

  members.reverse();

  const entries: LeaderboardEntry[] = [];

  let rank = 1;

  for (const { member: username, score } of members) {
    const metadata = await redis.hGetAll(
      `${leaderboardKey}:${username}`
    );

    entries.push({
      rank,
      username,
      score: Math.round(score),
      wordCount: parseInt(metadata.wordCount || "0"),
    });

    rank++;
  }

  return entries;
}


/**
 * Get player's rank instantly using Redis
 */
export async function getPlayerRank(
  dayId: string,
  username: string
): Promise<number | null> {
  const leaderboardKey = `leaderboard:${dayId}`;

  // Ascending rank (0 = lowest score)
  const ascRank = await redis.zRank(leaderboardKey, username);

  if (ascRank === undefined) return null;

  const totalPlayers = await redis.zCard(leaderboardKey);

  // Convert to descending rank (1 = highest score)
  const descRank = totalPlayers - ascRank;

  return descRank;
}

/**
 * Get player's full entry
 */
export async function getPlayerEntry(
  dayId: string,
  username: string
): Promise<LeaderboardEntry | null> {
  const leaderboardKey = `leaderboard:${dayId}`;

  const score = await redis.zScore(leaderboardKey, username);
  if (score === undefined) return null;

  const metadata = await redis.hGetAll(
    `${leaderboardKey}:${username}`
  );

  const rank = await getPlayerRank(dayId, username);

  return {
    rank: rank || 0,
    username,
    score: Math.round(score),
    wordCount: parseInt(metadata.wordCount || "0"),
  };
}

/**
 * Reset leaderboard for a day
 */
export async function resetLeaderboard(dayId: string): Promise<void> {
  const leaderboardKey = `leaderboard:${dayId}`;

  const members = await redis.zRange(leaderboardKey, 0, -1);

  for (const member of members) {
    await redis.del(`${leaderboardKey}:${member}`);
  }

  await redis.del(leaderboardKey);
}
