import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconBadgeProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  className?: string;
}

export function IconBadge({ icon: Icon, label, value, className = '' }: IconBadgeProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Icon className="w-4 h-4 text-primary-500" />
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );
}