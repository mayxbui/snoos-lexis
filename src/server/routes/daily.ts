import { redis } from "@devvit/web/server";
import { generateLetters } from "../core/letterGenerator";
import { isValidWord as canFormWord } from "../core/wordEngine";
import { getWordTrie } from "../core/wordValidator";

const DAY_TTL = 60 * 60 * 24;

export async function getDailyGame(c: Context) {
  try {
    console.log("getDailyGame called");
    
    const today = new Date().toISOString().slice(0, 10);
    const redisKey = `dailyGame:${today}`;

    let letters = await redis.get(redisKey);

    if (!letters) {
      const newLetters = generateLetters();

      // Store daily letters
      await redis.set(redisKey, JSON.stringify(newLetters));
      await redis.expire(redisKey, DAY_TTL);

      const trie = getWordTrie();
      const allWords = trie.getAllWords();

      const validWords = allWords.filter((word) =>
        canFormWord(word, newLetters)
      );

      const wordListKey = `wordList:${today}`;

      await redis.set(wordListKey, JSON.stringify(validWords));
      await redis.expire(wordListKey, DAY_TTL);

      letters = JSON.stringify(newLetters);
    }


    return c.json({
      id: today,
      letters: JSON.parse(letters),
    });
  }
  catch (error) {
    console.error("Error in getDailyGame:", error);
    return c.json({ error: "Failed to get daily game", details: String(error) }, 500);
  }
}