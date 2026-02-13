  export interface GameState{
    id: string;
    dailyGameId: string;
    letters: string[];
    selectedLetters: string[];
    foundWords: FoundWord[];
    timer: number;
    isActive: boolean;
    score: number;
  }

  export interface FoundWord{
    word: string;
    score: number;
    length: number;
    timestamp: number;
    isSnooed?: boolean;
  }

export interface ValidationResult {
  valid: boolean;
  wordData?: FoundWord;
  error?: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  wordCount: number;
}
