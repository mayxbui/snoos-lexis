import { redis } from "@devvit/web/server";
import { isValidWord as isDictionaryWord } from "../core/wordValidator";
import { isValidWord } from "../core/wordEngine";
import { calculateScore } from "../core/scoring";
import { addScore } from "../core/leaderboard";

interface ValidateRequest {
  word: string;
  letters: string[];
  dayId: string;
  username: string;
}

export async function getValidation(c: Context) {
  try {
    const body: ValidateRequest = await c.req.json();
    const { word, letters, dayId, username } = body;

    if (!word || !letters || !dayId || !username) {
      return c.json({ valid: false, error: "Missing required fields" }, 400);
    }

    // Check 1: Can word be formed from letters?
    if (!isValidWord(word, letters)) {
      return c.json({ valid: false, error: "Cannot form word from letters" }, 400);
    }

    // Check 2: Is it a real word in dictionary?
    if (!isDictionaryWord(word)) {
      return c.json({ valid: false, error: "Word not in dictionary" }, 400);
    }

    const score = calculateScore(word);
    const userWordKey = `userWords:${dayId}:${username}`;

    const existingUserWordsRaw = await redis.get(userWordKey);
    const userWords = existingUserWordsRaw
      ? JSON.parse(existingUserWordsRaw)
      : [];
    if (userWords.includes(word.toUpperCase())) {
      return c.json({ valid: false, error: "Word already found" }, 400);
    }

    userWords.push(word.toUpperCase());
    await redis.set(userWordKey, JSON.stringify(userWords));
    await redis.expire(userWordKey, 60*60*24);

    await addScore(dayId, username, score);

    return c.json({ valid: true, score });
  } catch (error) {
    console.error("Error in getValidation:", error);
    return c.json({ valid: false, error: "Validation failed" }, 500);
  }
}