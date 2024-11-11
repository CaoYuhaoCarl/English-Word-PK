import React, { useEffect } from 'react';
import { Trophy, UserRound, BookOpen } from 'lucide-react';
import { words } from './data/words';
import { StudentSelector } from './components/StudentSelector';
import { BattleArena } from './components/BattleArena';
import { StudentStats } from './components/StudentStats';
import { CurrentPlayer } from './components/CurrentPlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { AuthLayout } from './components/AuthLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const { user } = useUser();
  const {
    state,
    initializeGame,
    selectNextPlayer,
    handleAnswer,
    resetGame,
    exportTrainingData,
    setTimeLeft,
    setIsRevealed,
    setShowStats,
  } = useGameState(words);

  const {
    players,
    currentIndex,
    currentPlayer,
    gameWords,
    isRevealed,
    timeLeft,
    gameStarted,
    gameActive,
    completed,
    showStats,
  } = state;

  useEffect(() => {
    if (gameStarted && !showStats) {
      setShowStats(true);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted && !completed && !currentPlayer) {
      selectNextPlayer();
    }
  }, [gameStarted, completed, currentPlayer, selectNextPlayer]);

  useEffect(() => {
    if (gameStarted && gameActive && !completed && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 1) {
          setIsRevealed(true);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameActive, completed, timeLeft, setTimeLeft, setIsRevealed]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        <SignedOut>
          <AuthLayout />
        </SignedOut>

        <SignedIn>
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-primary-600" />
                  <h1 className="ml-2 text-xl font-bold text-primary-900">
                    单词练习系统
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-primary-600">
                    {user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress}
                  </span>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8',
                        userButtonPopoverCard: 'shadow-xl border-0',
                        userButtonPopoverFooter: 'hidden',
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!gameStarted ? (
              <StudentSelector onSelectPlayers={initializeGame} />
            ) : completed ? (
              <motion.div 
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8">
                  <Trophy className="w-24 h-24 text-primary-500 mx-auto mb-6" />
                  <h1 className="text-4xl font-bold text-primary-900 mb-8">学习结束！</h1>
                  <StudentStats players={players} onExportData={exportTrainingData} />
                  <Button
                    variant="primary"
                    onClick={resetGame}
                    size="lg"
                    className="mt-8"
                  >
                    重新开始
                  </Button>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <Card className="p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-primary-700">
                      第 {currentIndex + 1}/{gameWords.length} 题
                    </span>
                    <div className="flex items-center space-x-2">
                      <UserRound className="w-5 h-5 text-primary-500" />
                      <span className="font-medium text-primary-700">
                        总回合: {gameWords.length}
                      </span>
                    </div>
                  </div>
                </Card>

                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    {currentPlayer && <CurrentPlayer key="current-player" player={currentPlayer} />}
                  </AnimatePresence>
                  
                  <AnimatePresence mode="wait">
                    {gameActive && gameWords[currentIndex] && (
                      <BattleArena
                        key="battle-arena"
                        word={gameWords[currentIndex]}
                        currentPlayer={currentPlayer}
                        timeLeft={timeLeft}
                        onAnswer={handleAnswer}
                        isRevealed={isRevealed}
                        onReveal={() => setIsRevealed(true)}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {showStats && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StudentStats players={players} onExportData={exportTrainingData} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </main>
        </SignedIn>
      </div>
    </ErrorBoundary>
  );
}