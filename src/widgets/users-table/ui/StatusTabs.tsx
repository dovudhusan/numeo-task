import { memo } from 'react';

interface StatusTabsProps {
  selected: string;
  onSelect: (status: string) => void;
}

const tabConfig: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'pending', label: 'Pending' },
  { key: 'banned', label: 'Banned' },
  { key: 'rejected', label: 'Rejected' },
];

export const StatusTabs = memo(function StatusTabs({
  selected,
  onSelect,
}: StatusTabsProps) {
  return (
    <div className="flex gap-1">
      {tabConfig.map(({ key, label }) => {
        const isSelected = selected === key;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              isSelected
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-600 hover:bg-surface-100'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
});
