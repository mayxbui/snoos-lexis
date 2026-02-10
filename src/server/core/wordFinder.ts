// src/server/core/wordFinder.ts

import { WordTrie } from './wordTrie';
import { GAME_CONFIG } from '../../shared/constants';

/**
 * Word Finder using Backtracking Algorithm
 * 
 * Problem: Given 6 letters, find all valid 3-6 letter words
 * 
 * Algorithm: DFS with Backtracking
 * - Traverse Trie while maintaining available letter counts
 * - Prune branches that exceed word length
 * - Backtrack when count reaches 0
 * 
 * Complexity: O(6! × D) worst case
 * - 6! = all permutations of 6 letters
 * - D = dictionary branching factor (typically small)
 * 
 * Space: O(6) recursion depth + result array
 */

export class WordFinder {
  constructor(private wordTrie: WordTrie) {}

  /**
   * Find all valid words that can be formed from given letters
   * 
   * Example:
   * letters = ['c', 'a', 't', 'h', 'e', 'r']
   * returns: ['cat', 'car', 'care', 'hare', 'rate', 'cater', 'cheat', ...]
   */
  findValidWords(letters: string[]): string[] {
    // Initialize letter frequency map
    const letterFreq = new Map<string, number>();
    for (const letter of letters) {
      const lower = letter.toLowerCase();
      letterFreq.set(lower, (letterFreq.get(lower) || 0) + 1);
    }

    const result: string[] = [];

    // Start DFS from Trie root
    this._backtrack(
      this.wordTrie['root'], // Access private root (adjust if needed)
      '',
      letterFreq,
      result,
      GAME_CONFIG.MIN_WORD_LENGTH,
      GAME_CONFIG.MAX_WORD_LENGTH
    );

    return result.sort((a, b) => b.length - a.length); // Longest first
  }

  /**
   * Find words of a specific length
   */
  findWordsByLength(letters: string[], length: number): string[] {
    const allWords = this.findValidWords(letters);
    return allWords.filter((word) => word.length === length);
  }

  /**
   * Check if a specific word can be formed from letters
   */
  canFormWord(word: string, letters: string[]): boolean {
    const wordLower = word.toLowerCase();
    const letterFreq = new Map<string, number>();

    for (const letter of letters) {
      letterFreq.set(letter.toLowerCase(), (letterFreq.get(letter.toLowerCase()) || 0) + 1);
    }

    for (const char of wordLower) {
      const count = letterFreq.get(char) || 0;
      if (count === 0) return false;
      letterFreq.set(char, count - 1);
    }

    return true;
  }

  /**
   * Get difficulty score (how many words can be formed)
   * 0-10 scale: 10 = hardest (fewest words)
   */
  getDifficultyScore(letters: string[]): number {
    const wordCount = this.findValidWords(letters).length;

    if (wordCount > 100) return 1; // Very easy
    if (wordCount > 50) return 2;
    if (wordCount > 30) return 3;
    if (wordCount > 20) return 4;
    if (wordCount > 15) return 5;
    if (wordCount > 10) return 6;
    if (wordCount > 5) return 7;
    if (wordCount > 2) return 8;
    return 10; // Extremely hard
  }

  /**
   * Core backtracking algorithm
   * 
   * How it works:
   * 1. If current path forms a valid word, add to results
   * 2. If word exceeds max length, stop exploring
   * 3. For each available letter:
   *    a. Decrease its count
   *    b. Recursively explore Trie
   *    c. Increase its count (backtrack)
   */
  private _backtrack(
    node: any, // TrieNode - would need to adjust access
    currentWord: string,
    availableLetters: Map<string, number>,
    result: string[],
    minLength: number,
    maxLength: number
  ): void {
    // Base case: current path forms a valid word
    if (node.isEndOfWord && currentWord.length >= minLength) {
      result.push(currentWord);
    }

    // Pruning: word too long, stop exploring this branch
    if (currentWord.length >= maxLength) {
      return;
    }

    // Try each available letter
    for (const [letter, count] of availableLetters) {
      // Only try if we have this letter available
      if (count > 0 && node.children.has(letter)) {
        // Step 1: Use the letter (decrement count)
        availableLetters.set(letter, count - 1);

        // Step 2: Recurse deeper into Trie
        this._backtrack(
          node.children.get(letter)!,
          currentWord + letter,
          availableLetters,
          result,
          minLength,
          maxLength
        );

        // Step 3: Backtrack (restore the letter)
        availableLetters.set(letter, count);
      }
    }
  }
}

/**
 * Example Usage:
 * 
 * const trie = new WordTrie();
 * // ... populate with words ...
 * 
 * const finder = new WordFinder(trie);
 * 
 * const letters = ['c', 'a', 't', 'h', 'e', 'r'];
 * const validWords = finder.findValidWords(letters);
 * console.log(validWords); // ['charter', 'hatter', 'cater', ...]
 * 
 * // Check specific word
 * console.log(finder.canFormWord('cat', letters)); // true
 * console.log(finder.canFormWord('batch', letters)); // false (no b)
 * 
 * // Get difficulty
 * console.log(finder.getDifficultyScore(letters)); // 5 (medium)
 */

export function createWordFinder(wordTrie: WordTrie): WordFinder {
  return new WordFinder(wordTrie);
}