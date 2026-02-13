export function isValidWord(word: string, letters: string[]): boolean {
  if (word.length < 3) return false;

  const letterCounts: Record<string, number> = {};

  // Build frequency map of available letters
  for (const letter of letters) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  // Check if word can be formed from available letters
  for (const char of word.toUpperCase()) {
    if (!letterCounts[char] || letterCounts[char] === 0) {
      return false;
    }
    letterCounts[char]--;
  }

  return true;
}