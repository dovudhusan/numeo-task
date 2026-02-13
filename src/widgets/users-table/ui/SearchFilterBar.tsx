import { memo } from 'react';
import { Search } from 'lucide-react';

const ROLES = [
  'Content Creator',
  'IT Administrator',
  'Marketing Manager',
  'Sales Representative',
  'Product Manager',
  'Software Engineer',
  'Data Analyst',
  'Customer Support',
];

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  role: string;
  onRoleChange: (v: string) => void;
}

export const SearchFilterBar = memo(function SearchFilterBar({
  search,
  onSearchChange,
  role,
  onRoleChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex items-center gap-4">
      <select
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        className="rounded-lg border border-surface-200 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      >
        <option value="">Role</option>
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-lg border border-surface-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>
    </div>
  );
});
