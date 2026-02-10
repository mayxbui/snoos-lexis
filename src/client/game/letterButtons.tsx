// src/client/game/LetterButtons.tsx

import React, { useMemo } from "react";
// import "./LetterButtons.css";

interface LetterButtonsProps {
  letters: string[];                  // Array of 6 available letters
  selectedLetters: string[];          // Letters already selected by player
  onSelectLetter: (letter: string) => void;  // Called when player clicks a letter
}

/**
 * Letter point values based on English letter frequency
 * Source: 40,000-word frequency sample
 * Rarer letters = higher points
 */

const SCRABBLE_VALUES: Record<string, number> = {
  // Very common (≥ 7%)
  e: 1, t: 1, a: 1, o: 1, i: 1, n: 1,
  // Common (5–7%)
  s: 2, r: 2, h: 2,
  // Medium (3–5%)
  d: 3, l: 3,
  // Medium-low (2–3%)
  u: 3, c: 3, m: 3, f: 3,
  // Less common (1.5–2%)
  y: 4, w: 4, g: 4, p: 4,
  // Rare (1–1.5%)
  b: 5, v: 5,
  // Very rare (< 1%)
  k: 6, x: 7, q: 7, j: 7, z: 7,
};

export const LetterButtons: React.FC<LetterButtonsProps> = ({
  letters,
  selectedLetters,
  onSelectLetter,
}) => {
  const isLetterSelected = (letter: string): boolean =>
    selectedLetters.some((l) => l.toLowerCase() === letter.toLowerCase());

  const getScrabbleValue = (letter: string): number =>
    SCRABBLE_VALUES[letter.toLowerCase()] ?? 0;

  const handleLetterClick = (letter: string): void => {
    if (!isLetterSelected(letter)) onSelectLetter(letter);
  };

  const letterElements = useMemo(
    () =>
      letters.map((letter, index) => {
        const selected = isLetterSelected(letter);
        const value = getScrabbleValue(letter);

        return (
          <button
            key={`${letter}-${index}`}
            className={`lb-tile ${selected ? "is-selected" : ""}`}
            onClick={() => handleLetterClick(letter)}
            disabled={selected}
            type="button"
            aria-pressed={selected}
            aria-label={`Letter ${letter.toUpperCase()} worth ${value} points${
              selected ? " (selected)" : ""
            }`}
            title={selected ? `${letter.toUpperCase()} already selected` : `Select ${letter.toUpperCase()}`}
          >
            <span className="lb-letter">{letter.toUpperCase()}</span>
            <span className="lb-value">{value}</span>
            {selected && <span className="lb-check" aria-hidden="true">✓</span>}
          </button>
        );
      }),
    [letters, selectedLetters]
  );

  return (
    <div className="lb-wrap">
      <div className="lb-row" role="group" aria-label="Letter buttons">
        {letterElements}
      </div>
    </div>
  );
};

export default LetterButtons;
