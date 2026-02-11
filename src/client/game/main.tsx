import '../index.css';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const Main = () => {
  // Initialize the game state here in Main component
  const [gameState, setGameState] = useState({
    id: 1,
    dailyPuzzleIdts: [2345],
    score: 0,
    foundWords: [],
    letters: ['a', 'b', 'c', 'd', 'e', 'f'],
    selectedLetters: [],
    isGameActive: true,
    timer: 60,
  });

  // Handlers for game actions
  const handleSelect = (letter: string) => {
    setGameState((prevState) => ({
      ...prevState,
      selectedLetters: [...prevState.selectedLetters, letter],
    }));
  };

  const handleDelete = (index: number) => {
    const newSelectedLetters = [...gameState.selectedLetters];
    newSelectedLetters.splice(index, 1);
    setGameState((prevState) => ({
      ...prevState,
      selectedLetters: newSelectedLetters,
    }));
  };

  const handleShuffle = () => {
    const shuffled = [...gameState.letters].sort(() => Math.random() - 0.5);
    setGameState((prevState) => ({
      ...prevState,
      letters: shuffled,
    }));
  };

  const handleSubmit = () => {
    console.log('Word submitted');
  };

  return (
    <App
      gameState={gameState}
      onSelect={handleSelect}
      onDelete={handleDelete}
      onShuffle={handleShuffle}
      onSubmit={handleSubmit}
      validationError={null}
      validationSuccess="Valid Word"
      isPossible={10}
      dayNumber={1}
      numberOfWords={10}
    />
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

