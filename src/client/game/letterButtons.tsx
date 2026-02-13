import React from 'react';

interface LetterButtonsProps {
  letters: string[];
  selectedLetters: string[];
  onSelectLetter: (letter: string) => void;
}

const LetterButtons: React.FC<LetterButtonsProps> = ({
  letters,
  selectedLetters,
  onSelectLetter,
}) => {
  return (
    <div className="flex gap-4">
      {letters.map(letter => (
        <button
          key={letter}
          disabled={selectedLetters.includes(letter)}
          onClick={() => onSelectLetter(letter)}
          className={`
                w-16 h-16 flex items-center justify-center
                text-3xl
                rounded-sm
                transitional-all duration-150
                bg-[var(--color-secondary)] text-[var(--color-text-light)]
                shadow-md hover:scale-105 active:scale-95
                disabled:bg-transparent disabled:text-[var(--color-text-dark)]
            `}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default LetterButtons;