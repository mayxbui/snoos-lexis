// WordGrid.tsx
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

// import React from "react";
// import { FoundWord } from "../../shared/types/types";

// /**
//  * WordGrid Component
//  * 
//  * Displays all words found by the player
//  * Organized by word length (6-letter, 5-letter, 4-letter, 3-letter)
//  * Shows score for each word
//  * Highlights pangrams with confetti and effects
//  */

// interface WordGridProps {
//     foundWords: FoundWord[];
// }

// export const WordGrid: React.FC<WordGridProps> = ({foundWords}) =>{
//     /**
//      * Group words by length
//      * {6: [wordA, wordB...], 5:[...]}
//      */

//     const wordsByLength = foundWords.reduce(
//         (acc, word)=>{
//             if(!acc[word.length]){
//                 acc[word.length]=[];
//             }
//             acc[word.length].push(word);
//             return acc;
//         },
//         {} as Record<number,FoundWord[]>
//     );

//     const lengths=[6,5,4,3];

//     if(foundWords.length===0){
//         return(
//             <div className="word-grid-empty">
//                 <div className="empty-state">
//                     <p>No words is found yet</p>
//                     <p className="hint">Select letters and submit to start</p>
//                 </div>
//                 <div className="word-grid">
//                     <div className="word-grid-header">
//                         <h2>Words Found: {foundWords.length}</h2>
//                     </div>

//                     <div className="word-grid-container">
//                         {lengths.map((length)=> wordsByLength[length] ? (
//                             <div key={length} className={`word-group length-${length}`}>
//                                 <div className="group-header">
//                                 <h3>{length}-Letter Words</h3>
//                                 <span className="group-count">
//                                 {wordsByLength[length].length}
//                                 </span>
//                             </div>

//                             <div className="words-list">
//                                 {wordsByLength[length].map((word,index)=>(
//                                     <div
//                                         key={index}
//                                         className={`word-card ${word.isPangram ?'pangram':''}`}
//                                         title={`${word.score} points${word.isPangram? ' - Pangram!':''}`}>
//                                             <div className="word-text">{word.word.toUpperCase()}</div>
//                                             <div className="word-score">+{word.score}</div>
//                                             {word.isPangram && (
//                                                 <div className="pangram-" title="You used all 6 letters!">⭐</div>
//                                             )}
//                                         </div>
//                                 ))}
//                                 </div>
//                             </div>    
//                         ): null
//                         )}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default WordGrid;