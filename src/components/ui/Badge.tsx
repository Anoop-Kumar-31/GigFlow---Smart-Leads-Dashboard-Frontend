import React from 'react';
import { clsx } from 'clsx';
import { LeadStatus, LeadSource } from '../../types/lead.types';

interface BadgeProps {
  label: string;
  variant?: string;
}
const statusColors: Record<string, string> = {
  [LeadStatus.NEW]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [LeadStatus.CONTACTED]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [LeadStatus.QUALIFIED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [LeadStatus.LOST]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [LeadSource.WEBSITE]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  [LeadSource.INSTAGRAM]: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  [LeadSource.REFERRAL]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

export const Badge: React.FC<BadgeProps> = ({ label, variant }) => {
  const colorClass = variant
    ? (statusColors[variant] ?? 'bg-gray-100 text-gray-800')
    : 'bg-gray-100 text-gray-800';

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        colorClass
      )}
    >
      {label}
    </span>
  );
};
