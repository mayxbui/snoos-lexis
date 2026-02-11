export const SCRABBLE_VALUES: Record<string, number> = {
  e: 1, t: 1, a: 1, o: 1, i: 1, n: 1,
  s: 2, r: 2, h: 2,
  d: 3, l: 3,
  u: 3, c: 3, m: 3, f: 3,
  y: 4, w: 4, g: 4, p: 4,
  b: 5, v: 5,
  k: 6, x: 7, q: 7, j: 7, z: 7,
};


export const ShuffleArray = (arr: string[]) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i]!, copy[j]!] = [copy[j]!, copy[i]!];
  }
  return copy;
};
