import { redis } from "@devvit/web/server";
import { getTopScores } from "../core/leaderboard";

export async function getResults(c: Context) {
  try {
    const dayId = c.req.param("dayId");

    if (!dayId) {
      return c.json({ error: "Missing dayId parameter" }, 400);
    }

    const wordListRaw = await redis.get(`wordList:${dayId}`);
    const wordList = wordListRaw ? JSON.parse(wordListRaw) : [];

    const leaderboard = await getTopScores(dayId, 100);

    return c.json({
      wordList,
      leaderboard,
    });
  } catch (error) {
    console.error("Error in getResults:", error);
    return c.json({ error: "Failed to get results" }, 500);
  }
}