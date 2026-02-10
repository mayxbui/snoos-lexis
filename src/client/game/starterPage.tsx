import React, { useState } from 'react';
import { ReactComponent as SnoosLexisTitle } from '../../../assets';
import { ReactComponent as PlayButton } from '../../../assets';

const StarterPage: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false); // State to track game start
  const [showHowToPlay, setShowHowToPlay] = useState(false); // State to toggle how-to-play modal

  const handlePlayClick = () => {
    setGameStarted(true); // Start the game when play is clicked
  };

  const handleHowToPlayClick = () => {
    setShowHowToPlay(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowHowToPlay(false); // Close the modal
  };

  return (
    <div>
      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          {/* Title */}
          <div className="mb-8">
            <SnoosLexisTitle className="w-72" />
          </div>

          {/* Play Button */}
          <button 
            className="bg-transparent border-none cursor-pointer mb-8"
            onClick={handlePlayClick}
          >
            <PlayButton className="w-36" />
          </button>

          {/* How To Play Link */}
          <div className="mt-4">
            <button 
              onClick={handleHowToPlayClick} 
              className="text-xl text-gray-800 font-bold hover:text-yellow-500"
            >
              How To Play
            </button>
          </div>
        </div>
      ) : (
        <div> {/* Game container content goes here */} </div>
      )}

      {/* How To Play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button 
              onClick={handleCloseModal} 
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

export default StarterPage;
