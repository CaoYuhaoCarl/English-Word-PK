import React from 'react';
import { motion } from 'framer-motion';
import {
  User, CircleUser, UserCircle, UserRound, 
  UserCog, UserCheck, UserPlus, Users,
  Heart, Star, Smile, Sun, 
} from 'lucide-react';

const avatarIcons = {
  '1': CircleUser,
  '2': UserCircle,
  '3': UserRound,
  '4': UserCog,
  '5': UserCheck,
  '6': UserPlus,
  '7': Users,
  '8': Heart,
  '9': Star,
  '10': Smile,
  '11': Sun,
  '12': User,
};

interface AvatarProps {
  userId: string;
  size?: number;
  className?: string;
}

export function Avatar({ userId, size = 8, className = '' }: AvatarProps) {
  const IconComponent = avatarIcons[userId as keyof typeof avatarIcons] || User;

  return (
    <motion.div
      className={`bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full ${className}`}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <IconComponent className={`w-${size} h-${size} text-white`} />
    </motion.div>
  );
}