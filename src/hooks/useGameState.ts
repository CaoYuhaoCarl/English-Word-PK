import { useState, useCallback, useEffect } from 'react';
import { Word, GameState } from '../types';
import { GameService } from '../services/gameService';
import { RecordingService } from '../services/recordingService';
import { INITIAL_TIME } from '../constants/game';

export function useGameState(allWords: Word[]) {
  const [state, setState] = useState<GameState>(GameService.getInitialState());

  // 初始化时加载历史记录
  useEffect(() => {
    RecordingService.loadFromLocalStorage();
  }, []);

  const initializeGame = useCallback((students: { id: string; name: string }[], wordsPerPlayer: number) => {
    setState(prev => ({
      ...prev,
      ...GameService.initializeGame(students, wordsPerPlayer, allWords)
    }));
  }, [allWords]);

  const selectNextPlayer = useCallback(() => {
    setState(prev => {
      const nextPlayer = GameService.selectNextPlayer(prev.players);
      
      if (!nextPlayer) {
        return { ...prev, completed: true };
      }

      return {
        ...prev,
        currentPlayer: nextPlayer,
        gameActive: true,
        timeLeft: INITIAL_TIME,
        isRevealed: false,
        roundStartTime: Date.now(),
      };
    });
  }, []);

  const handleAnswer = useCallback((correct: boolean) => {
    setState(prev => {
      if (!prev.currentPlayer || !prev.gameWords[prev.currentIndex]) return prev;

      const responseTime = INITIAL_TIME - prev.timeLeft;
      const earnedPoints = GameService.calculateScore(correct, responseTime);
      
      // 记录训练数据
      RecordingService.recordAnswer(
        prev.currentPlayer,
        prev.gameWords[prev.currentIndex],
        correct,
        responseTime,
        earnedPoints
      );

      const updatedPlayers = GameService.handleAnswer(
        correct,
        responseTime,
        prev.currentPlayer,
        prev.players
      );

      const completed = GameService.isGameCompleted(updatedPlayers);

      return {
        ...prev,
        players: updatedPlayers,
        currentIndex: prev.currentIndex + 1,
        gameActive: false,
        currentPlayer: null,
        completed,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState(GameService.getInitialState());
  }, []);

  const exportTrainingData = useCallback(() => {
    RecordingService.downloadCSV();
  }, []);

  return {
    state,
    initializeGame,
    selectNextPlayer,
    handleAnswer,
    resetGame,
    exportTrainingData,
    setTimeLeft: (time: number) => setState(prev => ({ ...prev, timeLeft: time })),
    setIsRevealed: (revealed: boolean) => setState(prev => ({ ...prev, isRevealed: revealed })),
    setShowStats: (show: boolean) => setState(prev => ({ ...prev, showStats: show })),
  };
}