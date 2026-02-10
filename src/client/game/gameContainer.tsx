import React from "react";
import {GameState} from "../../shared/types/types";
import WordGrid from "./wordGrid";
import LetterButtons from "./letterButtons";
import ControlButtons from "./controlButtons";
import ResultPage from "./resultPage";
import Timer from "./timer";


/**
 * Game Container
 * 
 * Organize and display title, stats, word grids, letter buttons, timer on 1 page
 */

// To ensure type safety
interface ContainerProps {
  gameState: GameState;
  onSelect: (letter: string) => void;
  onDelete: (index: number) => void;
  onShuffle: () => void;
  onSubmit: () => void;
  validationError?: string | null;
  validationSuccess: string | null;
  isPossible: number;   //word count
  dayNumber: number;    //count of the day game releases
  numberOfWords: number;//total number of words that can be formed
}

export const GameContainer: React.FC<ContainerProps>=({
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
        <span className="score">...:</span> {/** Add icon */}
        <span className="score-value">{gameState.score}</span>
      </div>
      <div className="stat">
        <span className="label">Words:</span>
        <span className="value">{gameState.foundWords.length} of {isPossible}</span>
        <span className="label">Streak:</span>
        <span className="value">0</span>
      </div>

      <WordGrid foundWords={gameState.foundWords}/>

      <div className="input-container">
        <div className="input">
          {gameState.selectedLetters.length===0? (
            <div className="placeholer">Select letters to form a word</div>
          ):(
            gameState.selectedLetters.map((letter, index)=>(
              <button
                key={index}
                className="selected-letter"
                onClick={()=> onDelete(index)}
                title="Click to remove"
                type="button"
              >
                <span className="letter-text">{letter.toUpperCase()}</span>
                <span className="delete-icon">x</span>
              </button>
            ))
          )}
        </div>      
      </div>
      {validationError && <div className="error-msg">{validationError}</div>}
      {validationSuccess && <div className="success-msg">{validationSuccess}</div>}
      
      <LetterButtons
        letters={gameState.letters}
        selectedCount={gameState.selectedLetters.length}
        onSelectLetter={onSelect}
      />
      
      <ControlButtons
        onShuffle={onShuffle}
        onSubmit={onSubmit}
        isGameActive={gameState.isGameActive}
      />

      {!gameState.isGameActive && (
        <div className="game-over-overlay">
          <div className="result-page">
            {ResultPage}
          </div>
        </div>
      )}
      <Timer seconds={gameState.timer} isActive={gameState.isGameActive} />
    </div>
  );
};

export default GameContainer;