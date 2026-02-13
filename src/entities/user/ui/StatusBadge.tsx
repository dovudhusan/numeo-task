import { memo } from 'react';
import type { UserStatus } from '../model/types';

const statusStyles: Record<UserStatus, string> = {
  active: 'bg-emerald-500/90 text-white',
  pending: 'bg-amber-400/90 text-amber-900',
  banned: 'bg-rose-500/90 text-white',
  rejected: 'bg-gray-400/90 text-white',
};

interface StatusBadgeProps {
  status: UserStatus;
}

export const StatusBadge = memo(function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status] ?? statusStyles.rejected;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
      {status}
    </span>
  );
});
