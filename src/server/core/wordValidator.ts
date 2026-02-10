// src/server/core/wordValidator.ts (NEW - Single-Use Validation)

/**
 * Word Validator for Single-Use Letter Game
 * 
 * Rule: Each letter can only be used once
 * Letters: [c, a, t, h, e, r]
 * Valid: "cat", "hater", "react"
 * Invalid: "catcat" (c appears twice), "letter" (e appears twice)
 */

export class WordValidator {
  /**
   * Check if word can be formed from available letters
   * Each letter can only be used once (single-use rule)
   * 
   * @param word - The word to validate (e.g., "cat")
   * @param availableLetters - Array of available letters (e.g., ["c","a","t","h","e","r"])
   * @returns true if word can be formed, false otherwise
   * 
   * Example:
   * canFormWord("cat", ["c","a","t","h","e","r"]) → true
   * canFormWord("catcat", ["c","a","t","h","e","r"]) → false (c needs 2, only have 1)
   * canFormWord("letter", ["c","a","t","h","e","r"]) → false (e needs 2, only have 1)
   */
  canFormWord(word: string, availableLetters: string[]): boolean {
    // Build frequency map of available letters
    const availableFreq = new Map<string, number>();
    for (const letter of availableLetters) {
      const lower = letter.toLowerCase();
      availableFreq.set(lower, (availableFreq.get(lower) || 0) + 1);
    }

    // Check if each letter in word is available
    for (const char of word.toLowerCase()) {
      const count = availableFreq.get(char) || 0;
      
      if (count === 0) {
        // Letter not available or used up
        return false;
      }
      
      // Use this letter (decrease count)
      availableFreq.set(char, count - 1);
    }

    return true;
  }

  /**
   * Get detailed validation result with error message
   */
  validateWord(
    word: string,
    availableLetters: string[]
  ): {
    isValid: boolean;
    error?: string;
  } {
    if (!word || word.length === 0) {
      return { isValid: false, error: 'Word is empty' };
    }

    if (word.length < 3) {
      return { isValid: false, error: 'Word too short (minimum 3 letters)' };
    }

    if (word.length > 6) {
      return { isValid: false, error: 'Word too long (maximum 6 letters)' };
    }

    // Build frequency maps
    const availableFreq = new Map<string, number>();
    for (const letter of availableLetters) {
      const lower = letter.toLowerCase();
      availableFreq.set(lower, (availableFreq.get(lower) || 0) + 1);
    }

    const wordFreq = new Map<string, number>();
    for (const char of word.toLowerCase()) {
      wordFreq.set(char, (wordFreq.get(char) || 0) + 1);
    }

    // Check each letter in the word
    for (const [char, count] of wordFreq) {
      const available = availableFreq.get(char) || 0;

      if (available === 0) {
        return {
          isValid: false,
          error: `Letter '${char.toUpperCase()}' not available`,
        };
      }

      if (count > available) {
        return {
          isValid: false,
          error: `Can't use '${char.toUpperCase()}' ${count} times (only have 1)`,
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Get letters that would be needed multiple times
   * Useful for displaying which letters are problematic
   */
  getDuplicateLetters(word: string, availableLetters: string[]): string[] {
    const wordFreq = new Map<string, number>();
    for (const char of word.toLowerCase()) {
      wordFreq.set(char, (wordFreq.get(char) || 0) + 1);
    }

    const availableFreq = new Map<string, number>();
    for (const letter of availableLetters) {
      const lower = letter.toLowerCase();
      availableFreq.set(lower, (availableFreq.get(lower) || 0) + 1);
    }

    const duplicates: string[] = [];
    for (const [char, count] of wordFreq) {
      const available = availableFreq.get(char) || 0;
      if (count > available) {
        duplicates.push(char.toUpperCase());
      }
    }

    return duplicates;
  }
}

// Example usage:
/*
const validator = new WordValidator();

// Valid word
validator.canFormWord("cat", ["c","a","t","h","e","r"]) 
// → true

// Invalid: needs c twice
validator.canFormWord("catcat", ["c","a","t","h","e","r"]) 
// → false

// Detailed validation
validator.validateWord("letter", ["c","a","t","h","e","r"])
// → {
//   isValid: false,
//   error: "Can't use 'E' 2 times (only have 1)"
// }

// Get problematic letters
validator.getDuplicateLetters("letter", ["c","a","t","h","e","r"])
// → ["E", "T"]
*/