// submit, shuffle, delete
// src/client/game/GameBoard.tsx
import React, { useMemo, useState } from "react";
import LetterButtons from "./LetterButtons";
// import "./GameBoard.css";

type SubmitResult =
  | { ok: true }
  | { ok: false; message: string };

const shuffleArray = (arr: string[]) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Example: replace with your real validator / API call
const validateWord = async (word: string): Promise<SubmitResult> => {
  if (word.length < 3) return { ok: false, message: "Word too short (min 3)." };
  // TODO: dictionary check, board rules, etc.
  return { ok: true };
};

export default function GameBoard() {
  // Example starting letters (replace with your game state)
  const [letters, setLetters] = useState<string[]>(["f", "e", "i", "o", "r", "p"]);

  // Selected letters = “current attempt”
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  // Submitted words history
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // UI message
  const [status, setStatus] = useState<string>("");

  const currentWord = useMemo(
    () => selectedLetters.join("").toUpperCase(),
    [selectedLetters]
  );

  /** Called by LetterButtons when user clicks a tile */
  const selectLetter = (letter: string) => {
    setStatus("");
    // Cap at 6 just in case (your UI already enforces single-use)
    setSelectedLetters((prev) => (prev.length >= 6 ? prev : [...prev, letter.toLowerCase()]));
  };

  /** DELETE: removes last selected letter */
  const handleDelete = () => {
    setStatus("");
    setSelectedLetters((prev) => prev.slice(0, -1));
  };

  /** SHUFFLE: randomize the 6 available letters */
  const handleShuffle = () => {
    setStatus("");
    setLetters((prev) => shuffleArray(prev));
  };

  /** SUBMIT: validate and store word, then clear selection */
  const handleSubmit = async () => {
    const word = selectedLetters.join("").toLowerCase();
    if (!word) {
      setStatus("Pick some letters first.");
      return;
    }

    const result = await validateWord(word);
    if (!result.ok) {
      setStatus(result.message);
      return;
    }

    // Example: prevent duplicates
    setFoundWords((prev) => {
      if (prev.includes(word)) {
        setStatus("You already found that word.");
        return prev;
      }
      return [word, ...prev];
    });

    // Clear current attempt
    setSelectedLetters([]);
    setStatus("Nice!");
  };

  /** Optional: clear everything (useful for a “New Game”) */
  const handleClear = () => {
    setSelectedLetters([]);
    setStatus("");
  };

  return (
    <div className="gb-wrap">
      {/* Current word display + X clear */}
      <div className="gb-wordbar">
        <div className="gb-slots" aria-label="Current word">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="gb-slot" key={i}>
              {selectedLetters[i]?.toUpperCase() ?? ""}
            </div>
          ))}
        </div>

        <button className="gb-clear" type="button" onClick={handleClear} title="Clear word">
          ×
        </button>
      </div>

      {/* Letter tiles */}
      <LetterButtons
        letters={letters}
        selectedLetters={selectedLetters}
        onSelectLetter={selectLetter}
      />

      {/* Action buttons (Delete, Shuffle, Enter) */}
      <div className="gb-actions">
        <button
          className="gb-action"
          type="button"
          onClick={handleDelete}
          disabled={selectedLetters.length === 0}
          title="Delete last letter"
        >
          Delete
        </button>

        <button className="gb-action" type="button" onClick={handleShuffle} title="Shuffle letters">
          Shuffle
        </button>

        <button
          className="gb-action gb-enter"
          type="button"
          onClick={handleSubmit}
          disabled={selectedLetters.length === 0}
          title="Submit word"
        >
          Enter
        </button>
      </div>

      {/* Status message */}
      {status && <div className="gb-status">{status}</div>}

      {/* Found words list (optional) */}
      <div className="gb-found">
        <div className="gb-found-title">Found words</div>
        <ul className="gb-found-list">
          {foundWords.map((w) => (
            <li key={w}>{w.toUpperCase()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
