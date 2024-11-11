import { Word, Player, TrainingRecord } from '../types';

export function validateWord(word: Word): boolean {
  return (
    typeof word.word === 'string' &&
    word.word.length > 0 &&
    typeof word.type === 'string' &&
    typeof word.meaning === 'string' &&
    word.meaning.length > 0
  );
}

export function validatePlayer(player: Player): boolean {
  return (
    typeof player.id === 'string' &&
    typeof player.name === 'string' &&
    player.name.length > 0 &&
    typeof player.score === 'number' &&
    typeof player.answeredCount === 'number' &&
    typeof player.correctCount === 'number' &&
    typeof player.remainingTurns === 'number'
  );
}

export function validateTrainingRecord(record: TrainingRecord): boolean {
  return (
    typeof record.timestamp === 'string' &&
    typeof record.playerId === 'string' &&
    typeof record.playerName === 'string' &&
    typeof record.word === 'string' &&
    typeof record.isCorrect === 'boolean' &&
    typeof record.responseTime === 'number' &&
    typeof record.earnedPoints === 'number'
  );
}