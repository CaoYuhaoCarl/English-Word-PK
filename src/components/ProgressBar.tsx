import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  correct: number;
}

export function ProgressBar({ current, total, correct }: ProgressBarProps) {
  const progress = (current / total) * 100;
  const accuracy = current > 0 ? (correct / current) * 100 : 0;

  return (
    <div className="w-full max-w-md mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          进度: {current}/{total}
        </span>
        <span className="text-sm font-medium text-gray-700">
          正确率: {accuracy.toFixed(1)}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}