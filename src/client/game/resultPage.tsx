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
 * - Only play once a day
 */

interface ResultPageProps{
    isOpen: boolean;
    finalScore: number;
    foundWords: FoundWord[];
    possibleWordsCount: number;
    playerRank?: number;
    playerUsername?: string;
    onClose:()=>void;
    leaderboard?: { username: string; rank: number; score: number }[]; // Add leaderboard prop
    dayNumber: number; // Pass the day number to the component
}

export const ResultPage: React.FC<ResultPageProps> = ({
    isOpen,
    finalScore,
    foundWords,
    possibleWordsCount,
    playerRank,
    playerUsername = 'Player',
    onClose,
    leaderboard = [],
    dayNumber, // Receive dayNumber as a prop
}) => {
    const [shareMsg, setShareMsg] = useState('');
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const wordsFound = foundWords.length;
    const accuracy = possibleWordsCount > 0 ? Math.round((wordsFound / possibleWordsCount) * 100) : 0;
    const isPerfectRun = wordsFound === possibleWordsCount;
    const longestWord = foundWords.length > 0 ? foundWords.reduceRight((prev, current) => current.length > prev.length ? current : prev) : null;
    const pangrams = foundWords.filter((word) => word.isPangram).length;

    const generateShareText = () => {
        const text = `Snoo's Lexis #${dayNumber}\n\n` + 
            `Score: ${finalScore}\n` +
            `Words: ${wordsFound}/${possibleWordsCount}\n` +
            `Accuracy: ${accuracy}%\n` +
            `${isPerfectRun ? '✨ Perfect Score!\n' : ''}` +
            `${playerRank ? `Rank: #${playerRank}\n` : ''}\n` +
            `Play at: https://reddit.com/r/snoos-lexis`;
        setShareMsg(text);
        return text;
    };

    const handleCopyToClipboard = async () => {
        const text = generateShareText();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShareToReddit = () => {
        const text = generateShareText();
        const url = `https://reddit.com/r/snoos-lexis/submit?title=Daily%20Game%20Results&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="result-page-overlay">
            <div className="results-header">
                <h2>Snoo's Lexis #{dayNumber}</h2>
                <p>You found <strong>{wordsFound}/{possibleWordsCount}</strong> of {possibleWordsCount} words.</p>
            </div>
            
            {/* Results Tables */}
            <div className="results-tables">
                {/* Words Found Table */}
                <div className="table-container">
                    <h3>Words Found</h3>
                    <table className="words-table">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foundWords.map((word, index) => (
                                <tr key={index}>
                                    <td>{word.word.toUpperCase()}</td>
                                    <td>{word.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Ranking Table */}
                <div className="table-container">
                    <h3>Player Rankings</h3>
                    <table className="ranking-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Rank</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.username}</td>
                                    <td>{player.rank}</td>
                                    <td>{player.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="results-separator"></div>

            {/* Share section */}
            <div className="results-share-section">
                <h3>Share Your Results</h3>
                <div className="share-text-preview">
                    <pre>{generateShareText()}</pre>
                </div>

                <div className="share-buttons">
                    <button
                        className="btn btn-primary btn-share-reddit"
                        onClick={handleShareToReddit}
                        title="Share to Reddit"
                        type="button"
                    > Share to Reddit
                    </button>

                    <button
                        className={`btn btn-secondary btn-copy ${copied ? 'copied' : ''}`}
                        onClick={handleCopyToClipboard}
                        title="Copy to clipboard"
                        type="button"
                    >{copied ? '✓ Copied!' : '📋 Copy Text'}</button>
                </div>
                <div className="results-footer-tip">
                    <p>💡 Come back tomorrow for a new puzzle!</p>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;