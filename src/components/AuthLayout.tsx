import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Button } from './ui/Button';

export function AuthLayout() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white p-3 shadow-lg"
          >
            <BookOpen className="h-12 w-12 text-primary-600" />
          </motion.div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          英文单词练习PK
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mb-4">
          {isSignUp ? '创建新账号开始练习' : '登录以开始练习'}
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            variant={!isSignUp ? 'primary' : 'secondary'}
            onClick={() => setIsSignUp(false)}
          >
            登录
          </Button>
          <Button
            variant={isSignUp ? 'primary' : 'secondary'}
            onClick={() => setIsSignUp(true)}
          >
            注册
          </Button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? 'signup' : 'signin'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            {isSignUp ? (
              <SignUp afterSignUpUrl="/" redirectUrl="/" />
            ) : (
              <SignIn afterSignInUrl="/" redirectUrl="/" />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}