import { Word, Player, GameState } from '../types';
import { INITIAL_TIME, BASE_POINTS, TIME_BONUS_MULTIPLIER, QUICK_RESPONSE_THRESHOLD, QUICK_RESPONSE_BONUS } from '../constants/game';
import { selectRandomWords } from '../utils/wordSelection';

export class GameService {
  static getInitialState(): GameState {
    return {
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
  }

  static initializeGame(
    students: { id: string; name: string }[],
    wordsPerPlayer: number,
    allWords: Word[]
  ): Partial<GameState> {
    const gameWords = selectRandomWords(allWords, students.length * wordsPerPlayer);
    const initializedPlayers = students.map(student => ({
      ...student,
      score: 0,
      answeredCount: 0,
      correctCount: 0,
      remainingTurns: wordsPerPlayer,
      fastestTime: Infinity,
      averageTime: 0,
    }));

    return {
      players: initializedPlayers,
      gameWords,
      gameStarted: true,
    };
  }

  static selectNextPlayer(players: Player[]): Player | null {
    const eligiblePlayers = players.filter(p => p.remainingTurns > 0);
    if (eligiblePlayers.length === 0) return null;
    return eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
  }

  static calculateScore(correct: boolean, responseTime: number): number {
    if (!correct) return 0;

    let points = BASE_POINTS;
    const timeBonus = Math.floor((INITIAL_TIME - responseTime) * TIME_BONUS_MULTIPLIER);
    points += Math.max(0, timeBonus);

    if (responseTime <= QUICK_RESPONSE_THRESHOLD) {
      points += QUICK_RESPONSE_BONUS;
    }

    return points;
  }

  static handleAnswer(
    correct: boolean,
    responseTime: number,
    currentPlayer: Player,
    players: Player[]
  ): Player[] {
    const earnedPoints = this.calculateScore(correct, responseTime);

    return players.map(player =>
      player.id === currentPlayer.id
        ? {
            ...player,
            score: player.score + earnedPoints,
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
  }

  static isGameCompleted(players: Player[]): boolean {
    return players.every(player => player.remainingTurns === 0);
  }
}