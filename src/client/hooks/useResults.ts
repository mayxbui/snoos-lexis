import { useMemo } from "react";
import { FoundWord } from "../../shared/types/types";

export function useResults(
  foundWords: FoundWord[],
  possibleWords: string[]
) {
  const wordsFound = foundWords.length;
  const totalWords = possibleWords.length;

  const accuracy = useMemo(() => {
    if (!totalWords) return 0;
    return Math.round((wordsFound / totalWords) * 100);
  }, [wordsFound, totalWords]);

  const longestWord = useMemo(() => {
    if (!foundWords.length) return null;
    return foundWords.reduce((a, b) =>
      b.word.length > a.word.length ? b : a
    );
  }, [foundWords]);

  const snooedCount = useMemo(() => {
    return foundWords.filter((w) => w.isSnooed).length;
  }, [foundWords]);

  const isPerfect = wordsFound === totalWords;

  return {
    wordsFound,
    totalWords,
    accuracy,
    longestWord,
    snooedCount,
    isPerfect,
  };
}