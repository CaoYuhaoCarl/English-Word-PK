// Game Types
export interface Word {
  word: string;
  type: string;
  meaning: string;
  example?: string;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  answeredCount: number;
  correctCount: number;
  remainingTurns: number;
  fastestTime: number;
  averageTime: number;
}

export interface GameState {
  players: Player[];
  currentIndex: number;
  currentPlayer: Player | null;
  gameWords: Word[];
  isRevealed: boolean;
  timeLeft: number;
  gameStarted: boolean;
  gameActive: boolean;
  completed: boolean;
  showStats: boolean;
  roundStartTime: number;
}

export interface TrainingRecord {
  timestamp: string;
  playerId: string;
  playerName: string;
  word: string;
  wordType: string;
  isCorrect: boolean;
  responseTime: number;
  earnedPoints: number;
  totalScore: number;
}

// Component Props Types
export interface WordCardProps {
  word: Word;
  onAnswer: (correct: boolean) => void;
  isRevealed: boolean;
  onReveal: () => void;
}

export interface BattleArenaProps {
  word: Word;
  currentPlayer: Player | null;
  timeLeft: number;
  onAnswer: (correct: boolean) => void;
  isRevealed: boolean;
  onReveal: () => void;
}

export interface StudentSelectorProps {
  onSelectPlayers: (players: Player[], wordsPerPlayer: number) => void;
}

export interface StudentStatsProps {
  players: Player[];
}

export interface CurrentPlayerProps {
  player: Player;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  correct: number;
}