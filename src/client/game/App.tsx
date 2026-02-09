import {Background} from './background';

export const App=()=>{
  return(
    <div className="app">
      <Background
        gameState={gameState}
        isPossibleWordsCount={dailyPuzzle.validWords.length}
        onSelectLetter={handleSelectLetter}
        onDeleteLetter={handleDeleteLetter}
        onUndoLastLetter={handleUndoLastLetter}
        onSubmit={handleSubmitWord}
        onClear={handleClear}
        onShuffle={handleShuffle}
        validationError={validationError}
        validationSuccess={validationSuccess}
      />
    </div>
  )
}