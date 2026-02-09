// src/client/game/GameBoard.tsx (UPDATED)

import React from 'react';
import { GameState } from '../../shared/types/types';
import Timer from './timer';
import WordGrid from './wordGrid';
import LetterButtons from './letterButtons';
import Controls from './controlButtons';

interface GameProps {
  gameState: GameState;
  onSelectLetter: (letter: string) => void;
  onDeleteLetter: (index: number) => void;
  onUndoLastLetter: () => void;
  onClear: () => void;
  onShuffle: () => void;
  onSubmit: () => void;
  validationError?: string | null;
  validationSuccess?: string | null;
  isPossibleWordsCount: number;
}

export const Background: React.FC<GameProps> = ({
  gameState,
  onSelectLetter,
  onDeleteLetter,
  onUndoLastLetter,
  onClear,
  onShuffle,
  onSubmit,
  validationError,
  validationSuccess,
  isPossibleWordsCount,
}) => {
  return (
    <div className="game-board">
      {/* Header with stats */}
      <div className="game-header">
        <div className="stat">
          <span className="label">Score:</span>
          <span className="value">{gameState.score}</span>
        </div>
        <div className="stat">
          <span className="label">Words:</span>
          <span className="value">{gameState.foundWords.length} of {isPossibleWordsCount}</span>
        </div>
        <Timer seconds={gameState.timer} isActive={gameState.isGameActive} />
        <div className="stat">
          <span className="label">Streak:</span>
          <span className="value">0</span>
        </div>
      </div>

      {/* Word grid - found words */}
      <WordGrid foundWords={gameState.foundWords} />

      {/* Current word selection input */}
      <div className="word-input-container">
        <div className="word-input">
          {gameState.selectedLetters.length === 0 ? (
            <div className="placeholder">Select letters to form a word</div>
          ) : (
            gameState.selectedLetters.map((letter, index) => (
              <button
                key={index}
                className="selected-letter"
                onClick={() => onDeleteLetter(index)}
                title="Click to remove this letter"
                type="button"
              >
                <span className="letter-text">{letter.toUpperCase()}</span>
                <span className="delete-icon">×</span>
              </button>
            ))
          )}
        </div>
        
        {/* Undo button (only show if there are selected letters) */}
        {gameState.selectedLetters.length > 0 && (
          <button 
            className="btn-undo" 
            onClick={onUndoLastLetter}
            title="Remove last letter"
            type="button"
          >
            ← Undo
          </button>
        )}
      </div>

      {/* Message display */}
      {validationError && <div className="message error">{validationError}</div>}
      {validationSuccess && <div className="message success">{validationSuccess}</div>}

      {/* Letter buttons */}
      <LetterButtons
        letters={gameState.letters}
        selectedCount={gameState.selectedLetters.length}
        onSelectLetter={onSelectLetter}
      />

      {/* Controls */}
      <Controls
        onClear={onClear}
        onShuffle={onShuffle}
        onSubmit={onSubmit}
        isGameActive={gameState.isGameActive}
      />

      {/* Game over state */}
      {!gameState.isGameActive && (
        <div className="game-over-overlay">
          <div className="game-over-modal">
            <h2>Game Over!</h2>
            <div className="game-stats">
              <p>Final Score: <strong>{gameState.score}</strong></p>
              <p>Words Found: <strong>{gameState.foundWords.length}/{isPossibleWordsCount}</strong></p>
              {gameState.foundWords.length === isPossibleWordsCount && (
                <p className="perfect-run">🎉 Perfect Run!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Background;
