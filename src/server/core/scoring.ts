export const SCRABBLE_VALUES: Record<string, number> = {
  e: 1, t: 1, a: 1, o: 1, i: 1, n: 1,
  s: 2, r: 2, h: 2,
  d: 3, l: 3,
  u: 3, c: 3, m: 3, f: 3,
  y: 4, w: 4, g: 4, p: 4,
  b: 5, v: 5,
  k: 6, x: 7, q: 7, j: 7, z: 7,
};

export function calculateScore(word: string): number {
  const lowerWord = word.toLowerCase();
  const length = lowerWord.length;

  if (length < 3) return 0;

  // Sum of letter values
  const letterSum = lowerWord.split("").reduce((sum, letter) => {
    return sum + (SCRABBLE_VALUES[letter] ?? 0);
  }, 0);

  // Length multiplier
  let lengthBonus = 1;
  if (length === 6) lengthBonus = 2;
  else if (length === 5) lengthBonus = 1.5;
  else if (length === 4) lengthBonus = 1.25;
  else if (length === 3) lengthBonus = 1;

  return Math.round(letterSum * lengthBonus);
}