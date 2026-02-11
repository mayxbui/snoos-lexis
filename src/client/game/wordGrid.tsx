import React from "react";
import { FoundWord } from "../../shared/types/types";

interface WordGridProps {
  foundWords: FoundWord[];
}

export const WordGrid: React.FC<WordGridProps> = ({ foundWords }) => {
  const wordsByLength = foundWords.reduce((acc, word) => {
    if (!acc[word.length]) {
      acc[word.length] = [];
    }
    acc[word.length].push(word);
    return acc;
  }, {} as Record<number, FoundWord[]>);

  const lengths = [6, 5, 4, 3];

  return (
    <div className="word-grid">
      {lengths.map((length) =>
        wordsByLength[length] ? (
          <div key={length}>
            <h3>{length}-Letter Words</h3>
            <ul>
              {wordsByLength[length].map((word, index) => (
                <li key={index}>
                  {word.word.toUpperCase()} - {word.score} {word.isPangram && "⭐"}
                </li>
              ))}
            </ul>
          </div>
        ) : null
      )}
    </div>
  );
};


export default WordGrid;