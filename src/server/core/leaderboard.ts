// src/server/core/leaderboardManager.ts

import { GameResult, LeaderboardEntry } from '../../shared/types';

/**
 * Leaderboard Manager
 * 
 * Data Structure: HashMap + Sort-on-Query with Caching
 * 
 * Why not Min-Heap?
 * - Heap is faster for streaming updates (O(log N))
 * - But leaderboard updates are infrequent (1 per player per day)
 * - HashMap + cached sort is simpler and sufficient
 * 
 * Complexity:
 * - Add score: O(1)
 * - Get top scores: O(N log N) first time, then O(1) cached
 * - Get rank: O(N)
 * - Get count: O(1)
 */

interface LeaderboardCache {
  scores: LeaderboardEntry[];
  timestamp: number;
}

export class LeaderboardManager {
  private dailyScores: Map<string, GameResult> = new Map(); // username → result
  private cache: LeaderboardCache | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_LEADERBOARD_SIZE = 1000; // Keep top 1000

  /**
   * Add or update a player's score for the day
   * Time: O(1)
   */
  addScore(username: string, result: GameResult): void {
    // Only keep better score
    const existing = this.dailyScores.get(username);
    if (existing && existing.score >= result.score) {
      return;
    }

    this.dailyScores.set(username, result);
    this.invalidateCache();
  }

  /**
   * Get top N scores with caching
   * Time: O(N log N) first call, O(1) cached
   */
  getTopScores(limit: number = 100): LeaderboardEntry[] {
    const sorted = this._getSortedScores();
    return sorted.slice(0, Math.min(limit, sorted.length));
  }

  /**
   * Get player's rank on leaderboard
   * Time: O(N) if cache miss, O(1) if cached
   */
  getRank(username: string): number | null {
    const sorted = this._getSortedScores();
    const index = sorted.findIndex((entry) => entry.username === username);
    return index >= 0 ? index + 1 : null;
  }

  /**
   * Get player's entry with rank
   */
  getPlayerEntry(username: string): LeaderboardEntry | null {
    const sorted = this._getSortedScores();
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].username === username) {
        return {
          ...sorted[i],
          rank: i + 1,
        };
      }
    }
    return null;
  }

  /**
   * Get leaderboard statistics
   */
  getStats(): {
    totalPlayers: number;
    highScore: number;
    averageScore: number;
    medianScore: number;
  } {
    const sorted = this._getSortedScores();
    const scores = sorted.map((e) => e.score);

    const highScore = scores[0] || 0;
    const sum = scores.reduce((a, b) => a + b, 0);
    const averageScore = scores.length > 0 ? Math.round(sum / scores.length) : 0;
    const medianScore =
      scores.length > 0
        ? scores[Math.floor(scores.length / 2)]
        : 0;

    return {
      totalPlayers: sorted.length,
      highScore,
      averageScore,
      medianScore,
    };
  }

  /**
   * Export leaderboard as markdown table
   */
  exportAsMarkdown(limit: number = 50): string {
    const topScores = this.getTopScores(limit);

    const header = '| Rank | Username | Score | Words |';
    const separator = '|------|----------|-------|-------|';
    const rows = topScores
      .map((entry) =>
        `| ${entry.rank} | u/${entry.username} | ${entry.score} | ${entry.wordCount} |`
      )
      .join('\n');

    return `${header}\n${separator}\n${rows}`;
  }

  /**
   * Clear all scores
   */
  reset(): void {
    this.dailyScores.clear();
    this.invalidateCache();
  }

  /**
   * Get total player count
   */
  getPlayerCount(): number {
    return this.dailyScores.size;
  }

  /**
   * Internal: Get sorted scores with caching
   */
  private _getSortedScores(): LeaderboardEntry[] {
    const now = Date.now();

    // Return cached if still valid
    if (this.cache && now - this.cache.timestamp < this.CACHE_DURATION) {
      return this.cache.scores;
    }

    // Sort scores
    const sorted: LeaderboardEntry[] = Array.from(this.dailyScores.values())
      .map((result, index) => ({
        rank: index + 1,
        username: result.username,
        score: result.score,
        wordCount: result.totalWords,
        isPerfectRun: result.isPerfectRun,
      }))
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        if (b.wordCount !== a.wordCount) {
          return b.wordCount - a.wordCount;
        }
        return 0;
      })
      .slice(0, this.MAX_LEADERBOARD_SIZE)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

    this.cache = {
      scores: sorted,
      timestamp: now,
    };

    return sorted;
  }

  /**
   * Internal: Invalidate cache
   */
  private invalidateCache(): void {
    this.cache = null;
  }
}

let instance: LeaderboardManager | null = null;

export function getLeaderboardManager(): LeaderboardManager {
  if (!instance) {
    instance = new LeaderboardManager();
  }
  return instance;
}