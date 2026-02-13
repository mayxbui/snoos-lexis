interface WordGridProps {
  selectedLetters: string[];
  onRemoveLetter: (index: number) => void;
}

export default function WordGrid({
  selectedLetters,
  onRemoveLetter,
}: WordGridProps) {
  const word = selectedLetters.join("");

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <div className="flex gap-2 min-h-16 bg-[var(--color-secondary)] border-4 border-black p-6 shadow-[4px_4px_0px_black] flex-wrap justify-center items-center rounded-lg">
        {selectedLetters.length > 0 ? (
          selectedLetters.map((letter, index) => (
            <button
              key={index}
              onClick={() => onRemoveLetter(index)}
              className="w-12 h-12 bg-[var(--color-primary)] text-white font-bold text-lg border-2 border-black rounded-lg hover:bg-red-500 hover:scale-110 transition-all cursor-pointer shadow-[2px_2px_0px_black]"
            >
              {letter}
            </button>
          ))
        ) : (
          <span className="text-gray-400">Click letters to form a word</span>
        )}
      </div>

      <div className="text-lg font-bold">
        Word: <span className="text-[var(--color-secondary)]">{word || "-"}</span>
      </div>
    </div>
  );
}