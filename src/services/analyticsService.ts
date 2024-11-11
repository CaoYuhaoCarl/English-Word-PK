import { TrainingRecord, Player } from '../types';

export class AnalyticsService {
  static calculatePlayerStats(records: TrainingRecord[], player: Player) {
    const playerRecords = records.filter(r => r.playerId === player.id);
    
    return {
      totalWords: playerRecords.length,
      correctWords: playerRecords.filter(r => r.isCorrect).length,
      averageTime: this.calculateAverageTime(playerRecords),
      topScore: this.findTopScore(playerRecords),
      progressOverTime: this.calculateProgressOverTime(playerRecords),
    };
  }

  private static calculateAverageTime(records: TrainingRecord[]): number {
    if (records.length === 0) return 0;
    const totalTime = records.reduce((sum, record) => sum + record.responseTime, 0);
    return totalTime / records.length;
  }

  private static findTopScore(records: TrainingRecord[]): number {
    return Math.max(...records.map(r => r.earnedPoints), 0);
  }

  private static calculateProgressOverTime(records: TrainingRecord[]) {
    return records.map((record, index) => ({
      attempt: index + 1,
      score: record.earnedPoints,
      cumulative: records
        .slice(0, index + 1)
        .reduce((sum, r) => sum + r.earnedPoints, 0),
    }));
  }
}