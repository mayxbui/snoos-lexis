// src/shared/types.ts
// All TypeScript interfaces used across the app

/**
 * GAME STATE TYPES
 * Used in: useGameState hook, App.tsx
 */

export interface GameState {
  id: string;                           // Unique game session ID
  dailyPuzzleId: string;                // Today's date (e.g., "2025-02-09")
  letters: string[];                    // 6 available letters [c, a, t, h, e, r]
  selectedLetters: string[];            // Currently selected letters (max 6)
  foundWords: FoundWord[];              // Array of words found so far
  timer: number;                        // Seconds remaining (60 → 0)
  isGameActive: boolean;                // true while playing, false when game over
  score: number;                        // Total points accumulated
}

export interface FoundWord {
  word: string;                         // The word (e.g., "hate")
  score: number;                        // Points earned for this word
  length: number;                       // Word length (3-6)
  timestamp: number;                    // When submitted (milliseconds)
  isPangram: boolean;                   // Uses all 6 letters?
}

/**
 * EXAMPLE GameState:
 * {
 *   id: "game-1739043000000",
 *   dailyPuzzleId: "2025-02-09",
 *   letters: ["c", "a", "t", "h", "e", "r"],
 *   selectedLetters: ["c", "a", "t"],
 *   foundWords: [
 *     {word: "cat", score: 4, length: 3, timestamp: 1739043015000, isPangram: false},
 *     {word: "hate", score: 4, length: 4, timestamp: 1739043020000, isPangram: false}
 *   ],
 *   timer: 45,
 *   isGameActive: true,
 *   score: 8
 * }
 */

---

/**
 * STREAK TYPES
 * Used in: Streak tracking, scoring
 */

export interface Streak {
  count: number;                        // Current streak (1, 2, 3, 4 max)
  lastSubmissionTime: number;           // Timestamp of last valid submission (ms)
  isActive: boolean;                    // Is streak currently ongoing?
}

/**
 * EXAMPLE Streak:
 * {
 *   count: 3,
 *   lastSubmissionTime: 1739043020000,
 *   isActive: true
 * }
 * 
 * Means: 3 words submitted within 5-second windows
 * Bonus: +3 points on next valid word
 */

---

/**
 * GAME RESULT TYPES
 * Used in: Storing final game results, leaderboard
 */

export interface GameResult {
  userId: string;                       // Reddit username
  username: string;                     // Display name
  dailyPuzzleId: string;                // Which day's puzzle
  score: number;                        // Final score (e.g., 127)
  totalWords: number;                   // How many words found (e.g., 14)
  foundWords: FoundWord[];              // All words found with scores
  streak: Streak;                       // Final streak info
  completionTime: number;               // Seconds to finish game
  isPerfectRun: boolean;                // Found ALL possible words?
  timestamp: number;                    // When game ended (milliseconds)
}

/**
 * EXAMPLE GameResult:
 * {
 *   userId: "reddit_user_123",
 *   username: "alice",
 *   dailyPuzzleId: "2025-02-09",
 *   score: 127,
 *   totalWords: 14,
 *   foundWords: [...array of FoundWord objects...],
 *   streak: {count: 4, lastSubmissionTime: 1739043055000, isActive: true},
 *   completionTime: 45,
 *   isPerfectRun: false,
 *   timestamp: 1739043100000
 * }
 */

---

/**
 * LEADERBOARD TYPES
 * Used in: Ranking, displaying leaderboard
 */

export interface LeaderboardEntry {
  rank: number;                         // Position (1st, 2nd, 3rd, etc.)
  username: string;                     // Player name
  score: number;                        // Total points
  wordCount: number;                    // Words found
  isPerfectRun: boolean;                // Found all words?
  streak?: number;                      // Optional: current streak
}

/**
 * EXAMPLE LeaderboardEntry:
 * {
 *   rank: 1,
 *   username: "carol",
 *   score: 142,
 *   wordCount: 16,
 *   isPerfectRun: true,
 *   streak: 4
 * }
 * 
 * EXAMPLE Leaderboard (top 3):
 * [
 *   {rank: 1, username: "carol", score: 142, wordCount: 16, isPerfectRun: true},
 *   {rank: 2, username: "alice", score: 127, wordCount: 14, isPerfectRun: false},
 *   {rank: 3, username: "bob", score: 95, wordCount: 11, isPerfectRun: false}
 * ]
 */

---

/**
 * DAILY PUZZLE TYPES
 * Used in: gameLogic.ts, game initialization
 */

export interface DailyPuzzle {
  id: string;                           // Date string (e.g., "2025-02-09")
  date: string;                         // Human-readable date
  letters: string[];                    // 6 available letters
  validWords: string[];                 // ALL possible words today (answer key)
  createdAt: number;                    // Timestamp when created
}

/**
 * EXAMPLE DailyPuzzle:
 * {
 *   id: "2025-02-09",
 *   date: "2025-02-09",
 *   letters: ["c", "a", "t", "h", "e", "r"],
 *   validWords: [
 *     "cat", "care", "cart", "char", "cheat",
 *     "hare", "hate", "rate", "rath", "reach",
 *     "react", "tare", "teach", "ache", "acre",
 *     "arch", "each", "etch", "hatch", "heart",
 *     "heat", "race", "tea", "the", "are", "eat",
 *     "era", "hat", "rat"
 *   ],
 *   createdAt: 1739011200000
 * }
 * 
 * Note: validWords is the ANSWER KEY (28 words total)
 * Precomputed once at game start using Backtracking
 */

---

/**
 * GAME CONFIG TYPES
 * Used in: constants.ts, game initialization
 */

export interface GameConfig {
  gameDuration: number;                 // Seconds (60)
  minWordLength: number;                // Minimum (3)
  maxWordLength: number;                // Maximum (6)
  streakWindow: number;                 // Milliseconds between submissions (5000)
  excludeS: boolean;                    // Exclude S from letter pool? (true by default)
}

/**
 * EXAMPLE GameConfig:
 * {
 *   gameDuration: 60,
 *   minWordLength: 3,
 *   maxWordLength: 6,
 *   streakWindow: 5000,
 *   excludeS: true
 * }
 */

---

/**
 * WORD VALIDATION TYPES
 * Used in: useWordValidation hook
 */

export interface WordValidationResult {
  isValid: boolean;                     // Is word in dictionary?
  isDuplicate: boolean;                 // Already found this word?
  word: string;                         // The word submitted
  error?: string;                       // Error message if invalid
}

/**
 * EXAMPLE WordValidationResult (Valid):
 * {
 *   isValid: true,
 *   isDuplicate: false,
 *   word: "hate",
 *   error: undefined
 * }
 * 
 * EXAMPLE WordValidationResult (Invalid):
 * {
 *   isValid: false,
 *   isDuplicate: false,
 *   word: "zxq",
 *   error: "Word not in dictionary"
 * }
 * 
 * EXAMPLE WordValidationResult (Duplicate):
 * {
 *   isValid: false,
 *   isDuplicate: true,
 *   word: "hate",
 *   error: "Already found"
 * }
 */

---

/**
 * SCORING TYPES
 * Used in: scoringEngine.ts
 */

export interface ScoringResult {
  baseScore: number;                    // Points from word length
  bonusScore: number;                   // Pangram + Streak bonuses
  totalScore: number;                   // baseScore + bonusScore
  isPangram: boolean;                   // Uses all 6 letters?
  streakBonus: number;                  // Points from current streak
}

/**
 * EXAMPLE ScoringResult:
 * {
 *   baseScore: 5,
 *   bonusScore: 9,
 *   totalScore: 14,
 *   isPangram: true,
 *   streakBonus: 3
 * }
 * 
 * Breakdown:
 * - Base: 5 (word length)
 * - Pangram: +6 (uses all 6 letters)
 * - Streak: +3 (3rd word in 5 seconds)
 * - Total: 5 + 6 + 3 = 14 points
 */

---

/**
 * API REQUEST/RESPONSE TYPES
 * Used in: useWordValidation hook, API routes
 */

export interface ValidateWordRequest {
  word: string;                         // Word to validate
}

export interface ValidateWordResponse {
  isValid: boolean;
  isPangram: boolean;
}

/**
 * EXAMPLE Request:
 * POST /api/validate-word
 * {
 *   word: "hate"
 * }
 * 
 * EXAMPLE Response:
 * {
 *   isValid: true,
 *   isPangram: false
 * }
 */

export interface LeaderboardRequest {
  limit?: number;                       // How many top scores (default 100)
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  playerRank?: number;
  playerEntry?: LeaderboardEntry;
}

/**
 * EXAMPLE Request:
 * GET /api/leaderboard?limit=50
 * 
 * EXAMPLE Response:
 * {
 *   entries: [
 *     {rank: 1, username: "carol", score: 142, ...},
 *     {rank: 2, username: "alice", score: 127, ...},
 *     ...
 *   ],
 *   playerRank: 2,
 *   playerEntry: {rank: 2, username: "alice", ...}
 * }
 */

---

/**
 * LETTER FREQUENCY TYPES
 * Used in: Word validation, letter management
 */

export interface LetterFrequency {
  [letter: string]: number;
}

/**
 * EXAMPLE LetterFrequency:
 * {
 *   c: 1,
 *   a: 1,
 *   t: 1,
 *   h: 1,
 *   e: 1,
 *   r: 1
 * }
 * 
 * Each letter appears once (single-use rule)
 */

---

/**
 * TRIE NODE TYPE
 * Used in: wordTrie.ts (internal structure)
 */

export interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  frequency: number;
}

/**
 * EXAMPLE Trie Structure:
 * root
 * └─ 'c'
 *    ├─ isEndOfWord: false
 *    └─ 'a'
 *       ├─ isEndOfWord: false
 *       └─ 't'
 *          ├─ isEndOfWord: true (end of "cat") ✓
 *          └─ 'h'
 *             ├─ isEndOfWord: false
 *             └─ 'e'
 *                └─ 'r'
 *                   ├─ isEndOfWord: true (end of "cather") ✓
 */

---

/**
 * SUBMISSION RECORD TYPE
 * Used in: Streak tracking
 */

export interface SubmissionRecord {
  word: string;
  timestamp: number;
}

/**
 * EXAMPLE SubmissionRecord:
 * {
 *   word: "hate",
 *   timestamp: 1739043020000
 * }
 * 
 * Array of last 5 seconds of submissions:
 * [
 *   {word: "cat", timestamp: 1739043015000},
 *   {word: "hate", timestamp: 1739043017000},
 *   {word: "rate", timestamp: 1739043020000}
 * ]
 */

---

/**
 * GAME ERROR TYPES
 * Used in: Error handling, validation
 */

export interface GameError {
  code: string;                         // Error code (NOT_IN_DICT, DUPLICATE, INVALID_LETTERS)
  message: string;                      // Human-readable message
  timestamp: number;                    // When error occurred
}

/**
 * EXAMPLE GameError:
 * {
 *   code: "NOT_IN_DICTIONARY",
 *   message: "Word not in dictionary",
 *   timestamp: 1739043020000
 * }
 */

---

/**
 * TYPE USAGE SUMMARY
 * 
 * Component Layer (React):
 * - GameState (main state)
 * - FoundWord (display results)
 * - Streak (show streak count)
 * - WordValidationResult (show errors)
 * 
 * Server Layer:
 * - DailyPuzzle (game data)
 * - GameResult (store results)
 * - LeaderboardEntry (display rankings)
 * - ScoringResult (calculate points)
 * 
 * API Layer:
 * - ValidateWordRequest/Response
 * - LeaderboardRequest/Response
 * 
 * Data Structure Layer:
 * - TrieNode (internal structure)
 * - LetterFrequency (validation)
 * - SubmissionRecord (streak tracking)
 */

---

/**
 * IMPORT EXAMPLES
 * 
 * In client components:
 * import { GameState, FoundWord, WordValidationResult } from '@/shared/types';
 * 
 * In server files:
 * import { DailyPuzzle, GameResult, LeaderboardEntry } from '@/shared/types';
 * 
 * In hooks:
 * import { Streak, ScoringResult } from '@/shared/types';
 */

---

/**
 * CREATING TYPE INSTANCES
 * 
 * Creating a FoundWord:
 * const word: FoundWord = {
 *   word: "cat",
 *   score: 4,
 *   length: 3,
 *   timestamp: Date.now(),
 *   isPangram: false
 * };
 * 
 * Creating a GameState:
 * const state: GameState = {
 *   id: `game-${Date.now()}`,
 *   dailyPuzzleId: "2025-02-09",
 *   letters: ["c", "a", "t", "h", "e", "r"],
 *   selectedLetters: [],
 *   foundWords: [],
 *   timer: 60,
 *   isGameActive: true,
 *   score: 0
 * };
 * 
 * Creating a LeaderboardEntry:
 * const entry: LeaderboardEntry = {
 *   rank: 1,
 *   username: "alice",
 *   score: 127,
 *   wordCount: 14,
 *   isPerfectRun: false,
 *   streak: 4
 * };
 */

export {};  // This file is just types, no exports needed beyond the interfaces above