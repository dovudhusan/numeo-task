import { memo, useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Pencil } from 'lucide-react';
import { StatusBadge } from '@/entities/user';
import { computeRowDisplayScore } from '@/shared/lib/expensive-compute';
import type { User } from '@/entities/user';

interface UsersTableProps {
  users: User[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (key: string) => void;
  onRowClick: (user: User) => void;
  onEditClick: (e: React.MouseEvent, user: User) => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
}

const ROW_HEIGHT = 56;

const GRID_COLUMNS = 'minmax(240px, 1fr) 200px 250px 160px 80px 110px 72px';

export const UsersTable = memo(function UsersTable({
  users,
  sortBy,
  sortOrder,
  onSort,
  onRowClick,
  onEditClick,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UsersTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return null;
    return (
      <span className="ml-1 inline-block">
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const handleHeaderClick = (key: string) => () => onSort(key);

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-320px)] min-h-[400px] overflow-auto rounded-lg border border-surface-200 bg-white min-w-[1100px]"
    >
      <table className="w-full min-w-[1100px] table-fixed border-collapse">
        <thead className="sticky top-0 z-10 border-b border-surface-200 bg-surface-50/95 backdrop-blur-sm">
          <tr
            className="grid border-b border-surface-200"
            style={{ gridTemplateColumns: GRID_COLUMNS }}
          >
            <th className="px-4 py-3 text-left">
              <button
                onClick={handleHeaderClick('fullName')}
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
              >
                Name
                <SortIcon column="fullName" />
              </button>
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Phone number
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Company
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={handleHeaderClick('role')}
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
              >
                Role
                <SortIcon column="role" />
              </button>
            </th>
            <th className="px-4 py-3 text-center">
              <button
                onClick={handleHeaderClick('age')}
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
              >
                Age
                <SortIcon column="age" />
              </button>
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-2 py-3" />
          </tr>
        </thead>
        <tbody
          className="relative block"
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {virtualRows.map((virtualRow) => {
            const user = users[virtualRow.index];
            computeRowDisplayScore(user.fullName, user.email);

            return (
              <tr
                key={user.id}
                role="button"
                tabIndex={0}
                onClick={() => onRowClick(user)}
                onKeyDown={(e) => e.key === 'Enter' && onRowClick(user)}
                className="absolute left-0 right-0 w-full cursor-pointer border-b border-surface-100 transition-colors hover:bg-surface-50/80"
                style={{
                  top: 0,
                  height: ROW_HEIGHT,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'grid',
                  alignItems: 'center',
                  gridTemplateColumns: GRID_COLUMNS,
                }}
              >
                <td className="align-middle px-4">
                  <div className="font-medium text-gray-900">{user.fullName}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </td>
                <td className="align-middle px-4 text-sm text-gray-700">{user.phoneNumber}</td>
                <td className="align-middle px-4 text-sm text-gray-700">{user.company}</td>
                <td className="align-middle px-4 text-sm text-gray-700">{user.role}</td>
                <td className="align-middle px-4 text-center text-sm text-gray-700">{user.age}</td>
                <td className="align-middle px-4">
                  <div className="flex justify-center">
                    <StatusBadge status={user.status} />
                  </div>
                </td>
                <td className="align-middle px-2">
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => onEditClick(e, user)}
                      className="rounded p-1.5 text-gray-500 hover:bg-surface-200 hover:text-gray-700"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="flex items-center justify-center py-6"
        >
          {isFetchingNextPage && (
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"
                aria-hidden
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
});
