import create from 'zustand';
import { Word, Player, GameState } from '../types';
import { INITIAL_TIME } from '../constants/game';

interface GameStore extends GameState {
  initializeGame: (players: Player[], wordsPerPlayer: number, words: Word[]) => void;
  selectNextPlayer: () => void;
  handleAnswer: (correct: boolean) => void;
  resetGame: () => void;
  setTimeLeft: (time: number) => void;
  setIsRevealed: (revealed: boolean) => void;
  setShowStats: (show: boolean) => void;
}

const initialState: GameState = {
  players: [],
  currentIndex: 0,
  currentPlayer: null,
  gameWords: [],
  isRevealed: false,
  timeLeft: INITIAL_TIME,
  gameStarted: false,
  gameActive: false,
  completed: false,
  showStats: false,
  roundStartTime: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  initializeGame: (players, wordsPerPlayer, words) => {
    set({
      players,
      gameWords: words.slice(0, players.length * wordsPerPlayer),
      gameStarted: true,
    });
  },

  selectNextPlayer: () => {
    const { players } = get();
    const eligiblePlayers = players.filter(p => p.remainingTurns > 0);
    
    if (eligiblePlayers.length === 0) {
      set({ completed: true });
      return;
    }

    const nextPlayer = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
    set({
      currentPlayer: nextPlayer,
      gameActive: true,
      timeLeft: INITIAL_TIME,
      isRevealed: false,
      roundStartTime: Date.now(),
    });
  },

  handleAnswer: (correct: boolean) => {
    const { currentPlayer, currentIndex, timeLeft, players } = get();
    if (!currentPlayer) return;

    const responseTime = INITIAL_TIME - timeLeft;
    const updatedPlayers = players.map(player =>
      player.id === currentPlayer.id
        ? {
            ...player,
            answeredCount: player.answeredCount + 1,
            correctCount: player.correctCount + (correct ? 1 : 0),
            remainingTurns: player.remainingTurns - 1,
            fastestTime: correct ? Math.min(player.fastestTime, responseTime) : player.fastestTime,
            averageTime: player.averageTime === 0 
              ? responseTime 
              : (player.averageTime * player.answeredCount + responseTime) / (player.answeredCount + 1),
          }
        : player
    );

    const completed = updatedPlayers.every(player => player.remainingTurns === 0);

    set({
      players: updatedPlayers,
      currentIndex: currentIndex + 1,
      gameActive: false,
      currentPlayer: null,
      completed,
    });
  },

  resetGame: () => set(initialState),
  setTimeLeft: (time: number) => set({ timeLeft: time }),
  setIsRevealed: (revealed: boolean) => set({ isRevealed: revealed }),
  setShowStats: (show: boolean) => set({ showStats: show }),
}));