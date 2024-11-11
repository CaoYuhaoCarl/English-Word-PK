import { TrainingRecord } from '../types';

export class StorageService {
  private static readonly STORAGE_KEYS = {
    TRAINING_RECORDS: 'trainingRecords',
    GAME_STATE: 'gameState',
    USER_PREFERENCES: 'userPreferences',
  } as const;

  static saveTrainingRecords(records: TrainingRecord[]): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEYS.TRAINING_RECORDS,
        JSON.stringify(records)
      );
    } catch (error) {
      console.error('Failed to save training records:', error);
    }
  }

  static getTrainingRecords(): TrainingRecord[] {
    try {
      const records = localStorage.getItem(this.STORAGE_KEYS.TRAINING_RECORDS);
      return records ? JSON.parse(records) : [];
    } catch (error) {
      console.error('Failed to load training records:', error);
      return [];
    }
  }

  static clearTrainingRecords(): void {
    localStorage.removeItem(this.STORAGE_KEYS.TRAINING_RECORDS);
  }
}