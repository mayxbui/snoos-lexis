// src/client/game/LetterButtons.tsx
import React, { useMemo } from "react";

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
            onClick={() => handleLetterClick(letter)}
            disabled={selected}
            type="button"
            aria-pressed={selected}
            aria-label={`Letter ${letter.toUpperCase()} worth ${value} points${
              selected ? " (selected)" : ""
            }`}
            title={
              selected
                ? `${letter.toUpperCase()} already selected`
                : `Select ${letter.toUpperCase()}`
            }
            className={[
              // size + layout
              "relative h-20 w-20 md:h-24 md:w-24",
              "flex items-center justify-center",
              // tile look (dark square w/ thick shadow)
              "bg-lexisDark border-2 border-black",
              "shadow-[0_6px_0_0_rgba(0,0,0,1)]",
              // text styling
              "text-lexisGold font-bold text-5xl md:text-6xl leading-none",
              // interaction
              "transition-transform duration-150",
              "hover:-translate-y-0.5 active:translate-y-0",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-black/30",
              // disabled state
              selected ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            {/* Main letter */}
            <span>{letter.toUpperCase()}</span>

            {/* Point value (bottom-right) */}
            <span className="absolute bottom-1 right-2 text-xs md:text-sm font-semibold opacity-90">
              {value}
            </span>

            {/* Checkmark when selected (top-right) */}
            {selected && (
              <span
                className="absolute top-1 right-2 text-xl font-extrabold text-[#7ddc7d]"
                aria-hidden="true"
              >
                ✓
              </span>
            )}
          </button>
        );
      }),
    [letters, selectedLetters, onSelectLetter]
  );

  return (
    <div className="w-full flex justify-center">
      <div
        className="grid grid-cols-6 gap-4 md:gap-5"
        role="group"
        aria-label="Letter buttons"
      >
        {letterElements}
      </div>
    </div>
  );
};

export default LetterButtons;
