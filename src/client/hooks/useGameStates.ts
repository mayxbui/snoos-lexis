import { useState, useEffect } from "react";
import { GameState, FoundWord } from "../../shared/types/types";

function createInitialGameState(
  letters: string[],
  dayId: string
): GameState {
  return {
    id: crypto.randomUUID(),
    dailyGameId: dayId,
    letters,
    selectedLetters: [],
    foundWords: [],
    timer: 120,
    isActive: true,
    score: 0,
  };
}

export function useGameStates(
  letters: string[] | null,
  dayId: string
) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  
  useEffect(() => {
    if (!letters || !dayId) return;

    setGameState(createInitialGameState(letters, dayId));
  }, [letters, dayId]);
  
  const selectLetter = (letter: string) => {
    setGameState(prev =>
      prev
        ? {
            ...prev,
            selectedLetters: [...prev.selectedLetters, letter],
          }
        : prev
    );
  };

  const removeLetter = (index: number) => {
    setGameState(prev =>
      prev
        ? {
            ...prev,
            selectedLetters: prev.selectedLetters.filter(
              (_, i) => i !== index
            ),
          }
        : prev
    );
  };

  const shuffleLetters = () => {
    setGameState(prev =>
      prev
        ? {
            ...prev,
            letters: [...prev.letters].sort(() => Math.random() - 0.5),
          }
        : prev
    );
  };

  const clearSelection = () => {
    setGameState(prev =>
      prev
        ? {
            ...prev,
            selectedLetters: [],
          }
        : prev
    );
  };
  const addFoundWord = (wordData: FoundWord) => {
    setGameState(prev =>
      prev
        ? {
            ...prev,
            foundWords: [...prev.foundWords, wordData],
            score: prev.score + wordData.score,
            selectedLetters: [],
          }
        : prev
    );
  };
  const endGame = () => {
    setGameState(prev =>
      prev
        ? {
            ...prev,
            isActive: false,
          }
        : prev
    );
  };

  const resetGame = () => {
    if (!letters) return;
    setGameState(createInitialGameState(letters, dayId));
  };

  return {
    gameState,
    selectLetter,
    removeLetter,
    shuffleLetters,
    clearSelection,
    addFoundWord,
    endGame,
    resetGame,
  };
}
