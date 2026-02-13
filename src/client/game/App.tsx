import { useState } from "react";
import Title from "../public/title.png";
import PlayButton from "../public/play-button.png";

import useTimer from "../hooks/useTimer";
import LetterButtons from "./LetterButtons";
import Timer from "./Timer";
import ControlButtons from "./ControlButtons";
import ResultPage from "./ResultPage";
import WordGrid from "./WordGrid";

import { useDailyGame } from "../hooks/useDailyGame";
import { useGameStates } from "../hooks/useGameStates";
import { useValidation } from "../hooks/useValidation";
import { useRedditUser } from "../hooks/useRedditUser";

import type { GameState, FoundWord } from "../../shared/types/types";

import "../index.css";
import "typicons.font/src/font/typicons.css";

interface StarterProps {
  onPlay: () => void;
  onHowTo: () => void;
}

interface GameContainerProps {
  gameState: GameState;
  timeLeft: number;
  selectLetter: (letter: string) => void;
  clearSelection: () => void;
  addFoundWord: (wordData: FoundWord) => void;
  validateWord: (word: string) => Promise<any>;
  onShuffle: () => void;
  removeLetter: (index: number) => void; 
}

const Starter = ({ onPlay, onHowTo }: StarterProps) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="absolute top-20">
      <img src={Title} alt="Snoo'ed Title" className="w-[200px] max-w-4xl" />
    </div>

    <button
      onClick={onPlay}
      className="bg-transparent border-0 cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <img src={PlayButton} alt="Play Button" className="w-56" />
    </button>

    <div className="mt-2">
      <button onClick={onHowTo} className="retro-btn">
        How To Play
      </button>
    </div>
  </div>
);

const GameContainer: React.FC<GameContainerProps> = ({
  gameState,
  timeLeft,
  selectLetter,
  clearSelection,
  addFoundWord,
  validateWord,
  onShuffle,
  removeLetter,
}) => {
  console.log("GameContainer - gameState:", gameState);
  console.log("GameContainer - isActive:", gameState?.isActive);

  if (!gameState) {
    return <div className="text-center p-10">Loading game...</div>;
  }

  const handleSubmit = async () => {
    const word = gameState.selectedLetters.join("").toUpperCase();
    if (!word) return;
    const alreadyFound = gameState.foundWords.some(
      (w) => w.word === word
    );
    if (alreadyFound) {
      clearSelection();
      alert("word's already found.")
      return;
    }
    const result = await validateWord(word);
    if (result.valid && result.wordData) {
      addFoundWord(result.wordData);
    }
    clearSelection();
  };


  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen">
      <Timer
        seconds={timeLeft}
        isActive={gameState.isActive}
        totalSeconds={120}
      />

      {gameState.isActive ? (
        <>
          <WordGrid
            selectedLetters={gameState.selectedLetters}
            onRemoveLetter={removeLetter}
          />

          <LetterButtons
            letters={gameState.letters}
            selectedLetters={gameState.selectedLetters}
            onSelectLetter={selectLetter}
          />

          <ControlButtons
            onSubmit={handleSubmit}
            onClear={clearSelection}
            onShuffle={onShuffle}
          />
        </>
      ) : (
        <ResultPage
          isOpen={!gameState.isActive}
          playerWords={gameState.foundWords}
          playerScore={gameState.score}
          dayId={gameState.dailyGameId}
        />
      )}
    </div>
  );
};

export const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [showHowToPlay, setHowToPlay] = useState(false);

  const { letters, dayId, loading } = useDailyGame();
  const { username } = useRedditUser();

  const {
    gameState,
    selectLetter,
    clearSelection,
    addFoundWord,
    endGame,
    shuffleLetters,
    removeLetter,
  } = useGameStates(letters, dayId);

  const { timeLeft } = useTimer(
    120,
    gameState?.isActive ?? false,
    endGame
  );

  const { validateWord } = useValidation(
    gameState?.letters || [],
    gameState?.dailyGameId || "",
    // username
    "hi"
  );

  if (loading || !letters || !gameState || !username) {
    return <div>Loading...</div>;
  }
  
  if (loading || !letters || !gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isStarted ? (
         <GameContainer
          gameState={gameState}
          timeLeft={timeLeft}
          selectLetter={selectLetter}
          clearSelection={clearSelection}
          addFoundWord={addFoundWord}
          validateWord={validateWord}
          onShuffle={shuffleLetters}
          removeLetter={removeLetter}
        />
        ) :(
          <Starter
            onPlay={() => setIsStarted(true)}
            onHowTo={() => setHowToPlay(true)}
          />
        )
      }

      {!isStarted ? (
        <Starter
          onPlay={() => setIsStarted(true)}
          onHowTo={() => setHowToPlay(true)}
        />
      ) : (
        <GameContainer
          gameState={gameState}
          timeLeft={timeLeft}
          selectLetter={selectLetter}
          clearSelection={clearSelection}
          addFoundWord={addFoundWord}
          validateWord={validateWord}
          onShuffle={shuffleLetters}
          removeLetter={removeLetter}
        />
      )}

      {showHowToPlay && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 font-[var(--font)]">
          <div className="flex flex-col bg-[var(--color-background)] border-4 border-b-8 p-6 rounded-none shadow-lg w-96 relative text-[var(--color-text-dark)]">
            <button
              onClick={() => setHowToPlay(false)}
              className="cursor-pointer absolute top-2 right-2 text-2xl"
            >
              <span className="typcn typcn-delete"></span>
            </button>
            <h2 className="text-2xl font-bold mb-4">
              How To Play
            </h2>
            <p>
              Find as many valid words as possible before time runs out!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};