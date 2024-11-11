import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame } from 'framer-motion';
import { Book, Check, X, Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import type { Word } from '../data/words';

interface WordCardProps {
  word: Word;
  onAnswer: (correct: boolean) => void;
  isRevealed: boolean;
  onReveal: () => void;
}

export function WordCard({ word, onAnswer, isRevealed, onReveal }: WordCardProps) {
  const { speak } = useSpeech();
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  
  // Add spring physics to the rotation
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Floating animation
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  
  useAnimationFrame((t) => {
    if (isHovered) return;
    y.set(Math.sin(t / 1000) * 10);
    rotate.set(Math.sin(t / 2000) * 2);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleSpeak = () => {
    speak(word.word, {
      lang: 'en-US',
      rate: 0.9
    });
  };

  return (
    <div className="perspective-2000 w-full max-w-md mx-auto">
      <motion.div
        className="relative w-full"
        style={{
          y,
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          rotate,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden transform-gpu">
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-200 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: 0,
                }}
                animate={{
                  y: [
                    Math.random() * 100 + "%",
                    Math.random() * 100 + "%",
                  ],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Card Content */}
          <div className="relative p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <motion.span 
                className="text-sm font-medium text-primary-600 bg-primary-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-inner"
                whileHover={{ scale: 1.05 }}
              >
                {word.type}
              </motion.span>
              <motion.button
                onClick={handleSpeak}
                className="p-3 text-primary-500 hover:text-primary-600 transition-colors bg-white rounded-full shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Volume2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Word Display */}
            <motion.div
              className="relative py-10 px-6 mb-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)]"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              
              <motion.h2 
                className="relative text-6xl md:text-7xl font-black text-center text-white tracking-wide"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
              >
                {word.word}
              </motion.h2>
            </motion.div>

            {/* Meaning and Controls */}
            {isRevealed ? (
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-2xl font-medium text-primary-900 mb-4">
                    {word.meaning}
                  </p>
                  {word.example && (
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-primary-100/50 backdrop-blur-sm" />
                      <p className="relative text-sm text-primary-700 italic p-4">
                        "{word.example}"
                      </p>
                    </div>
                  )}
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    onClick={() => onAnswer(false)}
                    className="group relative px-6 py-4 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl text-white font-medium shadow-lg"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 rounded-xl"
                      whileHover={{ opacity: 0.1 }}
                    />
                    <span className="flex items-center justify-center">
                      <X className="w-5 h-5 mr-2" />
                      不认识
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => onAnswer(true)}
                    className="group relative px-6 py-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white font-medium shadow-lg"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 rounded-xl"
                      whileHover={{ opacity: 0.1 }}
                    />
                    <span className="flex items-center justify-center">
                      <Check className="w-5 h-5 mr-2" />
                      认识
                    </span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.button
                onClick={onReveal}
                className="w-full relative overflow-hidden px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl 
                  shadow-lg text-lg font-medium"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0"
                  whileHover={{ opacity: 0.1 }}
                />
                显示含义
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      <style>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>
    </div>
  );
}