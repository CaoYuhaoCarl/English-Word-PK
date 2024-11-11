import { Word, Player, TrainingRecord } from '../types';

export class RecordingService {
  private static records: TrainingRecord[] = [];

  static recordAnswer(
    player: Player,
    word: Word,
    isCorrect: boolean,
    responseTime: number,
    earnedPoints: number
  ) {
    const record: TrainingRecord = {
      timestamp: new Date().toISOString(),
      playerId: player.id,
      playerName: player.name,
      word: word.word,
      wordType: word.type,
      isCorrect,
      responseTime,
      earnedPoints,
      totalScore: player.score,
    };

    this.records.push(record);
    this.saveToLocalStorage();
  }

  static exportToCSV(): string {
    const headers = [
      '时间',
      '学生ID',
      '学生姓名',
      '单词',
      '词性',
      '是否正确',
      '响应时间(秒)',
      '获得分数',
      '总分'
    ];

    const rows = this.records.map(record => [
      record.timestamp,
      record.playerId,
      record.playerName,
      record.word,
      record.wordType,
      record.isCorrect ? '是' : '否',
      record.responseTime.toFixed(1),
      record.earnedPoints,
      record.totalScore
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
  }

  static downloadCSV() {
    const csvContent = this.exportToCSV();
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `词汇训练记录_${new Date().toLocaleDateString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private static saveToLocalStorage() {
    try {
      localStorage.setItem('trainingRecords', JSON.stringify(this.records));
    } catch (error) {
      console.error('Failed to save training records to localStorage:', error);
    }
  }

  static loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('trainingRecords');
      if (saved) {
        this.records = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load training records from localStorage:', error);
      this.records = [];
    }
  }

  static clearRecords() {
    this.records = [];
    localStorage.removeItem('trainingRecords');
  }
}