import { Word } from '../data/words';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectRandomWords(words: Word[], count: number): Word[] {
  const shuffled = shuffleArray(words);
  return shuffled.slice(0, count);
}

export function distributeWordsToPlayers(
  words: Word[],
  playerCount: number,
  wordsPerPlayer: number
): Word[] {
  const totalWordsNeeded = playerCount * wordsPerPlayer;
  const shuffledWords = shuffleArray(words);
  
  // If we need more words than available, repeat the shuffled words
  if (totalWordsNeeded > words.length) {
    const repetitions = Math.ceil(totalWordsNeeded / words.length);
    const extendedWords: Word[] = [];
    for (let i = 0; i < repetitions; i++) {
      extendedWords.push(...shuffleArray(words));
    }
    return extendedWords.slice(0, totalWordsNeeded);
  }
  
  return shuffledWords.slice(0, totalWordsNeeded);
}