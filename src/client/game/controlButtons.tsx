// submit, shuffle, delete
// src/client/game/GameBoard.tsx
import React, { useMemo, useState } from "react";
<<<<<<< HEAD
import LetterButtons from "./letterButtons";
// import "./GameBoard.css";
=======
import LetterButtons from "./LetterButtons";
>>>>>>> e415ba063dabc9df9d094c2ad7890b19448f3eb5

type SubmitResult = { ok: true } | { ok: false; message: string };

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
  return { ok: true };
};

export default function GameBoard() {
  const [letters, setLetters] = useState<string[]>(["f", "e", "i", "o", "r", "p"]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");

  const currentWord = useMemo(
    () => selectedLetters.join("").toUpperCase(),
    [selectedLetters]
  );

  /** Called by LetterButtons when user clicks a tile */
  const selectLetter = (letter: string) => {
    setStatus("");
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

    setFoundWords((prev) => {
      if (prev.includes(word)) {
        setStatus("You already found that word.");
        return prev;
      }
      return [word, ...prev];
    });

    setSelectedLetters([]);
    setStatus("Nice!");
  };

  /** Clear current attempt */
  const handleClear = () => {
    setSelectedLetters([]);
    setStatus("");
  };

  const canAct = selectedLetters.length > 0;

  return (
    <div className="min-h-screen w-full bg-lexisBg text-black flex flex-col items-center">
      {/* top dark strip */}
      <div className="w-full h-6 bg-lexisDark" />

      {/* title banner */}
      <div className="mt-10 md:mt-14">
        <div
          className={[
            "bg-lexisDark text-lexisGold",
            "px-10 py-4 md:px-14 md:py-5",
            "border-2 border-black",
            "shadow-[0_6px_0_0_rgba(0,0,0,1)]",
            "-rotate-6",
          ].join(" ")}
        >
          <span className="font-extrabold tracking-widest text-4xl md:text-5xl">
            Snoo&apos;s lexis
          </span>
        </div>
      </div>

      {/* word slots + clear (×) */}
      <div className="mt-12 md:mt-14 flex items-center gap-4">
        <div
          className="grid grid-cols-6 border-4 border-lexisDark"
          aria-label="Current word"
        >
          {Array.from({ length: 6 }).map((_, i) => {
            const filled = selectedLetters[i]?.toUpperCase() ?? "";
            const shadeFirst = i === 0; // first box shaded like mock
            return (
              <div
                key={i}
                className={[
                  "h-20 w-24 md:h-24 md:w-28",
                  "flex items-center justify-center select-none",
                  "border-r-4 border-lexisDark last:border-r-0",
                  shadeFirst ? "bg-[#bdb8a5]" : "bg-lexisBg",
                  "text-5xl md:text-6xl font-bold text-lexisDark",
                ].join(" ")}
              >
                {filled}
              </div>
            );
          })}
        </div>

        {/* optional clear button (not in your mock, but handy) */}
        <button
          type="button"
          onClick={handleClear}
          title="Clear word"
          className={[
            "h-12 w-12 md:h-14 md:w-14",
            "bg-lexisBtn text-lexisDark",
            "border-2 border-lexisDark",
            "shadow-[0_6px_0_0_rgba(0,0,0,1)]",
            "text-3xl font-bold leading-none",
            "transition-transform duration-150",
            "hover:-translate-y-0.5 active:translate-y-0",
          ].join(" ")}
        >
          ×
        </button>
      </div>

      {/* optional current word text */}
      <div className="mt-3 min-h-[24px] text-lexisDark/70 tracking-wide">
        {currentWord ? `Current: ${currentWord}` : " "}
      </div>

      {/* letter tiles */}
      <div className="mt-8 md:mt-10">
        <LetterButtons
          letters={letters}
          selectedLetters={selectedLetters}
          onSelectLetter={selectLetter}
        />
      </div>

      {/* action buttons row (Delete / Shuffle / Enter) */}
      <div className="mt-10 md:mt-12 flex items-center justify-center gap-8">
        <button
          type="button"
          onClick={handleDelete}
          disabled={!canAct}
          title="Delete last letter"
          className={[
            "h-14 w-56 md:h-16 md:w-64",
            "bg-lexisBtn text-lexisDark",
            "border-2 border-lexisDark",
            "shadow-[0_6px_0_0_rgba(0,0,0,1)]",
            "flex items-center justify-center",
            "text-3xl font-semibold",
            "transition-transform duration-150",
            "hover:-translate-y-0.5 active:translate-y-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          ⌫
        </button>

        <button
          type="button"
          onClick={handleShuffle}
          title="Shuffle letters"
          className={[
            "h-14 w-56 md:h-16 md:w-64",
            "bg-lexisBtn text-lexisDark",
            "border-2 border-lexisDark",
            "shadow-[0_6px_0_0_rgba(0,0,0,1)]",
            "flex items-center justify-center",
            "text-4xl font-semibold",
            "transition-transform duration-150",
            "hover:-translate-y-0.5 active:translate-y-0",
          ].join(" ")}
        >
          ⟲
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canAct}
          title="Submit word"
          className={[
            "h-14 w-56 md:h-16 md:w-64",
            "bg-lexisBtn text-lexisDark",
            "border-2 border-lexisDark",
            "shadow-[0_6px_0_0_rgba(0,0,0,1)]",
            "flex items-center justify-center",
            "text-3xl font-semibold",
            "transition-transform duration-150",
            "hover:-translate-y-0.5 active:translate-y-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          Enter
        </button>
      </div>

      {/* status message */}
      <div className="mt-6 min-h-[24px] text-lexisDark font-medium">
        {status || " "}
      </div>

      {/* Found words list (optional) */}
      <div className="mt-8 w-[min(720px,92vw)]">
        <div className="text-lexisDark font-bold mb-2">Found words</div>
        <div className="border-2 border-lexisDark bg-white/40 p-3">
          {foundWords.length === 0 ? (
            <div className="text-lexisDark/70">No words yet.</div>
          ) : (
            <ul className="list-disc pl-6 space-y-1">
              {foundWords.map((w) => (
                <li key={w} className="text-lexisDark">
                  {w.toUpperCase()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* bottom dark strip */}
      <div className="mt-auto w-full h-10 bg-lexisDark" />
    </div>
  );
}
