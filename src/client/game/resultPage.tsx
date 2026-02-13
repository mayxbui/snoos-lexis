import { useServerResults } from "../hooks/useServerResults";
import type { FoundWord } from "../../shared/types/types";

interface ResultPageProps {
  isOpen: boolean;
  playerWords: FoundWord[];
  playerScore: number;
  dayId: string;
}

export default function ResultPage({
  isOpen,
  playerWords,
  playerScore,
  dayId,
}: ResultPageProps) {
  const { data, loading } = useServerResults(dayId);
  if (!isOpen) return null;
  if (loading || !data) return <div>Loading Results...</div>;

  const { wordList, leaderboard } = data;
  const playerWordStrings = playerWords.map((w) => w.word);

  return (
    <div className="fixed inset-0 bg-[var(--color-background)] flex flex-col items-center p-10 overflow-auto">
      <div className="bg-[var(--color-secondary)] text-[var(--color-primary)] px-8 py-4 shadow-lg rotate-[-3deg] text-3xl mb-6">
        Game Over!
      </div>

      <h2 className="text-xl mb-4">
        You found <strong>{playerWords.length}</strong> words!
      </h2>

      <div className="text-2xl mb-6 font-bold">
        Your Score: {playerScore}
      </div>

      <div className="flex gap-10 w-full max-w-5xl">
        <div className="flex-1 border-4 border-black p-6 bg-[var(--color-background)] shadow-[8px_8px_0px_black] max-h-96 overflow-y-auto">
          <h3 className="text-xl mb-4 font-bold">Leaderboard</h3>

          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <div 
                key={index} 
                className={`flex justify-between py-2 border-b border-gray-300 ${
                  entry.username === "anonymous" ? "font-bold" : ""
                }`}
              >
                <span>
                  {entry.rank}. {entry.username}
                </span>
                <span className="font-bold">{entry.score}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No scores yet</p>
          )}
        </div>

        {/* Words Found */}
        <div className="flex-1 border-4 border-black p-6 bg-[var(--color-secondary)] text-[var(--color-primary)] shadow-[8px_8px_0px_black] max-h-96 overflow-y-auto">
          <h3 className="text-xl mb-4 font-bold">Words Found</h3>

          {wordList.length > 0 ? (
            wordList.map((word, index) => {
              const found = playerWordStrings.includes(word);

              return (
                <div 
                  key={index} 
                  className="flex justify-between py-1 border-b border-opacity-20 border-white"
                >
                  <span>
                    {found ? "✓" : "✕"} {word}
                  </span>
                </div>
              );
            })
          ) : (
            <p>No words found yet</p>
          )}
        </div>
      </div>
    </div>
  );
}