import React from 'react';
import { clsx } from 'clsx';
import { IStatus } from '../types';

interface StatusBadgeProps {
  status: IStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        status.style
      )}
    >
      {status.label}
    </span>
  );
};