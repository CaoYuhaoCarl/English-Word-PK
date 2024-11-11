import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Check, X, Volume2, Eye } from 'lucide-react';
import type { Word } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface BattleArenaProps {
  word: Word;
  currentPlayer: any;
  timeLeft: number;
  onAnswer: (correct: boolean) => void;
  isRevealed: boolean;
  onReveal: () => void;
}

export function BattleArena({
  word,
  timeLeft,
  onAnswer,
  isRevealed,
  onReveal,
}: BattleArenaProps) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          onAnswer(true);
          break;
        case 'ArrowRight':
          onAnswer(false);
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          if (!isRevealed) onReveal();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onAnswer, onReveal, isRevealed]);

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-primary-50 to-white">
        <div className="p-4">
          {/* Timer and Word Type */}
          <div className="flex justify-between items-center mb-3">
            <motion.div 
              className="flex items-center bg-white px-3 py-1.5 rounded-lg shadow-md"
              animate={{ 
                scale: timeLeft <= 5 ? [1, 1.1, 1] : 1,
                color: timeLeft <= 5 ? '#EF4444' : '#000000'
              }}
              transition={{ repeat: timeLeft <= 5 ? Infinity : 0, duration: 0.5 }}
            >
              <Timer className={`w-4 h-4 mr-1.5 ${timeLeft <= 5 ? 'text-red-500' : 'text-primary-500'}`} />
              <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500' : ''}`}>
                {timeLeft}s
              </span>
            </motion.div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-primary-700 px-3 py-1 bg-primary-50 rounded-full border border-primary-100">
                {word.type}
              </span>
              <Button
                variant="secondary"
                icon={Volume2}
                className="!p-2"
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(word.word);
                  utterance.lang = 'en-US';
                  speechSynthesis.speak(utterance);
                }}
              />
            </div>
          </div>

          {/* Word Display */}
          <div className="text-center mb-4">
            <motion.h2 
              className="text-6xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {word.word}
            </motion.h2>
          </div>

          {/* Answer Buttons */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <motion.button
              onClick={() => onAnswer(true)}
              className="group relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Check className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={() => onAnswer(false)}
              className="group relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-rose-500 to-rose-600 rounded-full text-white shadow-lg hover:shadow-rose-500/25 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Word Content */}
          {isRevealed ? (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-2xl text-center text-primary-950 font-medium">
                {word.meaning}
              </p>
              {word.example && (
                <div className="bg-primary-50 border border-primary-100 p-3 rounded-xl">
                  <p className="text-sm text-center text-primary-700 italic">
                    "{word.example}"
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <Button
              variant="primary"
              icon={Eye}
              onClick={onReveal}
              className="w-full font-medium"
            >
              显示含义
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}