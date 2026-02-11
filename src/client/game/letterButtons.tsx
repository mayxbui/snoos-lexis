// LetterButtons.tsx
import React, { useMemo } from "react";
import { SCRABBLE_VALUES } from "../../shared/types/constants";

interface LetterButtonsProps {
  letters: string[];
  selectedLetters: string[];
  onSelectLetter: (letter: string) => void;
}

export const LetterButtons: React.FC<LetterButtonsProps> = ({ letters, selectedLetters, onSelectLetter }) => {
  const isLetterSelected = (letter: string): boolean => selectedLetters.includes(letter);

  const getScrabbleValue = (letter: string): number => SCRABBLE_VALUES[letter.toLowerCase()] || 0;

  return (
    <div className="letter-buttons-container">
      {letters.map((letter, index) => (
        <button
          key={index}
          onClick={() => onSelectLetter(letter)}
          disabled={isLetterSelected(letter)}
        >
          {letter.toUpperCase()} - {getScrabbleValue(letter)}
        </button>
      ))}
    </div>
  );
};

export default LetterButtons;