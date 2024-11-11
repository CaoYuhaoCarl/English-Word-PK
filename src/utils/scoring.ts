const MAX_TIME = 10;
const BASE_POINTS = 10;
const TIME_BONUS_MULTIPLIER = 5;
const QUICK_RESPONSE_THRESHOLD = 5;
const QUICK_RESPONSE_BONUS = 10;
// Base correct answer: 10 points, Time bonus: (10 - responseTime) × 5 points, Quick response bonus: +10 points if answered within 5 seconds

export function calculateScore(correct: boolean, responseTime: number): number {
  if (!correct) return 0;

  // Base points for correct answer
  let points = BASE_POINTS;

  // Time bonus: more points for faster responses
  const timeBonus = Math.floor((MAX_TIME - responseTime) * TIME_BONUS_MULTIPLIER);
  points += Math.max(0, timeBonus);

  // Quick response bonus for very fast answers
  if (responseTime <= QUICK_RESPONSE_THRESHOLD) {
    points += QUICK_RESPONSE_BONUS;
  }

  return points;
}