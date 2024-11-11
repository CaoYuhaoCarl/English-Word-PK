import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Clock, Zap, ChevronRight } from 'lucide-react';
import { Avatar } from './ui/Avatar';
import { useSpeech } from '../hooks/useSpeech';

interface Player {
  id: string;
  name: string;
  score: number;
  answeredCount: number;
  correctCount: number;
  remainingTurns: number;
  fastestTime: number;
  averageTime: number;
}

interface CurrentPlayerProps {
  player: Player;
}

export function CurrentPlayer({ player }: CurrentPlayerProps) {
  const { speak } = useSpeech();
  const accuracy = player.answeredCount > 0 
    ? Math.round((player.correctCount / player.answeredCount) * 100) 
    : 0;

  // 当新玩家出现时播放语音提示
  useEffect(() => {
    speak(`${player.name}, 轮到你了`, {
      voice: 'zh-CN-XiaoxiaoNeural',
      rate: 1.1,
      pitch: 1.2
    });
  }, [player.id, player.name, speak]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative mb-4"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400/30 via-primary-500/30 to-primary-400/30"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          borderRadius: "0.75rem",
          filter: "blur(24px)",
        }}
      />

      <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-xl p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Animated Arrow */}
            <motion.div
              animate={{
                x: [0, 10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hidden sm:block"
            >
              <ChevronRight className="w-8 h-8 text-white/80" />
            </motion.div>

            {/* Avatar with Glow */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "blur(8px)",
                }}
              />
              <Avatar userId={player.id} size={12} className="p-2 relative z-10" />
            </div>

            {/* Name Section */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <h3 className="text-3xl font-bold mb-0.5 relative">
                  {/* Glowing Background */}
                  <span className="absolute inset-0 bg-white/20 blur-lg" />
                  {/* Text with Gradient */}
                  <span
                    className="relative animate-shine bg-gradient-text"
                    style={{
                      background: 'linear-gradient(to right, #ffffff 20%, #e0f2ff 40%, #ffffff 60%, #e0f2ff 80%)',
                      backgroundSize: '200% auto',
                      color: 'transparent',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                    }}
                  >
                    {player.name}
                  </span>
                </h3>
                <div className="flex items-center">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400 mr-2"
                    animate={{
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <p className="text-primary-100 text-sm font-medium">轮到你啦！</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Trophy, label: '得分', value: player.score },
              { icon: Target, label: '正确率', value: `${accuracy}%` },
              { icon: Clock, label: '最快', value: player.fastestTime < Infinity ? `${player.fastestTime.toFixed(1)}s` : '-' },
              { icon: Zap, label: '剩余', value: player.remainingTurns }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="bg-white/10 rounded-lg p-1 mb-0.5 mx-auto w-8 h-8 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary-100" />
                </div>
                <p className="text-[10px] text-primary-100 leading-tight">{stat.label}</p>
                <p className="text-sm font-bold text-white leading-tight">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }
          .animate-shine {
            animation: shine 3s linear infinite;
          }
          .bg-gradient-text {
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
          }
        `}
      </style>
    </motion.div>
  );
}