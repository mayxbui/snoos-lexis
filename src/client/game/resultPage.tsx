import React, { useState } from 'react';
import { FoundWord } from '../../shared/types/types';

/**
 * Results Page Component
 * 
 * Displays when game is over (timer = 0)
 * Shows:
 * - Final score
 * - Words found vs possible words
 * - Player rank on leaderboard
 * - Perfect score badge (if found all words)
 * - Share to Reddit button
 */

interface ResultPageProps{
    isOpen: boolean;
    finalScore: number;
    foundWords: FoundWord[];
    possibleWordsCount: number;
    playerRank?: number;
    playerUsername?: string;
    onPlayAgain:()=>void;
    onClose:()=>void;
}

export const ResultPage: React.FC<ResultPageProps>=({
    isOpen,
    finalScore,
    foundWords,
    possibleWordsCount,
    playerRank,
    playerUsername='Player',
    onPlayAgain,
    onClose,
})=>{
    const [shareMsg, setShareMsg]=useState('');
    const [copied, setCopied]=useState(false);

    if(!isOpen) return null;

    const wordsFound = foundWords.length;
    const accuracy = possibleWordsCount>0 ? Math.round((wordsFound/possibleWordsCount)*100):0;
    const isPerfectRun=wordsFound===possibleWordsCount;
    const longestWord = foundWords.length>0 ? foundWords.reduceRight((prev, current)=>current.length>prev.length ? current : prev) : null;
    const pangrams=foundWords.filter((word)=>word.isPangram).length;

    const generateShareText=()=>{
        const text=`Snoo's Lexis #${new Date().toLocaleDateString()}`
    }
};