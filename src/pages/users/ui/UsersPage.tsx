import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsersInfinite } from '@/features/users/model';
import { useDebounce } from '@/shared/lib/use-debounce';
import { UsersTable, UsersTableSkeleton, StatusTabs, SearchFilterBar } from '@/widgets/users-table';
import type { User } from '@/entities/user';

export function UsersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('fullName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const debouncedSearch = useDebounce(search, 400);

  const queryParams = useMemo(
    () => ({
      search: debouncedSearch,
      status: statusFilter === 'all' ? undefined : statusFilter,
      role: roleFilter || undefined,
      sortBy,
      sortOrder,
      limit: 20,
    }),
    [debouncedSearch, statusFilter, roleFilter, sortBy, sortOrder]
  );

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useUsersInfinite(queryParams);

  const users = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data?.pages]
  );

  const handleSort = useCallback((key: string) => {
    setSortBy(key);
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleRowClick = useCallback(
    (user: User) => {
      navigate(`/users/${user.id}`);
    },
    [navigate]
  );

  const handleEditClick = useCallback(
    (e: React.MouseEvent, user: User) => {
      e.stopPropagation();
      navigate(`/users/${user.id}`);
    },
    [navigate]
  );

  if (isError) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-6">
        <h3 className="font-semibold text-rose-800">Error loading users</h3>
        <p className="mt-2 text-sm text-rose-700">
          {(error as Error)?.message ?? 'Please check your connection and try again.'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <StatusTabs
          selected={statusFilter}
          onSelect={setStatusFilter}
        />
        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          role={roleFilter}
          onRoleChange={setRoleFilter}
        />
      </div>

      {isLoading && users.length === 0 ? (
        <UsersTableSkeleton />
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-surface-200 bg-white py-24">
          <p className="text-lg font-medium text-gray-600">No users found</p>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : users.length > 0 ? (
        <>
          <UsersTable
            users={users}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onRowClick={handleRowClick}
            onEditClick={handleEditClick}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
          <div className="flex items-center justify-end">
            <p className="text-sm text-gray-500">
              {users.length} of {data?.pages[0]?.total ?? 0} users
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
