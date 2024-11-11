import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Crown, Medal, Clock, Zap, Download } from 'lucide-react';
import { Card } from './ui/Card';
import { IconBadge } from './ui/IconBadge';
import { Button } from './ui/Button';

interface PlayerStats {
  id: string;
  name: string;
  score: number;
  answeredCount: number;
  correctCount: number;
  remainingTurns: number;
  fastestTime: number;
  averageTime: number;
}

interface StudentStatsProps {
  players: PlayerStats[];
  onExportData?: () => void;
}

function comparePlayerRanks(a: PlayerStats, b: PlayerStats): number {
  // First compare by score
  if (b.score !== a.score) {
    return b.score - a.score;
  }
  
  // If scores are equal, compare by average time
  if (a.averageTime !== b.averageTime) {
    return a.averageTime - b.averageTime;
  }
  
  // If average times are equal, compare by fastest time
  return a.fastestTime - b.fastestTime;
}

const PodiumStep = ({ player, position }: { player: PlayerStats; position: number }) => {
  const heights = {
    1: 'h-32',
    2: 'h-24',
    3: 'h-20'
  };

  const colors = {
    1: 'from-primary-300 to-primary-400',
    2: 'from-primary-200 to-primary-300',
    3: 'from-primary-100 to-primary-200'
  };

  const icons = {
    1: <Crown className="w-6 h-6 text-primary-500" />,
    2: <Medal className="w-5 h-5 text-primary-400" />,
    3: <Medal className="w-5 h-5 text-primary-300" />
  };

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.1 }}
    >
      <div className="relative mb-2">
        <motion.div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: position * 0.1 + 0.2, type: "spring" }}
        >
          {icons[position as keyof typeof icons]}
        </motion.div>
        <div className="w-24 h-24 rounded-full bg-white shadow-lg p-1">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-to-br from-primary-600 to-primary-800 text-transparent bg-clip-text">
              {player.name}
            </span>
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-md">
          <span className="font-bold text-primary-600">{player.score}</span>
        </div>
      </div>
      <div className={`w-20 rounded-t-lg bg-gradient-to-br ${colors[position as keyof typeof colors]} ${heights[position as keyof typeof heights]} flex flex-col items-center justify-end pb-2 px-2`}>
        <div className="text-white/90 text-xs mb-1 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {player.fastestTime < Infinity ? `${player.fastestTime.toFixed(1)}s` : '-'}
        </div>
        <div className="text-white/90 text-xs flex items-center">
          <Target className="w-3 h-3 mr-1" />
          {player.answeredCount > 0
            ? `${Math.round((player.correctCount / player.answeredCount) * 100)}%`
            : '0%'}
        </div>
      </div>
    </motion.div>
  );
};

export function StudentStats({ players, onExportData }: StudentStatsProps) {
  const sortedPlayers = [...players].sort(comparePlayerRanks);
  const topThree = sortedPlayers.slice(0, 3);
  const remainingPlayers = sortedPlayers.slice(3);

  const gridPattern = {
    backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
    backgroundSize: '20px 20px'
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={gridPattern} />
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-primary-800 flex items-center">
            <Trophy className="w-5 h-5 text-primary-500 mr-2" />
            学生排行榜
          </h2>
          {onExportData && (
            <Button
              variant="secondary"
              icon={Download}
              onClick={onExportData}
              className="text-sm"
            >
              导出记录
            </Button>
          )}
        </div>

        {/* Podium Section */}
        <div className="mb-8">
          <div className="flex justify-center items-end space-x-6">
            {/* Second Place */}
            {topThree[1] && (
              <PodiumStep player={topThree[1]} position={2} />
            )}
            
            {/* First Place */}
            {topThree[0] && (
              <PodiumStep player={topThree[0]} position={1} />
            )}
            
            {/* Third Place */}
            {topThree[2] && (
              <PodiumStep player={topThree[2]} position={3} />
            )}
          </div>
        </div>

        {/* Remaining Players List */}
        {remainingPlayers.length > 0 && (
          <div className="mt-8 space-y-3">
            <h3 className="text-lg font-semibold text-primary-700 mb-4">其他选手</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {remainingPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary-50/50 rounded-xl p-4 border border-primary-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-primary-700">
                        #{index + 4}
                      </span>
                      <span className="font-medium text-primary-900">
                        {player.name}
                      </span>
                    </div>
                    <div className="flex items-center text-primary-600">
                      <Trophy className="w-4 h-4 mr-1" />
                      <span className="font-bold">{player.score}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-primary-600">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      <span>
                        {player.answeredCount > 0
                          ? Math.round((player.correctCount / player.answeredCount) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>
                        {player.fastestTime < Infinity ? `${player.fastestTime.toFixed(1)}s` : '-'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      <span>
                        剩余: {player.remainingTurns}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          .perspective {
            perspective: 2000px;
          }
          .perspective-1000 {
            perspective: 1000px;
          }
        `}
      </style>
    </Card>
  );
}