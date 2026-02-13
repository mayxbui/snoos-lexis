export const LETTER_FREQ = {
  A: 8.2,
  B: 1.5,
  C: 2.8,
  D: 4.3,
  E: 12.7,
  F: 2.2,
  G: 2.0,
  H: 6.1,
  I: 7.0,
  J: 0.2,
  K: 0.8,
  L: 4.0,
  M: 2.4,
  N: 6.7,
  O: 7.5,
  P: 1.9,
  Q: 0.1,
  R: 6.0,
  S: 6.3,
  T: 9.1,
  U: 2.8,
  V: 1.0,
  W: 2.4,
  X: 0.2,
  Y: 2.0,
  Z: 0.1,
} as const;

export type Letter = keyof typeof LETTER_FREQ;

function weightedRandom(pool: Letter[]): Letter {
  const totalWeight = pool.reduce(
    (sum, letter) => sum + LETTER_FREQ[letter],
    0
  );

  let random = Math.random() * totalWeight;

  for (const letter of pool) {
    random -= LETTER_FREQ[letter];
    if (random <= 0) {
      return letter;
    }
  }

  return pool[pool.length - 1]!;
}

export function generateLetters(): Letter[] {
  const vowels: Letter[] = ["A", "E", "I", "O", "U"];
  const allLetters = Object.keys(LETTER_FREQ) as Letter[];
  const consonants = allLetters.filter(
    letter => !vowels.includes(letter)
  );

  const selected = new Set<Letter>();

  // Ensure at least 2 vowels
  while (
    [...selected].filter(l => vowels.includes(l)).length < 2
  ) {
    selected.add(weightedRandom(vowels));
  }

  // Ensure at least 3 consonants
  while (
    [...selected].filter(l => consonants.includes(l)).length < 3
  ) {
    selected.add(weightedRandom(consonants));
  }

  // Fill remaining slots (until 6 total)
  while (selected.size < 6) {
    selected.add(weightedRandom(allLetters));
  }

  return Array.from(selected);
}