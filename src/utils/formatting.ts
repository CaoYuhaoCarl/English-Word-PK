export function formatTime(seconds: number): string {
  return seconds.toFixed(1) + 's';
}

export function formatScore(score: number): string {
  return score.toLocaleString();
}

export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0%';
  return Math.round((value / total) * 100) + '%';
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}