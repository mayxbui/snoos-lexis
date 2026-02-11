// formally gameContainer.tsx

import React from 'react';
import { GameState } from '../../shared/types/types';
import WordGrid from './wordGrid';
import LetterButtons from './letterButtons';
import ControlButtons from './controlButtons';
import ResultPage from './resultPage';
import Timer from './timer';

interface AppProps {
  gameState: GameState;
  onSelect: (letter: string) => void;
  onDelete: (index: number) => void;
  onShuffle: () => void;
  onSubmit: () => void;
  validationError?: string | null;
  validationSuccess: string | null;
  isPossible: number;
  dayNumber: number;
  numberOfWords: number;
}

export const App: React.FC<AppProps> = ({
  gameState,
  onSelect,
  onDelete,
  onShuffle,
  onSubmit,
  validationError,
  validationSuccess,
  isPossible,
  dayNumber,
  numberOfWords,
}) => {
  return (
    <div className="game-container">
      <div className="header">
        <span className="score">{gameState.score}</span>
      </div>
      <WordGrid foundWords={gameState.foundWords} />
      <LetterButtons
        letters={gameState.letters}
        selectedLetters={gameState.selectedLetters}
        onSelectLetter={onSelect}
      />
      <ControlButtons
        onShuffle={onShuffle}
        onSubmit={onSubmit}
        isGameActive={gameState.isGameActive}
      />
      <Timer seconds={gameState.timer} isActive={gameState.isGameActive} />
      <ResultPage
        isOpen={!gameState.isGameActive}
        finalScore={gameState.score}
        foundWords={gameState.foundWords}
        possibleWordsCount={isPossible}
        playerRank={0}
        playerUsername="Player"
        onPlayAgain={() => {}}
        onClose={() => {}}
        dayNumber={dayNumber}
      />
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// import { GameContainer } from './gameContainer';
// import { GameState } from '../../shared/types/types';

// export const App = () => {
//   // Set up initial game state with 120 seconds timer
//   const [gameState, setGameState] = useState<GameState>({
//     id: `game-${Date.now()}`,
//     dailyPuzzleId: "2025-02-09",
//     letters: ["f", "e", "i", "o", "r", "p"],
//     selectedLetters: [],
//     foundWords: [],
//     timer: 120,
//     isGameActive: true,
//     score: 0,
//   });

//   // Handlers for game actions
//   const handleSubmit = async () => {
//     // Your submit word logic here
//   };

//   const handleSelectLetter = (letter: string) => {
//     setGameState((prevState) => ({
//       ...prevState,
//       selectedLetters: [...prevState.selectedLetters, letter],
//     }));
//   };

//   const handleDelete = (index: number) => {
//     setGameState((prevState) => ({
//       ...prevState,
//       selectedLetters: prevState.selectedLetters.filter((_, i) => i !== index),
//     }));
//   };

//   const handleShuffle = () => {
//     // Shuffle the letters
//     const shuffledLetters = [...gameState.letters].sort(() => Math.random() - 0.5);
//     setGameState((prevState) => ({
//       ...prevState,
//       letters: shuffledLetters,
//     }));
//   };

//   // Update timer every second
//   useEffect(() => {
//     if (gameState.isGameActive && gameState.timer > 0) {
//       const timerId = setInterval(() => {
//         setGameState((prevState) => ({ ...prevState, timer: prevState.timer - 1 }));
//       }, 1000);
//       return () => clearInterval(timerId); // Clean up on unmount or when timer stops
//     }
//   }, [gameState.isGameActive, gameState.timer]);

//   return (
//     <div className="app">
//       <GameContainer
//         gameState={gameState}
//         onSelect={handleSelectLetter}
//         onDelete={handleDelete}
//         onShuffle={handleShuffle}
//         onSubmit={handleSubmit}
//         validationError={null}  // Optional validation error message
//         validationSuccess={null}  // Optional success message
//         isPossible={10}  // Number of words possible to form
//         dayNumber={1}  // Current day number
//         numberOfWords={10}  // Total number of possible words
//       />
//     </div>
//   );
// };


// import React, { useState, useEffect } from 'react';
// import { GameContainer } from './gameContainer';
// import { GameState } from '../../shared/types/types';  // Adjust the path as needed

// export const App = () => {
//   // Set up the initial game state with the updated timer value (120 seconds)
//   const [gameState, setGameState] = useState<GameState>({
//     score: 0,
//     foundWords: [],
//     selectedLetters: [],
//     letters: ['f', 'e', 'i', 'o', 'r', 'p'],
//     isGameActive: true,
//     timer: 120,  // Updated timer to 120 seconds
//   });

//   // Handle word submission
//   const handleSubmit = () => {
//     // Add your submit logic here
//   };

//   // Handle letter selection
//   const handleSelectLetter = (letter: string) => {
//     // Add logic for letter selection
//   };

//   // Handle delete letter action
//   const handleDelete = (index: number) => {
//     // Add delete logic here
//   };

//   // Handle shuffle action
//   const handleShuffle = () => {
//     // Add shuffle logic here
//   };

//   // Example to decrease timer every second
//   useEffect(() => {
//     if (gameState.isGameActive && gameState.timer > 0) {
//       const timerId = setInterval(() => {
//         setGameState((prevState) => ({ ...prevState, timer: prevState.timer - 1 }));
//       }, 1000);
//       return () => clearInterval(timerId); // Cleanup on unmount or timer stop
//     }
//   }, [gameState.isGameActive, gameState.timer]);

//   return (
//     <div className="app">
//       <GameContainer
//         gameState={gameState}
//         onSelect={handleSelectLetter}
//         onDelete={handleDelete}
//         onShuffle={handleShuffle}
//         onSubmit={handleSubmit}
//         validationError={null}  // Optional error handling
//         validationSuccess={null}  // Optional success message
//         isPossible={10}  // Set this value based on your game logic
//         dayNumber={1}  // Or fetch the actual day
//         numberOfWords={10}  // Set this to the total number of possible words
//       />
//     </div>
//   );
// };
