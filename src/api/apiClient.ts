// Type-safe API client
import axios from 'axios';
import type { Word, Player, TrainingRecord } from '../types';
import { API_ENDPOINTS } from './endpoints';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const WordsAPI = {
  getWords: () => apiClient.get<Word[]>(API_ENDPOINTS.WORDS),
  getWordsByType: (type: string) => apiClient.get<Word[]>(`${API_ENDPOINTS.WORDS}/type/${type}`),
};

export const PlayersAPI = {
  getPlayers: () => apiClient.get<Player[]>(API_ENDPOINTS.PLAYERS),
  updatePlayerScore: (playerId: string, score: number) => 
    apiClient.put(`${API_ENDPOINTS.PLAYERS}/${playerId}/score`, { score }),
};

export const TrainingAPI = {
  saveRecord: (record: TrainingRecord) => 
    apiClient.post(API_ENDPOINTS.TRAINING, record),
  getRecords: () => 
    apiClient.get<TrainingRecord[]>(API_ENDPOINTS.TRAINING),
  exportRecords: () => 
    apiClient.get(`${API_ENDPOINTS.TRAINING}/export`, { responseType: 'blob' }),
};