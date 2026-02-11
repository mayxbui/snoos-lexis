import React, { useState } from 'react';
import WordGrid from './wordGrid';
import LetterButtons from './letterButtons';
import ControlButtons from './controlButtons';
import ResultPage from './resultPage';
import Timer from './timer';
import SnoosLexisTitle from '../public/title.png';
import PlayButton from '../public/play-button.png';
import { GameState, FoundWord } from '../../shared/types/types';

// Splash screen component
const SplashScreen = ({ onPlayClick }: { onPlayClick: () => void }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="mb-8">
      <img src={SnoosLexisTitle} alt="Snoo's Lexis Title" className="w-72" />
    </div>

    <button 
      className="bg-transparent border-none cursor-pointer mb-8"
      onClick={onPlayClick}
    >
      <img src={PlayButton} alt="Play Button" className="w-36" />
    </button>

    <div className="mt-4">
      <button 
        onClick={onPlayClick}  // Passing onPlayClick to show modal
        className="text-xl text-gray-800 font-bold hover:text-yellow-500"
      >
        How To Play
      </button>
    </div>
  </div>
);

const initialState: GameState = {
  id: '12345',  // Unique game ID (can be generated or based on some logic)
  dailyPuzzleId: '2025-02-09',  // Example date
  letters: ['c', 'a', 't', 'h', 'e', 'r'],
  selectedLetters: [],
  foundWords: [],
  timer: 120,  // Timer set to 120 seconds initially
  isGameActive: true,
  score: 0,
};

// Main game component
const GameContainer = () => {
  // Explicitly use the GameState type for useState
  const [gameState, setGameState] = useState<GameState>(initialState);

  // Handle word selection
  const handleSelect = (letter: string) => {
    setGameState((prevState) => ({
      ...prevState,
      selectedLetters: [...prevState.selectedLetters, letter],
    }));
  };
  
  // Handle word submission
  const handleSubmit = () => {
    console.log('Submit word');
  };

  // Handle game result submission
  const handleGameOver = () => {
    console.log('Game Over');
    setGameState((prevState) => ({
      ...prevState,
      isGameActive: false,
    }));
  };

  return (
    <div className="game-container">
      <div className="header">
        <span className="score">{gameState.score}</span>
      </div>
      <WordGrid foundWords={gameState.foundWords} />
      <LetterButtons
        letters={gameState.letters}
        selectedLetters={gameState.selectedLetters}
        onSelectLetter={handleSelect}
      />
      <ControlButtons
        onShuffle={() => {}}
        onSubmit={handleSubmit}
        isGameActive={gameState.isGameActive}
      />
      <Timer seconds={gameState.timer} isActive={gameState.isGameActive} />
      <ResultPage
        isOpen={!gameState.isGameActive}
        finalScore={gameState.score}
        foundWords={gameState.foundWords}
        possibleWordsCount={10}
        playerRank={0}
        playerUsername="Player"
        onClose={handleGameOver}
        dayNumber={1}
      />
    </div>
  );
};

// App Component
const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false); // Manage the modal visibility


  // Handle play button click to start the game
  const handlePlayClick = () => {
    setIsGameStarted(true); // Start the game by setting the state
  };

  // Handle showing the "How To Play" modal
  const handleHowToPlayClick = () => {
    setShowHowToPlay(true); // Show the modal
  };

  // Handle closing the "How To Play" modal
  const handleCloseModal = () => {
    setShowHowToPlay(false); // Close the modal
  };


  return (
    <div>
      {!isGameStarted ? (
        <SplashScreen onPlayClick={handlePlayClick} />
      ) : (
        <GameContainer  />
      )}

      {showHowToPlay && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button 
              onClick={handleCloseModal} // Close modal on click
              className="absolute top-2 right-2 text-xl font-bold"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">How To Play</h2>
            <p className="text-gray-700">
              In this game, you are tasked with finding all the possible words from a unique set of letters. 
              The more words you find, the higher your score. Try to find all the words before the timer runs out!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;